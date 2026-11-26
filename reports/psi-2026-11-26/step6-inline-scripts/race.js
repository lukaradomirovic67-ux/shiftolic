// How often the navbar label link ends up without aria-controls (desktop), old vs new footer.
const { chromium } = require('playwright'); const fs = require('fs');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const OLD = fs.readFileSync('/home/user/shiftolic/backup/psi-item3-inline-scripts-2026-11-26/site-footer.min-before.html', 'utf8').trim(), NEW = fs.readFileSync('/home/user/shiftolic/webflow-assets/site-code/site-footer.min.html', 'utf8').trim();
const TAGS = /<script src="https:\/\/cdn\.prod\.website-files\.com\/[^"]*(nuescmsderived|nuesa11yfixes)[^"]*" type="text\/javascript"><\/script>/g;
(async () => { const b = await chromium.launch(); const N = +process.argv[2] || 8;
  for (const path of process.argv.slice(3)) { const c = { old: 0, new: 0 };
    for (let i = 0; i < N; i++) for (const v of ['old', 'new']) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
      await p.route(u => u.origin === BASE && u.pathname === path, async r => { const resp = await r.fetch(); let html = await resp.text(); if (v === 'new') html = html.split(OLD).join(NEW).replace(TAGS, ''); await r.fulfill({ response: resp, body: html, headers: { ...resp.headers(), 'content-type': 'text/html; charset=utf-8' } }); });
      await p.goto(BASE + path + '?r=' + Date.now(), { waitUntil: 'load' }); await p.waitForTimeout(800);
      if (!(await p.evaluate(() => [...document.querySelectorAll('.navbar2_toggle-link')].every(a => a.hasAttribute('aria-controls'))))) c[v]++; await ctx.close(); }
    console.log(`${path}: link without aria-controls, old ${c.old}/${N}, new ${c.new}/${N}`); }
  await b.close(); })();
