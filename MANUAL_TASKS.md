# MANUAL_TASKS (radi se ručno u Webflow-u, Search Console-u i GA4)

Ažurirano: 10.11.2026 (faza 0). Webflow API na ovom planu ne može: 301 preusmeravanja i robots.txt (samo Enterprise,
greška `not_enterprise_plan_site`), sitemap kontrole po stranici (403) i podešavanja sajta (global canonical, auto sitemap).
Putanje u meniju proverite u trenutnom Webflow interfejsu. Nazivi se ponekad menjaju.

## Lead tabela za Let's talk formu (proba, 21.11.2026)
Na luka@nues.agency nalogu, jednom (oko 5 minuta). Ceo kod je u `webflow-assets/lead-capture/leads-apps-script.gs`.
1. Otvoriti novu Google tabelu (sheets.new), nazvati je „Nues Leads (test)“.
2. Extensions → Apps Script. Obrisati sve, nalepiti kod iz fajla, Save.
3. Deploy → New deployment → tip „Web app“. Execute as: Me. Who has access: Anyone. Deploy.
4. Authorize access: izabrati nalog, Advanced → Go to … (unsafe) → Allow. Upozorenje stoji jer je skripta tvoja, a nije objavljena aplikacija.
5. Kopirati „Web app URL“ (završava se na /exec) i poslati ga Claude-u. On ga upisuje u `data-lead-url` na `.lt-form` i objavljuje staging.
- Ako u koraku 3 nema opcije „Anyone“, Google Workspace podešavanje firme to ne dozvoljava. Tada treba lični Gmail nalog ili da admin dozvoli.
- Urađeno 21.11.: tabela i deploy („Anyone“), link upisan u formu na stagingu.
- **Zameniti skriptu verzijom v2** (`leads-apps-script.gs`): Apps Script → obrisati sve, nalepiti novi kod, Save → Deploy → Manage deployments → olovka → Version: New version → Deploy. Link ostaje isti.
- Pre pravog lansiranja: rečenica u Privacy Policy da se podaci iz forme čuvaju i pre slanja (šalje se na odobrenje).

## Pri lansiranju (domen se sada NE povezuje)
1. **Plaćeni site plan.** Bez njega nema custom domena, sitemap-a ni uklanjanja „Made in Webflow“ bedža.
2. **Site settings → SEO → Global canonical tag URL**: upisati izabrani domen (QUESTIONS 7). Tek tada svaka stranica dobija
   self-referencing canonical. Sada nijedna stranica nema canonical.
3. **Site settings → SEO → Sitemap**: tvoja odluka 20.11. (opcija a): ručni sitemap bez 5 case stranica bez studije (Biotech, Harper, Hypersonix, Intaker, LaSalle).
   - **Auto-generate sitemap**: isključiti.
   - U polje za sopstveni sitemap nalepiti ceo sadržaj fajla `webflow-assets/seo/sitemap-manual.xml` (41 adresa: 15 stranica, 5 case studija, 21 blog post), pa Save i Publish.
   - Fajl koristi `https://www.nues.agency`, kao i sitemap starog sajta. Ako glavni domen bude bez www, javi mi da zamenim.
   - **Održavanje:** svaki novi blog post ili case studija mora ručno da se doda u sitemap (javi mi i ja dopišem red).
   - **Prvo probati bolje rešenje:** na plaćenom planu Webflow možda dozvoljava isključivanje pojedinačnih CMS stavki iz sitemap-a (20.11. na sadašnjem planu: „Site plan doesn't support sitemap indexing controls“). Ako proradi, ostaje Auto-generate uključen, a ja isključim samo tih 5 stavki. Javi mi kad pređete na plaćeni plan, pa probam.
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
   | /integrations | /webflow-integrations ako je ta stranica objavljena pri lansiranju, inače /resources |
   | /blog/nues-is-officialy-certified-webflow-partner | /about (post ne postoji u novom CMS-u) |
   | /blog/from-guests-to-sponsors-notes-from-flow-conf-2026 | /blog (odluka 20.11.: post ostaje u draftu; ako ga tim kasnije objavi, ovaj redirect se briše, jer je slug isti) |

   Provereno 17.11.2026: sitemap starog sajta (www.nues.agency/sitemap.xml) ima 40 adresa. Njih 34 postoje na novom sajtu
   sa istom putanjom (Home, About, Let's talk, Our work i 5 case studija, Blog i 20 postova, Resources, Privacy, Terms)
   i za njih ne treba redirect, jer domen ostaje isti. Ostalih 6 su u tabeli iznad. /services/main i /services/nues-seo
   nisu u sitemap-u starog sajta, ali ostaju u tabeli za svaki slučaj. Ceo spisak sa statusima:
   `notes/301-mapa-2026-11-17.md`.
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
9. **[URAĐENO 13.11., provereno na stagingu]** **Service Cases, dve teške slike** (na sve 4 servisne stranice):
   - `svc-case-ballerine-home-full` je 1.023 KB, a nova `images/svc-case-ballerine-home-full-1200.webp` ima 450 KB.
   - `svc-case-shiftolic-home-full` je 431 KB, a nova `images/svc-case-shiftolic-home-full-1200.webp` ima 242 KB.
   - Izgled je isti (1200 px je i dalje 2× najšira veličina prikaza).
   - Dovoljno je da ih ubaciš u **Assets** panel i javiš mi. Ja ih zamenim u 6 okvira (po 3 u Ballerine i Shiftolic redu) i objavim.
   - Webflow API ne dozvoljava da ja upload-ujem fajl.
10. **[URAĐENO 13.11., provereno na stagingu]** **LaSalle Agri, „Full page screenshot“**:
    - Webflow je odbio izmenu preko API-ja dva puta („Missing fields“, bez objašnjenja).
    - CMS → **Our Works** → **LaSalle Agri** → polje **Full page screenshot** → zameni sliku sa `images/lasalle-home-full-hq-1200.webp` (594 KB umesto 1.019 KB) → Save.
    - Alt tekst ostaje „LaSalle Agri home page“.
11. **[PRESKOČENO 13.11., tvoja odluka: ne radimo]** **Site settings → Publishing → Advanced publishing options**: uključiti **Minify HTML**, **Minify CSS** i **Minify JS** → Save.
    - Glavni CSS sajta (581 KB) sada nije minifikovan.
    - Posle sledeće objave proveravam da se ništa nije promenilo.
12. **[PRESKOČENO 13.11., tvoja odluka: ne radimo]** **Aeonik u WOFF2** (vidi QUESTIONS 18): ako postoje WOFF2 fajlovi iz licence, upload-ovati ih umesto `.otf` za težine 300, 400, 500 i 600, pod istim imenom porodice **Aeonik**.

## SEO korak 4, tehnički SEO (dodato 13.11.)
13. **Slike za deljenje (og:image): pravi dizajner** (tvoja odluka 13.11, potvrđena 14.11).
    - Moje verzije od 13. i 14.11. (`webflow-assets/perf/manual/og/`, `webflow-assets/og-v2/`) se ne koriste.
    - Plan po Aleksandru:
      - svaka glavna stranica dobija svoju sliku;
      - CMS stranice koriste svoju CMS sliku;
      - ostale (Privacy, Terms, 404) jednu univerzalnu.
    - Kad slike budu gotove, ubaciti ih u **Assets** i javiti mi. Ja ih vezujem za stranice preko API-ja.
    - Napomena za CMS stranice: sadašnje CMS slike koje se koriste za og:image su AVIF, a LinkedIn AVIF verovatno ne prikazuje. Za njih treba JPG ili PNG.
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
