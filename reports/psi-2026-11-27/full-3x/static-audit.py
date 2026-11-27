# Static audit of every published staging page: status, title / description (length, duplicates), H1 count, canonical,
# robots, Open Graph, JSON-LD (parses, types), images without an alt attribute, and every link / image / script / css URL
# on the page (internal: must answer 200; external: reported if 4xx/5xx; some sites refuse bots, listed separately).
# Usage: python3 -I static-audit.py PATHS.txt OUT.json
import urllib.request, urllib.parse, re, json, sys, html as H, concurrent.futures as cf, collections, time
BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'
paths = [p.strip() for p in open(sys.argv[1]) if p.strip()]
UA = {'User-Agent': 'Mozilla/5.0 (site audit)'}
def get(url, method='GET'):
    try:
        req = urllib.request.Request(url, headers=UA, method=method)
        with urllib.request.urlopen(req, timeout=25) as r: return r.status, (r.read().decode('utf-8', 'replace') if method == 'GET' else ''), r.geturl()
    except urllib.error.HTTPError as e: return e.code, '', url
    except Exception as e: return 0, repr(e)[:80], url
pages = {}; refs = collections.defaultdict(set)
for p in paths:
    st, h, final = get(BASE + p)
    d = {'status': st}
    if st == 200:
        t = re.search(r'<title>(.*?)</title>', h, re.S); d['title'] = H.unescape(t.group(1).strip()) if t else None
        m = re.search(r'<meta content="([^"]*)" name="description"', h) or re.search(r'<meta name="description" content="([^"]*)"', h)
        d['desc'] = H.unescape(m.group(1)) if m else None
        d['h1'] = len(re.findall(r'<h1[\s>]', h))
        c = re.search(r'<link href="([^"]+)" rel="canonical"', h) or re.search(r'<link rel="canonical" href="([^"]+)"', h); d['canonical'] = c.group(1) if c else None
        rb = re.search(r'<meta content="([^"]*)" name="robots"', h) or re.search(r'<meta name="robots" content="([^"]*)"', h); d['robots'] = rb.group(1) if rb else None
        d['og'] = {k: bool(re.search(rf'property="og:{k}"', h)) for k in ('title', 'description', 'image')}
        lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S); types = []; bad = 0
        for s in lds:
            try:
                j = json.loads(s); js = j if isinstance(j, list) else j.get('@graph', [j]) if isinstance(j, dict) else []
                types += [x.get('@type') for x in js if isinstance(x, dict)]
            except Exception: bad += 1
        d['jsonld'] = {'blocks': len(lds), 'bad': bad, 'types': types}
        imgs = re.findall(r'<img\b[^>]*>', h); d['img_no_alt'] = sum(1 for i in imgs if ' alt=' not in i)
        # alt="" is fine for decorative images; listed for review unless hidden from assistive tech (added 27.11.2026)
        d['img_empty_alt'] = [(re.search(r'src="([^"]*)"', i) or re.search(r'()', i)).group(1).split('/')[-1][:70] for i in imgs if re.search(r'\balt=""', i) and 'aria-hidden="true"' not in i and 'role="presentation"' not in i]
        body = re.sub(r'<script.*?</script>', '', h, flags=re.S)
        for a in re.findall(r'<a\b[^>]*href="([^"#][^"]*)"', body): refs[H.unescape(a)].add(p)
        for s in re.findall(r'<(?:img|script|source)\b[^>]*\bsrc="([^"]+)"', h) + re.findall(r'<link\b[^>]*href="([^"]+\.css[^"]*)"', h): refs[H.unescape(s)].add(p)
    pages[p] = d
def norm(u):
    if u.startswith(('mailto:', 'tel:', 'javascript:', 'data:')): return None
    return urllib.parse.urljoin(BASE + '/', u)
targets = {norm(u): u for u in refs if norm(u)}
def check(u):
    st, _, _ = get(u, 'HEAD')
    if st in (0, 403, 405, 429, 999) or st >= 500: st2, _, _ = get(u, 'GET'); st = st2 or st
    return u, st
res = dict(cf.ThreadPoolExecutor(12).map(check, targets))
broken_int = {u: s for u, s in res.items() if u.startswith(BASE) and s != 200}
broken_ext = {u: s for u, s in res.items() if not u.startswith(BASE) and s not in (200, 0) and not (300 <= s < 400)}
unreach_ext = {u: s for u, s in res.items() if not u.startswith(BASE) and s == 0}
titles = collections.Counter(d.get('title') for d in pages.values() if d.get('title')); descs = collections.Counter(d.get('desc') for d in pages.values() if d.get('desc'))
out = {'pages': pages, 'broken_internal': {u: [s, sorted(refs[targets[u]])[:5]] for u, s in broken_int.items()},
       'broken_external': {u: [s, sorted(refs[targets[u]])[:5]] for u, s in broken_ext.items()}, 'unreachable_external': {u: sorted(refs[targets[u]])[:3] for u in unreach_ext},
       'dup_titles': {t: n for t, n in titles.items() if n > 1}, 'dup_descs': {t: n for t, n in descs.items() if n > 1}, 'checked_urls': len(res)}
json.dump(out, open(sys.argv[2], 'w'), indent=1, ensure_ascii=False)
ok = [d for d in pages.values() if d['status'] == 200]
print('pages', len(pages), 'status:', dict(collections.Counter(d['status'] for d in pages.values())))
print('title >60:', [(p, len(d['title'])) for p, d in pages.items() if d.get('title') and len(d['title']) > 60])
print('title missing:', [p for p, d in pages.items() if d['status'] == 200 and not d.get('title')])
print('desc missing:', [p for p, d in pages.items() if d['status'] == 200 and not d.get('desc')], '| desc >160:', [(p, len(d['desc'])) for p, d in pages.items() if d.get('desc') and len(d['desc']) > 160], '| desc <70:', [(p, len(d['desc'])) for p, d in pages.items() if d.get('desc') and len(d['desc']) < 70])
print('h1 != 1:', [(p, d['h1']) for p, d in pages.items() if d['status'] == 200 and d['h1'] != 1])
print('canonical missing:', [p for p, d in pages.items() if d['status'] == 200 and not d.get('canonical')])
print('robots:', dict(collections.Counter(d.get('robots') for d in ok)))
print('og missing:', [(p, [k for k, v in d['og'].items() if not v]) for p, d in pages.items() if d['status'] == 200 and not all(d['og'].values())])
print('jsonld bad:', [(p, d['jsonld']['bad']) for p, d in pages.items() if d.get('jsonld', {}).get('bad')], '| no jsonld:', [p for p, d in pages.items() if d['status'] == 200 and not d['jsonld']['blocks']])
print('img without alt attr:', [(p, d['img_no_alt']) for p, d in pages.items() if d.get('img_no_alt')])
print('img with alt="" (not aria-hidden):', {p: d['img_empty_alt'] for p, d in pages.items() if d.get('img_empty_alt')})
print('dup titles:', out['dup_titles']); print('dup descs:', {k[:50]: v for k, v in out['dup_descs'].items()})
print('checked urls', len(res), '| broken internal', len(broken_int), '| broken external', len(broken_ext), '| unreachable external', len(unreach_ext))
for u, v in list(out['broken_internal'].items())[:15]: print('  INT', v[0], u, v[1])
for u, v in list(out['broken_external'].items())[:25]: print('  EXT', v[0], u, v[1][:2])
