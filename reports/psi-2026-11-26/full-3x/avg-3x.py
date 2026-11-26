# Average of three PageSpeed rounds (full3x-r1..r3) per page and strategy -> CSV, JSON and a Markdown table.
# Usage: python3 -I avg-3x.py URLS.txt OUTDIR
import json, os, sys, csv, statistics as st, urllib.parse

urls = [u.strip() for u in open(sys.argv[1]) if u.strip()]
out = sys.argv[2]; os.makedirs(out, exist_ok=True)
here = os.path.dirname(os.path.abspath(__file__))
ROUNDS = ['full3x-r1', 'full3x-r2', 'full3x-r3']

def key(url):
    return urllib.parse.urlparse(url).path.strip('/').replace('/', '__') or 'home'

def name(url):
    p = urllib.parse.urlparse(url).path.strip('/')
    if not p: return 'Home'
    fixed = {'about': 'About', 'services': 'Services', 'pricing': 'Pricing', 'our-work': 'Our Work', 'resources': 'Resources',
             'blog': 'Blog', 'careers': 'Careers', 'lets-talk': "Let's talk", 'privacy-policy': 'Privacy Policy',
             'terms-of-service': 'Terms of Service', 'services/design-development': 'Design & Development',
             'services/webflow-development': 'Webflow Development', 'services/seo-aeo': 'SEO & AEO', 'services/growth': 'Growth'}
    if p in fixed: return fixed[p]
    if p.startswith('our-work/'): return 'Case: ' + p.split('/', 1)[1].replace('-', ' ').title()
    if p.startswith('blog/'):
        s = p.split('/', 1)[1].replace('-', ' ')
        return 'Blog: ' + (s[:46] + '…' if len(s) > 47 else s)
    return p

def one(path):
    d = json.load(open(path))['lighthouseResult']; a = d['audits']; c = d['categories']
    return {'perf': c['performance']['score'] * 100, 'a11y': c['accessibility']['score'] * 100,
            'bp': c['best-practices']['score'] * 100, 'seo': c['seo']['score'] * 100,
            'lcp': a['largest-contentful-paint']['numericValue'] / 1000, 'fcp': a['first-contentful-paint']['numericValue'] / 1000,
            'tbt': a['total-blocking-time']['numericValue'], 'cls': a['cumulative-layout-shift']['numericValue'],
            'si': a['speed-index']['numericValue'] / 1000}

rows, missing = [], []
for u in urls:
    r = {'page': name(u), 'url': u}
    for s in ('mobile', 'desktop'):
        runs = []
        for rd in ROUNDS:
            f = os.path.join(here, rd, f'{key(u)}--{s}.json')
            try: runs.append(one(f))
            except Exception: missing.append(f'{rd} {key(u)} {s}')
        r[s + '_n'] = len(runs)
        for m in ('perf', 'a11y', 'bp', 'seo', 'lcp', 'fcp', 'tbt', 'cls', 'si'):
            vals = [x[m] for x in runs]
            r[f'{s}_{m}'] = st.mean(vals) if vals else None
            if m in ('perf', 'lcp'): r[f'{s}_{m}_min'], r[f'{s}_{m}_max'] = (min(vals), max(vals)) if vals else (None, None)
    rows.append(r)

json.dump(rows, open(os.path.join(out, 'average-3x.json'), 'w'), indent=1)
cols = ['page', 'url', 'mobile_n', 'mobile_perf', 'mobile_perf_min', 'mobile_perf_max', 'mobile_lcp', 'mobile_fcp', 'mobile_tbt', 'mobile_cls', 'mobile_si',
        'desktop_n', 'desktop_perf', 'desktop_perf_min', 'desktop_perf_max', 'desktop_lcp', 'desktop_fcp', 'desktop_tbt', 'desktop_cls', 'desktop_si',
        'mobile_a11y', 'mobile_bp', 'mobile_seo']
with open(os.path.join(out, 'average-3x.csv'), 'w', newline='') as fh:
    w = csv.writer(fh); w.writerow(cols)
    for r in rows: w.writerow([('' if r[c] is None else (round(r[c], 3) if isinstance(r[c], float) else r[c])) for c in cols])

def fnum(v, d=0): return '–' if v is None else (f'{v:.{d}f}'.replace('.', ','))
md = ['| # | Stranica | Telefon skor | Telefon LCP | Telefon TBT | Desktop skor | Desktop LCP |', '|---|---|---|---|---|---|---|']
for i, r in enumerate(rows, 1):
    md.append(f"| {i} | {r['page']} | {fnum(r['mobile_perf'])} ({fnum(r['mobile_perf_min'])}–{fnum(r['mobile_perf_max'])}) | {fnum(r['mobile_lcp'],1)} s | {fnum(r['mobile_tbt'])} ms | {fnum(r['desktop_perf'])} | {fnum(r['desktop_lcp'],1)} s |")
def avg(k): return st.mean([r[k] for r in rows if r[k] is not None])
md.append(f"| | **Prosek svih stranica** | **{fnum(avg('mobile_perf'))}** | **{fnum(avg('mobile_lcp'),1)} s** | **{fnum(avg('mobile_tbt'))} ms** | **{fnum(avg('desktop_perf'))}** | **{fnum(avg('desktop_lcp'),1)} s** |")
open(os.path.join(out, 'average-3x.md'), 'w').write('\n'.join(md) + '\n')
print('\n'.join(md))
print('\nother categories (mobile avg): a11y %.1f, best practices %.1f, seo %.1f' % (avg('mobile_a11y'), avg('mobile_bp'), avg('mobile_seo')))
print('missing:', len(missing), missing[:10])
