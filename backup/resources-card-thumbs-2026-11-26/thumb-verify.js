// Resources after item 7: old page (published HTML before the change, served in place of the live page) vs live.
// Per viewport: bytes of card images (hero track), which files load, JS errors; every project card screenshotted with
// the marquee stopped and the category dimming off, pixel diff per card; copies in the loop show the thumbnail too.
const { chromium } = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const OLD = fs.readFileSync('/home/user/shiftolic/backup/resources-card-thumbs-2026-11-26/published-resources-before.html', 'utf8');
const OUT = 'thumb-verify'; fs.mkdirSync(OUT, { recursive: true });
async function run(b, v, vn, vo) {
  const ctx = await b.newContext(vo); const p = await ctx.newPage(); const errs = []; const got = {};
  p.on('pageerror', e => errs.push(e.message));
  p.on('response', async r => { if (r.request().resourceType() !== 'image') return; const u = r.url(); if (!/home-full|-card\.webp/.test(u)) return;
    try { got[u.split('/').pop()] = (await r.body()).length; } catch (e) {} });
  if (v === 'old') await p.route(u => u.origin === BASE && u.pathname === '/resources', r => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: OLD }));
  await p.goto(BASE + '/resources?t=' + Date.now(), { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const kb = Math.round(Object.values(got).reduce((s, x) => s + x, 0) / 1024), files = Object.keys(got).length;
  const copies = await p.evaluate(() => [...document.querySelectorAll('.res-hero_track > [aria-hidden="true"] .res-hero_card-thumb')].filter(i => getComputedStyle(i).display !== 'none').map(i => i.complete && i.naturalWidth > 0 ? 1 : 0));
  await p.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused!important;transition:none!important}.res-hero_track{animation:none!important;transform:none!important}.res-hero_card{opacity:1!important}' });
  await p.waitForTimeout(500);
  const names = [];
  for (const c of await p.$$('.res-hero_track > .res-hero_card:not([aria-hidden="true"])')) {
    const n = await c.evaluate(e => { const i = e.querySelector('img[src*="home-full"],img.res-hero_card-thumb'); return i ? (i.getAttribute('alt') || '').split(' ')[0] : null; });
    if (!n || names.includes(n) || !(await c.isVisible())) continue; names.push(n); await c.scrollIntoViewIfNeeded(); await c.screenshot({ path: `${OUT}/${vn}-${n}-${v}.png` }); }
  await ctx.close(); return { kb, files, errs, names, copies, got };
}
(async () => { const b = await chromium.launch();
  for (const [vn, vo] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['phone', { viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true }]]) {
    const a = await run(b, 'old', vn, vo), n = await run(b, 'new', vn, vo);
    console.log(`${vn}: project card images ${a.kb} KB (${a.files} files) -> ${n.kb} KB (${n.files} files) | copies with thumbnail loaded ${n.copies.filter(Boolean).length}/${n.copies.length} | errors ${a.errs.length}/${n.errs.length} ${n.errs.slice(0, 1)}`);
    console.log('   new files:', Object.entries(n.got).map(([k, v]) => k.split('_').pop() + ' ' + Math.round(v / 1024) + 'KB').join(', '));
    for (const k of a.names) { if (!n.names.includes(k)) { console.log('   missing in new', k); continue; }
      console.log('   ', k.padEnd(12), execFileSync('python3', ['-I', '-W', 'ignore', '../px-diff.py', `${OUT}/${vn}-${k}-old.png`, `${OUT}/${vn}-${k}-new.png`]).toString().trim()); } }
  await b.close(); })();
