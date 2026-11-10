// SEO inventory crawl of the Nues staging site.
// For every URL: raw view (JavaScript off = what non-rendering crawlers and most AI bots see) and rendered view (JavaScript on = Google).
// Usage: node crawl-seo.js <seed-urls.json> <out-dir>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const [, , seedFile, outDir] = process.argv;

function norm(href) {
  try {
    const u = new URL(href, BASE);
    if (u.origin !== BASE) return null;
    u.hash = '';
    let p = u.pathname.replace(/\/+$/, '') || '/';
    return p + (u.search || '');
  } catch (e) { return null; }
}

const EXTRACT = () => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden'; };
  const meta = n => { const m = document.querySelector('meta[name="' + n + '"],meta[property="' + n + '"]'); return m ? (m.getAttribute('content') || '') : null; };
  const h = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  const imgs = [...document.querySelectorAll('img')];
  const links = [...document.querySelectorAll('a')].map(a => ({ href: a.getAttribute('href'), text: (a.textContent || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 80), cms: a.hasAttribute('data-cms-slug') }));
  const types = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    try {
      const walk = o => { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o['@type']) types.push([].concat(o['@type']).join('+')); if (o['@graph']) walk(o['@graph']); Object.values(o).forEach(v => { if (v && typeof v === 'object') walk(v); }); } };
      walk(JSON.parse(s.textContent));
    } catch (e) { types.push('INVALID_JSON'); }
  });
  const main = document.querySelector('main') || document.body;
  const clone = document.body.cloneNode(true);
  clone.querySelectorAll('script,style,noscript,svg,nav,.navbar2_component,footer,.footer-v2_component').forEach(n => n.remove());
  const text = (clone.textContent || '').replace(/\s+/g, ' ').trim();
  return {
    title: document.title, desc: meta('description'), ogTitle: meta('og:title'), ogDesc: meta('og:description'), ogImage: meta('og:image'),
    twCard: meta('twitter:card'), robots: meta('robots'), canonical: (document.querySelector('link[rel=canonical]') || {}).href || null,
    lang: document.documentElement.lang, h1: h.filter(x => x.tagName === 'H1').map(x => x.textContent.trim().replace(/\s+/g, ' ')),
    headings: h.map(x => x.tagName + ': ' + x.textContent.trim().replace(/\s+/g, ' ').slice(0, 90)),
    words: text ? text.split(' ').length : 0,
    imgCount: imgs.length, imgNoAlt: imgs.filter(i => !i.hasAttribute('alt')).map(i => (i.getAttribute('src') || '').split('/').pop().slice(0, 80)),
    imgEmptyAlt: imgs.filter(i => i.getAttribute('alt') === '').length,
    links, schema: types,
  };
};

(async () => {
  const seeds = JSON.parse(fs.readFileSync(seedFile, 'utf8')).map(norm).filter(Boolean);
  const browser = await chromium.launch();
  const rawCtx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const jsCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const queue = [...new Set(seeds)], seen = new Set(queue), out = {};
  while (queue.length) {
    const u = queue.shift();
    const rec = { url: u };
    try {
      const p = await rawCtx.newPage();
      const resp = await p.goto(BASE + u, { waitUntil: 'domcontentloaded', timeout: 60000 });
      rec.status = resp ? resp.status() : null;
      rec.finalUrl = norm(p.url());
      rec.raw = await p.evaluate(EXTRACT);
      await p.close();
      if (rec.status === 200) {
        const q = await jsCtx.newPage();
        await q.goto(BASE + u, { waitUntil: 'load', timeout: 60000 });
        await q.waitForTimeout(1500);
        const r = await q.evaluate(EXTRACT);
        rec.js = { h1: r.h1, links: r.links, schema: r.schema, words: r.words, title: r.title };
        await q.close();
        // discover more internal pages from both views
        for (const l of [...rec.raw.links, ...rec.js.links]) {
          const n = norm(l.href || '');
          if (!n || /\.(png|jpe?g|webp|avif|svg|pdf|mp4)$/i.test(n) || n.startsWith('/cdn-cgi')) continue;
          if (!seen.has(n) && seen.size < 200) { seen.add(n); queue.push(n); }
        }
      }
    } catch (e) { rec.error = e.message.slice(0, 200); }
    out[u] = rec;
    process.stdout.write((rec.status || 'ERR') + ' ' + u + '\n');
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'crawl.json'), JSON.stringify(out, null, 1));
})();
