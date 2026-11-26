// Old head (before item 2) vs new head (published now), same page, phone, CPU 4x, cache off.
// Per run: blocking time (sum of long task time over 50 ms, until load + 3 s), LCP, hold script self time.
// Usage: node ab-head.js /our-work 5
const { chromium } = require('playwright'); const fs = require('fs');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const NEW = fs.readFileSync('/home/user/shiftolic/webflow-assets/site-code/site-head.min.html', 'utf8').trim();
const OLD = fs.readFileSync('/home/user/shiftolic/backup/psi-step5-resources-2026-11-26/site-head.min-before.html', 'utf8').trim();
const path = process.argv[2] || '/our-work', N = +(process.argv[3] || 5);
async function run(b, v) {
  const ctx = await b.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); const c = await ctx.newCDPSession(p);
  await c.send('Network.enable'); await c.send('Network.setCacheDisabled', { cacheDisabled: true }); await c.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.route(u => u.origin === BASE && u.pathname === path, async r => { const resp = await r.fetch(); let html = await resp.text(); if (!html.includes(NEW)) throw new Error('head');
    if (v === 'old') html = html.split(NEW).join(OLD); await r.fulfill({ response: resp, body: html, headers: { ...resp.headers(), 'content-type': 'text/html; charset=utf-8' } }); });
  await p.addInitScript(() => { window.__lt = []; window.__lcp = 0;
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: 'longtask', buffered: true });
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = [Math.round(e.startTime), e.element ? e.element.className.slice(0, 40) : e.url.split('/').pop().slice(-30)]; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
  await p.goto(BASE + path + '?ab=' + Date.now(), { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(3000);
  const r = await p.evaluate(() => ({ tbt: Math.round(window.__lt.reduce((s, x) => s + Math.max(0, x[1] - 50), 0)), lt: window.__lt.length, lcp: window.__lcp,
    fcp: Math.round((performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0) }));
  await ctx.close(); return r;
}
(async () => { const b = await chromium.launch(); const res = { old: [], new: [] };
  for (let i = 0; i < N; i++) for (const v of (i % 2 ? ['new', 'old'] : ['old', 'new'])) res[v].push(await run(b, v));
  for (const v of ['old', 'new']) { const t = res[v].map(x => x.tbt), l = res[v].map(x => x.lcp[0]); const med = a => [...a].sort((x, y) => x - y)[a.length >> 1];
    console.log(`${path} ${v}: TBT ${t.join('/')} (median ${med(t)}) | LCP ${l.join('/')} (median ${med(l)}) | LCP el ${[...new Set(res[v].map(x => x.lcp[1]))].join(', ')}`); }
  await b.close(); })();
