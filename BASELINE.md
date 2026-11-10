# BASELINE: SEO, AEO i performanse (faza 0)

Datum: 10.11.2026 · Sajt: Nues (Webflow site `6aba6bc07d6279b4b561771f`)
Staging: https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io · Produkcija: nues.agency (nije povezan, ne diramo)

## 0. Kako je mereno i šta nedostaje

- **Lighthouse 13.6.0** (dodato 10.11.): svaka stranica mobilni i desktop × 3 merenja, medijana po Performance skoru. Instaliran uz npm
  `overrides` (`@puppeteer/browsers` 3.2.6), jer 3.2.7 vraća 404. Sirovi izveštaji: `reports/baseline/lighthouse/` (gzip, bez ugrađenih
  screenshotova), pregled: `reports/baseline/lighthouse-summary.json`. Rezultati su u odeljku 3a.
- Pre Lighthouse-a su težina stranice, broj zahteva, raspodela po tipu, LCP element i CLS izmereni Playwright-om (Chromium,
  bez throttlinga, keš isključen). **Bajtovi i LCP element su pouzdani; LCP/CLS u ms su orijentacioni, nisu Lighthouse vrednosti.**
  Sirovi podaci: `reports/baseline/perf-probe.json`.
- Mreža ovog okruženja blokira: Google Tag Manager, `webflow-files-prod.global.ssl.fastly.net` (Caveat font), cdnjs (three.js na
  Careers, matter.js na 404), iClosed (kalendar na Let's talk), Cloudflare Turnstile, Vimeo, googleapis (PageSpeed/CrUX API).
  Sve što koriste ti domeni nije uračunato, pa su stvarne stranice teže i sporije od izmerenog.
- CrUX (podaci pravih korisnika) za nues.agency nije dostupan iz ovog okruženja. Na staging (webflow.io) CrUX ne postoji.
- Crawl: 50 adresa (17 statičnih + utility, 21 blog post, 11 case studija), svaka u dve varijante: sirovi HTML bez JavaScripta
  (kako ga vide crawleri koji ne renderuju, uključujući većinu AI botova) i renderovan sa JavaScriptom (kako ga vidi Google).
  Sitemap ne postoji na stagingu (`/sitemap.xml` → 404), pa su adrese prikupljene iz linkova. Pun inventar: `inventory.csv`.

## 1. Inventar sajta

| Šta | Stanje |
|---|---|
| Stranice | 30 u Webflow-u: 15 statičnih (+ 404, 401, Style Guide u draftu), 11 CMS šablona. Javni šabloni: Blogs (`/blog/…`) i Our Works (`/our-work/…`); ostali šabloni vraćaju 404 |
| CMS | 11 kolekcija, 129 stavki: Blogs 22 (20 živih), Our Works 11 (10 živih), Faqs 62, Hero Cards 9, Teams 7, Services Nues 4, Jobs 4, Insights categories 4, Integrations categories 5, Integrations 1, Case team 0 |
| Lokalizacija | Nema (samo engleski, `lang="en"`) |
| Asseti | 699, bez foldera |
| Custom kod | Site head 49.223 / footer 47.176 znakova (limit 50.000, skoro pun). Page kod na 26 stranica, najveći: Careers 36k/24k, About 27k/38k, Services 23k/30k, Our Work 13k/28k. 1 registrovana skripta (`NuesCmsDerived`, site footer) |
| Forme | 4: Careers application (sa CV uploadom), Work Filters (filter na Our Work, nije prava forma), 2 zaostale forme na Style Guide stranici (draft) |
| Fontovi | 11 custom: Aeonik 7 težina (.otf), Aeonik Air (.otf), Aeonikvf (.ttf, variable), Bricolage Grotesque Bold, Caveat Medium (.woff2). Plus Google Fonts preko webfont.js: Geist (7 težina) i Instrument Serif |
| Treće strane | GA4 (G-NNTMD9FV5D, preko Webflow integracije), jQuery i GSAP (Webflow), iClosed (Let's talk), Vimeo (video popup), Cloudflare Turnstile (forme), Finsweet Attributes (Our Work), three.js (Careers), matter.js (404), videi iz GitHub repoa preko jsDelivr (Our Work slider) |
| robots.txt (staging) | `User-agent: * / Disallow: /` (ispravno za staging) |
| Bekap | `backup/`: SEO polja stranica, JSON-LD, sav custom kod (proveren doslovno prema objavljenom HTML-u), CMS šeme i SEO polja svih stavki, snimak HTML-a svih adresa |

## 2. SEO pregled po stranici (sirovi HTML)

Reči se broje bez navigacije i footera. „Ulazni linkovi“: broj drugih stranica koje linkuju na ovu, bez JS / sa JS.

| Stranica | Title (zn.) | Desc (zn.) | H1 | Reči | Canonical | Robots | og:image | Schema (sirovi HTML) | Ulazni linkovi bez JS / sa JS |
|---|---|---|---|---|---|---|---|---|---|
| / | 62 | 169 | 1 | 508 | ne | - | ne | ContactPoint ImageObject Offer OfferCatalog Organization Service | 48 / 46 |
| /about | 48 | 148 | 1 | 333 | ne | - | ne | AboutPage ImageObject Organization Person Place | 48 / 46 |
| /services | 60 | 141 | 1 | 569 | ne | - | ne | - | 48 / 46 |
| /services/design-development | 44 | 132 | 1 | 430 | ne | - | ne | Offer OfferCatalog Organization PriceSpecification Service WebPage | 48 / 46 |
| /services/webflow-development | 58 | 144 | 1 | 430 | ne | - | ne | Offer OfferCatalog Organization Service WebPage | 48 / 46 |
| /services/seo-aeo | 33 | 148 | 1 | 435 | ne | - | ne | - | 48 / 46 |
| /services/growth | 41 | 149 | 1 | 430 | ne | - | ne | Offer OfferCatalog Organization Service WebPage | 48 / 46 |
| /our-work | 46 | 136 | 1 | 158 | ne | - | ne | CollectionPage CreativeWork Organization Thing | 48 / 46 |
| /pricing | 14 | 145 | 1 | 554 | ne | - | ne | - | 48 / 46 |
| /lets-talk | 44 | 134 | 1 | 84 | ne | - | ne | ContactPage ContactPoint ImageObject Offer Organization Person Rating Review Service | 48 / 46 |
| /careers | 39 | 163 | 1 | 209 | ne | - | ne | - | 48 / 46 |
| /blog | 48 | 104 | 1 | 499 | ne | - | ne | - | 48 / 46 |
| /resources | 57 | 118 | 1 | 163 | ne | noindex | ne | - | 48 / 46 |
| /webflow-integrations | 46 | 116 | 1 | 224 | ne | - | ne | - | 48 / 46 |
| /privacy-policy | 21 | 141 | 1 | 220 | ne | noindex | ne | - | 46 / 46 |
| /terms-of-service | 23 | 158 | 1 | 396 | ne | noindex | ne | - | 46 / 46 |
| /our-work/ballerine (šablon Our Works) | 52 | 149 | 1 | 489 | ne | - | da | Article ImageObject Organization | 7 / 9 |
| /blog/aeo-tools-… (šablon Blogs) | 48 | 127 | 1 | 2238 | ne | - | da | BlogPosting ImageObject Organization Person | 2 / 21 |

Ostalih 32 adresa (blog postovi i case studije) su u `inventory.csv`.

## 3. Performanse (Playwright, bez throttlinga, nije Lighthouse)

Mobilni = Pixel 5 emulacija. Cilj iz zadatka: < 1,5 MB za Home. *LCP i CLS bez throttlinga, samo orijentaciono.

| Stranica | Mobilni: KB / zahtevi | Slike KB | JS KB | CSS KB | Fontovi KB | LCP element (mobilni) | LCP ms* | CLS* | Desktop: KB / zahtevi |
|---|---|---|---|---|---|---|---|---|---|
| / | 3.362 / 70 | 2.442 | 385 | 176 | 225 | `img.home-hero_bg-image` | 796 | 0.004 | 3.374 / 74 |
| /about | 1.798 / 43 | 873 | 385 | 176 | 223 | `h1.heading-style-h1.text-color-white` | 2056 | 0.004 | 1.981 / 46 |
| /services | 1.216 / 59 | 293 | 385 | 176 | 225 | `h1.heading-style-h1.text-color-white` | 2040 | 0 | 1.060 / 59 |
| /services/design-development | 2.232 / 50 | 1.322 | 385 | 176 | 225 | `h1.heading-style-h1.text-color-white` | 1916 | 0 | 2.425 / 51 |
| /services/webflow-development | 2.145 / 49 | 1.322 | 385 | 89 | 226 | `h1.heading-style-h1.text-color-white` | 2120 | 0 | 2.425 / 51 |
| /services/seo-aeo | 2.232 / 50 | 1.323 | 385 | 176 | 226 | `h1.heading-style-h1.text-color-white` | 2108 | 0 | 2.513 / 52 |
| /services/growth | 2.233 / 50 | 1.323 | 385 | 176 | 226 | `h1.heading-style-h1.text-color-white` | 2000 | 0 | 2.425 / 51 |
| /our-work | 3.893 / 70 | 2.985 | 464 | 89 | 225 | `h1.heading-style-h1.text-color-white` | 1888 | 0 | 3.886 / 67 |
| /pricing | 859 / 27 | 15 | 385 | 176 | 164 | `h1.heading-style-h1.text-color-white` | 1956 | 0.004 | 868 / 29 |
| /lets-talk | 956 / 30 | 120 | 389 | 176 | 164 | `h1.heading-style-h1.text-color-white` | 1964 | 0.004 | 963 / 30 |
| /careers | 1.056 / 29 | 186 | 390 | 176 | 164 | `span.btn-shift_text` | 2664 | 0 | 1.208 / 33 |
| /blog | 1.460 / 51 | 729 | 418 | 89 | 164 | `img.image-cover` | 2112 | 0 | 1.522 / 50 |
| /resources | 4.717 / 62 | 3.958 | 385 | 89 | 164 | `h1.heading-style-h1.text-color-white` | 404 | 0 | 4.744 / 69 |
| /webflow-integrations | 870 / 37 | 122 | 385 | 89 | 164 | `p.hero_subtitle.is-medium` | 1820 | 0.004 | 898 / 37 |
| /privacy-policy | 852 / 24 | 19 | 385 | 176 | 164 | `p` | 1908 | 0 | 847 / 22 |
| /terms-of-service | 754 / 21 | 8 | 385 | 89 | 164 | `p` | 1676 | 0.004 | 849 / 22 |
| /our-work/ballerine (šablon Our Works) | 2.005 / 33 | 1.156 | 385 | 176 | 164 | `h1.heading-style-h1.text-color-white` | 2072 | 0.004 | 2.107 / 35 |
| /blog/aeo-tools-… (šablon Blogs) | 951 / 25 | 89 | 385 | 176 | 164 | `img.image-cover` | 616 | 0.004 | 870 / 24 |

Na svakoj stranici se učitavaju i:
- zajednički CSS od 565 KB nekompresovano (87 KB preneto);
- Webflow JS chunkovi od oko 600 KB nekompresovano, jQuery 87 KB i GSAP 71 KB;
- GA skripta od 557 KB nekompresovano (186 KB preneto);
- fontovi: Aeonik .otf (3 × ~155 KB), Geist i Instrument Serif.

Najteži fajlovi (top 10):

| KB | Fajl | Gde |
|---|---|---|
| 1.024 | svc-case-ballerine-home-full.webp | servisne stranice (Service Cases) |
| 1.024 | ballerine-home-full.webp | Home, Our Work |
| 802 | veyor-home-full-v2.avif | Our Work, Resources |
| 686 | intaker-home-full-v2.webp | Resources |
| 591 | shiftolic-home-full-v2.webp | Home, Our Work, Resources |
| 576 | trakpro-home-full-v2.webp | Our Work, Resources |
| 513 | harper-home-full-hq.webp | Our Work, Resources |
| 437 | hypersonix-home-full-hq.webp | Our Work, Resources |
| 432 | svc-case-shiftolic-home-full.webp | servisne stranice |
| 244 | about-raw-19.png | About |

Ovo su screenshotovi celih sajtova klijenata, za skrol na hover. Imaju `loading="lazy"`, ali se ipak učitavaju odmah,
jer su u sliderima i karticama blizu vrha stranice.

## 3a. Lighthouse (mobilni i desktop)

Napomene:
- SEO je 66 na svim stranicama samo zbog `is-crawlable`: staging namerno zabranjuje indeksiranje. Ostale SEO provere prolaze.
- Best Practices gubi bodove na „errors in console“. Te greške delom potiču od domena koje ovo okruženje blokira (GTM, fontovi, cdnjs).
- Rasipanje između merenja je veliko (npr. Home 49/56/83). Zato je uzeta medijana, ali pojedinačne brojke treba čitati sa rezervom.

**Mobilni** (medijana od 3 merenja; Performance svih merenja u zagradi)

| Stranica | Perf | A11y | BP | SEO | LCP | TBT | CLS | FCP | Speed Index | Težina | Zahtevi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| / | 56 (49/56/83) | 100 | 96 | 66 | 7.2 s | 234 ms | 0.000 | 5.7 s | 6.8 s | 1.246 KB | 66 |
| /about | 60 (60/60/65) | 100 | 96 | 66 | 7.2 s | 110 ms | 0.000 | 5.6 s | 6.1 s | 1.183 KB | 42 |
| /services | 60 (59/60/64) | 95 | 96 | 66 | 7.1 s | 111 ms | 0.001 | 5.5 s | 6.2 s | 939 KB | 55 |
| /services/design-development | 60 (59/60/60) | 95 | 96 | 66 | 7.2 s | 114 ms | 0.001 | 5.6 s | 6.5 s | 923 KB | 50 |
| /services/webflow-development | 60 (58/60/65) | 95 | 96 | 66 | 7.2 s | 121 ms | 0.000 | 5.6 s | 6.6 s | 923 KB | 50 |
| /services/seo-aeo | 62 (59/62/63) | 95 | 96 | 66 | 7.3 s | 66 ms | 0.001 | 5.5 s | 5.5 s | 923 KB | 50 |
| /services/growth | 61 (58/61/65) | 95 | 96 | 66 | 7.2 s | 133 ms | 0.000 | 5.6 s | 5.6 s | 923 KB | 50 |
| /our-work | 59 (52/59/61) | 90 | 92 | 66 | 8.9 s | 144 ms | 0.011 | 6.1 s | 6.1 s | 1.333 KB | 72 |
| /pricing | 61 (61/61/63) | 100 | 96 | 66 | 6.8 s | 83 ms | 0.000 | 5.6 s | 6.3 s | 762 KB | 33 |
| /lets-talk | 63 (61/63/66) | 94 | 96 | 66 | 6.8 s | 49 ms | 0.000 | 5.3 s | 5.3 s | 766 KB | 32 |
| /careers | 61 (56/61/61) | 98 | 96 | 66 | 7.8 s | 104 ms | 0.000 | 5.4 s | 5.4 s | 936 KB | 33 |
| /blog | 62 (62/62/62) | 92 | 96 | 66 | 7.2 s | 67 ms | 0.000 | 5.4 s | 5.4 s | 1.009 KB | 55 |
| /resources | 40 (40/40/65) | 96 | 96 | 66 | 5.4 s | 1550 ms | 0.000 | 5.4 s | 5.4 s | 3.986 KB | 44 |
| /webflow-integrations | 63 (63/63/67) | 98 | 96 | 66 | 6.6 s | 86 ms | 0.015 | 5.2 s | 5.2 s | 792 KB | 40 |
| /privacy-policy | 66 (64/66/68) | 97 | 96 | 66 | 5.6 s | 254 ms | 0.003 | 3.8 s | 3.8 s | 746 KB | 25 |
| /terms-of-service | 66 (64/66/67) | 97 | 96 | 66 | 6.7 s | 237 ms | 0.003 | 3.0 s | 3.6 s | 748 KB | 25 |
| /our-work/ballerine (šablon Our Works) | 56 (47/56/61) | 95 | 92 | 66 | 12.0 s | 445 ms | 0.009 | 2.9 s | 4.5 s | 1.800 KB | 33 |
| /blog/aeo-tools-… (šablon Blogs) | 61 (58/61/62) | 98 | 96 | 66 | 7.0 s | 225 ms | 0.003 | 4.5 s | 5.0 s | 810 KB | 39 |

**Desktop** (medijana od 3 merenja; Performance svih merenja u zagradi)

| Stranica | Perf | A11y | BP | SEO | LCP | TBT | CLS | FCP | Speed Index | Težina | Zahtevi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| / | 85 (85/85/86) | 96 | 96 | 66 | 2.1 s | 10 ms | 0.001 | 1.2 s | 1.6 s | 1.628 KB | 71 |
| /about | 87 (86/87/89) | 96 | 96 | 66 | 2.0 s | 0 ms | 0.001 | 1.1 s | 1.4 s | 1.294 KB | 42 |
| /services | 88 (87/88/89) | 91 | 96 | 66 | 1.9 s | 0 ms | 0.002 | 1.2 s | 1.5 s | 939 KB | 56 |
| /services/design-development | 88 (87/88/89) | 95 | 96 | 66 | 1.9 s | 0 ms | 0.002 | 1.1 s | 1.5 s | 923 KB | 50 |
| /services/webflow-development | 87 (86/87/87) | 95 | 96 | 66 | 1.9 s | 0 ms | 0.002 | 1.2 s | 1.6 s | 924 KB | 50 |
| /services/seo-aeo | 88 (86/88/88) | 95 | 96 | 66 | 1.8 s | 0 ms | 0.002 | 1.2 s | 1.6 s | 923 KB | 50 |
| /services/growth | 87 (86/87/88) | 95 | 96 | 66 | 2.0 s | 0 ms | 0.002 | 1.2 s | 1.5 s | 923 KB | 50 |
| /our-work | 83 (81/83/83) | 90 | 92 | 66 | 2.4 s | 7 ms | 0.002 | 1.2 s | 1.6 s | 1.668 KB | 68 |
| /pricing | 87 (86/87/88) | 96 | 96 | 66 | 1.9 s | 0 ms | 0.002 | 1.4 s | 1.4 s | 763 KB | 34 |
| /lets-talk | 88 (88/88/90) | 90 | 96 | 66 | 1.9 s | 0 ms | 0.001 | 1.3 s | 1.3 s | 860 KB | 36 |
| /careers | 90 (88/90/91) | 91 | 96 | 66 | 1.6 s | 0 ms | 0.001 | 1.3 s | 1.4 s | 1.080 KB | 37 |
| /blog | 88 (86/88/88) | 92 | 96 | 66 | 1.8 s | 0 ms | 0.001 | 1.3 s | 1.4 s | 1.434 KB | 53 |
| /resources | 83 (81/83/87) | 92 | 96 | 66 | 1.1 s | 295 ms | 0.002 | 1.1 s | 1.3 s | 4.640 KB | 48 |
| /webflow-integrations | 90 (90/90/91) | 95 | 96 | 66 | 1.5 s | 0 ms | 0.001 | 1.3 s | 1.3 s | 792 KB | 40 |
| /privacy-policy | 90 (90/90/90) | 93 | 96 | 66 | 1.7 s | 0 ms | 0.001 | 1.2 s | 1.2 s | 746 KB | 25 |
| /terms-of-service | 89 (88/89/90) | 93 | 96 | 66 | 1.6 s | 0 ms | 0.001 | 1.4 s | 1.4 s | 747 KB | 25 |
| /our-work/ballerine (šablon Our Works) | 80 (74/80/82) | 91 | 92 | 66 | 2.7 s | 45 ms | 0.024 | 1.3 s | 1.5 s | 1.897 KB | 35 |
| /blog/aeo-tools-… (šablon Blogs) | 88 (82/88/89) | 96 | 96 | 66 | 1.7 s | 0 ms | 0.001 | 1.4 s | 1.4 s | 857 KB | 33 |

**Šta najviše usporava (mobilni, zbir procenjenih ušteda preko 18 stranica):**

| Problem | Stranice | Ušteda | Detalj |
|---|---|---|---|
| Render-blocking zahtevi | 18/18 | ~1,5 s po stranici | zajednički Webflow CSS (89 KB preneto, ~1,5 s) i `webfont.js` za Google Fonts (~0,9 s) |
| Neiskorišćen JavaScript | 18/18 | ~0,9 s, 2,4 MB ukupno | GA/Google tag (79 KB), Webflow chunk (59 KB) |
| Neiskorišćen CSS | 18/18 | ~0,5 s, 1,4 MB ukupno | jedan zajednički CSS za ceo sajt (565 KB nekompresovano) |
| Isporuka slika | Home, Our Work, Resources | ~1,7 s po stranici | screenshotovi celih sajtova (0,4–1 MB) |
| Neminifikovan CSS | 18/18 | ~0,2 s | uključiti minifikaciju u podešavanjima sajta |
| Glavna nit (TBT) | 11 | | Resources 1,5 s, Ballerine case 0,45 s, Home 0,23 s |

LCP element na Home je hero slika (`home-hero_bg-image`). Već je `loading="eager"` i `fetchpriority="high"`, pa kasni zbog CSS-a i fontova
koji blokiraju iscrtavanje. Na servisnim stranicama i ostalima LCP je H1 tekst.

**Pristupačnost (padovi na Lighthouse proverama):**
- `target-size` i `label-content-name-mismatch` padaju na svih 18 stranica (male mete za dodir, aria-label koji se ne poklapa sa vidljivim tekstom);
- `landmark-one-main` na 13 stranica (nema `<main>`);
- `color-contrast` na 10;
- `aria-required-children` na Blog i Our Work;
- `heading-order` na pravnim stranicama.

## 4. Top 15 problema po uticaju

| # | Problem | Uticaj | Gde |
|---|---|---|---|
| 1 | **Nema sitemap.xml ni canonical taga.** Nijedna od 48 živih stranica nema `<link rel="canonical">`, a sitemap ne postoji. Na produkciji je obavezno uključiti oba (global canonical + auto sitemap), inače su moguće www/non-www i webflow.io duplikate | Visok | ceo sajt (podešavanje sajta, ručno) |
| 2 | **Linkovi ka CMS stavkama u sirovom HTML-u su `#`.** Liste na Blog i Resources dobijaju pravu adresu tek JavaScriptom. Bez JS-a blog postovi imaju 1–7 ulaznih linkova, sa JS-om 21+. AI crawleri (GPTBot, ClaudeBot, PerplexityBot) ne izvršavaju JS i ne vide put do postova | Visok (AEO) | /blog, /resources, Resources dropdown |
| 3 | **5 praznih case stranica je javno i indeksabilno**: prazan `<title>` i meta description, oko 40 reči, Article schema. Linkuje ih Our Work mreža | Visok | /our-work/intaker, harper, biotech-innovations, lasalle-agri, hypersonix |
| 4 | **Prevelike stranice**: Home 3,4 MB, Our Work 3,9 MB, Resources 4,7 MB (cilj < 1,5 MB). Glavni uzrok: screenshotovi celih sajtova od 400 KB do 1 MB koji se učitavaju odmah | Visok (LCP, podaci na mobilnom) | Home, Our Work, Resources, servisne |
| 5 | **Fontovi**: Aeonik kao .otf (3 × ~155 KB na svakoj stranici), Geist sa 7 težina preko webfont.js (JS loader koji kasni sa tekstom), plus Instrument Serif. 3 do 5 porodica po stranici | Srednje-visok (FCP/LCP, CLS) | ceo sajt |
| 6 | **Nema og:image** ni na jednoj statičnoj stranici, a 6 stranica nema twitter:card. Deljeni linkovi nemaju sliku | Srednji | 17 stranica |
| 7 | **Strukturirani podaci nepotpuni**: 10 stranica bez schema (Blog, Careers, Pricing, Resources, Services, SEO & AEO, Webflow Integrations, pravne); neispravan JSON-LD na „Webflow vs WordPress…“ (CMS polje sa novim redom); Article schema i na praznim case stranicama; nema BreadcrumbList ni FAQPage, iako FAQ postoji na 6 stranica | Srednji (rich results, AEO) | vidi kolonu Schema |
| 8 | **Resources ima `noindex`** (u kodu stranice), kao i Privacy i Terms. Za pravne je to namerno, za Resources je odluka | Srednji | /resources |
| 9 | **Site custom kod je skoro pun** (head 49,2k i footer 47,2k od 50k). Nema mesta za site-wide schema ili skripte za performanse dok se kod ne preraspodeli | Srednji (blokira faze 3–4) | site settings |
| 10 | **Velik JS i CSS na svakoj stranici**: oko 385 KB JS preneto (Webflow chunkovi, jQuery, GSAP, GA) i 565 KB CSS nekompresovano. CSS blokira renderovanje | Srednji (TBT/FCP) | ceo sajt |
| 11 | **Mobilni overflow**: sekcija sa prstenovima širi stranicu na telefonu (Services, 4 servisne, Our Work). Ne prolazi „mobile friendly“ proveru horizontalnog skrola | Srednji | 6 stranica |
| 12 | **Stare adrese servisa vraćaju 404** (`/services/main`, `/services/nues-launch`, `nues-build`, `nues-plus`, `nues-seo`). Nema 301; API za preusmeravanja nije dostupan na ovom planu | Srednji (na lansiranju) | ručno |
| 13 | **Dužine meta polja**: Home title 62 znaka i description 169; Careers description 163; 2 bloga sa title > 60; Pricing title 14 znakova („Pricing \| Nues“); 5 description < 120 | Nizak-srednji | vidi tabelu |
| 14 | **Malo teksta na ključnim stranicama** za AEO: Let's talk 84 reči, Our Work 158, Resources 163, Careers 209 (bez nav/footera) | Nizak-srednji | 4 stranice |
| 15 | **Neproverene skripte trećih strana**: iClosed, Turnstile, three.js, matter.js, Vimeo, GTM nisu izmereni zbog mreže. Videi u Our Work slideru zavise od javnog GitHub repoa | Nepoznat | Let's talk, Careers, 404, Our Work |

LCP element je na većini stranica H1 tekst, što je dobro, jer ne čeka sliku. Na Home i blog postovima LCP je hero slika
(`home-hero-bg-v3-hq`, `insights-hero-bg`). Na Careers je LCP tekst dugmeta, jer je H1 animiran.
