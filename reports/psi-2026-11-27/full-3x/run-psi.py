# PageSpeed Insights (API v5) for every URL in a list, mobile + desktop. The API key is added by the environment's
# network secret (X-Goog-Api-Key for www.googleapis.com), so no key appears here.
# Usage: python3 -I run-psi.py URLS.txt OUTDIR [parallel]
import json, os, sys, time, urllib.parse, urllib.request, concurrent.futures as cf

urls = [u.strip() for u in open(sys.argv[1]) if u.strip()]
out = sys.argv[2]; os.makedirs(out, exist_ok=True)
par = int(sys.argv[3]) if len(sys.argv) > 3 else 4
API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
CATS = ['PERFORMANCE', 'ACCESSIBILITY', 'BEST_PRACTICES', 'SEO']

def fname(url, strat):
    p = urllib.parse.urlparse(url).path.strip('/').replace('/', '__') or 'home'
    return os.path.join(out, f'{p}--{strat}.json')

def run(url, strat):
    f = fname(url, strat)
    if os.path.exists(f):
        d = json.load(open(f))
        if 'lighthouseResult' in d: return url, strat, 'cached'
    q = urllib.parse.urlencode([('url', url), ('strategy', strat)] + [('category', c) for c in CATS])
    last = ''
    for attempt in range(4):
        try:
            with urllib.request.urlopen(API + '?' + q, timeout=180) as r:
                d = json.load(r)
            json.dump(d, open(f, 'w'))
            return url, strat, 'ok'
        except urllib.error.HTTPError as e:
            last = f'HTTP {e.code} ' + e.read().decode()[:200]
            if e.code in (429, 500, 503): time.sleep(20 * (attempt + 1)); continue
            break
        except Exception as e:
            last = repr(e)[:200]; time.sleep(10)
    return url, strat, 'FAIL ' + last

jobs = [(u, s) for u in urls for s in ('mobile', 'desktop')]
with cf.ThreadPoolExecutor(par) as ex:
    for url, strat, st in ex.map(lambda j: run(*j), jobs):
        print(f'{strat:7} {st[:120]:10} {url}', flush=True)
