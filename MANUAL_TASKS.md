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
- **Slack obaveštenja: ODLOŽENO (21.11., tvoja odluka, jer može da treba admin za Slack aplikaciju). Skripta v4 je spremna, bez webhook-a ne radi ništa.** Kad dođe na red: na api.slack.com/apps → Create New App → From scratch („Nues Leads“, workspace Nues) → Incoming Webhooks → On → Add New Webhook to Workspace → #leads-test → Allow → kopirati Webhook URL. U Apps Script → Project Settings → Script Properties dodati `SLACK_WEBHOOK_URL` = taj URL (ne slati ga nikome). Za brzu probu i `ABANDON_MINUTES` = 2. Nalepiti skriptu v4, Save, Deploy → Manage deployments → New version, pa u tabeli **Nues → Turn on Slack alerts**.
- **Zameniti skriptu verzijom v3** (`leads-apps-script.gs`, uključuje i v2): Apps Script → obrisati sve, nalepiti novi kod, Save → Deploy → Manage deployments → olovka → Version: New version → Deploy. Link ostaje isti.
- Posle toga osvežiti tabelu: u meniju se pojavi **Nues → Tidy up the Leads sheet** (prvi put Google može ponovo tražiti dozvolu). Tabela se sredi i sama pri sledećem unosu iz forme.
- Pre pravog lansiranja: rečenica u Privacy Policy da se podaci iz forme čuvaju i pre slanja (šalje se na odobrenje).


## Performanse, odloženo (22.11.2026)
- **Aeonik u WOFF2:** sada je OTF (3 težine po ~60 KB na svakoj stranici). Pre konverzije proveriti licencu za Aeonik (CoType) da li dozvoljava WOFF2 za web. Kad je potvrđeno, Claude konvertuje i menja fajlove na istim font zapisima (isti izgled).
- **Geist i Instrument Serif kao sopstveni fontovi** (OFL, besplatni): Claude postavlja WOFF2 fajlove sa istim imenima, ti u Site settings → Fonts brišeš Google verzije; nestaju `webfont.js` i dva Google domena koji blokiraju prvi prikaz. Tvoje „Kasnije“.
- **Per page CSS i Asynchronously load JS** (Site settings → Publishing → Advanced): probati posebno, uz poređenje svih stranica pre i posle.
- **Snimci sajtova u Our Works ponovo kroz Webflow (23.11.2026), najveća ušteda za Home na telefonu.** Webflow pravi manje verzije slike (500, 800, 1080 px) samo kad se slika ubaci kroz Webflow interfejs. Ovi snimci su ušli preko API-ja, pa svaki uređaj, i telefon, skida pun fajl (Ballerine 451 KB, Shiftolic 251 KB na Home-u). Kako: sačuvaj fajl sa linka ispod, pa u Webflow-u CMS → Our Works → stavka → polje **Full page screenshot** → zameni sliku tim fajlom (Upload), Save, i reci mi da objavim i proverim. Ako Webflow prepozna isti fajl i ne napravi verzije, napraviću ti kopije sa sitnom razlikom u kodiranju (isti izgled).
  - Prioritet (Home): Ballerine `https://cdn.prod.website-files.com/6aba6bc07d6279b4b5617719/6af66906e51f9446481530f7_ballerine-home-full-1200.webp`, Shiftolic `https://cdn.prod.website-files.com/6aba6bc07d6279b4b5617719/6af6691dc581cc6d569fa7f0_shiftolic-home-full-v2-1200.webp`
  - Ostali (Resources, case stranice, Our Work): Biotech `…/6af6691dc581cc6d569fa7ed_biotech-home-full-hq-1200.webp`, LaSalle `…/6af745d7ccc5ab40a4283096_lasalle-home-full-hq-1200.webp`, Hypersonix `…/6af6691dc581cc6d569fa7fe_hypersonix-home-full-hq-1200.webp`, Harper `…/6af6691dc581cc6d569fa7e7_harper-home-full-hq-1200.webp`, Intaker `…/6af66943c046d8a6b4d8b157_intaker-home-full-v2-1200.webp`, TrakPro `…/6af6691dc581cc6d569fa7f9_trakpro-home-full-v2-1200.webp`, Veyor `…/6af6691ec581cc6d569fa824_veyor-home-full-v2-1200.avif`, Sustain `…/6af6691dc581cc6d569fa7ea_sustain-home-full-hq-1200.webp` (`…` = `https://cdn.prod.website-files.com/6aba6bc07d6279b4b5617719`)
  - Isto važi za 2 slike blog postova na Resources (polje glavne slike): `sanity-vs-webflow-share.webp` i `source-by-webflow-share.webp`.
## Pri lansiranju (domen se sada NE povezuje)
1. **Plaćeni site plan.** Bez njega nema custom domena, sitemap-a ni uklanjanja „Made in Webflow“ bedža.
2. **Site settings → SEO → Global canonical tag URL**: upisati izabrani domen (QUESTIONS 7). Tek tada svaka stranica dobija
   self-referencing canonical. Sada nijedna stranica nema canonical.
3. **Site settings → SEO → Sitemap**: tvoja odluka 20.11. (opcija a): ručni sitemap bez 5 case stranica bez studije (Biotech, Harper, Hypersonix, Intaker, LaSalle).
   - **Auto-generate sitemap**: isključiti.
   - U polje za sopstveni sitemap nalepiti ceo sadržaj fajla `webflow-assets/seo/sitemap-manual.xml` (42 adrese: 15 stranica, 5 case studija, 22 blog posta), pa Save i Publish.
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

   Izmena 23.11.2026: Flow Conf post je objavljen na novom sajtu (staging 200), pa za njega ne treba redirect, a u ručnom sitemap-u je sada 42 adrese. Post „Nues is officially certified Webflow partner“ (/blog/nues-is-officialy-certified-webflow-partner) se prebacuje u Blogs CMS sa istim slug-om, pa ni za njega ne treba redirect. Posle prebacivanja ga dodati u ručni sitemap.

   Provereno 17.11.2026: sitemap starog sajta (www.nues.agency/sitemap.xml) ima 40 adresa. Njih 34 postoje na novom sajtu
   sa istom putanjom (Home, About, Let's talk, Our work i 5 case studija, Blog i 20 postova, Resources, Privacy, Terms)
   i za njih ne treba redirect, jer domen ostaje isti. Ostalih 6 su u tabeli iznad. /services/main i /services/nues-seo
   nisu u sitemap-u starog sajta, ali ostaju u tabeli za svaki slučaj. Ceo spisak sa statusima:
   `notes/301-mapa-2026-11-17.md`.
6. **Google Search Console**: verifikacija domena (DNS TXT), slanje sitemap-a. **Bing Webmaster Tools**: uvoz iz GSC-a.
   - Provereno 22.11.: GSC je već povezan za stari sajt. Ni stari (www.nues.agency) ni novi sajt nemaju `google-site-verification` meta tag, pa je verifikacija preko DNS-a (Domain property) ili preko GA taga. Oba ostaju posle prelaska. Proveriti u GSC → Settings → Ownership verification.
   - Posle prelaska u istom GSC property-ju: poslati novi sitemap, pratiti Pages/Indexing i 301 iz `notes/301-mapa-2026-11-17.md`. Glavna adresa ostaje www.nues.agency (nues.agency → 301 → www, kao sada).
   - GA4: novi sajt već ima isti GA4 kao stari (`G-NNTMD9FV5D`, isti način učitavanja, dva puta), pa istorija ide dalje bez prebacivanja. Posete sa stagingu (webflow.io) takođe idu u isti GA4: u izveštajima filtrirati po Hostname = www.nues.agency.

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
