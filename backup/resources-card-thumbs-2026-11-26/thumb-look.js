// Resources hero project cards: live full-page screenshots vs the new 570 px thumbnails (served in place of the screenshots).
// Marquee stopped, animations off; every project card screenshotted on desktop 1440 and phone 412, pixel diff per card.
const { chromium } = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const DIR = '/home/user/shiftolic/webflow-assets/perf/card-thumbs/';
const MAP = { veyor: 'veyor-digital', trakpro: 'trak-pro', harper: 'harper', shiftolic: 'shiftolic', intaker: 'intaker', hypersonix: 'hypersonix', sustain: 'sustain-commercial-solar', lasalle: 'lasalle-agri', biotech: 'biotech-innovations', ballerine: 'ballerine' };
const OUT = 'thumb-look'; fs.mkdirSync(OUT, { recursive: true });
async function run(b, v, vn, vo) {
  const ctx = await b.newContext(vo); const p = await ctx.newPage(); let swapped = 0;
  if (v === 'new') await p.route(/home-full[^/]*\.(webp|avif)/, async r => { const f = r.request().url().split('/').pop(); const key = Object.keys(MAP).find(k => f.includes(k + '-home-full'));
    if (!key) return r.continue(); swapped++; await r.fulfill({ status: 200, contentType: 'image/webp', body: fs.readFileSync(DIR + MAP[key] + '-card.webp') }); });
  await p.goto(BASE + '/resources?t=' + Date.now(), { waitUntil: 'load' });
  await p.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused!important;transition:none!important}.res-hero_track{animation:none!important;transform:none!important}' });
  await p.evaluate(async () => { for (const i of document.querySelectorAll('.res-hero_track img')) { i.loading = 'eager'; } await new Promise(r => setTimeout(r, 2500)); });
  const cards = await p.$$('.res-hero_track > *:not([aria-hidden="true"]) .res-hero_card:has(img[src*="home-full"]), .res-hero_track .res-hero_card:has(img[src*="home-full"])');
  const names = [];
  for (const [i, c] of cards.entries()) { const vis = await c.isVisible(); if (!vis) continue; const n = await c.evaluate(e => (e.querySelector('img[src*="home-full"]').getAttribute('src').split('/').pop().match(/_([a-z]+)-home-full/) || [])[1]);
    if (names.includes(n)) continue; names.push(n); await c.scrollIntoViewIfNeeded(); await c.screenshot({ path: `${OUT}/${vn}-${n}-${v}.png` }); }
  await ctx.close(); return { names, swapped };
}
(async () => { const b = await chromium.launch();
  for (const [vn, vo] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['phone', { viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true }]]) {
    const a = await run(b, 'old', vn, vo), n = await run(b, 'new', vn, vo);
    console.log(vn, 'cards', a.names.join(','), '| swapped requests', n.swapped);
    for (const k of a.names) { if (!n.names.includes(k)) { console.log('  missing in new', k); continue; }
      const px = execFileSync('python3', ['-I', '-W', 'ignore', '../px-diff.py', `${OUT}/${vn}-${k}-old.png`, `${OUT}/${vn}-${k}-new.png`]).toString().trim();
      console.log('  ', k.padEnd(11), px); } }
  await b.close(); })();
