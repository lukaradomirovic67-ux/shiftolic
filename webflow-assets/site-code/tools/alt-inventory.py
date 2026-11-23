# Inventory of <img> without alt text in the server HTML of every page (what Google and most audit tools read).
import re, json, sys, urllib.request, concurrent.futures as cf, html as H
BASE='https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'
paths=[l.strip() for l in open('home-perf/paths.txt') if l.strip()]
def get(p):
    return p, urllib.request.urlopen(BASE+p+'?alt=1').read().decode('utf-8','replace')
rows=[]
with cf.ThreadPoolExecutor(8) as ex:
    for p,h in ex.map(get,paths):
        open('alt/'+(p.strip('/').replace('/','__') or 'home')+'.html','w').write(h)
        for m in re.finditer(r'<img\b[^>]*>',h):
            t=m.group(0)
            alt=re.search(r'\salt="([^"]*)"',t)
            cls=(re.search(r'class="([^"]*)"',t) or [None,''])[1]
            src=(re.search(r'\ssrc="([^"]*)"',t) or [None,''])[1]
            # context: nearest ancestor classes (look back 600 chars for class names)
            back=h[max(0,m.start()-700):m.start()]
            ctx=re.findall(r'class="([^"]*)"',back)[-3:]
            hidden='aria-hidden="true"' in back[-300:]
            rows.append(dict(page=p,cls=cls,src=src.split('/')[-1][25:][:60] or src[:60],srcfull=src,alt=None if alt is None else H.unescape(alt.group(1)),ctx=ctx,hidden=hidden))
json.dump(rows,open('alt/rows.json','w'))
tot=len(rows); empty=[r for r in rows if not r['alt']]
print('pages',len(paths),'imgs',tot,'empty/missing alt',len(empty), 'missing attr', sum(1 for r in rows if r['alt'] is None))
from collections import Counter
c=Counter((r['cls'].split(' ')[0], r['src']) for r in empty)
print('distinct (class, file) without alt:',len(c))
bycls=Counter(r['cls'].split(' ')[0] for r in empty)
for k,v in bycls.most_common(80): 
    files=set(r['src'] for r in empty if r['cls'].split(' ')[0]==k)
    pages=set(r['page'] for r in empty if r['cls'].split(' ')[0]==k)
    print(f'{v:4} {k:38} files {len(files):3} pages {len(pages):3}  e.g. {sorted(files)[0][:45]}')
