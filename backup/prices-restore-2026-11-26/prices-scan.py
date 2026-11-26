# Every $ amount in the visible text and in JSON-LD of each published staging page.
import urllib.request, re, json, html as H, sys, time
B='https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'
paths=[p.strip() for p in open(sys.argv[1]) if p.strip()]
out={}
for p in paths:
    try: h=urllib.request.urlopen(B+p+'?pz='+str(time.time()),timeout=60).read().decode()
    except Exception as e: print(p,'ERR',e); continue
    ld=re.findall(r'<script type="application/ld\+json">(.*?)</script>',h,re.S)
    body=re.sub(r'<script.*?</script>|<style.*?</style>','',h,flags=re.S)
    text=H.unescape(re.sub(r'<[^>]+>','\n',body))
    lines=[re.sub(r'\s+',' ',l).strip() for l in text.split('\n')]
    lines=[l for l in lines if l]
    hits=[]
    for i,l in enumerate(lines):
        if re.search(r'\$\s?\d|\$X|USD|€\d',l):
            ctx=' | '.join(lines[max(0,i-1):i+2]); hits.append(ctx[:160])
    ldp=[]
    for s in ld:
        for m in re.finditer(r'"(price|minPrice|maxPrice|priceCurrency)"\s*:\s*"?([^",}]+)',s): ldp.append(m.group(1)+'='+m.group(2))
        for m in re.finditer(r'[Ss]tarting at \$[\d,]+|starts at \$[\d,]+',s): ldp.append(m.group(0))
    if hits or ldp: out[p]={'text':hits,'jsonld':ldp}
json.dump(out,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
for p,v in out.items():
    print('==',p); [print('   ',x) for x in v['text']]; v['jsonld'] and print('    LD:',v['jsonld'])
