# Which Lighthouse checks fail across the pages (round 1 of a full run, mobile and desktop), with how many pages and the
# biggest estimated savings. Usage: python3 -I audits-agg.py PREFIX
import json, glob, os, sys, collections
P = sys.argv[1]
for strat in ('mobile', 'desktop'):
    fails = collections.defaultdict(list); cats = {}
    for f in sorted(glob.glob(f'{P}-r1/*--{strat}.json')):
        lr = json.load(open(f))['lighthouseResult']; page = os.path.basename(f).split('--')[0]
        groups = {}
        for cid, c in lr['categories'].items():
            for ref in c['auditRefs']: groups.setdefault(ref['id'], cid)
        for aid, a in lr['audits'].items():
            if a.get('scoreDisplayMode') not in ('binary', 'numeric', 'metricSavings') or a.get('score') is None: continue
            if a['score'] >= 0.9: continue
            if aid in ('first-contentful-paint', 'largest-contentful-paint', 'speed-index', 'total-blocking-time', 'cumulative-layout-shift', 'interactive', 'max-potential-fid'): continue
            d = a.get('details') or {}
            save = (a.get('metricSavings') or {}); kb = round((d.get('overallSavingsBytes') or 0) / 1024); ms = round(d.get('overallSavingsMs') or save.get('LCP') or 0)
            fails[aid].append((page, kb, ms, (a.get('displayValue') or '')[:40]))
            cats[aid] = (groups.get(aid, '-'), a['title'][:70])
    print(f'===== {strat}: failing checks (pages of {len(glob.glob(f"{P}-r1/*--{strat}.json"))})')
    for aid, v in sorted(fails.items(), key=lambda x: -len(x[1])):
        g, t = cats[aid]; tkb = sum(x[1] for x in v)
        worst = sorted(v, key=lambda x: -(x[1] + x[2]))[:3]
        print(f'{len(v):3} {g[:14]:14} {aid:38} {t}' + (f' | total ~{tkb} KB' if tkb else '') + ' | e.g. ' + '; '.join(f'{w[0][:28]} {w[3]}' for w in worst))
