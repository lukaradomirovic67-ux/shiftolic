"""Build the audit dashboard data from Lighthouse JSON (lighthouse/*.json.gz) and raw-HTML checks (html-checks.json).
Writes pages.json, opportunities.json, failing-audits.json and pages.csv next to this file.
SEO is also given without 'is-crawlable', because the staging robots.txt (Disallow: /) fails it on every page."""
import csv, glob, gzip, json, os, statistics
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
SELF = open(os.path.abspath(__file__), encoding='utf-8').read()
STAGING = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'
CATS = {'performance': 'Perf', 'accessibility': 'A11y', 'best-practices': 'Bp', 'seo': 'Seo', 'agentic-browsing': 'Ab'}
CAT_SR = {'performance': 'Performance', 'accessibility': 'Pristupačnost', 'best-practices': 'Best practices', 'seo': 'SEO',
          'agentic-browsing': 'Agentic browsing'}
OPP_SR = {
    'unused-javascript': 'Neiskorišćen JavaScript', 'unused-css-rules': 'Neiskorišćen CSS',
    'cache-insight': 'Kratko keširanje fajlova', 'image-delivery-insight': 'Isporuka slika (veličina i format)',
    'legacy-javascript-insight': 'Zastareli JavaScript (polyfill-i)', 'duplicated-javascript-insight': 'Dupli JavaScript',
    'unminified-css': 'Neminifikovan CSS', 'unminified-javascript': 'Neminifikovan JavaScript',
    'render-blocking-insight': 'Fajlovi koji blokiraju prvi prikaz', 'font-display-insight': 'Prikaz fontova (font-display)',
    'document-latency-insight': 'Odziv servera za HTML', 'lcp-discovery-insight': 'Otkrivanje LCP slike',
    'mainthread-work-breakdown': 'Previše posla na glavnoj niti', 'bootup-time': 'Dugo izvršavanje JavaScripta',
}
FAIL_SR = {
    'errors-in-console': 'Greške u konzoli pregledača', 'is-crawlable': 'Stranica blokirana za indeksiranje',
    'landmark-one-main': 'Nema glavne <main> oblasti', 'target-size': 'Mete za dodir premale ili preblizu',
    'color-contrast': 'Nedovoljan kontrast teksta', 'agent-accessibility-tree': 'Stablo pristupačnosti nije ispravno',
    'image-aspect-ratio': 'Slika prikazana u pogrešnom odnosu stranica', 'aria-required-children': 'ARIA lista bez stavki',
    'heading-order': 'Naslovi preskaču nivoe', 'link-name': 'Link bez naziva', 'button-name': 'Dugme bez naziva',
    'image-alt': 'Slika bez alt atributa', 'link-text': 'Linkovi bez opisnog teksta', 'meta-description': 'Nema meta opisa',
    'label-content-name-mismatch': 'Vidljiv tekst se ne poklapa sa nazivom', 'aria-allowed-role': 'Nedozvoljena ARIA uloga',
    'list': 'Lista sa pogrešnim podelementima', 'listitem': 'Stavka liste van liste', 'inspector-issues': 'Problemi u Chrome DevTools',
    'third-party-cookies': 'Kolačići trećih strana', 'deprecations': 'Zastareli API-ji',
    'crawlable-anchors': 'Link koji pretraživač ne može da prati',
}
SANDBOX_BLOCKED = 'ERR_TUNNEL_CONNECTION_FAILED'  # hosts the measuring environment cannot reach (GTM, GA, Webflow font CDN, Cloudflare)


def group(path):
    if path.startswith('/blog/'):
        return 'Blog'
    if path.startswith('/our-work/'):
        return 'Case study'
    return 'Stranica'


def slug(path):
    return path.strip('/').replace('/', '__') or 'home'


def cat_score(cat, audits, skip=()):
    num = den = 0
    for ref in cat['auditRefs']:
        a = audits.get(ref['id'], {})
        if ref['id'] in skip or a.get('scoreDisplayMode') in ('notApplicable', 'manual', 'informative') or a.get('score') is None:
            continue
        num += ref['weight'] * a['score']
        den += ref['weight']
    return round(100 * num / den) if den else None


def fraction(cat, audits):
    ok = n = 0
    for ref in cat['auditRefs']:
        a = audits.get(ref['id'], {})
        if a.get('scoreDisplayMode') in ('notApplicable', 'manual', 'informative') or a.get('score') is None:
            continue
        n += 1
        ok += a['score'] >= 0.9
    return f'{ok}/{n}'


def fails(cat, audits):
    return [r['id'] for r in cat['auditRefs'] if audits.get(r['id'], {}).get('score') is not None
            and audits[r['id']].get('scoreDisplayMode') not in ('notApplicable', 'manual', 'informative')
            and audits[r['id']]['score'] < 0.9 and (r.get('weight') or 0) > 0]


def savings(a):
    det = a.get('details') or {}
    b = det.get('overallSavingsBytes')
    if b is None:
        b = sum((i.get('wastedBytes') or 0) for i in det.get('items') or [] if isinstance(i, dict))
    ms = max([v for v in (a.get('metricSavings') or {}).values() if isinstance(v, (int, float))] or [0])
    return b or 0, ms


html = {r['path']: r for r in json.load(open(os.path.join(HERE, 'html-checks.json')))}
paths = [l.strip() for l in open(os.path.join(HERE, 'urls.txt')) if l.strip()]
rows, opp = [], defaultdict(lambda: {'m': [], 'd': [], 'title': ''})
failing = defaultdict(lambda: {'m': [], 'd': [], 'title': '', 'cat': ''})
for path in paths:
    h = html[path]
    row = {'path': path, 'group': group(path)}
    for ff, p in (('mobile', 'm'), ('desktop', 'd')):
        f = os.path.join(HERE, 'lighthouse', f'{slug(path)}--{ff}.json.gz')
        if not os.path.exists(f):
            continue
        d = json.load(gzip.open(f))
        a, c = d['audits'], d['categories']
        for cid, short in CATS.items():
            row[p + short] = round(c[cid]['score'] * 100) if c.get(cid) and c[cid]['score'] is not None else None
        row[p + 'SeoRaw'] = row[p + 'Seo']
        row[p + 'Seo'] = cat_score(c['seo'], a, skip=('is-crawlable',))
        cons = (a.get('errors-in-console', {}).get('details') or {}).get('items') or []
        sandbox_only = all(SANDBOX_BLOCKED in (i.get('description') or '') for i in cons)
        row[p + 'BpRaw'] = row[p + 'Bp']
        if sandbox_only:
            row[p + 'Bp'] = cat_score(c['best-practices'], a, skip=('errors-in-console',))
        row[p + 'AbPassed'] = fraction(c['agentic-browsing'], a)
        if p == 'm':
            row['mLcpS'] = round(a['largest-contentful-paint']['numericValue'] / 1000, 1)
            row['mTbtMs'] = round(a['total-blocking-time']['numericValue'])
            row['mCls'] = round(a['cumulative-layout-shift']['numericValue'], 3)
            row['mWeightKb'] = round(a['total-byte-weight']['numericValue'] / 1024)
        for cid in CATS:
            if cid == 'performance':
                continue
            for aid in fails(c[cid], a):
                if aid == 'errors-in-console' and sandbox_only:
                    failing['errors-in-console']['sandbox'] = True
                failing[aid][p].append(path)
                failing[aid]['title'] = a[aid]['title']
                failing[aid]['cat'] = CAT_SR[cid]
        for aid, au in a.items():
            if au.get('score') is None or au['score'] >= 0.9 or au.get('scoreDisplayMode') in ('notApplicable', 'informative', 'manual'):
                continue
            b, ms = savings(au)
            if b >= 1024 or ms >= 50:
                opp[aid][p].append((b, ms))
                opp[aid]['title'] = au['title']
    row.update({
        'h1': h['h1Count'], 'titleLen': h['titleLen'], 'descLen': h['descLen'],
        'schema': ', '.join(h['ldTypes']), 'imgs': h['imgs'], 'altEmpty': h['imgEmptyAlt'], 'altMissing': h['imgNoAlt'],
        'ogImage': 'da' if h['ogImage'] else 'ne', 'ogTitle': 'da' if h['ogTitle'] else 'ne',
        'canonical': 'da' if h['canonical'] else 'ne', 'noindex': 'da' if (h['robotsMeta'] or '').find('noindex') >= 0 else 'ne',
        'title': h['title'] or '', 'description': h['desc'] or '',
    })
    rows.append(row)

opps = []
for aid, v in opp.items():
    m = v['m']
    if not m:
        continue
    kb = [round(b / 1024) for b, _ in m]
    opps.append({'id': aid, 'label': OPP_SR.get(aid, v['title']), 'lighthouse': v['title'],
                 'pagesMobile': len(m), 'pagesDesktop': len(v['d']), 'kbTotal': sum(kb),
                 'kbMedian': round(statistics.median(kb)), 'msMedian': round(statistics.median([ms for _, ms in m]))})
opps.sort(key=lambda r: (-r['kbTotal'], -r['msMedian']))

NOTES = {'is-crawlable': 'Samo staging: robots.txt ima Disallow: /. Na pravom domenu ne važi.',
         'errors-in-console': 'Samo u okruženju za merenje: blokirane adrese (GTM, GA, Webflow fontovi, Cloudflare).'}
fail_rows = [{'id': k, 'category': v['cat'], 'label': FAIL_SR.get(k, v['title']), 'lighthouse': v['title'],
              'pagesMobile': len(v['m']), 'pagesDesktop': len(v['d']),
              'note': NOTES.get(k, '') if (k != 'errors-in-console' or v.get('sandbox')) else '',
              'examples': ', '.join(sorted(set(v['m'] + v['d']))[:6])} for k, v in failing.items()]
fail_rows.sort(key=lambda r: (-(r['pagesMobile'] + r['pagesDesktop']), r['category']))

meta = [{'label': 'build-data.py', 'value': SELF, 'type': 'code', 'lang': 'python'},
        {'label': 'Input', 'value': f'Lighthouse 13.6.0 (mobile + desktop, 1 run per page) and raw HTML of {len(rows)} pages on {STAGING}, 13.11.2026'}]
for name, data in (('pages.json', rows), ('opportunities.json', opps), ('failing-audits.json', fail_rows)):
    json.dump({'rows': data, 'meta': meta}, open(os.path.join(HERE, name), 'w'), ensure_ascii=False, indent=1)
cols = list(rows[0].keys())
for r in rows:
    cols += [k for k in r if k not in cols]
with open(os.path.join(HERE, 'pages.csv'), 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fieldnames=cols)
    w.writeheader()
    w.writerows(rows)
print('pages', len(rows), 'opps', len(opps), 'fails', len(fail_rows))
