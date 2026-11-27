# PageSpeed "Agentic browsing" category only, one run per URL and strategy (it scores structure, not speed).
# Usage: python3 -I run-agentic.py URLS.txt OUTDIR
import json, os, sys, time, urllib.parse, urllib.request, concurrent.futures as cf
urls = [u.strip() for u in open(sys.argv[1]) if u.strip()]; out = sys.argv[2]; os.makedirs(out, exist_ok=True)
API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
def run(job):
    url, s = job; f = os.path.join(out, (urllib.parse.urlparse(url).path.strip('/').replace('/', '__') or 'home') + f'--{s}.json')
    if os.path.exists(f): return url, s, 'cached'
    q = urllib.parse.urlencode([('url', url), ('strategy', s), ('category', 'AGENTIC_BROWSING')])
    for i in range(4):
        try:
            d = json.load(urllib.request.urlopen(API + '?' + q, timeout=180)); json.dump(d, open(f, 'w')); return url, s, 'ok'
        except Exception as e: last = repr(e)[:120]; time.sleep(15 * (i + 1))
    return url, s, 'FAIL ' + last
with cf.ThreadPoolExecutor(8) as ex:
    for u, s, st in ex.map(run, [(u, s) for u in urls for s in ('mobile', 'desktop')]): print(s, st[:60], u, flush=True)
res = {}
for f in sorted(os.listdir(out)):
    lr = json.load(open(os.path.join(out, f)))['lighthouseResult']; c = lr['categories']['agentic-browsing']
    fails = [r['id'] for r in c['auditRefs'] if r.get('weight') and (lr['audits'].get(r['id'], {}).get('score') or 0) < 1]
    res[f[:-5]] = {'score': round(c['score'] * 100), 'final_url': lr.get('finalDisplayedUrl'), 'fails': fails}
json.dump(res, open(os.path.join(out, 'summary.json'), 'w'), indent=1)
print('scores:', sorted(set(v['score'] for v in res.values())), '| below 100:', {k: v for k, v in res.items() if v['score'] < 100})
