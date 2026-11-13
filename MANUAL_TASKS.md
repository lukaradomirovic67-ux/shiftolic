# MANUAL_TASKS (radi se ručno u Webflow-u, Search Console-u i GA4)

Ažurirano: 10.11.2026 (faza 0). Webflow API na ovom planu ne može: 301 preusmeravanja i robots.txt (samo Enterprise,
greška `not_enterprise_plan_site`), sitemap kontrole po stranici (403) i podešavanja sajta (global canonical, auto sitemap).
Putanje u meniju proverite u trenutnom Webflow interfejsu. Nazivi se ponekad menjaju.

## Pri lansiranju (domen se sada NE povezuje)
1. **Plaćeni site plan.** Bez njega nema custom domena, sitemap-a ni uklanjanja „Made in Webflow“ bedža.
2. **Site settings → SEO → Global canonical tag URL**: upisati izabrani domen (QUESTIONS 7). Tek tada svaka stranica dobija
   self-referencing canonical. Sada nijedna stranica nema canonical.
3. **Site settings → SEO → Sitemap → Auto-generate sitemap**: uključiti.
4. **Site settings → SEO → Indexing**: na webflow.io subdomenu ostaviti zabranu indeksiranja (sada `Disallow: /`, ispravno).
   Za produkciju: robots.txt koji dozvoljava indeksiranje i navodi sitemap.
5. **Site settings → Publishing → 301 redirects**, dodati:
   | Stara adresa | Nova adresa |
   |---|---|
   | /services/main | /services |
   | /services/nues-launch | /services/design-development |
   | /services/nues-build | /services/webflow-development |
   | /services/nues-plus | /services/growth |
   | /services/nues-seo | /services/seo-aeo |
   Plus adrese starog sajta kad stigne spisak (QUESTIONS 8).
6. **Google Search Console**: verifikacija domena (DNS TXT), slanje sitemap-a. **Bing Webmaster Tools**: uvoz iz GSC-a.

## Sada (van SEO faza)
7. **[ODLOŽENO 12.11.: integracije su u draftu dok se ne napišu]** **Uključiti stranice pojedinačnih integracija** (`/integrations/<slug>`). Šablon „Integrations Template“ postoji i nije draft,
   ali ga Webflow ne objavljuje (`shouldPublish: false`), pa je /integrations/webflow-salesforce-integration na stagingu 404.
   Linkovi „See the case studies“ na karticama Webflow Integrations stranice vode tamo. API ovo podešavanje ne menja.
   Klik-putanja (proverite nazive u trenutnom interfejsu):
   - Designer → **CMS** panel → kolekcija **Integrations** → ikonica podešavanja (zupčanik) → opcija za collection/template
     stranice (**Collection pages / Template page**) → uključiti → Save.
   - Ako tamo nije: **Pages** panel → **CMS Collection pages → Integrations Template** → zupčanik → proveriti da stranica nije
     isključena iz objave.
   - Zatim Publish samo na webflow.io i otvoriti /integrations/webflow-salesforce-integration (treba 200, ne 404).
   Napomena: Salesforce stavka nema napisan sadržaj (polje Content), pa će stranica biti skoro prazna dok se vodič ne napiše.

## SEO korak 3, brzina na mobilnom (dodato 13.11.)
Fajlovi su u repou, u `webflow-assets/perf/manual/`, a dobio si ih i kao zip. Sve se radi na staging-u.
Nazive menija proverite u trenutnom Webflow interfejsu.

8. **[PRESKOČENO 13.11., tvoja odluka: ne radimo]** **Fontovi: ukloniti Google skriptu koja blokira prikaz** (`webfont.js`, plus još dva Google servera na svakoj stranici).
   - **Site settings → Fonts → Custom fonts → Upload**: `fonts/Geist-Variable-latin.woff2`.
     - Ime porodice (family) mora biti tačno **Geist**.
     - Ako Webflow pita za težine, to je promenljiv font 100–900, stil Normal.
     - Font display: **Swap**.
   - Tek zatim, u istom tabu, u delu **Google Fonts** ukloniti **Geist** i **Instrument Serif**.
     - Instrument Serif se ne koristi ni u jednom tekstu na sajtu, a sada se preuzima na svakoj stranici.
   - Save, pa mi javi „fontovi gotovi“. Ja proverim:
     - da u HTML-u više nema `webfont.js`;
     - da je tekst isti do piksela (lokalni test sa ovim fajlom je to već pokazao na 4 stranice);
     - i onda objavim.
   - Geist je pod licencom SIL OFL 1.1 (dozvoljeno samostalno hostovanje). Licenca je u `fonts/Geist-OFL-LICENSE.txt`.
9. **Service Cases, dve teške slike** (na sve 4 servisne stranice):
   - `svc-case-ballerine-home-full` je 1.023 KB, a nova `images/svc-case-ballerine-home-full-1200.webp` ima 450 KB.
   - `svc-case-shiftolic-home-full` je 431 KB, a nova `images/svc-case-shiftolic-home-full-1200.webp` ima 242 KB.
   - Izgled je isti (1200 px je i dalje 2× najšira veličina prikaza).
   - Dovoljno je da ih ubaciš u **Assets** panel i javiš mi. Ja ih zamenim u 6 okvira (po 3 u Ballerine i Shiftolic redu) i objavim.
   - Webflow API ne dozvoljava da ja upload-ujem fajl.
10. **LaSalle Agri, „Full page screenshot“**:
    - Webflow je odbio izmenu preko API-ja dva puta („Missing fields“, bez objašnjenja).
    - CMS → **Our Works** → **LaSalle Agri** → polje **Full page screenshot** → zameni sliku sa `images/lasalle-home-full-hq-1200.webp` (594 KB umesto 1.019 KB) → Save.
    - Alt tekst ostaje „LaSalle Agri home page“.
11. **[PRESKOČENO 13.11., tvoja odluka: ne radimo]** **Site settings → Publishing → Advanced publishing options**: uključiti **Minify HTML**, **Minify CSS** i **Minify JS** → Save.
    - Glavni CSS sajta (581 KB) sada nije minifikovan.
    - Posle sledeće objave proveravam da se ništa nije promenilo.
12. **Aeonik u WOFF2** (vidi QUESTIONS 18): ako postoje WOFF2 fajlovi iz licence, upload-ovati ih umesto `.otf` za težine 300, 400, 500 i 600, pod istim imenom porodice **Aeonik**.

## SEO korak 4, tehnički SEO (dodato 13.11.)
13. **Slike za deljenje (og:image)**: pravi ih dizajner (tvoja odluka 13.11.). Moji predlozi u `notes/og-predlozi-2026-11-13.png` su samo referenca. Kad budu gotove:
    - ubaciti 13 fajlova iz `webflow-assets/perf/manual/og/` u **Assets** panel i javiti mi;
    - ja ih vezujem za stranice preko API-ja (Open Graph image) i dodajem `twitter:card` gde nedostaje.
14. **[URAĐENO 13.11., provereno na stagingu]** **Linkovi ka blog postovima u sirovom HTML-u** (sada `href="#"`; posetiocima ih ispravlja skripta, a crawleri bez JavaScript-a ih ne vide):
    - Webflow API ne može da poveže link sa „trenutnom stavkom“ kolekcije, pa se to radi u Designer-u.
    - Za svaki od 3 elementa: izabrati link → **Link settings** → **Collection page** → **Current Blogs** (ili slično, zavisi od interfejsa).
    - Elementi:
      - **Blog** stranica, istaknute kartice na vrhu (klasa `ins-featured_card`);
      - šablon **Blogs Template**, kartice „povezani postovi“ pri dnu (klasa `blog-card_component`);
      - **Resources**, lista postova (klasa `res-post`).
    - Posle toga mi javi, pa proverim sirovi HTML.
    - Linkove ka case stranicama (Our Work, Resources, „sledeći projekti“) ostavljamo kako jesu:
      - prazne case stranice već dobijaju noindex i šalju posetioca na sajt klijenta (head kod šablona Our Works);
      - pravi link bi crawlerima bez JavaScript-a pokazao baš te prazne stranice.

## Kasnije faze
Biće dopunjeno u fazama 4–6 (sitemap izuzeci po stranici…).
