// Every <a href> on every page: visible text, accessible name, destination. Flags generic or empty link text.
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const paths = fs.readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean);
// Lighthouse link-text blocklist (English) + common generic phrases
const LH = ['click here','click this','go','here','information','learn more','more','more info','more information','right here','read more','see more','start','this','click','learn','link','continue','details','view more'];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const out = [];
  for (const path of paths) {
    const p = await ctx.newPage();
    await p.goto(BASE + path + (path.includes('?') ? '&' : '?') + 'lk=1', { waitUntil: 'load' });
    await p.waitForTimeout(1500);
    const links = await p.evaluate(() => {
      function accName(a) {
        if (a.getAttribute('aria-labelledby')) { const t = a.getAttribute('aria-labelledby').split(/\s+/).map(id => (document.getElementById(id) || {}).textContent || '').join(' ').trim(); if (t) return t; }
        if (a.getAttribute('aria-label')) return a.getAttribute('aria-label').trim();
        // text content excluding aria-hidden subtrees, including img alt
        function txt(n) { if (n.nodeType === 3) return n.textContent; if (n.nodeType !== 1) return ''; if (n.getAttribute('aria-hidden') === 'true') return ''; if (n.tagName === 'IMG') return n.getAttribute('alt') || ''; if (n.tagName === 'SVG' || n.tagName === 'svg') { const t = n.querySelector('title'); return t ? t.textContent : ''; } let s = ''; n.childNodes.forEach(c => s += ' ' + txt(c)); return s; }
        const t = txt(a).replace(/\s+/g, ' ').trim(); if (t) return t;
        return (a.getAttribute('title') || '').trim();
      }
      return [...document.querySelectorAll('a[href]')].map(a => {
        const r = a.getBoundingClientRect(); const cs = getComputedStyle(a);
        const inNav = !!a.closest('.navbar2_component,nav'); const inFooter = !!a.closest('footer,.footer-v2_component,[class*="footer"]');
        return { text: (a.innerText || '').replace(/\s+/g, ' ').trim(), raw: (a.textContent || '').replace(/\s+/g, ' ').trim(), name: accName(a), aria: a.getAttribute('aria-label'), href: a.getAttribute('href'), cls: (a.className || '').toString().split(' ')[0], visible: !!(r.width || r.height) && cs.visibility !== 'hidden' && cs.display !== 'none', hiddenAria: !!a.closest('[aria-hidden="true"]'), nav: inNav, footer: inFooter, tabindex: a.getAttribute('tabindex') };
      });
    });
    links.forEach(l => out.push({ page: path, ...l }));
    await p.close();
  }
  fs.writeFileSync(process.argv[3], JSON.stringify(out));
  console.log('links', out.length);
  await b.close();
})();
