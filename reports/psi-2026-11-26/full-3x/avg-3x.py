# Average of three PageSpeed rounds (full3x-r1..r3) per page and strategy -> CSV, JSON and a Markdown table.
# Usage: python3 -I avg-3x.py URLS.txt OUTDIR [ROUND_PREFIX, default full3x]
# Report format (agreed 26.11.2026): average-3x-circles.md, circles 🟢 90-100, 🟡 50-89, 🔴 0-49; main pages, then case pages, then blog posts.
import json, os, sys, csv, statistics as st, urllib.parse

urls = [u.strip() for u in open(sys.argv[1]) if u.strip()]
out = sys.argv[2]; os.makedirs(out, exist_ok=True)
here = os.path.dirname(os.path.abspath(__file__))
PREFIX = sys.argv[3] if len(sys.argv) > 3 else 'full3x'
ROUNDS = [f'{PREFIX}-r{i}' for i in (1, 2, 3)]

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
    nice = {'our-work/trak-pro': 'Case: TrakPro', 'our-work/sustain-commercial-solar': 'Case: Sustain', 'our-work/veyor-digital': 'Case: Veyor',
            'blog/aeo-for-marketing-teams-what-you-can-do-without-a-developer': 'Blog: AEO for marketing teams', 'blog/aeo-tools-in-2026-what-you-actually-need-to-optimize-for-ai-search': 'Blog: AEO tools in 2026',
            'blog/aeo-vs-seo-in-2026-whats-the-difference-and-why-it-matters': 'Blog: AEO vs SEO in 2026', 'blog/b2b-saas-seo-in-2026-a-strategy-guide-for-marketing-leaders': 'Blog: B2B SaaS SEO in 2026',
            'blog/best-15-webflow-apps-for-marketing-teams-in-2026': 'Blog: Best 15 Webflow apps', 'blog/from-guests-to-sponsors-notes-from-flow-conf-2026': 'Blog: From guests to sponsors',
            'blog/how-to-delete-a-cms-collection-page-in-webflow-without-breaking-your-site': 'Blog: Delete a CMS collection page', 'blog/how-to-improve-your-website-conversion-rate-in-2026': 'Blog: Improve conversion rate',
            'blog/is-webflow-good-for-ecommerce-an-honest-answer-for-2026': 'Blog: Webflow for ecommerce', 'blog/saas-content-marketing-in-2026-a-strategy-guide': 'Blog: SaaS content marketing',
            'blog/sanity-vs-webflow-cms-which-one-your-team-actually-needs': 'Blog: Sanity vs Webflow CMS', 'blog/source-by-webflow-what-it-is-and-what-it-means-for-teams-on-webflow': 'Blog: Source by Webflow',
            'blog/the-signs-your-current-webflow-site-is-holding-your-business-back': 'Blog: Signs your site holds you back', 'blog/the-website-redesign-process-a-step-by-step-guide': 'Blog: Website redesign process',
            'blog/three-webflow-features-from-2026-worth-paying-attention-to-and-one-to-skip': 'Blog: Three Webflow features 2026', 'blog/webflow-for-b2b-lead-generation-how-to-turn-your-site-into-a-pipeline-engine': 'Blog: Webflow for B2B lead gen',
            'blog/webflow-forms-in-2026-how-to-turn-them-into-a-lead-engine': 'Blog: Webflow forms in 2026', 'blog/webflow-templates-how-to-choose-one-and-when-to-go-custom': 'Blog: Webflow templates',
            'blog/webflow-vs-framer-in-2026-which-one-is-right-for-your-site': 'Blog: Webflow vs Framer', 'blog/webflow-vs-squarespace-in-2026-when-each-one-makes-sense': 'Blog: Webflow vs Squarespace',
            'blog/webflow-vs-wix-in-2026-which-one-is-right-for-your-site': 'Blog: Webflow vs Wix', 'blog/webflow-vs-wordpress-for-b2b-saas-in-2026-whats-changed-and-when-each-one-wins': 'Blog: Webflow vs WordPress'}
    if p in nice: return nice[p]
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

# ---- circle table (the agreed format) ----
def circ(v): v = round(v); return ('🟢' if v >= 90 else '🟡' if v >= 50 else '🔴') + f' {v}'
def num(v, d=1): return f'{v:.{d}f}'.replace('.', ',')
def line(label, r):
    return (f"| {label} | {circ(r['mobile_perf'])} | {circ(r['mobile_a11y'])} | {circ(r['mobile_bp'])} | {circ(r['mobile_seo'])} | "
            f"{num(r['mobile_lcp'])} s | {round(r['mobile_tbt'])} ms | {circ(r['desktop_perf'])} | {circ(r['desktop_a11y'])} | {circ(r['desktop_bp'])} | {circ(r['desktop_seo'])} |")
HEAD = '| Stranica | 📱 Perf | A11y | BP | SEO | LCP | TBT | 🖥️ Perf | A11y | BP | SEO |\n|---|---|---|---|---|---|---|---|---|---|---|'
def pth(r): return urllib.parse.urlparse(r['url']).path.strip('/')
ks = [k for k in rows[0] if k.startswith(('mobile_', 'desktop_')) and not k.endswith(('_min', '_max', '_n'))]
def grp(sub): return {k: st.mean([r[k] for r in sub if r[k] is not None]) for k in ks}
blogs = [r for r in rows if pth(r).startswith('blog/')]; cases = [r for r in rows if pth(r).startswith('our-work/')]
main = [r for r in rows if r not in blogs and r not in cases]
o = [HEAD, line(f'**PROSEK ({len(rows)})**', grp(rows))]
if blogs: o.append(line(f'**Blog postovi ({len(blogs)}, prosek)**', grp(blogs)))
if cases: o.append(line(f'**Case stranice ({len(cases)}, prosek)**', grp(cases)))
o += [line('`/' + pth(r) + '`', r) for r in main]
if cases: o += ['', '**Case stranice:**', '', HEAD] + [line(r['page'].replace('Case: ', ''), r) for r in cases]
if blogs: o += ['', '**Blog postovi:**', '', HEAD] + [line(r['page'].replace('Blog: ', ''), r) for r in sorted(blogs, key=lambda r: -r['mobile_perf'])]
open(os.path.join(out, 'average-3x-circles.md'), 'w').write('\n'.join(o) + '\n')
