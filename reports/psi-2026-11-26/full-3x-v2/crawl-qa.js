// Browser QA of every page, phone 390 and desktop 1440: horizontal overflow, broken visible images after scrolling the
// whole page, failed requests (4xx/5xx or network failures, own domains only), JS errors, console errors.
const { chromium } = require('playwright'); const fs = require('fs');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const paths = fs.readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean);
(async () => { const b = await chromium.launch(); const out = [];
  for (const [vn, vo] of [['phone', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }], ['desktop', { viewport: { width: 1440, height: 900 } }]]) {
    const ctx = await b.newContext(vo);
    for (const path of paths) { const p = await ctx.newPage(); const errs = [], cons = [], failed = [];
      p.on('pageerror', e => errs.push(e.message.slice(0, 120)));
      p.on('console', m => { if (m.type() === 'error') cons.push(m.text().slice(0, 120)); });
      p.on('requestfailed', r => { const u = r.url(); if (/webflow\.io|website-files\.com/.test(u) && !/google|analytics/.test(u)) failed.push('FAIL ' + u.split('/').pop().slice(0, 60) + ' ' + (r.failure() || {}).errorText); });
      p.on('response', r => { const u = r.url(); if (r.status() >= 400 && /webflow\.io|website-files\.com/.test(u) && !(path === '/404' && r.request().resourceType() === 'document')) failed.push(r.status() + ' ' + u.split('/').pop().slice(0, 60)); });
      await p.goto(BASE + path + '?qa=' + Date.now(), { waitUntil: 'load', timeout: 90000 });
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 140)); } scrollTo(0, 0); });
      await p.waitForTimeout(1800);
      const r = await p.evaluate(() => { const vw = document.documentElement.clientWidth;
        const over = document.documentElement.scrollWidth - vw;
        const wide = over > 0 ? [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); return b.right > vw + 1 && b.width > 0 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 3).map(e => (e.className || e.tagName).toString().slice(0, 50)) : [];
        const broken = [...document.images].filter(i => i.offsetParent && i.getBoundingClientRect().width > 2 && i.currentSrc && !i.currentSrc.startsWith('data:') && i.complete && i.naturalWidth === 0).map(i => i.currentSrc.split('/').pop().slice(0, 50));
        return { over, wide, broken }; });
      if (r.over > 0 || r.broken.length || errs.length || failed.length || cons.length) out.push({ vn, path, ...r, errs, failed: [...new Set(failed)].slice(0, 5), cons: [...new Set(cons)].slice(0, 3) });
      await p.close(); }
    await ctx.close(); }
  fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
  console.log('pages with findings:', out.length, 'of', paths.length * 2);
  for (const o of out) console.log(o.vn, o.path, o.over > 0 ? `overflow ${o.over}px ${o.wide.join('|')}` : '', o.broken.length ? 'broken imgs ' + o.broken.join(',') : '', o.errs.length ? 'JS ' + o.errs[0] : '', o.failed.length ? 'req ' + o.failed.join(' ; ') : '', o.cons.length ? 'console ' + o.cons[0] : '');
  await b.close(); })();
