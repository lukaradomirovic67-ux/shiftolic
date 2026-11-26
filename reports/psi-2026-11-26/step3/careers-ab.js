// Careers: published (now) vs new page head + footer (new). Slow phone: LCP entries and when the intro starts.
// Then 1440 / 390 final state (6 s) screenshots + JS errors, and reduced motion.
const { chromium } = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io', URL = BASE + '/careers';
const SC = '/home/user/shiftolic/webflow-assets/site-code/', BK = '/home/user/shiftolic/backup/psi-step3-2026-11-26/';
const OH = fs.readFileSync(BK + 'careers-page-head-before.html', 'utf8').trim(), NH = fs.readFileSync(SC + 'careers-page-head.html', 'utf8').trim();
const OF = fs.readFileSync(BK + 'careers-page-footer-before.html', 'utf8').trim(), NF = fs.readFileSync(SC + 'careers-page-footer.html', 'utf8').trim();
const OUT = 'careers-ab'; fs.mkdirSync(OUT, { recursive: true });
async function page(b, mode, opts, slow) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  if (slow) { const c = await ctx.newCDPSession(p); await c.send('Network.enable'); await c.send('Network.setCacheDisabled', { cacheDisabled: true });
    await c.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 }); await c.send('Emulation.setCPUThrottlingRate', { rate: 4 }); }
  await p.route(u => u.toString().split('?')[0] === URL, async r => { const resp = await r.fetch(); let html = await resp.text();
    if (!html.includes(OH) || !html.includes(OF)) throw new Error('code not found');
    if (mode === 'new') html = html.split(OH).join(NH).split(OF).join(NF);
    await r.fulfill({ response: resp, body: html, headers: { ...resp.headers(), 'content-type': 'text/html; charset=utf-8' } }); });
  await p.addInitScript(() => { window.__l = []; window.__ev = []; window.__pre = 0;
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__l.push([Math.round(e.startTime), e.size, e.element ? e.element.tagName + '.' + (e.element.className || '').toString().split(' ')[0] : '?']); }).observe({ type: 'largest-contentful-paint', buffered: true });
    new MutationObserver(ms => ms.forEach(m => { const t = m.target; if (t.classList && t.classList.contains('section_careers-hero')) { const c = t.className; if (/is-pre/.test(c) && !/is-pre/.test(m.oldValue || '')) window.__pre++; window.__ev.push(Math.round(performance.now()) + ' ' + c.replace('section_careers-hero', '').trim()); } })).observe(document, { attributes: true, attributeOldValue: true, subtree: true, attributeFilter: ['class'] }); });
  await p.goto(URL + '?x=' + Date.now(), { waitUntil: 'load', timeout: 120000 });
  return { p, ctx, errs };
}
(async () => { const b = await chromium.launch();
  const phone = { viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true };
  for (const mode of ['now', 'new']) for (let i = 0; i < 2; i++) {
    const { p, ctx, errs } = await page(b, mode, phone, true); await p.waitForTimeout(6000);
    const r = await p.evaluate(() => ({ fcp: Math.round(performance.getEntriesByName('first-contentful-paint')[0].startTime), l: window.__l, ev: window.__ev.slice(0, 4), pre: window.__pre }));
    console.log(`slow phone ${mode}: FCP ${r.fcp} | LCP ${JSON.stringify(r.l)} | hero ${JSON.stringify(r.ev)} | is-pre added ${r.pre}x | errs ${errs.length}`); await ctx.close(); }
  for (const [vn, vo] of [['1440', { viewport: { width: 1440, height: 900 } }], ['390', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }], ['390rm', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, reducedMotion: 'reduce' }]]) {
    const shots = {};
    for (const mode of ['now', 'new']) { const { p, ctx, errs } = await page(b, mode, vo, false);
      await p.addStyleTag({ content: '.careers-hero_field canvas{visibility:hidden!important}.careers-hero_lamp{visibility:hidden!important}' }); await p.waitForTimeout(6000);
      const info = await p.evaluate(() => ({ cls: document.querySelector('.section_careers-hero').className, h1: document.querySelector('.section_careers-hero h1').textContent, pre: window.__pre }));
      shots[mode] = `${OUT}/${vn}-${mode}.png`; await p.screenshot({ path: shots[mode] });
      console.log(`${vn} ${mode}: ${info.cls} | h1 "${info.h1}" | is-pre ${info.pre}x | errs ${errs.length} ${errs.slice(0, 1)}`); await ctx.close(); }
    console.log(`   ${vn} px diff: ` + execFileSync('python3', ['-I', '-W', 'ignore', '../px-diff.py', shots.now, shots.new]).toString().trim());
  }
  await b.close(); })();
