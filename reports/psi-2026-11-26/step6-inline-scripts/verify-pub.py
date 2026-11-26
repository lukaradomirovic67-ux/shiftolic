import urllib.request, time, re, sys
B='https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'
foot=open('/home/user/shiftolic/webflow-assets/site-code/site-footer.min.html').read().strip()
head=open('/home/user/shiftolic/webflow-assets/site-code/site-head.min.html').read().strip()
ok=True
for p in ['/','/our-work','/our-work/ballerine','/services/design-development','/blog','/careers','/about']:
    h=urllib.request.urlopen(B+p+'?v='+str(time.time())).read().decode()
    tags=len(re.findall(r'<script[^>]*src="[^"]*(nuescmsderived|nuesa11yfixes)',h))
    f=foot in h; ok=ok and f and tags==0
    print(p.ljust(30), 'footer verbatim', f, '| head verbatim', head in h, '| registered script tags', tags)
sys.exit(0 if ok else 1)
