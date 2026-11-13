"""Raw-HTML SEO checks for every page in urls.txt (what a crawler gets before any script runs).
Usage: python3 html-checks.py  ->  writes html-checks.json next to this file."""
import json, os, re, subprocess, time
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io'


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta, self.links, self.imgs, self.h1s, self.ld = {}, {}, [], [], []
        self.title, self.lang = None, None
        self._in = None  # 'title' | 'h1' | 'ld'
        self._buf = []
        self._h1_depth = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang')
        elif tag == 'title' and self.title is None:
            self._in, self._buf = 'title', []
        elif tag == 'meta':
            k = (a.get('name') or a.get('property') or '').lower()
            if k and k not in self.meta:
                self.meta[k] = a.get('content')
        elif tag == 'link' and a.get('rel'):
            self.links.setdefault(a['rel'].lower(), a.get('href'))
        elif tag == 'img':
            self.imgs.append(a)
        elif tag == 'h1':
            self._in, self._buf = 'h1', []
        elif tag == 'script' and (a.get('type') or '').lower() == 'application/ld+json':
            self._in, self._buf = 'ld', []

    def handle_endtag(self, tag):
        if self._in == 'title' and tag == 'title':
            self.title = ''.join(self._buf).strip()
        elif self._in == 'h1' and tag == 'h1':
            self.h1s.append(re.sub(r'\s+', ' ', ''.join(self._buf)).strip())
        elif self._in == 'ld' and tag == 'script':
            self.ld.append(''.join(self._buf))
        else:
            return
        self._in = None

    def handle_data(self, data):
        if self._in:
            self._buf.append(data)


def fetch(path):
    url = BASE + path + '?cb=' + str(int(time.time() * 1000))
    tmp = os.path.join(HERE, '.fetch')
    r = subprocess.run(['curl', '-sS', '-L', '--compressed', '-D', tmp + '.h', '-o', tmp + '.b', '-w', '%{http_code}', '--max-time', '60', url],
                       capture_output=True, text=True)
    status = int(r.stdout or 0)
    head = open(tmp + '.h', encoding='utf-8', errors='replace').read()
    body = open(tmp + '.b', encoding='utf-8', errors='replace').read()
    os.remove(tmp + '.h'); os.remove(tmp + '.b')
    xrobots = ', '.join(re.findall(r'(?im)^x-robots-tag:\s*(.+?)\s*$', head))
    return status, xrobots, body


def ld_types(obj):
    out = []
    if isinstance(obj, list):
        for o in obj:
            out += ld_types(o)
    elif isinstance(obj, dict):
        t = obj.get('@type')
        if t:
            out += t if isinstance(t, list) else [t]
        if '@graph' in obj:
            out += ld_types(obj['@graph'])
    return out


rows = []
for path in [l.strip() for l in open(os.path.join(HERE, 'urls.txt')) if l.strip()]:
    status, xrobots, body = fetch(path)
    p = Page()
    p.feed(body)
    types, ld_errors = [], 0
    for block in p.ld:
        try:
            types += ld_types(json.loads(block))
        except Exception:
            ld_errors += 1
    no_alt = [i.get('src', '')[-70:] for i in p.imgs if 'alt' not in i]
    empty_alt = [i.get('src', '')[-70:] for i in p.imgs if 'alt' in i and not (i.get('alt') or '').strip()]
    desc = p.meta.get('description')
    rows.append({
        'path': path, 'status': status,
        'title': p.title, 'titleLen': len(p.title or ''),
        'desc': desc, 'descLen': len(desc or ''),
        'h1Count': len(p.h1s), 'h1': p.h1s[:3],
        'canonical': p.links.get('canonical'),
        'robotsMeta': p.meta.get('robots'), 'xRobots': xrobots,
        'ogTitle': bool(p.meta.get('og:title')), 'ogDesc': bool(p.meta.get('og:description')),
        'ogImage': p.meta.get('og:image'), 'twitterCard': p.meta.get('twitter:card'),
        'lang': p.lang,
        'ldBlocks': len(p.ld), 'ldErrors': ld_errors, 'ldTypes': sorted(set(types)),
        'imgs': len(p.imgs), 'imgNoAlt': len(no_alt), 'imgEmptyAlt': len(empty_alt),
        'imgNoAltSrc': no_alt[:10], 'imgEmptyAltSrc': empty_alt[:20],
    })
    print(f"{status} {path:70} h1={len(p.h1s)} t={len(p.title or '')} d={len(desc or '')} ld={sorted(set(types))} img={len(p.imgs)} noalt={len(no_alt)} empty={len(empty_alt)}")

json.dump(rows, open(os.path.join(HERE, 'html-checks.json'), 'w'), indent=1, ensure_ascii=False)
print('pages:', len(rows))
