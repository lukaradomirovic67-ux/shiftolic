"""Summarise Lighthouse runs: median run (by performance score) per page and form factor, plus aggregated opportunities.
Usage: python3 summarise.py <reports-dir> <out-json> <out-md-table>"""
import gzip, json, os, sys, glob, statistics
from collections import defaultdict

src, out_json, out_md = sys.argv[1:4]
runs = defaultdict(list)
for f in sorted(glob.glob(os.path.join(src, '*.json.gz'))):
    slug, ff, run = os.path.basename(f)[:-8].split('--')
    with gzip.open(f) as fh:
        d = json.load(fh)
    a, c = d['audits'], d['categories']
    num = lambda k: a.get(k, {}).get('numericValue')
    lcp_el = ''
    try:
        it = a['largest-contentful-paint-element']['details']['items'][0]['items'][0]['node']
        lcp_el = it.get('selector', '')[-80:]
    except Exception:
        pass
    opps = {}
    for k, v in a.items():
        det = v.get('details') or {}
        if det.get('type') == 'opportunity' or 'overallSavingsMs' in det or (v.get('metricSavings') and v.get('score') is not None and v['score'] < 0.9):
            ms = (v.get('metricSavings') or {})
            sav = det.get('overallSavingsMs') or max([x for x in ms.values() if isinstance(x, (int, float))] or [0])
            byt = det.get('overallSavingsBytes') or 0
            if sav or byt:
                opps[k] = {'title': v.get('title'), 'ms': round(sav or 0), 'kb': round(byt / 1024), 'display': v.get('displayValue', '')}
    runs[(slug, ff)].append({
        'run': run, 'perf': round(c['performance']['score'] * 100), 'a11y': round(c['accessibility']['score'] * 100),
        'bp': round(c['best-practices']['score'] * 100), 'seo': round(c['seo']['score'] * 100),
        'lcp': num('largest-contentful-paint'), 'tbt': num('total-blocking-time'), 'cls': num('cumulative-layout-shift'),
        'fcp': num('first-contentful-paint'), 'si': num('speed-index'), 'bytes': num('total-byte-weight'),
        'requests': len((a.get('network-requests', {}).get('details') or {}).get('items', [])), 'lcpEl': lcp_el, 'opps': opps,
        'seoFails': [k for k in [r['id'] for r in c['seo']['auditRefs']] if a.get(k, {}).get('score') == 0],
        'a11yFails': [k for k in [r['id'] for r in c['accessibility']['auditRefs']] if a.get(k, {}).get('score') == 0],
        'bpFails': [k for k in [r['id'] for r in c['best-practices']['auditRefs']] if a.get(k, {}).get('score') == 0],
    })

summary = {}
for key, rs in runs.items():
    rs = sorted(rs, key=lambda r: r['perf'])
    med = rs[len(rs) // 2]
    med['perfAll'] = [r['perf'] for r in rs]
    summary[key[0] + '|' + key[1]] = med
json.dump(summary, open(out_json, 'w'), indent=1)

order = ['home', 'about', 'services', 'services__design-development', 'services__webflow-development', 'services__seo-aeo', 'services__growth',
         'our-work', 'pricing', 'lets-talk', 'careers', 'blog', 'resources', 'webflow-integrations', 'privacy-policy', 'terms-of-service',
         'our-work__ballerine', 'blog__aeo-tools-in-2026-what-you-actually-need-to-optimize-for-ai-search']
label = lambda s: '/' if s == 'home' else '/' + s.replace('__', '/').replace('aeo-tools-in-2026-what-you-actually-need-to-optimize-for-ai-search', 'aeo-tools-… (šablon Blogs)').replace('our-work/ballerine', 'our-work/ballerine (šablon Our Works)')
lines = []
for ff in ['mobile', 'desktop']:
    lines.append(f'\n**{"Mobilni" if ff == "mobile" else "Desktop"}** (medijana od 3 merenja; Performance svih merenja u zagradi)\n')
    lines.append('| Stranica | Perf | A11y | BP | SEO | LCP | TBT | CLS | FCP | Speed Index | Težina | Zahtevi |')
    lines.append('|---|---|---|---|---|---|---|---|---|---|---|---|')
    for s in order:
        r = summary.get(s + '|' + ff)
        if not r:
            continue
        lines.append(f"| {label(s)} | {r['perf']} ({'/'.join(map(str, r['perfAll']))}) | {r['a11y']} | {r['bp']} | {r['seo']} | {r['lcp']/1000:.1f} s | {round(r['tbt'])} ms | {r['cls']:.3f} | {r['fcp']/1000:.1f} s | {r['si']/1000:.1f} s | {round(r['bytes']/1024):,} KB | {r['requests']} |".replace(',', '.'))
open(out_md, 'w').write('\n'.join(lines) + '\n')

# aggregated opportunities (mobile medians)
agg = defaultdict(lambda: {'pages': 0, 'ms': 0, 'kb': 0, 'title': ''})
for k, r in summary.items():
    if not k.endswith('|mobile'):
        continue
    for oid, o in r['opps'].items():
        g = agg[oid]; g['pages'] += 1; g['ms'] += o['ms']; g['kb'] += o['kb']; g['title'] = o['title']
print('TOP OPPORTUNITIES (mobile, summed over pages):')
for oid, g in sorted(agg.items(), key=lambda x: -(x[1]['ms'] + x[1]['kb']))[:20]:
    print(f"{oid:40} pages={g['pages']:2} ms={g['ms']:6} kb={g['kb']:6}  {g['title']}")
fails = defaultdict(set)
for k, r in summary.items():
    for cat in ['seoFails', 'a11yFails', 'bpFails']:
        for x in r[cat]:
            fails[cat + ':' + x].add(k.split('|')[0])
print('\nFAILED AUDITS:')
for k, v in sorted(fails.items()):
    print(k, len(v), sorted(v)[:4])
print('\nLCP elements (mobile):')
for s in order:
    r = summary.get(s + '|mobile')
    if r:
        print(f"{s[:40]:40} {r['lcpEl']}")
