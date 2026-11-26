// Careers: live head (button fades in) vs new head (button slides in, no fade).
// Phone, CPU 4x, cache off: LCP time + element, when the button first becomes visible, JS errors;
// final look of the hero after the intro (pixel diff), and the button position over time (same motion).
const { chromium } = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io', PATH = '/careers';
const OLD = fs.readFileSync('/home/user/shiftolic/backup/careers-button-slide-2026-11-26/careers-page-head-before.html', 'utf8').trim();
const NEW = fs.readFileSync('/home/user/shiftolic/webflow-assets/site-code/careers-page-head.html', 'utf8').trim();
const N = +(process.argv[2] || 5);
async function run(b, v, vo, slow, shot) {
  const ctx = await b.newContext(vo); const p = await ctx.newPage(); const c = await ctx.newCDPSession(p); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await c.send('Network.enable'); await c.send('Network.setCacheDisabled', { cacheDisabled: true });
  if (slow) await c.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.route(u => u.origin === BASE && u.pathname === PATH, async r => { const resp = await r.fetch(); let html = await resp.text(); if (!html.includes(OLD)) throw new Error('head');
    if (v === 'new') html = html.split(OLD).join(NEW); await r.fulfill({ response: resp, body: html, headers: { ...resp.headers(), 'content-type': 'text/html; charset=utf-8' } }); });
  await p.addInitScript(() => { window.__lcp = []; window.__btn = [];
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp.push([Math.round(e.startTime), e.element ? (e.element.className || e.element.nodeName).toString().slice(0, 40) : '']); }).observe({ type: 'largest-contentful-paint', buffered: true });
    const t0 = performance.now(); (function f() { const bt = document.querySelector('.careers-hero_content>.cta-v2_button');
      if (bt) { const cs = getComputedStyle(bt); window.__btn.push([Math.round(performance.now() - t0), +cs.opacity, Math.round(bt.getBoundingClientRect().top)]); }
      if (performance.now() - t0 < 6000) requestAnimationFrame(f); })(); });
  await p.goto(BASE + PATH + '?b=' + Date.now(), { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(4500);
  const r = await p.evaluate(() => { const fcp = (performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0;
    const firstVis = (window.__btn.find(x => x[1] > 0) || [])[0]; return { lcp: window.__lcp[window.__lcp.length - 1], fcp: Math.round(fcp), firstVis, btn: window.__btn }; });
  if (shot) { await p.mouse.move(0, 0); const h = await p.$('.section_careers-hero'); await h.screenshot({ path: shot }); }
  await ctx.close(); return { ...r, errs };
}
(async () => { const b = await chromium.launch();
  const phone = { viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true };
  const res = { old: [], new: [] };
  for (let i = 0; i < N; i++) for (const v of (i % 2 ? ['new', 'old'] : ['old', 'new'])) res[v].push(await run(b, v, phone, true));
  for (const v of ['old', 'new']) console.log(`${v}: LCP ${res[v].map(x => x.lcp[0]).join('/')} el ${[...new Set(res[v].map(x => x.lcp[1]))].join(',')} | FCP ${res[v].map(x => x.fcp).join('/')} | button first visible ${res[v].map(x => x.firstVis).join('/')} ms | errors ${res[v].reduce((s, x) => s + x.errs.length, 0)}`);
  // button motion (no throttling): top position at the end must be the same; old fades, new does not
  for (const [vn, vo] of [['phone', phone], ['desktop', { viewport: { width: 1440, height: 900 } }]]) {
    const a = await run(b, 'old', vo, false, `careers-${vn}-old.png`), n = await run(b, 'new', vo, false, `careers-${vn}-new.png`);
    const px = execFileSync('python3', ['-I', '-W', 'ignore', '../px-diff.py', `careers-${vn}-old.png`, `careers-${vn}-new.png`]).toString().trim();
    const last = x => x.btn[x.btn.length - 1];
    console.log(`${vn}: hero after intro px diff ${px} | button end top old ${last(a)[2]} new ${last(n)[2]} | start top old ${a.btn[0][2]} new ${n.btn[0][2]} | min opacity old ${Math.min(...a.btn.map(x => x[1]))} new ${Math.min(...n.btn.map(x => x[1]))} | errors ${a.errs.length}/${n.errs.length}`);
  }
  await b.close(); })();
