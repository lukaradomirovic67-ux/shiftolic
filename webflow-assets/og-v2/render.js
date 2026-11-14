// Share images (1200x630) made from each page's real hero on staging: navbar, buttons and small text hidden,
// the Nues logo top-left, the headline larger. Rendered at 2x, then scaled down to 1200x630 by build.py.
const { chromium } = require('playwright');
const fs = require('fs');
const S = 'https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io';
const OUT = __dirname + '/raw/';
const only = process.argv[2];

// Common: hide navbar and Webflow badge; logo is added on top.
const BASE = `
.navbar2_component, .w-webflow-badge { display: none !important; }
#og-logo { position: fixed; left: 64px; top: 52px; z-index: 99999; height: 34px; }
#og-url { position: fixed; right: 64px; top: 58px; z-index: 99999; font: 500 20px/1 Aeonik, Arial, sans-serif; color: rgba(255,255,255,.72); letter-spacing: -.01em; }
html, body { overflow: hidden !important; }
`;

const P = [
  { k: 'home', path: '/', noUrl: true, css: `
      .section_home-hero .button, .home-hero_text-wrapper { display: none !important; }
      .home-hero_content { padding-top: 78px !important; }
      .section_home-hero h1 { font-size: 66px !important; line-height: 1.04 !important; width: 720px !important; max-width: none !important; }
      .section_home-hero h1 span { display: block; }
      .home-hero_badges { transform: scale(1.15); transform-origin: left center; margin-bottom: 26px !important; }` },
  { k: 'about', path: '/about', css: `
      .about-hero .hero_subtitle { display: none !important; }
      .about-hero h1 { font-size: 88px !important; }
      .about-hero .hero_pill { zoom: 1.3; margin-bottom: 18px !important; }` },
  { k: 'services', path: '/services', css: `
      .svc-hero .svc-hero_sub, .svc-hero .svc-btn, .svc-hero .svc-btn-outline { display: none !important; }
      .svc-hero h1 { font-size: 84px !important; }
      .svc-hero .svc-hero_pill { zoom: 1.3; }` },
  ...[
    ['design-development', 'Design & Development', 'Webflow design and development agency', -400],
    ['webflow-development', 'Webflow Development', 'Webflow development for your existing design', -230],
    ['seo-aeo', 'SEO & AEO', 'Webflow SEO and AEO agency', -230],
    ['growth', 'Growth', 'Ongoing Webflow team for your site', -400],
  ].map(([slug, name, line, dy]) => ({
    k: slug, path: '/services/' + slug, pill: 'Services', h1only: name, sub: line, css: `
      .svc-hero .svc-btn, .svc-hero .svc-btn-outline { display: none !important; }
      .svc-hero h1 { font-size: 104px !important; white-space: nowrap; max-width: none !important; width: auto !important; }
      .svc-hero .svc-hero_text { max-width: none !important; width: 1100px !important; }
      .svc-hero .svc-hero_sub { font-size: 30px !important; line-height: 1.3 !important; max-width: none !important; margin-top: 18px !important; }
      .svc-hero .svc-hero_content { margin-top: -30px; }
      .svc-hero_shapes { transform: translateY(${dy}px); }
      .svc-hero .svc-hero_pill { zoom: 1.3; }` })),
  { k: 'our-work', path: '/our-work', pill: 'Our work', css: `
      .ow-hero .hero_subtitle { display: none !important; }
      .ow-hero h1 { font-size: 88px !important; }
      .ow-hero .hero_pill { zoom: 1.3; }
      .ow-badges { zoom: 1.12; margin-top: 30px !important; }
      .ow-hero .container-large { margin-top: -70px !important; }` },
  { k: 'pricing', path: '/pricing', css: `
      .pr-hero .hero_subtitle { display: none !important; }
      .pr-hero h1 { font-size: 80px !important; max-width: none !important; width: 1100px !important; }
      .pr-hero .hero_pill { zoom: 1.3; }` },
  { k: 'lets-talk', path: '/lets-talk', css: `
      .lt-hero .hero_subtitle, .lt-booking { display: none !important; }
      .lt-hero_content { width: 900px !important; max-width: none !important; }
      .lt-hero h1 { font-size: 84px !important; }
      .lt-hero_content { margin-top: -40px !important; }
      .lt-quote { margin-top: 26px !important; width: 640px !important; }
      .lt-hero .hero_pill { zoom: 1.3; }` },
  { k: 'careers', path: '/careers', css: `
      .section_careers-hero .cta-v2_button { display: none !important; }
      .section_careers-hero h1 { font-size: 84px !important; }
      .section_careers-hero .hero_pill { zoom: 1.3; }`, shift: -70 },
  { k: 'blog', path: '/blog', css: `
      .ins-hero .hero_subtitle { display: none !important; }
      .ins-hero_top { margin-top: 110px !important; width: 520px !important; }
      .ins-hero h1 { font-size: 92px !important; line-height: 1 !important; }
      .ins-hero h1 span { display: block; }
      .ins-featured { position: fixed !important; left: 590px !important; top: 150px !important; width: 1100px !important; transform: scale(.5); transform-origin: 0 0; }` , split: true },
  { k: 'resources', path: '/resources', css: `
      .res-hero h1 { font-size: 84px !important; }
      .res-hero .hero_pill { zoom: 1.3; }
      .res-hero .container-large { margin-top: -60px !important; }` },
  { k: 'universal', path: '/', noUrl: true, universal: true, css: `
      .home-hero_component > *:not(.home-hero_background-image-wrapper), .home-hero_cards-wrapper { visibility: hidden !important; }
      #og-uni { position: fixed; inset: 0; z-index: 9999; display: flex; flex-direction: column; align-items: center; padding-top: 128px; text-align: center; }
      #og-uni .home-hero_badges { visibility: visible !important; opacity: 1 !important; transform: none !important; zoom: 1.15; margin: 0 0 26px !important; justify-content: center; }
      #og-uni h1 { visibility: visible !important; font-size: 64px !important; line-height: 1.04 !important; margin: 0 !important; opacity: 1 !important; transform: none !important; }
      #og-uni h1 span { display: block; }
      #og-mark { position: fixed; left: 50%; bottom: -150px; width: 1380px; height: 409px; transform: translateX(-50%); z-index: 9998;
        -webkit-mask: url(LOGO) center / contain no-repeat; mask: url(LOGO) center / contain no-repeat; opacity: .95; }
      #og-logo { display: none !important; }
      #og-uni { padding-top: 92px !important; }` },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const logo = 'https://cdn.prod.website-files.com/6aba6bc07d6279b4b561771f/6ada666dee36c2fe1acde09d_logo%20A3.svg';
  const b = await chromium.launch();
  for (const c of P.filter((c) => !only || c.k === only)) {
    const pg = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
    await pg.route(/googletagmanager|google-analytics|iclosed|challenges\.cloudflare|player\.vimeo/, (r) => r.abort());
    await pg.goto(S + c.path + '?og=' + Date.now(), { waitUntil: 'load', timeout: 60000 });
    await pg.waitForTimeout(2500);
    await pg.evaluate(({ css, logo, pill, h1, split, noUrl, sub, h1only, universal, shift }) => {
      const st = document.createElement('style');
      st.textContent = css;
      document.head.append(st);
      const img = document.createElement('img');
      img.id = 'og-logo';
      img.src = logo;
      document.body.append(img);
      const url = document.createElement('div');
      url.id = 'og-url';
      url.textContent = 'nues.agency';
      document.body.append(url);
      if (pill) document.querySelectorAll('h1')[0].closest('section').querySelectorAll('.hero_pill-text').forEach((t) => (t.textContent = pill));
      if (shift) document.querySelector('h1').parentElement.style.translate = '0 ' + shift + 'px';
      if (universal) {
        const box = document.createElement('div'); box.id = 'og-uni';
        const badges = document.querySelector('.home-hero_badges').cloneNode(true);
        const h = document.querySelector('h1').cloneNode(true);
        box.append(badges, h); document.body.append(box);
        const mark = document.createElement('div'); mark.id = 'og-mark';
        mark.style.background = 'linear-gradient(180deg, #8fe3c4 0%, #3fb489 45%, rgba(20,80,58,.0) 100%)';
        document.body.append(mark);
      }
      if (split) { const el = document.querySelector('h1 span'); if (el) el.innerHTML = el.textContent.replace(' ', '<br>'); }
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      if (noUrl) url.remove();
      if (sub) document.querySelector('h1').closest('section').querySelectorAll('.svc-hero_sub').forEach((t) => (t.textContent = sub));
      if (h1only) { const sp = document.querySelector('h1 span'); const el = document.querySelector('h1'); const cls = sp ? sp.className : 'text-gradient'; el.innerHTML = ''; const s2 = document.createElement('span'); s2.className = cls; s2.textContent = h1only; el.append(s2); }
      if (h1) {
        const el = document.querySelector('h1');
        const span = el.querySelector('span');
        const cls = span ? span.className : 'text-gradient is-green-white';
        el.innerHTML = '';
        el.append(h1[0], document.createElement('br'));
        const s = document.createElement('span');
        s.className = cls;
        s.textContent = h1[1];
        el.append(s);
      }
      window.scrollTo(0, 0);
    }, { css: BASE + c.css.replace(/LOGO/g, logo), logo, pill: c.pill, h1: c.h1, split: c.split, noUrl: c.noUrl, sub: c.sub, h1only: c.h1only, universal: c.universal, shift: c.shift });
    await pg.waitForTimeout(1800);
    await pg.screenshot({ path: OUT + c.k + '.png' });
    console.log('ok', c.k);
    await pg.close();
  }
  await b.close();
})();
