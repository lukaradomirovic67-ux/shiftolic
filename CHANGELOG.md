# CHANGELOG (SEO, AEO i performanse)

Svaka izmena u Webflow-u: šta, gde (stranica, kolekcija ili element ID), staro → novo, zašto.
Stanje pre svih izmena je u `backup/` (10.11.2026).

## 13.11.2026: odluka, Aeonik WOFF2 se ne radi
- MANUAL_TASKS 12 i QUESTIONS 18 zatvoreni, tvoja odluka. Aeonik ostaje u `.otf`. U Webflow-u ništa nije menjano.
- SEO korak 3 (brzina na mobilnom) je time završen: urađeno je sve što smo odlučili da radimo.

## 13.11.2026: MANUAL_TASKS 9 urađen, lakše slike u Service Cases (objavljeno na staging)
Ti si ubacio 2 slike u Assets; ja sam ih postavio u komponentu **Service Cases** (`34b22d05-b194-8512-c6a7-fe84ab3212d1`), pa važe na sve 4 servisne stranice. Kopija pre izmene: `backup/elements/service-cases-screens-2026-11-13.json`.
| Okviri (po 3: levo, sredina, desno) | Pre | Posle |
|---|---|---|
| Ballerine | asset `6ae913ddcfa35fd973751b67` `svc-case-ballerine-home-full.webp`, 1.024 KB | asset `6af746e796cf66ec841507cd` `svc-case-ballerine-home-full-1200.webp`, 451 KB |
| Shiftolic | asset `6ae913e9de52550f9c6108c2` `svc-case-shiftolic-home-full.webp`, 431 KB | asset `6af746e7ccc5ab40a428af82` `svc-case-shiftolic-home-full-1200.webp`, 242 KB |
- Ukupno po servisnoj stranici: 1.455 KB → 693 KB (oko 760 KB manje), i na desktopu i na telefonu.
- Alt tekstovi su ostali isti („Ballerine website homepage“, „Shiftolic website homepage“; bočni okviri prazni, kao i pre).
- Provereno na sve 4 servisne stranice: 6 novih slika, nijedna stara. Snimak sekcije pre i posle na 1440 i 390 px je isti (razlika ispod 0,5% piksela, samo od kompresije). Bez JS grešaka.
- Stare slike su ostale u Assets i nisu obrisane.

## 13.11.2026: MANUAL_TASKS 10 urađen, lakša LaSalle slika (objavljeno na staging)
Ti si zamenio sliku u CMS-u; ja sam objavio na staging i proverio.
| Gde | Pre | Posle |
|---|---|---|
| Our Works → LaSalle Agri → Full page screenshot | `6aecbadce512f468a877f7fd_lasalle-home-full-hq.webp`, 1.019 KB | `6af745d7ccc5ab40a4283096_lasalle-home-full-hq-1200.webp`, 594 KB (isti fajl kao `webflow-assets/perf/manual/images/`, bajt po bajt) |
- Slika se prikazuje na /our-work (kartica u gridu) i na /our-work/lasalle-agri. Stari fajl se više ne pojavljuje ni na jednoj stranici.
- Webflow je napravio i manje verzije za telefone (500, 800 i 1080 px). Na 390 px telefon preuzima verziju od 500 px (172 KB).
- Alt tekst u polju je sada prazan (ranije „LaSalle Agri home page“), ali kartica uzima alt iz imena stavke, pa na stranici i dalje piše `alt="LaSalle Agri"`. Na case stranici je `alt=""`, kao i za ostale projekte.
- Kartica izgleda isto na 1440 i 390 px, bez JS grešaka.

## 13.11.2026: odluke, Minify i Geist se ne rade
- MANUAL_TASKS 11 (Minify HTML, CSS i JS) preskačemo, tvoja odluka. Procena dobitka je bila mala: glavni CSS sa 568 na oko 462 KB, a preuzimanje sa 81 na oko 76 KB po stranici.
- MANUAL_TASKS 8 (Geist kao custom font umesto Google Fonts) preskačemo, tvoja odluka. Google skripta `webfont.js` i Instrument Serif ostaju na svakoj stranici kao do sada.
- U Webflow-u ništa nije menjano.

## 13.11.2026: MANUAL_TASKS 14 urađen, linkovi ka blog postovima (objavljeno na staging)
Ti si u Designer-u povezao 3 linka sa „Current Blogs“; ja sam objavio na staging i proverio.
| Element | Pre (sirovi HTML) | Posle |
|---|---|---|
| Blog, istaknute kartice (`ins-featured_card`) | 3 × `href="#"` | 3 prave adrese `/blog/<slug>` |
| Blogs Template, povezani postovi (`blog-card_component`) | 21 × `href="#"` | 21 prava adresa |
| Resources, lista postova (`res-post`) | 3 × `href="#"` | 3 prave adrese |
- Sve 21 jedinstvene adrese vraćaju 200.
- U browseru: nijedna kartica bez linka, nijedna JS greška na /blog, /resources i jednom postu. Izgled i tekst se nisu menjali.

## 13.11.2026: odluke o predlozima koraka 4
- og:image pravi dizajner, a ja ih povezujem kad stignu.
- Title i description, isti H1 na servisnim stranicama i cene idu na launch ovakvi kakvi jesu. Menjaju se posle launcha (`notes/seo-predlozi-2026-11-13.md`).

## 13.11.2026: SEO korak 4, predlozi za odobrenje (ništa nije objavljeno)
- Slike za deljenje (og:image):
  - 13 predloga 1200×630, u stilu sajta, sa postojećim naslovima: `webflow-assets/perf/manual/og/`, pregled u `notes/og-predlozi-2026-11-13.png`;
  - sada nijedna statična stranica nema og:image;
  - povezivanje ide preko API-ja kad ih odobriš i ubaciš u Assets (MANUAL_TASKS 13).
- Title i description: izmereno na svim stranicama, postovima i case stranicama. Predlozi za one van granica su u `notes/seo-predlozi-2026-11-13.md` (tekst, čeka odobrenje).
- Nađeno: sve 4 servisne stranice imaju isti H1 („Zero to a live site, in weeks not quarters“). Predlog je u istoj belešci.
- Linkovi `#` ka blog postovima: ručni korak u Designer-u (MANUAL_TASKS 14).

## 13.11.2026: SEO korak 4, strukturisani podaci (schema) ispravljeni i dopunjeni (objavljeno na staging)
Po tvom „nastavi“. Vidljivi tekst i izgled se nisu menjali; schema koristi samo tekst koji već postoji na stranicama i u CMS-u.

**1. Blog postovi (šablon Blogs)** — kopija pre izmene: `backup/schema/blogs-template-2026-11-13.html`, `backup/page-code/2026-11-13/blog-template-head.html`
| Šta | Pre | Posle |
|---|---|---|
| Gde je schema | polje „Schema markup“ šablona | head kod šablona. API ne prima schema sa CMS poljima u polju „Schema markup“ (traži čist JSON), a kroz kod šablona može, kao na case stranicama. Staro polje je obrisano, pa post ima jednu BlogPosting oznaku. Ostatak head koda (stilovi) je ostao isti, bajt po bajt |
| `datePublished` | „Published on“, isti za sve postove (28.09., dan uvoza) | polje Custom date, isti datum koji piše na stranici (npr. „September 21, 2026“ → `2026-09-21`) |
| autor | `url: /team/<slug>` (stranica ne postoji, 404) i `description` (bio) | bez `url` i `description`; ostaju ime, uloga, slika i LinkedIn (`sameAs`) |
| `keywords` | „AEO, marketing, Webflow, AI search, structured data, schema markup“ na svakom postu | uklonjeno (bilo je pogrešno za većinu postova) |
| `abstract` | TL;DR polje | uklonjeno: TL;DR sa novim redom je kvario JSON na postu „Webflow vs WordPress…“ |
- Provereno na svih 20 objavljenih postova: tačno jedan BlogPosting, ispravan JSON, datum isti kao na stranici. „Webflow vs WordPress…“ više nije neispravan. FAQ schema (dodaje je skripta šablona) i dalje pokazuje na isti `#article`.

**2. Our Work** (kopija: `backup/schema/our-work-2026-11-13.json`)
- Pre: u listi projekata bila je Pythagora (stavka je draft, `/our-work/pythagora` vraća 404), a nedostajali su TrakPro i Veyor Digital.
- Posle: Ballerine, Shiftolic, TrakPro, Veyor Digital, Sustain Commercial Solar (5 napisanih case studija). Opisi za TrakPro i Veyor su iz CMS polja (Industry, Stat 1, Stat 2), ostali su ostali isti.

**3. Nova schema na stranicama koje je nisu imale**
| Stranica | Tip | Sadržaj |
|---|---|---|
| SEO & AEO | WebPage + Service | kao druge servisne stranice: opis iz meta opisa, 5 koraka sa stranice (Audit, Research, Structure, Content, Grow) sa njihovim tekstom. Bez cene |
| Services | WebPage + ItemList | 4 usluge sa adresom i opisom (isti opisi kao u Organization schema na Home) |
| Blog | Blog | naslov i opis stranice |
| Resources | CollectionPage | naslov i opis stranice |
| Careers, Pricing | WebPage | naslov i opis stranice; na Pricing bez cena |

**Nije menjano, čeka odluku ili podatke:**
- Cene u schema-i servisnih stranica ($8.000 Design & Development, $5.000 Webflow Development) ne postoje na tim stranicama, a /services i Pricing ih prikazuju različito ($8k/$5k naspram $8,000/$20,000). Kad se cene usaglase, uskladiću schema-u.
- Ime je negde „NUES“ (servisne stranice, case šablon), a negde „Nues“. Ostavljeno dok ne potvrdiš zvaničan zapis.
- Sve adrese u schema-i su relativne (`/our-work`); posle odluke o domenu (QUESTIONS 7) prelaze u pune.
- Review na Let's talk: QUESTIONS 11.
- Javne stranice internih kolekcija: provereno, nema problema (/hero-cards/* vraća 404, Case team i Jobs nemaju stavki).

## 13.11.2026: SEO korak 4 (tehnički SEO), početak: test linkova, vraćeno na staro (objavljeno na staging)
Po tvom „radi tehnicki seo“. Zaustavljeno na tvoj zahtev („stopiraj nastavljamo ujutru“). Na sajtu nema promena u odnosu na stanje pre koraka 4.

**Test na Blog stranici:** link featured kartice (`ins-featured_card`, element `a4289385-ed16-88ab-2476-d4d525963265`).
- Pre: `{mode: collectionPage}`, objavljen kao `href="#"`; skripta u footer-u ga ispravlja na `/blog/<slug>`.
- Proba 1: `to: "blog"` → objavljeno `href="blog"` (pogrešno).
- Proba 2: `to: "detail_blog"` → objavljeno `href="detail_blog"` (pogrešno).
- Posle: vraćeno na `{mode: collectionPage}` i objavljeno. Provereno: ponovo je `href="#"`, a skripta ga ispravlja kao i ranije.

**Zaključak:** Webflow API ne može da poveže link sa „trenutnom stavkom“ kolekcije. To je jedan klik u Designer-u po elementu (Link settings → Collection page → Current …), pa ide na ručnu listu.

**Utvrđeno za nastavak:**
- Linkovi `#` u sirovom HTML-u:
  - ka blog postovima: Blog featured kartice, „povezani postovi“ u šablonu posta, Resources postovi;
  - ka case stranicama: Our Work „View project“ i tabovi, Resources case kartice, „sledeći projekti“ u case šablonu.
  - Case linkove treba rešiti tek posle odluke o praznim case stranicama (QUESTIONS 13). Inače bi crawleri dobili linkove ka praznim stranicama.
- Alat za stranice podržava og:image (`openGraph.imageUrl` / `imageAssetId`) i JSON-LD po stranici. og:image sada nema nijedna statična stranica.
- Postojeći JSON-LD:
  - Home (Organization), About, 3 servisne stranice, Our Work, Let's talk, šablon blog posta;
  - u njima su relativni URL-ovi (`"url": "/"`), ime je i „Nues“ i „NUES“, a na Our Work se pominje Pythagora (draft stavka);
  - Services, SEO & AEO, Pricing, Careers, Blog, Resources i pravne stranice nemaju schema.
- Šabloni Hero Cards (/hero-cards/…), Case team (/case-team/…) i Jobs (/jobs/…) objavljuju javne stranice za interne kolekcije.

## 13.11.2026: SEO korak 3 (prvi deo), lakše slike celih sajtova i manje preuzimanja na telefonu (objavljeno na staging)
Treći korak SEO faze, brzina na mobilnom. Izgled se nije promenio.

**1. Screenshotovi celih sajtova klijenata (CMS Our Works, polje „Full page screenshot“, `hero-screen-center`)**
- Problem: dugačke slike od 1440 do 2200 px širine, 0,4–1 MB svaka.
  - Prikazuju se najviše oko 584 px široko (Resources kartice), 526 px (Home „Every project“), a na telefonu 140–332 px.
  - Webflow za tako visoke slike ne pravi manje verzije (srcset), pa telefon preuzima ceo fajl.
- Sada: iste slike, smanjene na 1200 px širine (i dalje 2× najšira veličina prikaza) i ponovo kompresovane.
  - WebP q75, a Veyor ostaje AVIF jer je i bio AVIF.
  - Fajlovi su u `webflow-assets/perf/full-screenshots/`.
  - Webflow ih je preuzeo sa jsDelivr linka i čuva ih na svom CDN-u (`cdn.prod.website-files.com`), pa nema zavisnosti od GitHub-a.
- Alt tekstovi su ostali isti. Kopija svih stavki pre izmene: `backup/cms-items/our-works-full-screenshot-2026-11-13.json`.

| Stavka | Pre | Posle |
|---|---|---|
| Ballerine | `6ae8e94f…_ballerine-home-full.webp`, 1440×11981, 1.023 KB | `6af66906…_ballerine-home-full-1200.webp`, 1200×9984, 450 KB |
| Shiftolic | `…_shiftolic-home-full-v2.webp`, 1920×11674, 589 KB | `…_shiftolic-home-full-v2-1200.webp`, 1200×7296, 250 KB |
| TrakPro | `…_trakpro-home-full-v2.webp`, 1920×10227, 575 KB | `…-1200.webp`, 1200×6392, 242 KB |
| Intaker | `…_intaker-home-full-v2.webp`, 1920×13392, 685 KB | `…-1200.webp`, 1200×8370, 300 KB |
| Veyor Digital | `…_veyor-home-full-v2.avif`, 1920×15174, 801 KB | `…-1200.avif`, 1200×9484, 519 KB |
| Harper | `…_harper-home-full-hq.webp`, 2200×9472, 512 KB | `…-1200.webp`, 1200×5167, 192 KB |
| Hypersonix | `…_hypersonix-home-full-hq.webp`, 2200×6185, 436 KB | `…-1200.webp`, 1200×3374, 153 KB |
| Biotech Innovations | `…_biotech-home-full-hq.webp`, 2200×10894, 1.070 KB | `…-1200.webp`, 1200×5942, 445 KB |
| Sustain Commercial Solar | `…_sustain-home-full-hq.webp`, 1440×13224, 893 KB | `…-1200.webp`, 1200×11020, 555 KB |
| LaSalle Agri | 1440×9781, 1.019 KB | **nije promenjeno.** Webflow je odbio izmenu dva puta („Missing fields“), pa je to ručni korak (MANUAL_TASKS 10) |

- Opis polja „Full page screenshot“: „1440px wide, JPG/WebP under 8 MB“ → „1200px wide WebP (quality about 75), ideally under 600 KB…“, da i sledeće slike budu lake.
- Provera izgleda: iste stranice sa starim i sa novim slikama.
  - Stranice i prikazi: Home, Our Work, Resources i Ballerine case, na 1440 (2×) i na telefonu.
  - Razlika: prosečno ispod 1 nivoa od 255, a manje od 0,5% piksela (ivice slova); golim okom je ista.

**Mobilni (Pixel 5), ukupno preuzeto sa učitavanjem:**

| Stranica | Pre | Posle |
|---|---|---|
| Home | 3.254 KB | 2.342 KB (−28%) |
| Our Work | 3.878 KB | 2.535 KB (−35%) |
| Resources | 4.648 KB | 2.792 KB (−40%) |
| Ballerine case | 1.985 KB | 1.412 KB (−29%) |

Servisne stranice se još nisu promenile: tamo su dve statične slike u Service Cases, koje mora da upload-uje čovek (MANUAL_TASKS 9).

**2. Kartica poslednjeg posta u Resources meniju** (site footer, skripta „Resources dropdown“)
- Pre: svaka stranica je u mirovanju preuzimala /blog (48 KB) da bi kartica bila spremna, i na telefonu.
- Sada:
  - desktop sa mišem radi isto kao pre;
  - telefon i tablet preuzimaju /blog tek kad posetilac dodirne navbar (otvaranje menija), pa kartica i dalje stigne pre nego što se Resources otvori.
- Provereno: na telefonu nema /blog pre dodira, a posle otvaranja menija kartica ima post. Na desktopu je isto kao pre. Na 18 stranica (1440 i 390) nema JS grešaka.
- Napomena: CSS koji se u merenju javljao dvaput je posledica testa bez keša (parsiranje /blog). U pravom pregledaču drugi put dolazi iz keša.

**3. Utvrđeno, a čeka ručni korak ili odluku** (MANUAL_TASKS 8–12, QUESTIONS 18)
- Google fontovi:
  - Webflow ubacuje `webfont.js` u head, a ta skripta blokira prikaz i otvara još tri servera.
  - Geist je jedini koji se stvarno koristi. Instrument Serif se ne koristi nigde, a preuzima se na svakoj stranici.
  - Lokalni test sa samostalno hostovanim Geist fajlom: 8 prikaza (4 stranice, 1440 i 390) identični do piksela, bez Google servera.
- Aeonik je `.otf` (oko 60 KB po težini, 2–3 težine po stranici). WOFF2 samo iz licence.
- Glavni CSS (581 KB) nije minifikovan: to je podešavanje sajta.

## 13.11.2026: SEO korak 2, site footer kod skraćen sa 48.409 na 30.451 znakova (objavljeno na staging)
Drugi korak SEO faze, po tvom „ajde radi seo redom“. Bez vizuelne promene i bez promene ponašanja.

| Gde | Pre | Posle |
|---|---|---|
| Site settings → Custom code → Footer | 48.409 od 50.000 znakova: čitljiv kod sa komentarima, 21 blok | 30.451 znakova (−17.958, −37%). Isti blokovi istim redom, CSS i skripte minifikovani alatom esbuild, HTML komentar uklonjen, na vrhu jedan komentar koji upućuje na čitljivu verziju. Uklonjena je stara kopija skripte za ispisivanje teksta |

Uklonjena skripta (2.048 znakova): „Case study text… light them up once in view“, koja je deo teksta pretvarala u slova.
- Novija verzija iste skripte je od 13.11. u site head-u, radi na istim elementima (`.home-projects_description`, `.svc-case_text`, `[data-reveal-text]`) i pokreće se prva.
- Stara skripta je zato svaki element preskakala (`data-text-reveal` već postoji), pa nije radila ništa.

Zašto:
- Footer je bio skoro pun (1.591 znak slobodno). Sada ima 19.549 slobodnih.
- Kod ide uz svaku stranicu, pa je svaka lakša za oko 18 KB HTML-a. Na primer, Home: 292.206 → 274.326 bajtova.

Fajlovi:
- Kopija pre izmene: `backup/page-code/2026-11-13/site-footer.html`.
- Čitljiva verzija, koja se ubuduće menja: `webflow-assets/site-code/site-footer.html` (iz nje je uklonjena i stara skripta).
- Ono što je u Webflow-u: `webflow-assets/site-code/site-footer.min.html`.

Provera pre objave, lokalno (15 stranica, svaka sa starim i sa novim footer kodom):
- CSS: svih 74 pravila je isto kad ih pregledač pročita. Pet je drugačije zapisano, ali znači isto (`300ms` = `0.3s`, `translate(-28px, 0)` = `translate(-28px)`, `translateX` = `translate`).
- Bez animacija: isti DOM i isti linkovi, bez JS grešaka.
  - Na 14 stranica je i screenshot identičan.
  - Na Privacy screenshot nije identičan do piksela, ali se golim okom ne razlikuje.
  - Na Design & Development jedna razlika je u vremenu učitavanja prstenova (`nr-box.ready`), ne u kodu footera.
- Sa animacijama, na 1440, isto se ponaša:
  - meni (Services i Resources na hover, „safe“ trougao, zamena panela, kartica poslednjeg posta);
  - dugmad (Shift);
  - strelice (Glide);
  - reveal animacije, ispisivanje teksta i animacija recenzija;
  - FAQ (jedan otvoren);
  - video popup (Vimeo, fokus, Esc);
  - Trusted kartice i case linkovi.
- Na telefonu (iPhone 13) se isto ponaša: meni se otvara, Services se otvara na dodir i ne vodi na stranicu, a dugmad su ista.

Provera posle objave (staging):
- footer u objavljenom HTML-u je bajt po bajt isti kao `site-footer.min.html`;
- 18 stranica na 1440 i 390: bez JS grešaka i bez širenja strane;
- meni, dugmad, strelice i ispisivanje teksta rade (About: obe rečenice se ispišu).

## 13.11.2026: ceo dvobojni tekst kreće siv i ceo pobeli (objavljeno na staging)
Po tvom zahtevu („ceo ovaj tekst treba da se kao izpise ne samo ovaj deo“, pa „ceo ovaj tekst je siv na pocetku i onda ceo pobeli postepeno“). Menja tačku 1 iz unosa ispod.

- Gde: Home „Every project“ (`.home-projects_description`), „Service Cases“ na 4 servisne stranice (`.svc-case_text`) i naslovi u Our Work tabovima (`.ow-cs_item h3`).
- Pre: ispisivao se samo prvi deo rečenice (40% → belo). Drugi deo je bio siv na početku i ostajao siv (40% → 40%), pa se nije video nikakav pomak.
- Sada: cela rečenica kreće siva (40%) i slovo po slovo postaje bela, i drugi deo. Na kraju je cela rečenica bela, a na Our Work kartici cela tamnoplava (rgb(13,25,40)).
- Site head (CSS):
  - uklonjena pravila koja su slova u `.svc-case_muted` i `.text-reveal_muted` držala sivim (`color: inherit`), pa sva slova idu postojećim putem: `.text-reveal_char` 40% → `#fff`;
  - dodato `.is-revealed .ow-cs_muted { color: inherit; }`, pa sivi deo na Our Work posle otkrivanja preuzima boju naslova.
- Usput: između ova dva koraka kratko je bila objavljena verzija u kojoj je sivi deo kretao od 12% i završavao siv. Ova verzija je zamenila tu.
- Skripta, podela znakom `|` u CMS-u i klase `text-reveal_muted` i `ow-cs_muted` ostaju kakve su. Sivi deo je sada samo početno stanje.
- Proveravano na stagingu, na 1440 i 390, na Home, /our-work i /services/design-development:
  - pre otkrivanja su sva slova 40%;
  - posle otkrivanja su sva bela (na Our Work tamnoplava);
  - drugi deo kreće posle prvog (kašnjenje 569 ms → 1376 ms);
  - nema JS grešaka.
- Snimak tri trenutka animacije: `notes/text-reveal-2026-11-13.png`.
- Site head: 39.048 → 38.799 znakova.

## 13.11.2026: 6 ispravki iz provere naspram Figme (objavljeno na staging)
Po tvom zahtevu („aj ovo uradi“), stavke iz `notes/figma-qa-2026-11-12.md`, odeljak 1.

**1. Dvobojni tekst se više ne gubi** (Home „Every project“ i naslov „Service Cases“ na 4 servisne stranice)
- Uzrok: skripta koja tekst ispisuje slovo po slovo pravila je ravan tekst i brisala prigušeni deo.
- Nova skripta u site head-u čuva unutrašnje `span`-ove. Prigušeni deo ostaje sivi, a ispisuje se samo beli deo. Pokreće se pre stare skripte u site footer-u, koja onda preskače te elemente (staru brišem kad budem sređivao footer).
- CSS (site head): slova u `.svc-case_muted` i `.text-reveal_muted` zadržavaju svoju boju.
- Nova klasa `text-reveal_muted` (Style Manager), boja rgba(255,255,255,0.4).
- CMS Our Works, polje „Story label“ (`fade-in-text`): znak `|` označava gde počinje sivi deo.
  - Ballerine: „How nues rebuilt compliance into a site the marketing team runs alone.“ → „How nues rebuilt compliance | into a site the marketing team runs alone.“
  - Shiftolic: „From first call to a live healthcare brand in a single sprint“ → „From first call to a live healthcare brand | in a single sprint“
  - Podela je ista kao u Figmi i kao na servisnim stranicama. Objašnjenje polja je dopunjeno.
  - U Our Work tabovima skripta pretvara `|` u sivi `ow-cs_muted` deo. Za Ballerine je to ista podela kao i pre, a gde nema `|`, ostaje pravilo „prva trećina tamna“. Znak `|` se nigde ne prikazuje.

**2. Home „Four ways“ tabovi na tabletu i telefonu**
- Ranije: red tabova se skrolovao u stranu, prvi tab je bio odsečen na 820.
- Sada su ispod 992 px sva četiri taba u mreži 2×2, sa prelomom teksta, bez skrolovanja.
- Style Manager:
  - `.home-ways_tabs` @medium: display flex → grid, kolone 1fr 1fr, `grid-auto-rows` 1fr, row-gap 0.375rem, `overflow-x: auto` i `overflow-y: hidden` uklonjeni;
  - `.home-ways_tabs` @small: row-gap 0.25rem;
  - `.home-ways_tab` @medium: white-space nowrap → normal;
  - `.home-ways_tab-text` @small: line-height 1 → 1.15.
- Home page footer, skripta Four ways (`moveLine`): beli pill se sada pomera i po visini (translate x i y, plus visina taba), pa prati aktivni tab i u drugom redu. Na desktopu je isti kao pre.
- Kopija pre izmene: `backup/page-code/2026-11-13/home-footer.html`, nova verzija: `webflow-assets/site-code/home-footer.html`.

**3. Case stranice, H1 u heroju**
- Nova combo klasa `is-balanced` (`text-wrap: balance`) dodata na H1 u šablonu Our Works.
- Ballerine sada ide u 3 reda kao u Figmi („A risk platform the / marketing team / now runs on its own“). Shiftolic ide u 3 ujednačena reda, bez „weeks.“ samog na kraju.

**4. Blog, istaknuti slider**
- `.ins-featured_overlay`, desktop:
  - vertikalni prelaz kreće ranije i jači je (0 do 30%, pa 0.38, 0.62, 0.8, 0.9);
  - dodato tamnjenje sleva (0.5 → 0.14), gde stoji tekst.
- `.ins-featured_overlay`, telefon (@small): jedan vertikalni prelaz od 0.25 do 0.92.
- Stara vrednost je u `backup/styles/2026-11-13-before-qa-fixes.json`.

**5. SEO & AEO, koraci**
- Tab 3 „Build“ je sada „Structure“, isto kao naslov njegovog panela.

**6. Površina za dodir**
- `.button` @medium: min-height 2.75rem (44 px). „Book an intro call“ na telefonu je sa 32 px porastao na 44 px, a isto važi za sva bela dugmad ispod 992 px.
- Site head CSS dodaje nevidljiv okvir oko malih elemenata, bez promene izgleda:
  - linkovi u footeru (40–43 px);
  - strelice testimonijala na Let's talk (40 px, `overflow` je zato `visible`);
  - tačke slidera na blogu (44 px visine).
- Trake Our Work slidera (4 px) nisu proširene: oba pseudo-elementa već koriste za animaciju.

Site head: 36.465 → 38.939 znakova. Čitljiva verzija `webflow-assets/site-code/site-head.html`, minifikovana `site-head.min.html`.

Provereno lokalno pre objave (staging HTML sa novim kodom), pa na staging-u (objava 00:44 UTC), na 1440, 820 i 390:
- head i Home footer su bajt po bajt isti kao lokalni fajlovi;
- Home: dvobojni tekst (belo `rgb(255,255,255)`, sivo `rgba(255,255,255,0.4)`), bez `|`;
- tabovi: mreža na 820 i 390, pill tačno preko aktivnog taba, bez skrolovanja;
- dugmad su 44 px na 820 i 390;
- servisne stranice: dvobojni naslov na vidljivom slajdu;
- SEO tabovi glase Audit / Research / Structure / Content / Grow;
- Our Work: bez `|`;
- nema JS grešaka ni širenja strane.

## 13.11.2026: SEO korak 1, site head kod skraćen sa 49.223 na 36.465 znakova (objavljeno na staging)
Prvi korak SEO faze, po tvom „ajmo onda seo“. Bez vizuelne promene i bez promene ponašanja.

| Gde | Pre | Posle |
|---|---|---|
| Site settings → Custom code → Head | 49.223 od 50.000 znakova: čitljiv kod sa komentarima i razmacima, 28 blokova (CSS, skripte, HTML komentari) | 36.465 znakova (−12.758, −26%). Isti blokovi istim redom: CSS i skripte minifikovani alatom esbuild, HTML komentari uklonjeni, na vrhu jedan komentar koji upućuje na čitljivu verziju. GA4 skripta je ostala ista |

Zašto:
- Head je bio skoro pun (777 znakova slobodno), pa nije bilo mesta ni za šta novo. Sada ima 13.535 slobodnih.
- Ovaj kod ide uz svaku stranicu sajta. Svaka stranica je sada lakša za oko 12,7 KB (Home 302.424 → 289.666 bajtova HTML-a).

Fajlovi:
- Kopija pre izmene: `backup/page-code/2026-11-13/site-head.html` (isto kao `backup/site-code.json` od 10.11.).
- Čitljiva verzija, koja se ubuduće menja: `webflow-assets/site-code/site-head.html`.
- Ono što je u Webflow-u: `webflow-assets/site-code/site-head.min.html`.
- Alat: `webflow-assets/site-code/tools/minify.js` (`node minify.js site-head.html site-head.min.html "<komentar>"`, traži esbuild 0.24) i `compare-css.js` za proveru.

Provera pre objave (lokalno, ista stranica sa starim i sa novim head kodom):
- CSS: svih 260 pravila je isto kad ih pregledač pročita. Tri pravila su drugačije zapisana, ali znače isto (`300ms` = `0.3s`, senka bez nultog „spread“).
- 15 stranica (sve vrste): isti DOM posle skripti, isti screenshot, bez JS grešaka. Jedine razlike su bile animacija kucanja na /services i slika koja se jednom nije učitala; obe se javljaju i kad se stari kod uporedi sam sa sobom.
- Sa uključenim animacijama i klikovima (Home i Design & Development) sve se ponaša isto:
  - reveal animacije;
  - „Every project“ galerija: otvaranje, strelica, Esc;
  - video popup;
  - autoplay tabovi recenzija;
  - ponašanje skrola posle ponovnog učitavanja.

Provera posle objave (staging, objava 13.11. 00:24 UTC):
- head u objavljenom HTML-u je bajt po bajt isti kao `site-head.min.html`;
- 18 stranica na 1440 i 390: bez JS grešaka iz koda sajta i bez širenja strane, a galerije su na mestu.

## 12.11.2026: Service FAQ komponenta, tekst se menja po stranici preko property-ja (objavljeno na staging)
Po tvom zahtevu („da se tekst u faq-u componenti moze menjati u zavisnosti od page-a, preko properties“). Bez vizuelne promene: podrazumevane vrednosti su isti tekstovi koji su bili na sajtu.

| Gde | Pre | Posle |
|---|---|---|
| Komponenta Service FAQ (`5896a28a-03e8-6426-c47f-4bc3a414ebeb`), 5 instanci: Services, Design & Development, Webflow Development, SEO & AEO, Growth | jedini property Variant; naslov, 6 pitanja i 6 odgovora upisani u komponentu, isti na svih 5 stranica | 13 novih tekstualnih property-ja: Heading (grupa Heading, Enter = novi red) i Question 1–6 / Answer 1–6 (grupe FAQ 1–FAQ 6). H2, `svc-faq_q-text` i `svc-faq_a-text` su vezani za njih. Variant je ostao |

Dopuna istog dana, po tvom zahtevu („dodaj i prekidace“): 6 prekidača **Show FAQ 1–6** (u grupama FAQ 1–FAQ 6, podrazumevano uključeni), vezanih za vidljivost svakog `svc-faq_item`. Isključeno pitanje se uopšte ne pojavljuje u HTML-u stranice.
Test na staging-u: na Growth sam privremeno isključio FAQ 6 → stranica je imala 5 pitanja, otvaranje je radilo i nije bilo JS grešaka, a SEO & AEO je i dalje imao 6. Posle testa je prekidač vraćen na podrazumevanu vrednost i sajt ponovo objavljen. CSS ne zavisi od prvog/poslednjeg pitanja (gornja ivica je na listi, donja na svakom pitanju), pa izgled ostaje ispravan sa manje pitanja.

Šta nije property: red „Something else on your mind? Ask it on the call“ (isti na svim stranicama). FAQ na Pricing i Webflow Integrations nije ova komponenta, pa se tamo tekst menja direktno na stranici.
Backup komponente pre izmene: `backup/components/service-faq-2026-11-12.json`.

Provereno na staging-u (objava 23:20 UTC): na svih 5 stranica naslov (sa prelomom reda), pitanja i odgovori su identični kao pre izmene, a `data-svc-faq` atributi su ostali; klik na pitanje i dalje otvara odgovor, bez JS grešaka.

## 12.11.2026: Our Work slider videi prebačeni sa GitHub-a (jsDelivr) na Webflow (objavljeno na staging)
Po planu koji smo dogovorili. Ti si na novoj Draft stranici „Slider videos“ (`6af6466b9f4f3eaa0bb1fa80`) dodao 4 Background Video elementa i u njih otpremio videe. Webflow ih čuva kao asset-e, a ja sam njihove linkove upisao u CMS.

| Gde | Pre | Posle |
|---|---|---|
| CMS Our Works, polje „Slider video“ (`slider-video-2`), TrakPro (`6aba6bc07d6279b4b561798e`) | `https://cdn.jsdelivr.net/gh/lukaradomirovic67-ux/shiftolic@46bba2e…/webflow-assets/ourwork-video/trakpro-slider.mp4` | `https://cdn.prod.website-files.com/6aba6bc07d6279b4b561771f/6af646bf70e562225ced8c49_trakpro-slider.mp4` |
| isto, Sustain Commercial Solar (`6aba6bc07d6279b4b561798c`) | jsDelivr `…/sustain-slider.mp4` | `https://cdn.prod.website-files.com/6aba6bc07d6279b4b561771f/6af646c4deb177f9145906ae_sustain-slider.mp4` |
| isto, Shiftolic (`6aba6bc07d6279b4b561798b`) | jsDelivr `…/shiftolic-slider.mp4` | `https://cdn.prod.website-files.com/6aba6bc07d6279b4b561771f/6af646caa0271d7cf124d95c_shiftolic-slider.mp4` |
| isto, Ballerine (`6aba6bc07d6279b4b5617989`) | jsDelivr `…/ballerine-slider.mp4` | `https://cdn.prod.website-files.com/6aba6bc07d6279b4b561771f/6af646d045263033b2f2e934_ballerine-slider.mp4` |

Stare vrednosti su u `backup/cms-items/our-works-slider-video-2026-11-12.json`.
Koristim originalne fajlove koje si otpremio, a ne Webflow-ove preračunate verzije, pa nema dodatne kompresije.

Provereno:
- svaki fajl sa Webflow servera je bajt po bajt isti kao original (md5). Server podržava preskakanje unutar videa i šalje ga sa keširanjem od godinu dana;
- na staging-u slider na Our Work čita nove linkove, a linkova ka GitHub-u za videe više nema;
- videi se puštaju (u testu zamenjeni probnim WebM-om, jer test pregledač nema H.264), traka prati video, klik na traku menja slajd, 1440 i 390, bez JS grešaka;
- stranica „Slider videos“ je Draft i na staging-u vraća 404;
- Home, About, Services, Pricing, Careers, Resources, Blog i Let's talk ne učitavaju ništa iz GitHub repozitorijuma.

Stranicu „Slider videos“ ne treba brisati. Novi video za slider se dodaje isto: Background Video na toj stranici, pa link u polje „Slider video“.

## 12.11.2026: Our Work hero slider vraćen na CMS (objavljeno na staging)
Po tvom zahtevu („stani aj ipak da budu cms“). Poništava izmenu ispod („slider bez CMS-a“). Izgled i ponašanje su isti kao pre nje.

| Gde | Pre (statična verzija) | Posle (vraćeno) |
|---|---|---|
| Our Work (`6aba6bc07d6279b4b56176fe`), slider na vrhu | 4 statične liste (TrakPro, Sustain, Shiftolic, Ballerine) sa tekstom upisanim u Designer-u | ponovo 4 CMS liste iz Our Works, filter „Show in Our Work slider“ = On, sort po Name opadajuće: adrese (`ow-hh`), slajdovi (`ow-hs`), trake (`ow-hs-bars`) i logo sa oblašću i linkom (`ow-hm`). Sve je vezano za CMS polja kao ranije: Cover image, Logo color, Industry, Stat 1, Website link, Slug, Case title |
| Video u slajdu | Background Video ili `data-video-src` na slajdu | skriveni `.ow-hs_video-src` u slajdu, atribut `data-video-src` vezan za CMS polje „Slider video“ (kao ranije) |
| Our Work, page head i footer | statična verzija | vraćeni bajt po bajt iz `backup/page-code/2026-11-12/our-work-head.html` i `our-work-footer.html` |
| CMS Our Works, objašnjenja polja „Show in Our Work slider“, „Slider video“, „Logo color“ | „više se ne koriste“ | vraćena originalna objašnjenja |

`webflow-assets/site-code/our-work-page-head.html` i `our-work-page-footer.html` su ponovo originalne verzije.
4 naslovne slike koje sam dodao za statičnu verziju (`ow-slider-trakpro/sustain/shiftolic/ballerine.avif`, ID `6af63e8bee2922a92fa42d7b`, `6af63e8d5eeab28b8fb68410`, `6af63e8f536bacf6900a8d79`, `6af63e908719bf715ca01ca9`) obrisane su iz Assets po tvojoj potvrdi. Pre brisanja sam proverio da ih Our Work na staging-u nigde ne koristi. Izvorne slike su i dalje u CMS polju Cover image.

Provereno na staging-u (1440 i 390):
- head i footer u objavljenom HTML-u su identični backup fajlovima;
- 4 slajda, adrese bez https:// i www., logoi u boji, „View project“ vodi na /our-work/<slug>;
- videi (zamenjeni probnim WebM-om, jer test pregledač nema H.264) se puštaju, klik na traku menja slajd;
- nema JS grešaka (u konzoli su samo blokirani spoljni servisi test okruženja).
Napomena: „View project“ u sirovom HTML-u ima `href="#"`, a skripta ga u pregledaču menja u /our-work/<slug>. Tako je bilo i pre (isto važi za karticu u sekciji „What they had“). Ide na listu za SEO fazu.

## 12.11.2026: Our Work hero slider bez CMS-a, pripremljen za videe u Webflow-u (objavljeno na staging)
Po tvom zahtevu („napravi ovu sekciju da ne bude cms i tako ubaci video snimke“). Izgled je isti kao do sada.

| Gde | Pre | Posle |
|---|---|---|
| Our Work (`6aba6bc07d6279b4b56176fe`), slider na vrhu | 4 CMS liste filtrirane poljem „Show in Our Work slider“: adrese (`ow-hh_wrap`), slajdovi (`ow-hs_wrap`), trake (`ow-hs-bars_wrap`) i logo sa linkom (`ow-hm_wrap`). Video je dolazio iz polja „Slider video“ (jsDelivr) | iste 4 liste kao obični elementi, sa istim klasama: TrakPro, Sustain, Shiftolic, Ballerine, istim redom. Tekstovi, brojevi, oblasti i linkovi („View project“ → /our-work/<slug>) su upisani u Designer-u. CMS liste su obrisane |
| Slike slajdova i logoi | iz CMS polja Cover image i Logo color | Webflow asseti: 4 nove naslovne slike (`ow-slider-*.avif`), logoi su postojeći asseti `logo-color-*-v2.svg`. Upload je tim logoima privremeno promenio ime; vraćena su originalna imena, a alt tekst je ime klijenta |
| Video | skripta je pravila `<video>` iz CMS linka | skripta prvo traži Webflow „Background Video“ u slajdu (klasa `ow-hs_video`), a ako ga nema, koristi link iz atributa `data-video-src` na slajdu (sadašnji jsDelivr linkovi, privremeno) |
| Our Work, page head | — | `.ow-hs_video` dobija `isolation:isolate`, a Webflow-ovo dugme za pauzu u Background Video elementu je sakriveno, jer slider kontrolišu trake. Komentari su usklađeni |
| Our Work, page footer (skripta slidera) | čita `.ow-hs_video-src` iz CMS-a | čita Background Video ili `data-video-src`. Gasi autoplay, pa se pušta samo video aktivnog slajda. Ostalo je isto: slajd traje koliko video, traka prati video, bez videa 6 sekundi. Komentari su usklađeni |
| CMS Our Works | — | u objašnjenje polja „Show in Our Work slider“, „Slider video“ i „Logo color“ upisano je da se više ne koriste. Polja nisu brisana |

Kopija koda pre izmene: `backup/page-code/2026-11-12/our-work-head.html` i `our-work-footer.html`. Nova verzija: `webflow-assets/site-code/our-work-page-head.html` i `our-work-page-footer.html`.
Lokalni test, sa probnim WebM videom u obe varijante (Background Video i `data-video-src`):
- video se pušta preko slike, traka prati video, a na kraju videa prelazi se na sledeći slajd;
- klik na traku menja slajd;
- pušta se samo aktivni video, a Webflow-ovo dugme za pauzu je skriveno;
- nema JS grešaka.
Provereno na staging-u (1440 i 390):
- head i footer kod su isti kao lokalni fajlovi i nema više CMS lista u slideru;
- adresa, oblast, link i slika se menjaju zajedno sa slajdom, video se pušta;
- nema JS grešaka ni širenja.

Sledeći korak (ručno, Webflow ne dozvoljava upload videa preko API-ja): u svaki slajd ubaciti Background Video i u njega odgovarajući video. Posle toga dodajem klasu, uklanjam `data-video-src` (jsDelivr) i objavljujem.

## 12.11.2026: 5 case stranica bez napisanog case-a: noindex i preusmerenje na sajt klijenta (objavljeno na staging)
Po tvom zahtevu, kako sam predložio na pre-launch listi (1.3). Bez vizuelne promene na sajtu.

Stranice /our-work/biotech-innovations, lasalle-agri, hypersonix, harper i intaker nemaju Case title ni tekst. Do sada su bile javne, bez title-a, opisa i H1.

| Gde | Pre | Posle |
|---|---|---|
| Our Works Template (`6aba6bc07d6279b4b56176ff`), page head, na vrhu | nema | skripta sa CMS poljima Case title (`heading`) i Website link (`website-link`): ako je Case title prazan, stranica dobija `<meta name="robots" content="noindex">` i odmah šalje posetioca na sajt klijenta (`location.replace`, bez unosa u istoriju pregledača). Ako nema linka, šalje na /our-work. Ostatak head koda je nepromenjen |

Čim se nekom projektu popuni Case title, stranica radi normalno, bez ikakve druge izmene.
Kartice na sajtu za ovih 5 projekata već vode na sajt klijenta: skripta menja link u pregledaču, a u sirovom HTML-u href i dalje pokazuje na case stranicu. Zato je preusmerenje važno i za Google.
Webflow-ovo 301 preusmerenje ovde ne radi, jer stranica postoji dok je stavka objavljena. Draft bi sklonio ove projekte iz svih lista na sajtu.

Kopija head koda pre izmene: `backup/page-code/2026-11-12/our-works-template-head.html`. Nova verzija: `webflow-assets/site-code/our-works-template-head.html`.
Provereno na staging-u:
- u HTML-u svih 5 praznih stranica stoji `t=""` i tačan link sajta;
- u pregledaču svaka od njih završi na sajtu klijenta (biotechinnovationsag.com, lasalleagri.com, hypersonix.com.au, harperinsure.com, intaker.com);
- 5 napisanih (TrakPro, Veyor, Sustain, Shiftolic, Ballerine) ostaju na svojoj stranici, bez noindex-a i sa svojim H1;
- apostrof u naslovu („TrakPro's“) Webflow upisuje kao `&#39;`, pa ne kvari skriptu.
Kad se pri lansiranju uključi automatski sitemap, ovih 5 adresa će biti u njemu. Google će ih videti kao noindex i preusmerenje i neće ih indeksirati.

## 12.11.2026: Careers, koverta u praznom stanju se otvara kao kartice pozicija (objavljeno na staging)
Po tvom zahtevu („da i ovo ima animaciju kao i kada imamo pozicije“). Koverta je sada zatvorena, a otvara se na prelaz mišem i na fokus tastaturom: preklop se podigne, pa izađe pismo. Kad skloniš miša, zatvara se. Na telefonu i tabletu je otvorena, kao i kartice pozicija.

| Gde | Pre | Posle |
|---|---|---|
| Style Manager, combo na `careers-job_card` | `is-open` | preimenovan u `is-empty` (isti stilovi: max 645px, centrirana, ≤767 odnos 645/450, ≤479 kvadrat) |
| Careers, page head, blok „Empty state“ | 5 pravila koja drže kovertu stalno otvorenom (`.careers-job_card.is-open …`) | uklonjena; koverta koristi ista pravila kao kartice pozicija. Razmak iznad liste, sakriveni filteri i „Don't see your role?“ ostaju |

Kopija head koda pre izmene: `backup/page-code/2026-11-12/careers-head-empty-open.html`. Nova verzija: `webflow-assets/site-code/careers-page-head.html`.
Provereno na staging-u:
- head kod je isti kao lokalni fajl;
- desktop: zatvorena koverta (pismo unutra, tekst sakriven), na prelaz mišem se pismo podigne do 100px ispod naslova, kao u Figmi; kad se miš skloni, koverta se zatvori;
- od koverte do dugmeta je 100px;
- klik otvara prijavu „Open application“;
- telefon: koverta je otvorena, bez širenja;
- nema JS grešaka.

## 12.11.2026: Careers, prazno stanje za pozicije (Figma 8664:32) i brisanje pozicija iz CMS-a (objavljeno na staging)
Po tvom zahtevu. Od sada svaku izmenu odmah objavljujem na staging (webflow.io), po tvojoj odluci 12.11.

Kad u kolekciji Jobs nema nijedne stavke, Webflow umesto liste prikazuje njen „Empty State“. Tu je sada ista koverta kao kartice pozicija, ali stalno otvorena. Na pismu piše „Open application“ i „Tell us what you do best...“, a na koverti „No open roles right now“ i rečenica ispod. Klik na kovertu otvara isti popup kao „Send an open application“. Filteri i rečenica „Don't see your role?“ se tada ne prikazuju, a dugme ostaje. Čim se doda prva pozicija, sve se vraća na listu sa filterima.

| Gde | Pre | Posle |
|---|---|---|
| Careers (`6ada16efb73db28b0b5cbad8`), Empty State liste pozicija (`3b55563a-…4885`) | tekst „No open roles right now. Send us an open application below.“ (`d3663aa6-…5e68`, uklonjen) | koverta `careers-job_card is-open` (`71a40307-…f7a9`) sa postojećim delovima koverte (`careers-job_back`, `_letter`, `_pocket`, `_flap`, `_content`, `careers-card_title`, `careers-card_text`). Link je `mailto:hello@nues.agency?subject=Application: Open application` (radi i bez JS-a), atributi `data-job-role="Open application"`, `data-job-text="Any role, any team"`, `data-reveal` |
| Style Manager, nove klase | nema | `careers-jobs_empty-label` (20px, 60% navy), `careers-jobs_empty-note` (18px medium navy, max 357px), combo `careers-job_card is-open` (max 645px, centrirana; ≤767 odnos 645/450, ≤479 kvadrat, da tekst stane na telefonu), combo `careers-card_text is-narrow` (max 453px, prelom kao u Figmi) |
| Style Manager, `careers-jobs_empty` | providnost 60%, padding 2rem, centriran tekst 20px | samo boja (bela) i padding 0 (inače Webflow dodaje svoj podrazumevani od 10px); izgled nosi koverta |
| Careers, page head | koverta otvorena samo na hover / dok je popup otvoren | dodat blok „Empty state“: `is-open` drži kovertu otvorenom; razmak iznad liste je tačno visina podignutog pisma (kao u Figmi: 100px od naslova do pisma); filteri i „Don't see your role?“ se kriju preko `:has(.careers-jobs_empty)`. Klik na karticu sada čita `data-job-role` / `data-job-text` pre naslova kartice |
| CMS Jobs (`6ada1b11e40ddb96b7a870e0`) | 4 objavljene pozicije: Senior Webflow Developer, Product Designer, SEO & AEO Specialist, Junior Webflow Developer | sve 4 obrisane. Kopija: `backup/cms-items/jobs-2026-11-12.json` |

Kopija head koda pre izmene: `backup/page-code/2026-11-12/careers-head.html`. Nova verzija: `webflow-assets/site-code/careers-page-head.html`.
Lokalni test (stranica sa staging-a, lista zamenjena praznim stanjem) na 1440, 992, 820, 767, 600, 480, 390 i 360: razmaci kao u Figmi (100px na desktopu), tekst nigde ne ulazi pod kovertu, nema širenja ni JS grešaka; klik na kovertu otvara popup sa „Open application“.
Objavljeno na staging 12.11. Posle objave je razmak bio 10px veći (podrazumevani padding praznog stanja u Webflow-u). Postavio sam padding na 0 i ponovo objavio.
Provereno na staging-u:
- nema nijedne pozicije, a prazno stanje se prikazuje;
- head kod na staging-u je isti kao lokalni fajl;
- od naslova do pisma i od koverte do dugmeta: 100px na 1440, 64px na 820 i 48px na 390, isto kao razmak sekcije;
- filteri i „Don't see your role?“ su sakriveni;
- klik na kovertu otvara prijavu „Open application“ (i skriveno polje Role);
- link radi i bez JS-a (`mailto:…?subject=Application: Open application`);
- nema JS grešaka ni širenja.

## 12.11.2026: Resources hero, Case studies broji samo napisane case studije (objavljeno na staging)
Po tvojoj odluci („daj samo broj ovih koji imaju da se čitaju“). Ranije je broj bio „10“, tj. sve stavke Our Works. Sada broji samo stavke koje imaju popunjen „Case title“ (napisan case): TrakPro, Veyor, Sustain, Shiftolic i Ballerine, ukupno 5. Pythagora ima Case title, ali je u draftu, pa se ne broji.

| Gde | Pre | Posle |
|---|---|---|
| Resources, skrivena CMS lista za broj case studija, Collection Item (`69db27ac-…a251`) | bez atributa | atribut `data-res-written`, povezan na polje Our Works „Case title“ (`heading`) |
| Resources, `res-hero_stat-value` u statu Case studies | `81030941-…7e9` sa tekstom „10“ | nov element `0ba4b88e-…9133`, ista klasa i `data-res-count="case"`, tekst „5“; stari je uklonjen |
| Resources, page footer, skripta hero-a (red za broj) | `n=src.querySelectorAll('.w-dyn-item').length` | za `case` broji samo stavke sa nepraznim `data-res-written`; Insights se broji kao i do sada. Komentar iznad skripte to opisuje |

Kopija footer koda pre izmene: `backup/page-code/2026-11-12/resources-footer.html`. Nova verzija: `webflow-assets/site-code/resources-page-footer.html`.
Kad se napiše novi case (popuni se Case title i objavi), skripta ga sama ubraja; početni broj u Designer-u treba uskladiti ručno.

Objavljeno na staging (webflow.io) 12.11. Provereno posle objave, na 1440 i 390: u HTML-u case=5 i insight=21, posle skripte „21 Insights | 5 Case studies“. Od 10 stavki u listi, 5 ima Case title (TrakPro, Veyor, Sustain, Shiftolic, Ballerine). Footer kod na staging-u je isti kao lokalni fajl. Nema JS grešaka ni širenja.

## 12.11.2026: Resources hero, početni broj Insights usklađen sa CMS-om (objavljeno na staging)
Brojeve u hero-u skripta računa iz skrivenih CMS lista (objavljeni blogovi i Our Works). U samom HTML-u (pre skripte, za Google i Designer) je za Insights stajalo „20“.

| Gde | Pre | Posle |
|---|---|---|
| Resources, `res-hero_stat-value` u statu Insights | `81030941-…7e2` sa tekstom „20“ (API ne menja tekst u Block elementu) | nov element `e2d365bd-…5d22`, ista klasa i `data-res-count="insight"`, tekst „21“; stari je uklonjen |

Provereno na staging-u posle objave: HTML insight=21, case=10; posle skripte isto; u CMS listama 21 i 10 stavki.
Kad se objavi novi post, skripta i dalje sama upisuje tačan broj, a početni broj u Designer-u treba povremeno uskladiti.

## 12.11.2026 (veče): objava na staging (webflow.io)
Pre objave sam integraciju (Salesforce) i 5 kategorija skinuo sa staging-a (unpublish). Provereno na staging-u:
- /webflow-integrations, /integrations/webflow-salesforce-integration i /integrations-category/crm-integrations vraćaju 404;
- Resources (1440 i 390): nema meta robots, hero ima dva broja (21 Insights, 10 Case studies), nema kartica ni sekcije integracija, nema linkova ka integracijama, bez JS grešaka i bez širenja;
- navbar Resources dropdown: Resources, Insights, Careers (bez Integrations);
- Careers: dugme „See open roles ↗“ vodi na #open-roles, a posle klika je sekcija na vrhu ekrana.

## 12.11.2026: Resources indeksirana, integracije sakrivene do pisanja, Careers dugme
Po tvojoj odluci. Nije objavljeno.

| Gde | Pre | Posle |
|---|---|---|
| Resources (`6aba6bc07d6279b4b5617709`), page head | prvi red `<meta name="robots" content="noindex">` | red uklonjen (ostala tri `<style>` bloka su nepromenjena) |
| Resources, hero | 3 broja (Insights, Case studies, Integrations) i 8 kartica sa logoima integracija | sakriveno (visibility off): broj „15 Integrations“ (`81030941-…7f4`), razdelnik ispred njega (`…7ee`), 8 kartica `data-res-card="integration"` (`…7f8`, `7fb`, `7fe`, `801`, `805`, `808`, `80b`, `80e`) |
| Resources, sekcija „Integrations“ (`#integrations`, `ccd50ea3-…a070`) | vidljiva, sa linkom „See all integrations“ | sakrivena (visibility off) |
| Navbar komponenta, Resources dropdown, link „Integrations“ (`41235d66-…53d5`) | vidljiv, vodi na /webflow-integrations | sakriven, da nijedan link ne vodi na stranicu u draftu |
| Webflow Integrations (`6ae0d85d4a2c075c26d111c8`) | objavljena, indeksirana | page head počinje sa `<meta name="robots" content="noindex">` i stranica je **draft** |
| CMS Integrations (1 stavka, Salesforce) i Integrations categories (5) | isDraft false, objavljene | isDraft true. Kopija stanja: `backup/cms-items/integrations-2026-11-12.json`. Pri sledećoj objavi ih skidam sa staging-a (unpublish), jer Webflow inače drži objavljenu verziju |
| Careers (`6ada16efb73db28b0b5cbad8`), hero dugme (`aa620b12-…b5b6`) | „Back to home ↗“, link na Home | „See open roles ↗“, link na sekciju sa pozicijama (`section_careers-jobs`, dobila id `open-roles`). Strelica je ponovo dodata sa postojećom klasom `button_icon` |

Sakriveno je preko „visibility“, ništa nije obrisano. Kad integracije budu napisane, uključi elemente i stavke, a stranici skini draft i noindex.
Lokalni test Resources bez ovih elemenata (1440 i 390): hero radi sa dva broja, kartice se pune blogovima i case studijama, bez JS grešaka i bez širenja.

## 12.11.2026: objava na staging (webflow.io, bez custom domena)
Objavljeno je pet izmena: logoi na Resources, paginacija na blogu, „Copy link“, tabovi na Our Work i tačke u pravnim listama. Proverio sam ih na staging-u posle objave:
- Resources: svih 8 logoa u hero karticama su SVG i učitavaju se;
- Blog: page head je identičan lokalnom fajlu; brojevi „2“ i „3“ su rgba(13,25,40,.7), aktivni je beo na tamnom;
- blog post: footer kod je identičan lokalnom fajlu; „Copy link“ nema href, ima role=button i tabindex 0;
- Our Work: neaktivni logo ima jednu providnost (0.4, filter bez opacity), izgleda kao u Figmi;
- Privacy i Terms: tačka je na 1.92px 20.64px, veličine 7.68px (.08em .86em / .32em pri 24px).

## 12.11.2026: slike koje su čekale Designer (MCP app)
Designer je bio otvoren, pa sam prošao listu iz `notes/pre-launch-2026-11-11.md`. Pre svake zamene sam izmerio prikazanu veličinu i rezoluciju trenutne slike. Nije objavljeno.

| Element | Pre | Posle |
|---|---|---|
| Resources (`6aba6bc07d6279b4b5617709`), 8 logoa u hero karticama (`res-hero_card-logo`: Discord, Zapier, Calendly, Airtable, Slack, Stripe, Shopify, Make) | AVIF raster, 300–436 px za prikaz od 129–155 px | SVG iz `webflow-assets/site-hq/integ/` (nova sredstva `6af62093…`, `6af62095…`, `6af62096…`, `6af62098…`, `6af62099…`, `6af6209b…`, `6af6209c…`, `6af620a3…`), uz alt tekst. Izgled je isti, provereno uporedo |

Bez zamene, jer je trenutna slika već dovoljno oštra (rezolucija / prikaz):
- About fotografija: 1400 px / 445 px (3×);
- ilustracija u navbaru: 610 px / 100 px;
- Shiftolic ekran u Service Cases: 1440 px / 506 px. Zamenjen je ranije, pri prepravci Service Cases;
- beli logoi Intaker i Ballerine u video karticama: 428 px / 86–147 px;
- Resources pločice i Stripe logo: SVG su već ubačeni ranije;
- Todoist logo na Webflow Integrations: kartice sada uzimaju logo iz CMS-a, pa se stara slika više ne koristi.

Stara sredstva nisu obrisana (brisanje samo uz tvoje odobrenje).

## 11.11.2026: sitne greške pre lansiranja (blog, Our Work, pravne stranice)
Nije objavljeno. Kopije koda pre izmene su u `backup/page-code/2026-11-11/` (blog, detail_blog). Pravne stranice su pre izmene imale samo `<meta name="robots" content="noindex">`.

| Gde | Pre | Posle | Zašto |
|---|---|---|---|
| Blog (`6aba6bc07d6279b4b5617705`), page head, `.ins-page_num` | `color:#fff` na 15% navy (kontrast 1,4:1) | `color:rgba(13,25,40,.7)`, na hover `#0d1928` (kontrast oko 5,6:1) | brojevi „2“, „3“ su izgledali isključeno. U Figmi (5506:15416) su takođe beli, pa je ovo najmanja izmena: pozadina ista, menja se samo boja broja |
| Blog post šablon (`6aba6bc07d6279b4b5617706`), page footer, `share()` | „Copy link“ je `<a href="#" role="button">`, Space ne radi | bez `href`, `role=button`, `tabindex=0`, Enter i Space kopiraju link | pravo dugme za tastaturu i čitače ekrana; izgled isti |
| Our Work, stil `ow-cs_tab-logo` (native), `filter` | `… contrast(138%) opacity(40%)` uz `opacity: .4` (dvostruko, oko 16%) | `… contrast(138%)` (ostaje samo `opacity: .4`) | neaktivni logoi u tabovima (Intaker, Veyor) su bili skoro nevidljivi. Sada su rgb(166,170,175), Figma 8420:1075 rgb(158,163,169) |
| Privacy (`…7704`) i Terms (`…7703`), page head | tačka u listi na donjoj liniji teksta, 5,6 px | `.legal-rich_text li{background-position:.08em .86em;background-size:.32em .32em}`, tačka na sredini reda, 6,1 px | kao u Figmi 6894:7515; provereno na 1440 / 820 / 390 |

Provereno, bez izmene:
- veliki navodnik iza Clutch bedža u recenzijama je tako i u Figmi (6663:4401);
- tačke u listama na blogu su već 10 px i na sredini reda;
- naslov istaknutog posta preko „VS“ grafike: raspored je kao u Figmi, a problem je u naslovnoj slici (Figma koristi fotografiju). Predlog je u porukama, bez izmene;
- sitni logoi LaSalle, Sustain i Hypersonix: treba bolji fajl loga, ne CSS. Ide u listu slika.

Lokalni testovi: „Copy link“ (Space i klik kopiraju, adresa bez `#`), tačke na tri širine. Snimak: `notes/previews/legal-bullets-1440.png`.

## 11.11.2026: objava na staging (webflow.io, bez custom domena)
Objavljene 4 izmene ispod: Side by side, širina na telefonu, Pricing oznake, hamburger. Provera na staging-u posle objave:
- Services: prekidač radi na 390 i 820 px, ikonice se učitavaju;
- širina na telefonu je 0 px viška na /services, /services/growth i /our-work (ranije 191 px);
- hamburger je 44×44;
- Pricing na 820 px nema preklapanja oznaka.

Kod embeda Service Numbers sa staging-a sačuvan je u `webflow-assets/site-code/service-numbers-embed.html`.

## 11.11.2026: Services, „Side by side“ na tabletu i telefonu postaje kartica
Stranica Services (`6ae0e4a4872d8069c67b0475`), sekcija `#compare`. Objavljeno na staging 11.11. Desktop je nepromenjen.

Pre: na ≤991 px cela tabela (1080 / 890 px) skrolovala se u stranu, bez znaka da ima još.
Posle: iznad tabele je prekidač sa 4 usluge (2×2 na telefonu, 4 u redu na tabletu). Ispod je samo izabrana usluga, kao jedna
tamna kartica u boji usluge. Svaki red ima naziv levo i vrednost desno, a na dnu je Explore link. Prevlačenje kartice levo ili
desno menja uslugu.

| Gde | Pre | Posle |
|---|---|---|
| Nov element (native) ispred `.services-compare_scroll` | — | `services-compare_switch` (role tablist) sa 4 `services-compare_pill` (ikonica iz biblioteke + tekst); prva ima combo `is-active` |
| Nove klase (native) | — | `services-compare_switch` (desktop display none, tablet grid 4 kolone, telefon 2 kolone), `services-compare_pill` (+ `is-active`: bela pozadina), `services-compare_pill-icon`, `services-compare_pill-text` |
| `.services-compare_component`, row gap | tablet 64px, telefon 48px | 32px (tablet i telefon) |
| Page head kod, red sa `@media (max-width:991px){.services-compare_scroll{scrollbar-width:thin}…}` | stari stil za skrolovanje | raspored kartice za ≤991 px (kolona `is-active`, boje po usluzi, `data-label` kroz `::before`), ≤479 px manji razmaci |
| Page footer kod, skripta „Side by side“ | — | prekidač poziva isti `set()` kao hover na desktopu, strelice na tastaturi, `data-label` na ćelijama, swipe na kartici |

Rezervna kopija koda pre izmene: `backup/page-code/2026-11-11/services.json`. Nov kod: `webflow-assets/site-code/services-page-head.html` i `services-page-footer.html` (posle upload-a je pročitan iz Webflow-a i identičan je).
Lokalni test (staging HTML sa novim kodom) na 390 / 820 / 1440 px:
- klik, strelice i swipe menjaju uslugu, a vertikalno skrolovanje ne menja;
- `aria-selected` prati izabranu uslugu;
- ništa nije šire od ekrana;
- na desktopu je prekidač sakriven, a hover radi kao pre.

Snimci: `notes/previews/services-compare-phone-390.png`, `…-phone-390-growth.png`, `…-tablet-820.png`.

## 11.11.2026: hamburger dugme, površina za dodir 44×44 (tablet i telefon)
Navbar komponenta, stil `navbar2_menu-button`, breakpoint medium (važi za tablet i telefon). Nije objavljeno.

| Svojstvo | Pre | Posle |
|---|---|---|
| padding | 0 (dugme = ikonica 24×18 px) | 13px 10px (dugme 44×44 px) |
| margin | 0 | -13px -10px (ikonica ostaje na istom mestu, navbar iste visine) |

Lokalni test na 390 i 820 px:
- dugme 24×18 → 44×44;
- položaj ikonice i visina navbara (57 px) su isti;
- dodir 7 px levo od ikonice sada otvara meni.

## 11.11.2026: Pricing, oznake ispod slidera na tabletu
Na 768–991 px prva oznaka („Design & Development“) bila je odsečena levo i preklapala se sa drugom. Telefon je već imao
ispravku, a tablet nije. Nije objavljeno.

| Stil | Breakpoint | Pre | Posle |
|---|---|---|---|
| `.pr-slider_label.is-launch` | tablet (medium) | nasleđeno sa desktopa: left 7.9%, centrirano (translate -50%) | left 0%, align-items flex-start, transform none (isto kao na telefonu) |
| `.pr-slider_label.is-build` | tablet (medium) | centrirano na 33.4% | align-items flex-start, transform none (počinje od svoje crtice, isto kao na telefonu) |

Lokalni test na 991 / 900 / 820 / 768 px: nema preklapanja ni sečenja. Desktop i telefon su nepromenjeni.
Snimak: `notes/previews/pricing-slider-tablet-820.png`.

## 11.11.2026: telefon, stranica šira od ekrana (Services, 4 servisne, Our Work)
Uzrok: sjaj iza prstenova (`.nr-box::before`, na telefonu 200% širine kutije) izlazio je do 191 px van ekrana, jer sekcija
sa prstenovima ima `overflow:visible` (potrebno da prstenovi ostanu zakucani pri skrolovanju, sticky). Nije objavljeno.

| Gde | Pre | Posle |
|---|---|---|
| Our Work, page head kod (`6aba6bc07d6279b4b56176fe`), `[data-ow-rings]{…}` i `.ow-numbers[data-ow-rings]{…}` | `overflow:visible` | `overflow-x:clip;overflow-y:visible` |
| Komponenta Service Numbers (`b93b6b62-…2724`), embed `e82b3ed3-…456b`, `[data-svc-rings]{…}` | `overflow:visible` | `overflow-x:clip;overflow-y:visible` |

`clip` seče samo ono što izlazi levo i desno i ne pravi scroll kontejner, pa sticky i dalje radi.
Lokalni test, pre → posle: višak 191 / 176 / 223 px (390 / 360 / 479) → 0 na svih 6 stranica.
Na 820 i 1440 nema promene. Prstenovi ostaju zakucani pri skrolovanju na svim širinama.
Kopija koda: `webflow-assets/site-code/our-work-page-head.html` (novo).

## 10.11.2026: Webflow Integrations, lista integracija po Figmi 7323:1440 (zahtev van SEO faza)
Stranica Webflow Integrations (`6ae0d85d4a2c075c26d111c8`). Objavljeno na staging 10.11. Provereno posle objave: 4 grupe (CRM
sakrivena), opis iz Figme, link vodi na /integrations/webflow-salesforce-integration i ima Glide hover. Ta stranica je i dalje
404 dok se šablon ne uključi (MANUAL_TASKS 7).

| Šta | Gde | Pre | Posle |
|---|---|---|---|
| Link na kartici | 5 šablona kartica (CMS liste po grupama), novi elementi `aa343d0e-…2c6c`, `51c65d63-…dfc0`, `0864e3a5-…dc26`, `fa81618f-…064c`, `b332f8f2-…3dc1` | nema | „See the case studies“ + krug sa strelicom (postojeće klase `ow-link-arrow`, `ow-link-arrow_text`, `ow-arrow-circle`), vodi na stranicu integracije `/integrations/<slug>` (`data-cms-slug` + `data-cms-base`, popravlja ga postojeća skripta u site footeru). Odluka korisnika 10.11.: link ide na stranicu integracije; šablon tih stranica treba uključiti ručno (MANUAL_TASKS 7), do tada je 404 |
| Grupa „CRM integrations“ | element `a3126e6a-…98a6` | vidljiva | sakrivena (Visibility off), jer je nema u Figmi; CMS kategorija ostaje |
| Opis Salesforce kartice | CMS Integrations, stavka `6aba6bc07d6279b4b56179af`, polje Short description | „Salesforce is one of the leading CRM solutions. See how you can use it with your Webflow project.“ | „Send every lead from Webflow straight into Salesforce, with the right owner and source.“ (tekst iz Figme) |

Stilovi kartica, naslova i mreže već su odgovarali Figmi (padding 25, radijus 16, naslov 32px, opis 18px, logo 145x50, razmaci 50 i 100) i nisu menjani.
Lokalni pregled: `notes/previews/integrations-list-desk.jpg`, `notes/previews/integrations-list-mob.jpg`.

## 10.11.2026: objava na staging (samo webflow.io, bez pravog domena)
Objavljene četiri izmene ispod: novi Vimeo snimci, Four ways tabovi, Intaker tab, pravilo za case linkove.
Provereno na stagingu posle objave:
- site footer kod na 4 stranice je identičan `webflow-assets/site-code/site-footer.html`;
- Intaker tab ima sve tri slike i rečenicu;
- svi case linkovi na Home, Our Work, Ballerine i TrakPro case i Growth vode tačno, nenapisani u novom tabu.

## 10.11.2026: case linkovi na celom sajtu (zahtev van SEO faza)
Pravilo: projekat vodi na svoju case stranicu samo ako je case napisan (popunjen „Case title“ u Our Works; sada Ballerine,
Shiftolic, Sustain, TrakPro, Veyor, plus Pythagora u draftu). Ostali (Intaker, Harper, Hypersonix, LaSalle, Biotech) otvaraju
svoj sajt („Website link“) u novom tabu; bez Website linka kartica nije link. Objavljeno na staging 10.11.

| Šta | Gde | Pre | Posle |
|---|---|---|---|
| Opšte pravilo | site footer kod (nova skripta „Case links (site-wide)“ na kraju) | nema | svaki CMS link sa `data-case` i `data-site` prati pravilo, i posle Finsweet prerenderovanja |
| Our Work, kartica u „What they had“ tabovima | Our Work, element `baec1d5d-…7b5a` | atributi: `data-slug` | `data-slug`, `data-case` (Case title), `data-site` (Website link) |
| Our Work, „View project“ u slajderu na vrhu | Our Work, element `f673ac00-…0d09` | `data-slug` | `data-slug`, `data-case`, `data-site` |
| „Ostali projekti“ na dnu case stranice | šablon Our Works, element `b566efbb-…7afe` | `data-slug` | `data-slug`, `data-case`, `data-site` |
| Every project info kartica | Home, element `b28d40f2-…6111` | bez atributa | `data-case`, `data-site` |

Već je radilo po ovom pravilu i nije menjano: Trusted (Home i servisne stranice), Home hero kartice, Our Work mreža projekata.
Service Cases na servisnim stranicama ima dve fiksne kartice (Ballerine, Shiftolic), nije CMS, obe su napisane.
Lokalni test (staging stranice + nove vrednosti atributa + novi footer kod): sve kartice vode tačno, nenapisani u novom tabu.

## 10.11.2026: Intaker tab u „What they had. What we shipped.“ na Our Work (zahtev van SEO faza)
CMS kolekcija Our Works (`6aba6bc07d6279b4b561771c`), stavka Intaker (`6ace660facdd65a7260ff9f7`).
Stanje pre izmene je u `backup/cms-items/intaker-2026-11-10.json`. Nije objavljeno. Raspored kodom i stilovima se ne menja,
tab se pojavljuje sam jer je sekcija CMS lista (filter „Show in Our Work tabs“, sortirano po imenu: Ballerine, Intaker, Veyor).

| Polje | Pre | Posle |
|---|---|---|
| Show in Our Work tabs | prazno | uključeno |
| Before screenshot | `intaker-before.webp` (2000x1143) | `ow-tabs-before-intaker.webp` (2400x1371), iz Drive-a „Image 8. 11. 2026. at 17.25“ |
| After screenshot | `intaker-after.webp` (2000x1143, stara „law firms“ verzija) | `ow-tabs-after-intaker.webp` (1080x617), iz Drive-a `3.png`, isečeno od vrha kao Ballerine |
| Tabs background | prazno | `ow-tabs-bg-intaker.webp` (2400x1600): Veyor tekstura prebojena u Intaker ljubičastu (nijansa 227° → 253°), jer Drive nema Intaker pozadinu |
| Story label | prazno | „How nues rebuilt Intaker's site around its new AI lead engagement product.“ (NACRT, čeka odobrenje) |
| Stat 1 | prazno | prazno (broj nemamo; vidi QUESTIONS.md) |

Lokalni pregled (staging stranica sa ubačenim Intaker tabom, bez objave): `notes/previews/our-work-intaker-tab-*.png`.

## 10.11.2026: novi video testimonijali (zahtev van SEO faza)
Site footer custom code (sajt `6aba6bc07d6279b4b561771f`), mapa `VIDEOS` u skripti „Video testimonials popup“.
Stanje pre izmene je u `backup/site-code.json` (footer). Nije objavljeno.

| Šta | Gde | Pre | Posle |
|---|---|---|---|
| Intaker video | `VIDEOS.intaker` | `https://vimeo.com/1242569944` | `https://vimeo.com/1245476052` |
| Ballerine video | `VIDEOS.ballerine` | `https://vimeo.com/1242533384` | `https://vimeo.com/1245476053` |

Razlog: nove verzije postojeća dva snimka (potvrdio korisnik: 53 = Ballerine, 52 = Intaker). Ostatak footer koda je isti
(diff ima samo ovaj red). Nijedan element nema svoj `data-video-src` sa starim ID-jevima, pa se nigde drugde ne menja.

## 10.11.2026: Home „Four ways“, tabovi po Figmi 8545:106 (zahtev van SEO faza)
Stranica Home (`6aba6bc07d6279b4b56176f1`). Stanje pre izmene je u `backup/page-code/6aba6bc07d6279b4b56176f1.json`.
Nije objavljeno.

| Šta | Gde | Pre | Posle |
|---|---|---|---|
| Traka tabova | stil `home-ways_tabs` (desktop) | justify space-between, align flex-end, gap 2rem, bez pozadine | justify flex-start, align stretch, gap .625rem, padding .3125rem, pozadina rgba(13,25,40,.05), ivica 1px rgba(13,25,40,.1), radijus 1rem |
| | `home-ways_tabs` tablet / telefon | gap 2rem / 1.5rem | gap .375rem / .25rem |
| Tab | stil `home-ways_tab` (desktop) | padding-bottom .875rem, flex 0 0 auto | padding .8125rem 1.5rem, flex 1 1 0%, centriran, radijus .75rem, position relative, z-index 1 |
| | `home-ways_tab` tablet / telefon | padding-bottom (telefon .75rem) | flex 0 0 auto, padding .75rem 1.25rem / .625rem 1rem |
| Tekst taba | stil `home-ways_tab-text` | 2rem / 1.375rem / 1.125rem | 1.375rem / 1.125rem / 1rem (desktop / tablet / telefon) |
| Pilula (bivša linija) | stil `home-ways_tab-line` | visina .25rem uz dno, boja usluge 22% | top i bottom .3125rem, bela, radijus .75rem, z-index 0 |
| Traka napretka | stil `home-ways_tab-fill` | vidljiva | opacity 0 (animacija i dalje radi, jer autoplay čeka njen kraj) |
| CSS tabova | Home page head code | linija u boji usluge, font na desktopu clamp(1.25rem,2.22vw,2rem), focus outline-offset 4px | pilula bez boje usluge, font clamp(1rem,1.53vw,1.375rem), padding i razmak skaliraju sa ekranom, focus outline unutra |
| Statistika u D&D panelu | element `af7570da-…f963` | „+214%“ / „Timeline“ | „6 to 8 weeks“ / „Kickoff to launch“ (kao u Figmi). Novi elementi `0e9ba7b2-…368e` i `b2eeb951-…6e8e`, iste klase |

## Faza 0 (10.11.2026): discovery i baseline
- Bez izmena u Webflow-u. Sve Webflow MCP akcije su bile samo čitanje (get_/list_/query_).
- Napravljen bekap u `backup/`:
  - SEO polja i JSON-LD svih 30 stranica;
  - sav custom kod sajta i stranica;
  - CMS šeme i SEO polja 129 stavki;
  - snimak HTML-a 50 adresa.
- Napravljeni `inventory.csv`, `BASELINE.md`, `reports/baseline/` (crawl.json, perf-probe.json), `QUESTIONS.md`, `MANUAL_TASKS.md`.
- Okruženje: prošireno mrežno pravilo nije odobreno, pa ništa nije menjano.
