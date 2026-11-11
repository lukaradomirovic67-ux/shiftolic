# CHANGELOG (SEO, AEO i performanse)

Svaka izmena u Webflow-u: šta, gde (stranica, kolekcija ili element ID), staro → novo, zašto.
Stanje pre svih izmena je u `backup/` (10.11.2026).

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
