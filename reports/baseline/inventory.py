"""Build reports/baseline/inventory.csv (+ a summary) from crawl.json."""
import csv, json, sys
from collections import defaultdict
from urllib.parse import urljoin, urlparse

BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'
src, out_csv = sys.argv[1], sys.argv[2]
crawl = json.load(open(src))

def norm(href):
    if not href or href.startswith(('mailto:', 'tel:', 'javascript:')):
        return None
    u = urlparse(urljoin(BASE + '/', href))
    if f'{u.scheme}://{u.netloc}' != BASE:
        return None
    p = u.path.rstrip('/') or '/'
    return p + (('?' + u.query) if u.query else '')

def outlinks(links):
    s = set()
    for l in links:
        n = norm(l.get('href'))
        if n:
            s.add(n)
    return s

raw_out = {u: outlinks(r.get('raw', {}).get('links', [])) for u, r in crawl.items()}
js_out = {u: outlinks(r.get('js', {}).get('links', [])) for u, r in crawl.items()}
raw_in, js_in = defaultdict(set), defaultdict(set)
for u, outs in raw_out.items():
    for t in outs:
        if t != u:
            raw_in[t].add(u)
for u, outs in js_out.items():
    for t in outs:
        if t != u:
            js_in[t].add(u)

cols = ['url', 'status', 'title', 'title_len', 'meta_description', 'desc_len', 'h1_count', 'h1_text', 'canonical',
        'robots_meta', 'word_count', 'image_count', 'images_missing_alt', 'images_empty_alt',
        'internal_links_out_raw', 'internal_links_out_js', 'internal_links_in_raw', 'internal_links_in_js',
        'links_only_after_js', 'schema_types', 'og_title', 'og_image', 'twitter_card', 'lang']
rows = []
for u, r in sorted(crawl.items()):
    raw = r.get('raw', {})
    links = raw.get('links', [])
    dead_raw = [l for l in links if l.get('cms') and (l.get('href') in (None, '', '#'))]
    rows.append({
        'url': u, 'status': r.get('status'), 'title': raw.get('title', ''), 'title_len': len(raw.get('title') or ''),
        'meta_description': raw.get('desc') or '', 'desc_len': len(raw.get('desc') or ''),
        'h1_count': len(raw.get('h1', [])), 'h1_text': ' | '.join(raw.get('h1', [])), 'canonical': raw.get('canonical') or '',
        'robots_meta': raw.get('robots') or '', 'word_count': raw.get('words', 0), 'image_count': raw.get('imgCount', 0),
        'images_missing_alt': len(raw.get('imgNoAlt', [])), 'images_empty_alt': raw.get('imgEmptyAlt', 0),
        'internal_links_out_raw': len(raw_out.get(u, ())), 'internal_links_out_js': len(js_out.get(u, ())),
        'internal_links_in_raw': len(raw_in.get(u, ())), 'internal_links_in_js': len(js_in.get(u, ())),
        'links_only_after_js': len(dead_raw), 'schema_types': ' '.join(sorted(set(raw.get('schema', [])))),
        'og_title': raw.get('ogTitle') or '', 'og_image': raw.get('ogImage') or '', 'twitter_card': raw.get('twCard') or '',
        'lang': raw.get('lang') or '',
    })
with open(out_csv, 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=cols)
    w.writeheader()
    w.writerows(rows)
print(len(rows), 'rows ->', out_csv)
ok = [x for x in rows if x['status'] == 200]
print('status:', {s: sum(1 for x in rows if x['status'] == s) for s in set(x['status'] for x in rows)})
def show(label, cond):
    hits = [x['url'] for x in ok if cond(x)]
    print(f'{label}: {len(hits)}', hits[:8] if len(hits) <= 8 else hits[:6] + ['...'])
show('title missing', lambda x: not x['title'])
show('title >60', lambda x: x['title_len'] > 60)
show('title <30', lambda x: 0 < x['title_len'] < 30)
show('desc missing', lambda x: not x['meta_description'])
show('desc >160', lambda x: x['desc_len'] > 160)
show('desc <120', lambda x: 0 < x['desc_len'] < 120)
show('h1 != 1', lambda x: x['h1_count'] != 1)
show('no canonical', lambda x: not x['canonical'])
show('noindex', lambda x: 'noindex' in x['robots_meta'])
show('no og:image', lambda x: not x['og_image'])
show('no twitter:card', lambda x: not x['twitter_card'])
show('img missing alt attr', lambda x: x['images_missing_alt'] > 0)
show('links that only work with JS (raw href #)', lambda x: x['links_only_after_js'] > 0)
show('no schema', lambda x: not x['schema_types'])
show('thin <300 words', lambda x: x['word_count'] < 300)
show('orphan (0 inlinks rendered)', lambda x: x['internal_links_in_js'] == 0)
show('0 inlinks raw but >0 rendered', lambda x: x['internal_links_in_raw'] == 0 and x['internal_links_in_js'] > 0)
dups = defaultdict(list)
for x in ok:
    dups[x['title']].append(x['url'])
print('duplicate titles:', {t: u for t, u in dups.items() if len(u) > 1 and t})
dd = defaultdict(list)
for x in ok:
    dd[x['meta_description']].append(x['url'])
print('duplicate descriptions:', {t[:50]: u for t, u in dd.items() if len(u) > 1 and t})
st = defaultdict(int)
for x in ok:
    for t in x['schema_types'].split():
        st[t] += 1
print('schema types:', dict(st))
