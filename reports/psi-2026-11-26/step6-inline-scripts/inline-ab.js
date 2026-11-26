// Live (registered scripts as files) vs new (same code inline at the end of the site footer, script tags removed).
// Compares what the two scripts produce: navbar toggle/link attributes, gallery screen roles, gallery domains,
// Our Work slider host text, case quote signature; plus JS errors and script requests.
const { chromium } = require('playwright'); const fs = require('fs');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const SC = '/home/user/shiftolic/webflow-assets/site-code/', BK = '/home/user/shiftolic/backup/psi-item3-inline-scripts-2026-11-26/';
const OLD = fs.readFileSync(BK + 'site-footer.min-before.html', 'utf8').trim(), NEW = fs.readFileSync(SC + 'site-footer.min.html', 'utf8').trim();
const TAGS = /<script src="https:\/\/cdn\.prod\.website-files\.com\/[^"]*(nuescmsderived|nuesa11yfixes)[^"]*" type="text\/javascript"><\/script>/g;
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/our-work', '/our-work/ballerine', '/services/design-development', '/blog', '/careers'];
async function run(b, path, v, vo) {
  const ctx = await b.newContext(vo); const p = await ctx.newPage(); const errs = []; const reqs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('request', r => { if (/nuescmsderived|nuesa11yfixes/.test(r.url())) reqs.push(r.url()); });
  await p.route(u => u.origin === BASE && u.pathname === path, async r => { const resp = await r.fetch(); let html = await resp.text();
    if (!html.includes(OLD)) throw new Error('footer'); if ((html.match(TAGS) || []).length !== 2) throw new Error('tags');
    if (v === 'new') html = html.split(OLD).join(NEW).replace(TAGS, '');
    await r.fulfill({ response: resp, body: html, headers: { ...resp.headers(), 'content-type': 'text/html; charset=utf-8' } }); });
  await p.goto(BASE + path + '?i=' + Date.now(), { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(1500);
  const st = await p.evaluate(() => {
    const at = e => e ? [...e.attributes].filter(a => /^(role|tabindex|aria-|href|data-nh)/.test(a.name)).map(a => a.name + '=' + a.value).sort().join(' ') : '-';
    return [
      ...[...document.querySelectorAll('.navbar2_dropdwn-toggle.w-dropdown-toggle')].map(t => 'toggle ' + at(t) + ' | link ' + at(t.querySelector('.navbar2_toggle-link'))),
      ...[...document.querySelectorAll('[data-project-gallery] .home-projects_screen-frame')].map(f => 'frame ' + at(f)),
      ...[...document.querySelectorAll('[data-gallery-domain]')].map(e => 'domain ' + e.getAttribute('data-gallery-domain')),
      ...[...document.querySelectorAll('.ow-browser_host')].map(e => 'host ' + e.textContent),
      ...[...document.querySelectorAll('.cs-quote_sig')].map(e => 'sig ' + e.textContent),
    ].join('\n'); });
  // open and close the Services dropdown with the keyboard on desktop: aria-expanded must follow
  let kb = '';
  if (vo.viewport.width > 991) { const l = await p.$('.navbar2_toggle-link'); if (l) { await l.focus(); await p.keyboard.press('Space'); await p.waitForTimeout(400);
    kb = await p.evaluate(() => document.querySelector('.navbar2_toggle-link').getAttribute('aria-expanded')); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    kb += '/' + await p.evaluate(() => document.querySelector('.navbar2_toggle-link').getAttribute('aria-expanded')); } }
  await ctx.close(); return { st, errs, reqs: reqs.length, kb };
}
(async () => { const b = await chromium.launch(); let bad = 0;
  for (const [vn, vo] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['phone', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]])
    for (const path of paths) { const a = await run(b, path, 'old', vo), n = await run(b, path, 'new', vo); const same = a.st === n.st && a.kb === n.kb;
      if (!same || n.errs.length) bad++;
      console.log(`${vn.padEnd(7)} ${path.padEnd(30)} same ${same} (${a.st.split('\n').length} lines, keyboard ${a.kb}/${n.kb}) | script requests ${a.reqs}->${n.reqs} | errors ${a.errs.length}/${n.errs.length} ${n.errs.slice(0, 1)}`);
      if (a.st !== n.st) { const A = a.st.split('\n'), N = n.st.split('\n'); A.forEach((x, i) => { if (x !== N[i]) console.log('   old:', x, '\n   new:', N[i]); }); } }
  console.log('differences or errors:', bad); await b.close(); })();
