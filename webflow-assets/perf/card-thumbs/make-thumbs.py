# Card thumbnails for the Resources hero cards (26.11.2026).
# The card shows only the top of the full-page screenshot (object-fit: cover, object-position: 50% 0, card 5:3).
# A thumbnail is that top, cut at 3:2 (a little taller than the card, so a slightly taller card still shows the same part),
# resized to 570 px wide (3x the phone card, 2.3x the desktop card), WebP. The phone screenshot is the same image at 640 px,
# so one thumbnail serves both.
# Usage: python3 -I make-thumbs.py ITEMS.json OUTDIR   (ITEMS.json: [{"slug", "desktop", "mobile"}], URLs of the current images)
import json, sys, io, urllib.request
from PIL import Image

items = json.load(open(sys.argv[1])); out = sys.argv[2]
SPECS = {'desktop': (570, 'card')}
rows = []
for it in items:
    for kind, (w, suffix) in SPECS.items():
        url = it.get(kind)
        if not url: continue
        src = Image.open(io.BytesIO(urllib.request.urlopen(url, timeout=60).read())).convert('RGB')
        top = src.crop((0, 0, src.width, min(src.height, round(src.width * 2 / 3))))
        th = top.resize((w, round(w * top.height / top.width)), Image.LANCZOS)
        name = f"{it['slug']}-{suffix}.webp"
        th.save(f'{out}/{name}', 'WEBP', quality=82, method=6)
        size = len(open(f'{out}/{name}', 'rb').read())
        rows.append((name, f'{src.width}x{src.height}', f'{th.width}x{th.height}', size))
for r in rows: print(f'{r[0]:42} source {r[1]:>11}  thumb {r[2]:>8}  {r[3] / 1024:5.1f} KB')
print('total', round(sum(r[3] for r in rows) / 1024), 'KB')
