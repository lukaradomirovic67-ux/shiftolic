# BASELINE: SEO, AEO i performanse (faza 0)

Datum: 10.11.2026 · Sajt: Nues (Webflow site `6aba6bc07d6279b4b561771f`)
Staging: https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io · Produkcija: nues.agency (nije povezan, ne diramo)

## 0. Kako je mereno i šta nedostaje

- **Lighthouse nije pokrenut.** `npm` ne može da instalira Lighthouse 13.6.0 ni 13.5.0: zavisnost `@puppeteer/browsers@3.2.7`
  vraća 404 iz npm registra. Po pravilu „dva neuspeha → stop“ nisam dalje pokušavao. Kolone Performance/Accessibility/
  Best Practices/SEO skor i TBT/INP su zato prazne dok se ne izabere rešenje (vidi QUESTIONS.md, pitanje 1).
- Umesto toga su težina stranice, broj zahteva, raspodela po tipu, LCP element i CLS izmereni Playwright-om (Chromium,
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
