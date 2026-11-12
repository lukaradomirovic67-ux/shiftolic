# CHANGELOG (SEO, AEO i performanse)

Svaka izmena u Webflow-u: šta, gde (stranica, kolekcija ili element ID), staro → novo, zašto.
Stanje pre svih izmena je u `backup/` (10.11.2026).

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
