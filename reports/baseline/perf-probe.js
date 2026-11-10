// Page weight, request count, resource breakdown and LCP element per page (Playwright + CDP, no throttling).
// NOT Lighthouse: timings are unthrottled and only indicative; bytes and element identification are reliable.
// Usage: node perf-probe.js <out.json> <url...>
const { chromium, devices } = require('playwright');
const fs = require('fs');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const [, , outFile, ...urls] = process.argv;

(async () => {
  const browser = await chromium.launch();
  const res = {};
  for (const [label, opts] of [['mobile', { ...devices['Pixel 5'] }], ['desktop', { viewport: { width: 1440, height: 900 } }]]) {
    for (const u of urls) {
      const ctx = await browser.newContext(opts);
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      const reqs = new Map();
      cdp.on('Network.responseReceived', e => { const r = reqs.get(e.requestId) || {}; Object.assign(r, { url: e.response.url, type: e.type, mime: e.response.mimeType, status: e.response.status }); reqs.set(e.requestId, r); });
      cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId) || {}; r.bytes = e.encodedDataLength; reqs.set(e.requestId, r); });
      cdp.on('Network.loadingFailed', e => { const r = reqs.get(e.requestId) || {}; r.failed = e.errorText; reqs.set(e.requestId, r); });
      await page.addInitScript(() => {
        window.__lcp = null; window.__cls = 0;
        new PerformanceObserver(l => { const e = l.getEntries().pop(); window.__lcp = e; }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(l => { l.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls += e.value; }); }).observe({ type: 'layout-shift', buffered: true });
      });
      const t0 = Date.now();
      try { await page.goto(BASE + u, { waitUntil: 'load', timeout: 90000 }); } catch (e) {}
      await page.waitForTimeout(4000);
      const m = await page.evaluate(() => {
        const e = window.__lcp; let el = null;
        if (e && e.element) { const n = e.element; el = n.tagName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + (n.currentSrc || n.src ? ' src=' + (n.currentSrc || n.src).split('/').pop().slice(0, 70) : '') + (n.getAttribute && n.getAttribute('loading') ? ' loading=' + n.getAttribute('loading') : ''); }
        const nav = performance.getEntriesByType('navigation')[0];
        return { lcpMs: e ? Math.round(e.startTime) : null, lcpEl: el, lcpUrl: e && e.url ? e.url.split('/').pop().slice(0, 80) : null, cls: +window.__cls.toFixed(3), domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null, load: nav ? Math.round(nav.loadEventEnd) : null };
      });
      const list = [...reqs.values()].filter(r => r.url && !r.url.startsWith('data:'));
      const byType = {};
      list.forEach(r => { const k = r.type || 'Other'; byType[k] = (byType[k] || 0) + (r.bytes || 0); });
      res[label + ' ' + u] = { ...m, requests: list.length, bytes: list.reduce((a, r) => a + (r.bytes || 0), 0), byType,
        failed: list.filter(r => r.failed).map(r => r.failed + ' ' + r.url.slice(0, 100)),
        top: list.sort((a, b) => (b.bytes || 0) - (a.bytes || 0)).slice(0, 12).map(r => [r.bytes || 0, r.type, r.url.slice(0, 160)]) };
      process.stdout.write(label + ' ' + u + ' ' + Math.round(res[label + ' ' + u].bytes / 1024) + 'KB ' + list.length + ' req\n');
      await ctx.close();
    }
  }
  await browser.close();
  fs.writeFileSync(outFile, JSON.stringify(res, null, 1));
})();
