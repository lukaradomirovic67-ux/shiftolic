// A/B for the "pictures further down wait for the page" site head: published (now) vs published + new site head (new).
const { chromium } = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const BK = '/home/user/shiftolic/backup/psi-step3-2026-11-26/';
const OUT = 'hold-live'; fs.mkdirSync(OUT, { recursive: true });
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/our-work', '/resources', '/services/design-development', '/our-work/ballerine', '/about'];
const VIEWS = { phone: { viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true }, desktop: { viewport: { width: 1440, height: 900 } } };
const SEL = 'img.work-card_shot,img.home-projects_screen-image,img.ow-cs_before-img,img.ow-cs_after,img.ow-cs_bg,img.res-hero_card-img';
const PARENTS = SEL.split(',').map(s => ':has(> ' + s + ')').join(',');
async function run(b, path, vn, mode) {
  const ctx = await b.newContext(VIEWS[vn]); const p = await ctx.newPage(); const c = await ctx.newCDPSession(p);
  await c.send('Network.enable'); await c.send('Network.setCacheDisabled', { cacheDisabled: true }); await c.send('Page.enable');
  const reqs = {}; let loadAt = 0;
  c.on('Network.requestWillBeSent', e => { if (e.type === 'Image') reqs[e.requestId] = { url: e.request.url, t: e.timestamp }; });
  c.on('Network.loadingFinished', e => { if (reqs[e.requestId]) reqs[e.requestId].kb = e.encodedDataLength / 1024; });
  c.on('Page.domContentEventFired', e => { loadAt = e.timestamp; });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const url = BASE + path;
  if (mode === 'now') { const key = (path === '/' ? 'home' : path.slice(1).replace(/\//g, '_')); const html = fs.readFileSync(BK + 'published-' + key + '-before.html', 'utf8');
    await p.route(u => u.origin === BASE && u.pathname === path, r => r.fulfill({ status: 200, body: html, headers: { 'content-type': 'text/html; charset=utf-8' } })); }
  await p.goto(url + '?ab=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(1500);
  const before = Object.values(reqs).filter(r => r.t <= loadAt);
  const urls = await p.evaluate(sel => [...document.querySelectorAll(sel)].map(i => [i.getAttribute('src'), i.getAttribute('srcset') || '']), SEL);
  const isSel = u => urls.some(([s, ss]) => (s && decodeURI(s) === decodeURI(u)) || (ss && ss.split(',').some(x => decodeURI(x.trim().split(' ')[0]) === decodeURI(u))));
  const selBefore = before.filter(r => isSel(r.url));
  const res = { errs, beforeKB: Math.round(before.reduce((s, r) => s + (r.kb || 0), 0)), selBeforeKB: Math.round(selBefore.reduce((s, r) => s + (r.kb || 0), 0)), selBeforeN: selBefore.length };
  await p.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}[data-reveal],[data-reveal-early],[data-reveal-stagger]>*,[data-reveal-early-stagger]>*{opacity:1!important;translate:none!important}.home-projects_screen-frame{translate:none!important;rotate:none!important}video,iframe,canvas{visibility:hidden!important}' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } scrollTo(0, 0); });
  await p.waitForTimeout(3000);
  res.state = await p.evaluate(sel => { const im = [...document.querySelectorAll(sel)]; return { n: im.length, held: im.filter(i => i.hasAttribute('data-hold')).length, notLoaded: im.filter(i => getComputedStyle(i).display !== 'none' && !(i.complete && i.naturalWidth > 1)).length, ph: im.filter(i => (i.getAttribute('srcset') || '').startsWith('data:')).length, h: document.body.scrollHeight }; }, SEL);
  const els = await p.$$(PARENTS);
  let k = 0; res.shots = [];
  for (const el of els.slice(0, 14)) {
    const box = await el.boundingBox(); if (!box || box.width < 30 || box.height < 30) { k++; continue; }
    const f = `${OUT}/${vn}${path.replace(/\//g, '_') || '_home'}-${k}-${mode}.png`;
    try { await el.screenshot({ path: f, timeout: 8000 }); res.shots.push(f); } catch (e) {}
    k++;
  }
  await ctx.close(); return res;
}
(async () => {
  const b = await chromium.launch();
  for (const path of pages) for (const vn of Object.keys(VIEWS)) {
    const a = await run(b, path, vn, 'now'), n = await run(b, path, vn, 'new');
    const diffs = [];
    for (const f of n.shots) { const g = f.replace('-new.png', '-now.png'); if (fs.existsSync(g)) { try { diffs.push(execFileSync('python3', ['-I', '-W', 'ignore', '../px-diff.py', g, f]).toString().trim().split(' ')[0]); } catch (e) { diffs.push('err'); } } }
    console.log(`${path.padEnd(28)} ${vn.padEnd(7)} imgs before DCL: now ${a.beforeKB} KB (these ${a.selBeforeKB} KB/${a.selBeforeN}) -> new ${n.beforeKB} KB (these ${n.selBeforeKB} KB/${n.selBeforeN}) | after scroll now ${JSON.stringify(a.state)} new ${JSON.stringify(n.state)} | px ${diffs.join(',')} | errs ${a.errs.length}/${n.errs.length} ${n.errs.slice(0, 2).join(' ; ')}`);
  }
  await b.close();
})();
