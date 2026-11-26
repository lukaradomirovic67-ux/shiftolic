# CHANGELOG (SEO, AEO i performanse)

Svaka izmena u Webflow-u: šta, gde (stranica, kolekcija ili element ID), staro → novo, zašto.
Stanje pre svih izmena je u `backup/` (10.11.2026).

## 26.11.2026: odluka, kontrast sitnih sivih tekstova ostaje kakav jeste
Tvoje „to ne menjamo“ (PageSpeed tačka 4). Ništa nije menjano. Ostaju: uloga člana tima na case stranicama (`cs-team_role`, #9ea0a3 na #fbfaf7, kontrast 2,51), natpisi u formi i citatu na Let's talk (`lt-quote_role`, `lt-form_progress-count`, `lt-form_note`, `lt-form_legal`, dan i datum u kalendaru) i na Services (`services-ask_query`, `services-compare_name`, `services-compare_pill-text`). Na stranicama gde se nalaze, PageSpeed Accessibility zbog njih ostaje ispod 100.

## 26.11.2026: PageSpeed tačka 3, dve male skripte direktno u site footer (objavljeno na staging)
Tvoje „kreni“. Bez promene izgleda i copy-ja. Rezerva: `backup/psi-item3-inline-scripts-2026-11-26/` (site footer pre izmene, obe skripte kako su bile na CDN-u, spisak primenjenih skripti, objavljeni Home pre izmene).

| Gde | Pre | Posle |
|---|---|---|
| Registrovane site skripte (Site settings → Custom code) | NuesCmsDerived 1.0.0 i nuesA11yFixes 1.0.1 primenjene u footeru: dva posebna fajla (`<script src>`, 1,1 KB i 1,6 KB) na svakoj stranici, posle sveg ostalog koda | nijedna primenjena. Obe ostaju registrovane (nisu obrisane), mogu se ponovo primeniti |
| Site footer (`site-footer.min.html`, čitljivo `site-footer.html`) | 32.171 znak | isti + na kraju kod te dve skripte, znak po znak isti kao na CDN-u (35.178 znakova) |

- Lokalno, stari i novi footer na istoj stranici (6 stranica, desktop i telefon): skripte daju isto (navbar atributi, galerija na Home, domen u galeriji, adresa u Our Work slajderu, potpis citata na case stranici), tastatura na navbaru radi isto, 0 JS grešaka, zahtevi ka dve skripte 2 → 0.
- Stara trka u nuesA11yFixes, postoji i pre i posle: na desktopu link Services/Resources u navbaru ponekad ostane bez `aria-controls`, kad skripta krene pre Webflow-ovog dropdown-a. Po 8 učitavanja: About pre 3/8, posle 0/8; Veyor case pre 0/8, posle 1/8; Home 0/8 i pre i posle. Nije popravljano, nije deo ove tačke.
- Objavljeni site footer je znak po znak isti kao `site-footer.min.html` (7 stranica), nema više `<script src>` ka te dve skripte. Prvo slanje je izgubilo jedan razmak koji se ne prelama (skripta za CTA podnaslov, ispred crte); tako je na staging-u bilo oko 4 minuta, ispravljeno i ponovo objavljeno. JS greške: 0 na 86 učitavanja (43 stranice, desktop i telefon).
- PageSpeed, 6 stranica × 3 posebna merenja (krugovi 4 minuta razmaknuti): zahtevi ka te dve skripte 96 (u 48 merenja tačke 2) → 0, a „Use efficient cache lifetimes“ ih više ne navodi. Skor telefon: Resources 83 → 90 (TBT 149 → 77 ms), Our Work 75 → 81 (TBT 244 → 57 ms), Home 78 → 84, Careers 74 → 76, Blog 85 → 84, Design & Development 96 → 74 (dva od tri merenja su ona kad PageSpeed server kasni sa prvim prikazom; treće 87). Dva mala fajla na kraju stranice ne mogu da objasne ovolike razlike: to je kolebanje merenja, a sigurna dobit su 2 zahteva manje po stranici. Desktop 94–99. Tabela: `reports/psi-2026-11-26/step6-inline-scripts/average-3x-circles.md`.

## 26.11.2026: cene vraćene, tačno kao pre 20.11. (objavljeno na staging)
Tvoje „sada treba da ih vratimo“ i odgovor „Vrati tačno stare“. Spisak za tebe: dokument „Cene na sajtu: gde su vraćene“ (https://claude.ai/artifact/QNxhVMYMcgUeZzFur6TSEB). Rezerva: `backup/prices-restore-2026-11-26/` (objavljeni HTML 4 stranice i schema pre vraćanja).

| Gde | Pre | Posle |
|---|---|---|
| Services (`6ae0e4a4872d8069c67b0475`), statistika na 4 taba (`7e971f3c-…144f0`, `…1452b`, `…14564`, `…1459d`) | Visibility isključen | uključen: From $8k, From $5k, From $2k, $3,000 / Per month |
| Services, tabela „Side by side“, red „Starting at“ (`74d71a38-…86705`, `…8671f`, `…86741`, `…86765`, `…86787`) | Visibility isključen | uključen: $8,000, $5,000, $2,000 / month, $3,000 / month |
| Pricing (`6ad2500978181edbb22ab367`), „Investment from“ na 4 kartice (`ad197fa8-…cf087`, `…cf0b9`, `…cf0e9`, `84dc2a39-…a537`) | Visibility isključen | uključen: $8,000, $20,000, [$X,XXX]/month ×2 |
| Pricing, klizač preporuke (`1a3ca450-…d9f`, `…da4`) | Visibility isključen | uključen: from $8k, from $20k |
| Design & Development, JSON-LD | bez `offers` | `offers` 8000 USD (iz `backup/schema/services-prices-before-2026-11-20.json`) |
| Webflow Development, JSON-LD | bez `offers` | `offers` 5000 USD; opis opet završava sa „Starting at $5,000.“ |

- Tekst, stil i raspored elemenata nisu menjani. Schema je ista kao pre 20.11.; razlika prema današnjoj je samo `offers` i ta rečenica.
- Home nije menjan: tim je 25.11. upisao nove cene u „Four ways“ (From $10k, From $6k, From $2k/mo, From $2k/mo), a stari element sa „From $8k“ više ne postoji. Sajt sada za istu uslugu prikazuje različite cene (npr. Design & Development $10k na Home, $8k na Services i Pricing); pitao sam pre izmene, tvoj izbor je bio „tačno stare“.
- Provereno posle objave: svi iznosi u dolarima na 43 stranice, pre i posle (`prices-scan-*.json`); promenjene su samo ove 4 stranice. Desktop 1440 i telefon 390: raspored uredan (`notes/cene-vracene-2026-11-26/`). JS grešaka nema.
- Nije dirano (nisu cene naših usluga): „Change orders $0“ i kalkulator preporuke na Pricing, budžeti u formi na Let's talk, besplatan poziv u schema-i na Let's talk, cene tuđih alata u blogu.

## 26.11.2026: PageSpeed tačka 2, Resources: manje rada pre prvog prikaza (objavljeno na staging)
Tvoje „da kreni“. Bez promene izgleda i copy-ja. Rezerva: `backup/psi-step5-resources-2026-11-26/` (site head i Resources footer pre izmene).

| Gde | Pre | Posle |
|---|---|---|
| Site head, skripta za slike ispod prvog ekrana (iz koraka 3) | da li je slika u prvom ekranu proverava merenjem položaja (`getBoundingClientRect`) u frejmu dok se stranica čita; na Resources, spor telefon, 9–107 ms | isto radi `IntersectionObserver` (pregledač sam javi kad slika uđe u ekran): 6–12 ms. Ostalo isto: slike kreću na `load` ili prvi skrol, dodir, klik, taster; one u prvom ekranu odmah |
| Site head, ista skripta, lista slika | i `res-hero_card-img` (kartice u Resources hero-u) | bez njih: u prvom su ekranu, pa su ionako kretale odmah, a čekanje je dodavalo samo rad. Ostalih 5 klasa isto |

- Resources footer: probao sam da prepravim skripte stranice (marquee kartica), dobit nije bila merljiva, pa je vraćen original. Ta izmena nije objavljena.
- Lokalno (telefon, CPU 4×, bez keša): na Resources prva slika kartice kreće ~0,1 s ranije (521–707 → 435–609 ms), isti bajtovi pre DOMContentLoaded, 0 piksela razlike u hero-u, 0 JS grešaka. Stari i novi head naizmenično na istoj stranici, medijana TBT: Home 621 → 596 ms (9 + 9 učitavanja), Our Work 731 → 717, Webflow Development 612 → 569 (po 5); LCP isti.
- Objavljeni site head znak po znak isti kao `site-head.min.html` (7 stranica). JS greške: 0 na 86 učitavanja (43 stranice, desktop i telefon).
- PageSpeed telefon (3 posebna merenja, prosek): Resources 73 → 83 (TBT 294 → 149 ms, LCP 5,1 → 4,3 s), SEO & AEO 83 → 90, Design & Development 92 → 96, Growth 88 → 90, Services 99 → 99. Home 85 → 78 i Webflow Development 92 → 82: tu su dva, odnosno jedno merenje bila ona kad PageSpeed server kasni sa prvim prikazom (LCP ~6,5 s); bez njih Home 91 → 90, Webflow Development 92 → 90. Our Work 77 → 75 (TBT 106 → 244 ms; Our Work TBT na PageSpeed-u skače 45–373 ms i pre i posle, lokalni A/B ne pokazuje razliku). Desktop 94–99. Tabela: `reports/psi-2026-11-26/step5-resources/average-3x-circles.md`.
- Šta ostaje na Resources TBT-u: GA4 (~300 ms glavne niti na sporom telefonu) i webflow.js/jQuery. Skripte same stranice su 20–60 ms. GA4 i „Asynchronously load JS“ su tvoje odluke (MANUAL_TASKS).
- PageSpeed vraća keširanu kopiju kad se ista adresa traži ponovo u roku od oko minut: prvi put su 7 od 16 merenja bila kopije, obrisane su i izmerene ponovo. Od sad su krugovi merenja bar 4 minuta razmaknuti (`notes/psi-report-format.md`).

## 26.11.2026: PageSpeed tačka 1, visok prioritet za glavnu sliku prvog ekrana (objavljeno na staging)
Tvoje „ajmo jedan po jedan“. Bez promene izgleda. Rezerva: `backup/psi-step4-priority-2026-11-26/` (objavljeni HTML 9 stranica pre izmene).

| Gde | Element | Pre | Posle |
|---|---|---|---|
| Komponenta Service Hero (4 servisne stranice), tri oblika | `4e3b548d-…a368/a369/a36a` | `loading="eager"` | + `fetchpriority="high"` |
| Pricing, oblik koji se prvi vidi (`pr-hero_shape is-launch`) | `c6af993a-794b-a62a-a6aa-1051007d377e` | `loading="lazy"` | `loading="eager"`, `fetchpriority="high"` |
| Blog, slika istaknutog posta | `55a33da7-a268-88b9-ad93-f9326bbbaee6` | `loading="eager"` | + `fetchpriority="high"` |
| Blog Posts Template, slika posta u hero-u | `31ee2357-9389-f355-ab43-14a3d34a7bd8` | `loading="eager"` | + `fetchpriority="high"` |
| Our Work, slika slajdera | `aaf6dcfd-553c-0510-17b2-2701c9e139f3` | `loading="eager"` | + `fetchpriority="high"` |

- U objavljenom HTML-u se, u odnosu na backup, promenio samo taj atribut (9 stranica).
- PageSpeed (29 stranica × 3 merenja, prosek): upozorenje „fetchpriority=high should be applied“ više ne postoji ni na jednom od 174 merenja. Pricing telefon 93 → 98 (LCP 2,5 → 1,8 s), Blog 80 → 85 (LCP 4,9 → 4,3 s). Servisne stranice, Our Work i blog postovi u okviru kolebanja merenja (telefon 88 → 88). Pad na desktopu kod servisnih i Our Work dolazi od TBT-a (vreme JavaScript-a), na koji ovi atributi ne utiču, dakle od opterećenja PageSpeed servera. Tabela: `reports/psi-2026-11-26/step4-priority/average-3x-circles.md`.

## 26.11.2026: PageSpeed korak 3, slike ispod prvog ekrana čekaju, Careers hero kreće ranije (objavljeno na staging)
Tvoje „kreni sve napravi samo da ne menja copy i izgled sekcije“. Copy i izgled sekcija nisu menjani. Rezerva: `backup/psi-step3-2026-11-26/` (site head, Careers head i footer pre izmene, objavljeni HTML 10 stranica pre izmene).

| Gde | Pre | Posle |
|---|---|---|
| Site head (`site-head.min.html`, čitljivo `site-head.html`) | Chrome odmah po prvom rasporedu preuzima svaku lazy sliku do ~1.250 px ispod ekrana, pa su screenshotovi projekata i before/after slike (Home ~0,3–0,7 MB, Our Work 0,8–1,7 MB, Design & Development 0,2–0,4 MB) delili mrežu sa prvim ekranom | nova skripta: slike `work-card_shot`, `home-projects_screen-image`, `ow-cs_before-img`, `ow-cs_after`, `ow-cs_bg`, `res-hero_card-img` kreću kad se stranica učita, ili na prvi skrol, dodir, klik ili taster. One koje su već u prvom ekranu kreću odmah. Do tada samo `srcset` drži prazan piksel; `src` ostaje, pa skripte koje ga proveravaju rade isto |
| Site head, galerija projekata (Home, servisne) | sličica u galeriji je `currentSrc` slike | isto, ali nikad prazan piksel (ako se galerija otvori pre učitavanja, uzima `src`) |
| Site head, skripta za `sizes` (23.11.) | pri čitanju stranice pretražuje unutrašnjost svakog novog elementa | gleda samo slike (`<img>`), isti rezultat; završni prolaz na DOMContentLoaded ostaje. Manje rada pre prvog prikaza |
| Careers head i footer (stranica `6ada16efb73db28b0b5cbad8`) | uvodna animacija hero-a (naslov po redovima, fotografije se dele) je u footeru, pa kreće tek kad se učitaju jQuery, webflow.js i GSAP | ista skripta, isti koraci i vreme, premeštena u head; kreće čim je hero pročitan. Footer: blok izbačen, ostalo isto (`careers-page-footer.html` je sada u repou) |
| Blog Posts Template, pozadina hero-a `495f04a6-136d-a6f2-0548-5ee02bbb2b88` | `loading="eager"` | i `fetchpriority="high"` (PageSpeed: „fetchpriority=high should be applied“) |

- Mousemove nije okidač: Chrome ga šalje sam dok se stranica iscrtava (kursor iznad stranice), pa bi slike krenule odmah.
- Izmereno uživo posle objave (Playwright, bez keša), slike preuzete pre DOMContentLoaded, telefon / desktop: Home 609 → 328 KB / 1.089 → 387 KB, Our Work 1.080 → 262 KB / 1.933 → 251 KB, Design & Development 340 → 124 KB / 542 → 119 KB, Resources 1.067 → 888 KB / 2.349 → 1.898 KB (kartice u hero-u su u prvom ekranu, kreću odmah kao i ranije).
- Izgled posle skrolovanja cele stranice: 0 piksela razlike (prag 16) u svim okvirima ovih slika na 4 stranice, telefon i desktop; sve slike učitane. Careers: krajnji izgled 0 piksela razlike na 1440, 390 i 390 sa reduced motion; na sporom telefonu animacija kreće ~0,8 s ranije (pre prvog prikaza umesto posle).
- Objavljeni site head, Careers head i footer znak po znak isti kao u repou. JS greške: 0 na 86 učitavanja (43 stranice, desktop i telefon).
- PageSpeed, telefon (3 merenja posle objave; „spor FCP“ = PageSpeed server je kasnio sa prvim prikazom): Design & Development 72 → 85–97 (LCP 6,3 → 2,6–3,9 s), Growth 77 → 88–98, Our Work 76 → 79–80 (jedno merenje 72, spor FCP), Home 84 → 81–85, Resources 79 → 81–83, Careers 73 → 75–76 (jedno 68, spor FCP), blog post 76 → 88–91. Desktop 94–100 osim blog posta (jednom 85). Brojke u `reports/psi-2026-11-26/step3/`.
- Šta PageSpeed na telefonu još ne pušta dalje (nije menjano, nije moje da odlučim): GA4 skripta (188 KB na svakoj stranici, odluka o GA4 je tvoja), Aeonik u OTF (180 KB, tvoje „ostavi to meni“), webflow.js/jQuery/GSAP (Webflow ih učitava; opcija „Asynchronously load JS“ u Site settings je u MANUAL_TASKS). Na Careers telefonu LCP su fotografije koje ulaze iz providnog; to je deo animacije, nije menjano.

## 26.11.2026: PageSpeed korak 2, oblici na servisnim stranicama i podnaslov na Let's talk bez fade-a (objavljeno na staging)
Tvoji odgovori: „Da, izranjanje bez fade-a“ i „Da, i podnaslov bez fade-a“. Rezerva: `backup/shapes-rise-2026-11-26/` (site head pre izmene, ceo zapis IX3 interakcije, objavljeni HTML 6 stranica pre izmene, izmereni pokret oblika pre i posle).

| Gde | Pre | Posle |
|---|---|---|
| IX3 interakcija „Services hero shapes rise“ (`i-ac849a09`, stranice Design & Development, Webflow Development, SEO & AEO, Growth, Services) | na učitavanju stranice oblici `svc-hero_shape` prelaze iz providnog i izranjaju (26% visine, 1,6 s, expo-out, 0,15 s pa 0,14 s razmak); Webflow ih krije (`visibility:hidden`) dok se `webflow.js` ne pokrene | uklonjena |
| Site head (`site-head.min.html`, čitljivo `site-head.html`) | — | isti pokret u CSS-u: `translate` 26% → 0, 1,6 s, `cubic-bezier(.16,1,.3,1)` (expo-out), kašnjenja 0,15 / 0,29 / 0,43 s, bez fade-a; kod reduced motion bez animacije (kao IX3 „skip to end“) |
| Site head, pravilo za LCP bez fade-a | Let's talk: samo H1 | Let's talk: H1 i podnaslov (`.lt-hero_text .hero_subtitle`) |

- Izmereno pre/posle (desktop 1440, bez usporavanja): oblici su bili sakriveni do 1,1 s, pa su se pojavljivali iz providnog. Sada su vidljivi od prvog prikaza (0,22 s) i počinju da izranjaju posle 0,15 s. Kriva i trajanje isti (expo-out 1,6 s), samo bez fade-a.
- Izgled posle animacije: 0 piksela razlike (prag 16) na 4 servisne stranice i na Let's talk, na 1440 i 390 px. Na Services razlika je samo na ivici gornjeg desnog ugaonog oblika, koji se sam pomera. Na toj stranici nema oblika, a interakcija je tu imala samo skrivanje bez cilja.
- Objavljeni site head je znak po znak isti kao `site-head.min.html` (6 stranica). Webflow-ovo skrivanje oblika više ne postoji ni na jednoj stranici. JS grešaka nema (12 učitavanja).
- PageSpeed posle objave, telefon: Design & Development 72 → 94 (LCP 6,3 → 3,0 s), SEO & AEO 77 → 93 (6,4 → 3,2 s), Growth 77 → 93 (6,4 → 3,2 s), Webflow Development 73 → 88–93 (6,4 → 3,2–3,9 s; prva dva merenja su bila 68, kad je PageSpeed server kasnio sa prvim prikazom), Let's talk 69 → 91 (LCP 15,1 → 2,8 s). Desktop: servisne 96–100, Let's talk 99. Brojke su u `reports/psi-2026-11-26/step2/`.
- LCP je sada jednak prvom prikazu (FCP) na svih 5 stranica.

## 26.11.2026: PageSpeed korak 1, slike u prvom ekranu se učitavaju odmah (objavljeno na staging)
Tvoje „ajmo korak po korak da poboljšavamo stvari do savršenstva“, korak bez promene izgleda. Rezerva: `backup/lcp-eager-2026-11-26/` (objavljeni HTML 5 stranica pre izmene).

| Gde | Pre | Posle |
|---|---|---|
| Komponenta Service Hero `4e3b548d-…`, tri oblika `svc-hero_shape` (`…a368`, `…a369`, `…a36a`), na Design & Development, Webflow Development, SEO & AEO, Growth | `loading="lazy"` | atribut `loading="eager"` |
| Resources, pozadina hero-a `3b7368f8-1ae8-b32b-6b13-3c75ec8da3d0` (`insights-hero-bg.avif`) | `loading="lazy"` | atributi `loading="eager"` i `fetchpriority="high"` |

- U objavljenom HTML-u se, u odnosu na backup, promenio samo taj atribut (provereno na svih 5 stranica).
- PageSpeed posle objave (telefon): Resources 79 → 84, LCP 5,1 → 4,4 s, FCP 2,0 → 1,1 s; desktop 84 → 98. Brojke su u `reports/psi-2026-11-26/step1/`.
- Servisne stranice: LCP ostaje 6,2–6,4 s, a oblici sada stižu za 0,13 s. Usporava ih animacija „Services hero shapes rise“ (fade + izranjanje), koja oblike krije dok se ne učita `webflow.js`. To je korak 2, koji si odobrio.
- Skorovi servisnih stranica variraju od merenja do merenja (TBT 13–326 ms), pa razlika u skoru tu nije od ove izmene.

## 25.11.2026: screenshotovi klijenata za telefon, novo CMS polje (objavljeno na staging)
Tvoje „Da, odobravam polje“. Rezerva: `backup/phone-screenshots-2026-11-25/` (Our Works stavke i grupe polja pre i posle, objavljeni Home/Our Work/Resources pre izmene, site head i Resources footer pre izmene).

| Gde | Pre | Posle |
|---|---|---|
| CMS Our Works | nema polja | **Full page screenshot (mobile)** (`full-page-screenshot-mobile`, Image, nije obavezno), uputstvo „Same screenshot, 640px wide WebP (about 150 KB). Shown on phones only; leave empty to use the big one.“, u grupi „2 · Logos and images (designer)“ odmah ispod Full page screenshot |
| 10 stavki (Ballerine, Biotech, Harper, Hypersonix, Intaker, LaSalle, Shiftolic, Sustain, TrakPro, Veyor) | — | 640 px WebP (q75) napravljen od trenutne slike od 1200 px (provereno bajt po bajt da je to slika sa sajta), isti alt; ukupno 3,7 MB → 1,5 MB. Fajlovi: `webflow-assets/perf/full-screenshots-640/`. Webflow ih je prebacio na svoj CDN. Ostala polja i draft status nisu dirani |
| Designer: Our Work kartice, Resources kartice (hero traka i lista case studija), Home Every project (srednji, levi i desni ekran) | jedna slika (Full page screenshot) | ista slika + odmah iza nje slika iz novog polja sa combo klasom `is-mobile` (`display:none` u Designeru), alt iz Name (bočni ekrani: alt „inherit“ i `aria-hidden` kao original) |
| Site head (`site-head.min.html`) | — | jedno pravilo: ispod 768 px mala slika zamenjuje veliku, ali samo kad stavka ima malu (prazno polje dobija `w-dyn-bind-empty`, pa ostaje velika) |
| Resources footer kod (`resources-page-footer.html`) | kopije kartica za beskonačnu traku pravljene van stranice, pa su preuzimale sve slike, i skrivene | kopija dobija adresu skrivene slike tek kad je na stranici, pa je lazy loading preskače |

- Izmereno uživo (telefon 412 px), screenshotovi posle skrolovanja cele stranice: Our Work 3.445 → 1.407 KB, Resources 2.725 → 1.042 KB, Home 702 → 430 KB. Desktop i tablet na Home i Our Work isti kao pre; Resources desktop 2.725 → 2.113 KB (ispravka kopija).
- Procena viška slika na telefonu po Lighthouse pravilu (bez skrolovanja): Home 684 → 404 KB, Our Work 1.619 → 592 KB, Resources 2.003 → 851 KB.
- Izgled: desktop i tablet piksel po piksel isti na svim karticama (jedina razlika je kartica koja je u trenutku snimka bila zatamnjena zbog smenjivanja kategorija na Resources). Na telefonu ista slika iz manjeg izvora, razlika samo u oštrini (prosečno 1,5–3 nivoa od 255).
- Shiftolic je kod tima u draftu, pa njegova mala slika nije objavljena: na telefonu ostaje velika (rezerva radi). Kad tim objavi stavku, mala kreće sama.
- Objavljeni site head i Resources footer znak po znak isti kao u repou. JS greške: 0 na 43 stranice, desktop i telefon.
- Nije pokriveno: kartice „sledeći projekat“ na case stranicama (Our Works Template) koriste isto polje. Isti obrazac, ako želiš.

## 25.11.2026: prvi ekran bez fade-a na LCP elementu, 13 stranica (objavljeno na staging)
Tvoje „Na svim tim stranicama“. Rezerva: `backup/lcp-slide-only-2026-11-25/` (site head pre izmene, prozirnost elemenata u prvom frejmu pre/posle).

| Gde | Pre | Posle |
|---|---|---|
| Site settings → Custom code → Head (`site-head.min.html`, čitljivo `site-head.html`) | LCP element prvog ekrana ulazi iz providnog i klizne gore | isto klizanje, bez prelaza iz providnog; jedno CSS pravilo dodato u postojeći `<style>` za reveal |

- Elementi: Our Work slajder i H1, About H1, H1 na Services i 4 servisne stranice (ista komponenta), Let's talk H1, Blog prva (featured) kartica, blog post hero slika i naslov, Privacy/Terms naslov i tekst. Pravilo: `.reveal-on :is(.ow-slider,.ow-hero_text h1,.about-hero_text h1,.svc-hero_text h1,.lt-hero_text h1,.ins-featured,.bp-hero_head,.bp-hero_media,.legal-content_wrapper,.header65_component .max-width-large):is([data-reveal],[data-reveal-early]):not(.is-revealed){opacity:1}`.
- Nisu menjani: Home, Pricing (već od ranije), Resources, Careers, case stranice (naslov već od 23.11., hero slike zadržavaju fade po tvojoj odluci), ostali elementi na ovim stranicama (pill, podnaslov, dugmad i dalje imaju fade).
- Zašto: Chrome ne računa element koji kreće iz potpuno providnog dok se ponovo ne iscrta, često tek kad stigne Aeonik font, pa je LCP na telefonu kasnio 1–3 s.
- Izmereno uživo posle objave (telefon 1,6 Mb/s, CPU 4×, 2 merenja), LCP: Our Work 2,0 s (bilo 5,0), About 1,8 (3,0), SEO/AEO 1,6–2,3 (2,9), Let's talk 2,4–2,6 (2,6–2,7), Blog 1,4–1,5 (2,7), blog post 1,9–2,0 (3,3), Privacy 2,1 (3,0), Terms 2,1–2,4 (3,0). Svuda je LCP sada jednak prvom prikazu (FCP).
- Izgled posle animacije: 0 piksela razlike na svih 13 stranica, na 1440 i 390 px (Home i Resources se razlikuju samo zbog animacija koje se vrte, tamo pravilo ništa ne pogađa). U prvom frejmu ciljni element ima prozirnost 1 umesto 0.
- Objavljeni head je znak po znak isti kao `site-head.min.html` (provereno na 10 stranica). JS greške: 0 na 43 stranice, desktop i telefon.

## 25.11.2026: Our Work audit (run 47), hero video se preuzima posle učitavanja stranice (objavljeno na staging)
Tvoje „pogledaj ove greške isto na our work main page-u, ako možeš ispravi i pogledaj da li ih ima i na ostalim stranicama“. Rezerva: `backup/our-work-video-2026-11-25/` (footer kod stranice i objavljeni HTML pre izmene, sken slika svih stranica na telefonu, sken fade/LCP).
Napomena: audit run 47 je pokrenut pre objave fontova (još prikazuje `webfont.js` i fonts.gstatic.com); te dve stavke su rešene istog dana.

**Urađeno: hero video na Our Work** (stranica `6aba6bc07d6279b4b56176fe`, footer kod, izvor `webflow-assets/site-code/our-work-page-footer.html`)
- Pre: TrakPro video u slajderu (2,2 MB, 2140×1280, 60 fps) počinje da se preuzima čim se skripta pokrene (~0,6–1 s), i na telefonu, pre LCP-a. To je najveći fajl na stranici (od ukupno 4,97 MB na telefonu).
- Posle: video kreće tek posle `load` događaja stranice. Do tada slajd prikazuje Cover sliku (ista slika je i poster videa), pa izgled ostaje isti. Čekanje od 4 s za „spor video“ počinje tek kad video krene, a `play()` se ne zove bez izvora.
- Provereno na objavljenom stagingu (telefon i desktop): video se traži odmah posle `load` (967 ms naspram 961 ms), pušta se ceo, prvi slajd traje koliko video (~14 s), pa ide sledeći. Bez JS grešaka. Objavljeni kod je isti kao u repou.

**Stavke iz audita koje ne diram ili ne mogu:**
- „Use efficient cache lifetimes“: CMS slike Webflow CDN šalje sa `max-age=84600` (1 dan); to se ne podešava u Webflow-u.
- „Render-blocking“: CSS sajta (83 KB kompresovano) mora da blokira prikaz; Minify HTML/CSS/JS je već uključen (provereno). `webfont.js` više ne postoji.
- „Reduce unused CSS“ (74 KB): ceo CSS sajta je jedan fajl; čišćenje nekorišćenih stilova je tvoje pravilo da ne diramo.
- „Reduce unused JavaScript“: GA4 (čeka tvoju odluku), Webflow jezgro, Cloudflare Turnstile. Turnstile Webflow dodaje jer je filter projekata Webflow forma (za Finsweet filter).
- „Forced reflow“: ukupno ~20 ms na usporenom telefonu, najviše GSAP/Webflow; nije vredno izmene.
- „Image elements do not have explicit width and height“: CLS je 0,003–0,008 na svim stranicama; nema pomeranja koje bi ovo popravilo.

**Nađeno, čeka tvoju odluku:**
1. Fade na LCP elementu. Gde glavni naslov ili slika ulazi iz potpuno providnog, Chrome ga računa tek pri sledećem iscrtavanju (često kad stigne Aeonik font). Our Work slajder: LCP 5,0 s → 1,9 s sa „samo klizanjem“ (A/B, 3+3 merenja, telefon 1,6 Mb/s, CPU 4×). Ista pojava (jedno merenje po stranici): Blog lista 4,6 → 1,4 s, blog post 5,4 → 1,8 s, About 3,0 → 1,7 s, servisne stranice ~1,2 s brže, Privacy 1,2 s, Let's talk 0,7 s. Case hero slike nisu na listi (tvoja odluka da zadrže fade).
2. Screenshotovi sajtova klijenata (Our Works, „Full page screenshot“, 1200 px) na telefonu: Webflow za njih ne pravi manje verzije (za slike koje nisu ubačene ručno kroz Editor i za vrlo visoke slike). Višak na telefonu: Our Work ~1,6 MB, Resources ~2,0 MB, Home ~0,7 MB. Verzija od 640 px je ~40% veličine (svih 10: 3,7 MB → 1,5 MB). Za to treba novo CMS polje.
- Ostale stranice: višak slika 10–150 KB po stranici (avatari autora, share slike, case galerije), bez većeg uticaja.

## 25.11.2026: meni na telefonu, „Links are not crawlable“ (objavljeno na staging)
Tvoje „ako primetiš još negde ove greške izmeni ih“ (audit Our Work: „Use descriptive link text“ / „Links are not crawlable“ i „Enable indexing“). Rezerva: `backup/a11y-nav-role-2026-11-25/` (skripta 1.0.0, spisak skripti sajta, objavljeni Our Work pre izmene, sken pre i posle).

**1. „Links are not crawlable“: oznake „Services“ i „Resources“ u meniju, na telefonu, na svih 43 stranice.**
- Uzrok je naša skripta `nuesA11yFixes` od 17.11. Na telefonu dodir na oznaku otvara padajući meni, pa je skripta oznaci skidala `href` (da ne bude link unutar dugmeta, axe „nested-interactive“). Lighthouse takav `<a>` bez `href`, a sa osluškivačima klika, broji kao pokvaren link.
- Izmena: na telefonu oznaka dobija i `role="none"` (nije link, samo tekst unutar dugmeta), na desktopu se uklanja. Ništa drugo nije menjano. Registrovana skripta `nuesa11yfixes` 1.0.0 → **1.0.1** (footer, sve stranice), izvor `webflow-assets/site-code/a11y-fixes.js`, objavljeno `a11y-fixes.min.js` (1605 znakova).
- Ponašanje isto: dodir na „Services“ na telefonu otvara meni, na desktopu hover otvara meni, a klik vodi na /services. Promena širine prozora (800 → 1350 → 800 px) prebacuje ispravno.
- Provereno na objavljenom stagingu, sve 43 stranice, desktop i telefon: linkova koje Lighthouse označava 0 (bilo 2 po stranici na telefonu). axe isti kao pre (jedina stavka je oznaka „Made in Webflow“, postoji samo na besplatnom stagingu). Bez JS grešaka. Objavljeni Our Work isti kao pre, osim adrese skripte.
- Naslov „Use descriptive link text“ u tvom alatu je pogrešno uparen sa ovom proverom. Generičkog teksta linka („click here“, „learn more“, „read more“…) i dalje nema nigde. Jedini sličan je „Continue“ u formi na Let's talk, ali vodi na `#` (ista stranica), pa ga Lighthouse ne broji.

**2. „Page is blocked from indexing“: nije menjano, ispravno je.** Staging (webflow.io) ima `robots.txt` sa `Disallow: /`, zato što je u Site settings uključeno „Disable Webflow subdomain indexing“. Na pravom domenu toga neće biti. Nijedna stranica nema `noindex` (sken 43 stranice). robots.txt za produkciju je i dalje u MANUAL_TASKS za lansiranje.

## 25.11.2026: Geist i Instrument Serif sa Webflow servera umesto Google Fonts (objavljeno na staging; na telefonu sporije zbog GA4, čeka tvoju odluku)
Tvoje „Da, sada“. Rezerva: `backup/fonts-2026-11-25/` (objavljeni Home sa webfont.js, Google CSS).
- Pre: Webflow je na svakoj stranici učitavao `webfont.js` (ajax.googleapis.com), pa CSS sa fonts.googleapis.com, pa fajlove sa fonts.gstatic.com. Skripta je blokirala prvi prikaz.
- Gde se koriste (provereno na 43 stranice, 1440 i 390 px): **Geist** u navigaciji, naslovima i oznakama Trusted sekcije, brojkama na karticama projekata, delovima Home-a i H2 na Privacy/Terms; težine 400, 500, 600; samo osnovna latinica. **Instrument Serif** je vezan za nekoliko klasa (`.italic-heading`, `.u-serif-italic`…), ali se trenutno ne prikazuje nigde.
- Dodato u Site settings → Custom fonts (API):
  | Font | Fajl | Veličina | ID |
  |---|---|---|---|
  | Geist, promenljiv 100–900, swap | `Geist-Variable-latin.woff2` | 29,4 KB | `6b07355cada87acb2da8e901` |
  | Instrument Serif 400, swap | `InstrumentSerif-Regular-latin.woff2` | 21,0 KB | `6b07357110e63abf0153fe47` |
- Fajlovi su tačno oni koje Google šalje Windows/Linux pregledačima (latin), bajt po bajt; u repou `webflow-assets/perf/fonts/` sa OFL licencama. Mac, iOS i Android ignorišu „hinting“ u tom fajlu, pa i kod njih slova ostaju ista.
- Proba pre izmene (Google blokiran, naš fajl ubačen; Home, Services, Design & Development, Privacy, Pricing, About): 339 od 340 elemenata u Geist fontu piksel po piksel isto, na 1440 i 390 px. Jedina razlika je oznaka preko videa u Trusted sekciji, najviše 1 nivo od 255 (pozadina).
- Ograničenje: fajl pokriva latinicu (kao Google „latin“ deo). Slova kao š, ć, č u tekstu koji je u Geist fontu prikazala bi se rezervnim fontom; trenutno takvog teksta nema.
- Ti si obrisao Google verzije u Site settings, staging objavljen 25.11. u 19:26.
- Provereno na objavljenom stagingu: nema više `webfont.js` ni zahteva ka ajax.googleapis.com, fonts.googleapis.com i fonts.gstatic.com. Fontovi stižu sa `webflow-files-prod.global.ssl.fastly.net` (Webflow), CORS u redu, keš godinu dana. Piksel po piksel: 339 od 340 elemenata isto kao sa Google fontovima (ista razlika kao u probi).
- **Brzina na telefonu je lošija, i to ne zbog fontova.** Stari `webfont.js` je blokirao glavu stranice, pa je Chrome slučajno odlagao GA4 (188 KB), Webflow skripte, jQuery i GSAP. Sada sve to kreće odmah i otima propusni opseg i procesor CSS-u. Telefon, 150 ms, 1,6 Mb/s, procesor 4×, medijana od 3, u ms:
  | Stranica | FCP Google → naš | FCP naš, bez GA4 | LCP Google → naš | LCP naš, bez GA4 |
  |---|---|---|---|---|
  | Home | 1228 → 1780 | 1268 | 1228 → 1780 | 1268 |
  | Design & Development | 1312 → 1696 | 1076 | 2092 → 2920 | 2252 |
  | About | 1156 → 1572 | 1076 | 2048 → 2816 | 2336 |
  | Privacy | 1800 → 2172 | | 2816 → 3004 | |
  Na bržoj vezi (4G, 9 Mb/s) FCP je isti, LCP i dalje sporiji: D&D 1016–1160 → 1592–1740, About 1048–1100 → 1496–1620, Services 1044 → 1780.
- „Bez GA4“ je samo merenje (GA4 blokiran u testu), na sajtu ništa nije menjano. Pokazuje da je GA4 skoro ceo uzrok: FCP je tada bolji nego sa Google fontovima, LCP 50–300 ms sporiji.
- Lab merenje, Lighthouse/PageSpeed nisam mogao da pokrenem iz svog okruženja. Odluka je tvoja (Google fontovi nazad, GA4 kasnije, ili prvo PageSpeed).

## 25.11.2026: lakše slike u blog tekstovima i Pricing podnaslov bez fade-a (objavljeno na staging)
Tvoje „ajde da popravimo performanse malo“; Pricing: tvoje „Da, samo klizanje“.

**1. Slike u tekstu blog postova** (Blogs `6aba6bc07d6279b4b5617769`, polje Content, 22 objavljena posta, 48 slika). Rezerva: `backup/blog-body-images-2026-11-23/` (`blogs-before.json` pre izmene, `blogs-after-cms.json` posle).
- Pre: PNG/JPG/WebP od 2880 px, ukupno 101,9 MB (26 slika preko 2 MB), a prikazuju se najviše 840 px (telefon 371 px). Nijedna nema manje verzije.
- Posle: iste slike kao WebP 1680 px (2× širina prikaza; slike uže od toga zadržale su svoju širinu), kvalitet 90, ukupno 3,5 MB. Fajlovi: `webflow-assets/perf/blog-body/`, spisak sa veličinama `conversion.json`. Webflow ih je sam prebacio na svoj CDN.
- Menjane su samo adrese slika. Provereno skriptom: tekst svih 22 posta je isti znak po znak, ostala polja i draft status nisu dirani, svih 48 slika vraća 200 i bajt po bajt je isto kao u repou. Izgled: najgori slučaj uvećan, bez vidljive razlike.
- Rezultat (učitano do kraja posta): AEO for marketing teams 7,7 MB → 0,10 MB, AEO tools 7,5 → 0,12, AEO vs SEO 4,2 → 0,15, The signs… 8,9 → 0,53.
- Partner post (draft) nije diran.

**2. Pricing (`6ad2500978181edbb22ab367`), head kod stranice.** Rezerva: `backup/pricing-subtitle-2026-11-25/` (objavljeni HTML i head kod pre izmene). Ceo kod: `webflow-assets/site-code/pricing-page-head.html`.
- Dodata jedna linija na kraj postojećeg `<style>`: `.reveal-on .hero_subtitle.is-medium:is([data-reveal],[data-reveal-early]):not(.is-revealed){opacity:1}`.
- Podnaslov u hero-u i dalje klizi naviše, samo bez prelaza iz providnog (kao naslov na case stranicama od 23.11.). Ostatak koda isti, provereno na objavljenoj stranici.
- LCP na telefonu (150 ms, 1,6 Mb/s, procesor 4×): 3,24–3,34 s → 1,84–2,15 s (5 od 5 merenja).

- Ovom objavom su na staging otišle i izmene tima iz Designera od 25.11. (npr. Video Testimonials: naslov „Don’t take our word for it. Take theirs.“, ime „Joseph Ruotolo“). Nisu moje.

## 23.11.2026: Blog, post „Nues is officialy Certified Webflow Partner“ prebačen sa starog sajta kao draft (nije objavljen)
Tvoje „ajde uradi ove tri tačke“ (prva tačka). Rezerva: `backup/partner-post-2026-11-23/` (Blogs šema i svi item-i pre izmene, HTML posta sa starog sajta, originalna share slika PNG).

| Gde | Pre | Posle |
|---|---|---|
| Blogs (`6aba6bc07d6279b4b5617769`) | posta nema; /blog/nues-is-officialy-certified-webflow-partner na stagingu 404 | novi item `6b04c3054f7d242dfc40c598`, **draft** |

Polja, sve preuzeto sa starog posta:
- Name: „Nues is officialy Certified Webflow Partner“, slug `nues-is-officialy-certified-webflow-partner`. Greška „officialy“ je u originalnom naslovu i u adresi, ostavljena je da adresa ostane ista i da ne treba redirect.
- Meta title, meta description, short description i TL;DR: isti tekst kao na starom sajtu.
- Datum 30.09.2026 i read time 5, kao na starom sajtu.
- Author Danilo Stikovic, category Webflow (kao kategorija na starom sajtu).
- Content: 5 h2, 5 h3 i 16 pasusa, isti tekst slovo po slovo (provereno skriptom). Prazan pasus sa kraja originala je izbačen.
- Thumbnail: share slika sa starog posta, isti kadar, kao WebP 37 KB umesto PNG 1,7 MB (`webflow-assets/perf/blog/nues-webflow-certified-partner-share.webp`). Alt „Nues Webflow Certified Partner article cover“, kao kod ostalih postova.
- FAQ prazno, nijedan „featured“ prekidač nije uključen.

- Nije objavljeno. Kad tim pregleda i objavi item, dodati adresu u `webflow-assets/seo/sitemap-manual.xml` (biće 43 adrese).
- Ostali item-i u Blogs nisu dirani.

## 23.11.2026: 301 mapa i ručni sitemap posle objave Flow Conf posta (ništa nije menjano u Webflow-u)
Tvoje „mislim da je publish ovo za conf, a ovo za partner tek treba da prebacimo“. Provereno:

| Adresa | Staging | Stari sajt | Odluka |
|---|---|---|---|
| /blog/from-guests-to-sponsors-notes-from-flow-conf-2026 | 200 (objavljen) | 200 | ne treba redirect; dodat u `webflow-assets/seo/sitemap-manual.xml` (sada 42 adrese) |
| /blog/nues-is-officialy-certified-webflow-partner | 404 | 200 („Nues is officialy Certified Webflow Partner“) | prebacuje se u Blogs CMS sa istim slug-om; zato ne treba redirect, a posle prebacivanja ide u ručni sitemap |

- Za ručni unos ostaje 6 preusmeravanja (`MANUAL_TASKS.md`, `notes/301-mapa-2026-11-17.md` i dokument za lansiranje su ispravljeni). Preko API-ja nije moguće: Webflow traži Enterprise plan („not_enterprise_plan_site“).
- Dokument „Nues: dan lansiranja, šta je ostalo“ (Google Docs) je ažuriran istog dana: novi status, 6 novih stavki za kasnije, odeljak 7 za tim (polja „SEO robots“ i „Hero screen top“), 301 tabela sa 6 redova i stavka za prebacivanje partner posta.

## 23.11.2026: About, mapa sveta kao WebP umesto PNG (objavljeno na staging)
Tvoje „uradi sledeća dva“ (OK za zamenu fajla). Rezerva: `backup/about-map-2026-11-23/` (originalni PNG, objavljeni About pre izmene, opis izmene).

| Gde | Pre | Posle |
|---|---|---|
| Assets | — | novi fajl `about-raw-19.webp` (`6b04b64d8703fbb9b8204f50`), WebP bez gubitka, 102 KB. Isti fajl je u `webflow-assets/perf/about/` |
| About (`6aba6bc07d6279b4b56176f9`), HtmlEmbed mape (`about-map_svg`, `5b8a03fa-…`) | `<image href>` → `about-raw-19.png` (243 KB) | `<image href>` → `about-raw-19.webp` (102 KB); ostatak koda isti |

- Stari PNG ostaje u Assets. Nije obrisan.
- WebP bez gubitka ima iste piksele kao PNG (provereno pre slanja). Fajl na Webflow CDN-u je bajt po bajt isti kao u repou. Webflow je kod imena dodao još jedan „.webp“, pa je ime ispravljeno.
- Provereno na objavljenom stagingu:
  - u HTML-u About promenjena je samo adresa slike;
  - mapa pre i posle je piksel po piksel ista na 1440, 768 i 412 px (2×);
  - nema JS grešaka;
  - stranica skida 141 KB manje.

## 23.11.2026: Privacy Policy i Terms of Service, schema (objavljeno na staging)
Tvoje „uradi sledeća dva“. Rezerva: `backup/schema/legal-pages-before-2026-11-23.json` (obe stranice bez schema-e) i objavljeni HTML pre izmene u `backup/schema/`.

| Stranica | Pre | Posle |
|---|---|---|
| Privacy policy (`6aba6bc07d6279b4b5617704`), polje Schema markup | prazno | WebPage: name „Privacy Policy“, description = meta opis stranice, url `/privacy-policy`, inLanguage en, about Organization „Nues“ |
| Terms of service (`6aba6bc07d6279b4b5617703`), polje Schema markup | prazno | WebPage: name „Terms of Service“, description = meta opis, url `/terms-of-service`, inLanguage en, about Organization „Nues“ |

- Isti obrazac kao Careers i Pricing (13.11.). Sve vrednosti su već na stranici (naslov i meta opis). Ništa nije izmišljeno.
- Provereno na objavljenom stagingu: na obe stranice je tačno jedan JSON-LD blok, ispravan JSON. U HTML-u se promenio samo taj blok.
- `dateModified` namerno nije dodat. Na stranicama piše „Last updated: Oct 19, 2026“, a Privacy je posle toga menjan (Cookies sekcija, Cal.com 22.11.). Schema bi tako ponovila zastareo datum. Ako želiš novi datum u tekstu, javi pa ga dodam i u schema-u.

## 23.11.2026: Careers i About, tim: ime linka se poklapa sa vidljivim tekstom; Careers izmeren (objavljeno na staging)
Rezerva: `backup/services-perf-2026-11-23/careers-published-before.html`.

| Gde | Pre | Posle |
|---|---|---|
| Komponenta Team (`08a1843e-…`, Careers i About), 7 fotografija (`team_photo`) | bez atributa; alt = ime | `aria-hidden="true"` (alt ostaje) |

- Isti uzrok kao na case stranicama: alt fotografije je ulazio u tekst linka, pa se ime nije poklapalo sa `aria-label` („Ime, uloga, on LinkedIn“).
- Provereno na objavljenom stagingu:
  - u HTML-u Careers promenjene su samo te slike;
  - axe na Careers (412 i 1350 px): 0 grešaka (bilo je 7 „label-content-name-mismatch“ na telefonu);
  - na About ostaje samo prigušeni tekst (kontrast, tvoja odluka od 14.11.).
- **Careers brzina:** LCP na telefonu ~4,4 s, a to je jedna od fotografija u hero-u (8 fotografija, na telefonu se vide 4, ~40 KB svaka). Probano „eager“ na te 4: LCP 5,2–6,5 s (gore), jer slike otimaju mrežu fontovima i tekstu. Nije objavljeno. `sizes` za ove slike već bira verziju od 500 px na telefonu, pa tu nema dobitka.

## 23.11.2026: Blog, istaknuta kartica se učitava odmah; Resources izmeren (objavljeno na staging)
Tvoje „ajmo redom“. Rezerva: `backup/services-perf-2026-11-23/blog-published-before.html`, merenje pre: `resources-blog-perf-before.txt`.

| Gde | Pre | Posle |
|---|---|---|
| Blog (`6aba6bc07d6279b4b5617705`), slika istaknute kartice (`image-cover` u `ins-featured_card`, `55a33da7-…`) | `loading="lazy"` | `loading="eager"` (atribut, kao 18.11.) |

- Zašto: na telefonu je LCP slika prve istaknute kartice (3,5 s). 18.11. „eager“ je na Blogu bio sporiji, jer je tekst tada čekao skripte. To je u međuvremenu rešeno (naslovi bez čekanja), pa je merenje ponovljeno: A/B 3 + 3 je pokazao dobitak.
- Važi za sve 3 istaknute kartice (CMS lista): 30 KB, 30 KB i jednu sa srcset-om.
- Provereno na objavljenom stagingu: u HTML-u su promenjene samo te 3 slike. **LCP na telefonu 3,5 → 2,1 s** (medijana 3 učitavanja). Izgled isti.
- Ostaje: kartica i dalje ulazi fade-in animacijom (`ins-featured`, `data-reveal`). Bez fade-a bi bilo još ~0,3–0,6 s brže, ali to je izgled i nije menjano.
- **Resources:** LCP je naslov, 2,5 s, dobro. Stranica skida 1,8 MB slika: kartice na vrhu prikazuju vrh celih snimaka sajtova (250×150) iz polja Full page screenshot, a ti snimci nemaju manje verzije. Rešava se ručnim zadatkom u `MANUAL_TASKS.md` (snimci ponovo kroz Webflow interfejs). Skripta za `sizes` tada za ove kartice bira verziju od 500 px, otprilike 1,2 MB manje na telefonu. Ništa nije menjano.

## 23.11.2026: Case stranice, naslov u hero-u samo uklizava, četkica ispod citata kao pozadina (objavljeno na staging)
Tvoji izbori: naslov „Samo klizanje, bez fade-a“, četkica „Da, kao pozadina“. Rezerva: `backup/case-hero-top-2026-11-23/` (head kod šablona pre izmene, `quote-brush-before.json`).

| Gde | Pre | Posle |
|---|---|---|
| Our Works Template, page head (stil „code moved here“) | naslov u hero-u (`cs-hero_title-wrap`, `data-reveal`) se pojavljuje iz providnog i klizne gore, 1 s | jedno CSS pravilo: naslov je odmah vidljiv i i dalje klizne gore (isti pokret i trajanje) |
| Our Works Template, citat: element četkice | `<img class="cs-quote_brush">` (1350×91, prikazana 824×20, razvučena) | `<div class="cs-quote_brush" aria-hidden="true">`, ista slika kao pozadina |
| Stil `cs-quote_brush` (native) | pozicija i veličina | isto, plus `background-image` (isti fajl, `cs-quote-brush.avif`, 3 KB), `background-size: 100% 100%`, `no-repeat` (kao pruge na Our Work 22.11.) |

- Provereno na objavljenom stagingu:
  - četkica: pre (stari objavljeni HTML) i posle su piksel po piksel isti na 1440, 1350, 1000 i 412 px. Na 768 px prosečna razlika je 0,009 od 255. Nijedna slika na 5 case stranica više nije razvučena (Best practices „image-aspect-ratio“);
  - naslov: providnost je sve vreme 1, a pomeranje ide od 24 px do 0 (klizanje radi);
  - head kod na stranici je isti kao `webflow-assets/site-code/our-works-template-head.html`.
- **LCP na telefonu** (medijana 3 učitavanja):

| Stranica | Ujutru | Posle slike u hero-u | Sada |
|---|---|---|---|
| TrakPro | 3,1 s | 3,2 s | **1,9 s** |
| Sustain | 3,3 s | 3,3 s | **2,0 s** |
| Veyor | ~3,4 s | 3,5 s | **1,9 s** |
| Ballerine | 6,2–6,8 s | 3,2 s | 3,0 s (snimak u hero-u) |
| Shiftolic | 5,9 s | 3,5 s | 3,0 s (snimak u hero-u) |

- Na Ballerine-u i Shiftolic-u LCP je srednji snimak. On stiže za 1,7 s, ali i on ulazi fade-in animacijom (`cs-shots`, `data-reveal-stagger`), pa ga Chrome računa tek oko 3,0 s. Test sa snimcima koji samo uklizavaju: 1,8–2,0 s. Pitanje u četu.

## 23.11.2026: Case stranice, tim: ime linka se poklapa sa vidljivim tekstom (objavljeno na staging)
Sa liste („label-content-name-mismatch“ u auditu pristupačnosti). Izgled isti.

| Gde | Pre | Posle |
|---|---|---|
| Our Works Template, slika člana tima (`cs-team_photo`, `6423debd-…`) | bez atributa; alt = ime člana | `aria-hidden="true"` (alt ostaje) |

- Zašto: kartica je link sa imenom „Ime, uloga, on LinkedIn“. Provera poredi to ime sa tekstom u kartici, a u tekst ulazi i alt fotografije, pa se ime javljalo dva puta („Ime Ime Uloga“) i nije se poklapalo. Fotografija sada ne ulazi u ime linka. Ime je već napisano tekstom ispod nje.
- Provereno na objavljenom stagingu (axe, isto što koristi Lighthouse, 412 i 1350 px): „label-content-name-mismatch“ je 0 na svih 5 case stranica (bilo je 3–4 po stranici).
- Ostaje prijava za kontrast sive uloge člana tima (#9ea0a3, 2,5:1). To je prigušeni tekst iz dizajna, tvoja odluka od 14.11.
- Uzgred viđeno: Webflow je u ovoj objavi sam promenio `sizes` na 3 slike u footer-u (CTA pozadina, Beograd, „N“) na „100vw“. Ja ih nisam dirao; prikaz je isti.

## 23.11.2026: Case stranice, lakša slika u hero-u, novo CMS polje „Hero screen top“ (objavljeno na staging)
Tvoje „Odobravam“ za polje. Rezerva: `backup/case-hero-top-2026-11-23/` (objavljeni HTML 5 case stranica, Our Works šema i stavke, veze slika u šablonu pre izmene).

**Zašto:** srednji snimak u hero-u case stranice bio je ceo snimak sajta klijenta (Full page screenshot, 1200 px široko i do 11.020 px visoko, 242–555 KB), a vidi se samo njegov vrh (najviše oko 1200×1030 px slike, na svim širinama ekrana). Na telefonu je to bio LCP.

| Gde | Pre | Posle |
|---|---|---|
| CMS Our Works | nema polja | novo polje **Hero screen top** (`hero-screen-top`, Image, nije obavezno), sa uputstvom |
| 5 napisanih case-ova (Ballerine, Shiftolic, TrakPro, Sustain, Veyor) | — | vrh postojećeg snimka, 1200×1200 WebP (q85), 57–129 KB; isti alt kao Full page screenshot. Fajlovi: `webflow-assets/perf/hero-top/` |
| Our Works Template, srednja slika u hero-u (`b48592ac-…`) | Full page screenshot, `loading="lazy"` | Hero screen top, `loading="eager"`, `fetchpriority="high"` |
| Our Works Template, rezervna srednja slika (`4ddd6c0b-…`, `is-legacy`) | Cover image | Full page screenshot (prikazuje se samo kad je Hero screen top prazan, kao do sada) |

- Webflow je slike preuzeo sa GitHub-a i čuva ih na svom CDN-u. Fajl na CDN-u je bajt po bajt isti kao u repou. jsDelivr je odbio jedan fajl („Package size exceeded… 50 MB“), pa je za svih 5 korišćen GitHub raw link.
- Promenjeno je samo novo polje. Ostala polja i status stavki su isti. Na home, Our Work, Resources i karticama „sledeći projekti“ i dalje se koristi Full page screenshot (tamo se snimak skroluje).
- Provereno na objavljenom stagingu:
  - u HTML-u 5 case stranica promenjene su samo dve slike u hero-u;
  - ceo snimak se više ne preuzima u hero-u;
  - izgled je poređen pre i posle na 1440, 1000, 768 i 412 px (2×). Prosečna razlika je 0,2–1,9 od 255, samo na ivicama slova, od ponovne kompresije; golim okom je isto;
  - nema JS grešaka.
- **LCP na telefonu** (spora veza, procesor 4× sporiji, medijana 3 učitavanja):

| Stranica | Pre | Posle |
|---|---|---|
| Ballerine | 6,2–6,8 s (slika) | 3,2 s |
| Shiftolic | 5,9 s (slika) | 3,5 s |
| TrakPro, Sustain, Veyor | 3,1–3,5 s (naslov) | 3,2–3,5 s (naslov) |

- Ranija procena od ~2,2 s bila je previše optimistična: u tom testu slika je dolazila lokalno, bez mreže.
- **Šta još drži LCP na ~3 s:** naslov u hero-u ulazi fade-in animacijom na okviru oko njega (`cs-hero_title-wrap`, `data-reveal`). Chrome naslov računa tek pred kraj animacije. Test bez animacije: 1,8–1,9 s. Animacija pomerena na sam naslov: 2,2–3,3 s, nepouzdano, pa nije objavljeno. Odluka o animaciji je na tebi (pitanje u četu).

## 23.11.2026: Services i 4 servisne stranice, merenje brzine i crteži u hero-u bez čekanja (objavljeno na staging)
Tvoje „ajmo redom“. Rezerva: `backup/services-perf-2026-11-23/` (objavljeni HTML Services i Design & Development, Services footer kod, merenje pre izmene).

**Šta usporava ove stranice** (telefon, spora veza, procesor 4× sporiji, kao Lighthouse; vreme blokiranja = koliko dugo stranica ne reaguje):

| Stranica | Blokiranje | Od toga GA4 | Ostalo |
|---|---|---|---|
| Design & Development (isto i ostale 3) | ~640 ms | ~390 ms | Webflow-ov kod (webflow.js, jQuery), čitanje HTML-a (~240 KB, 1558 elemenata) |
| Services | ~670 ms | ~340 ms | isto, plus naš kod za hero, tabelu, Ask Nues i turu (~0,2 s) |

- Slike su na ovim stranicama već sređene (23.11.), pa se pri učitavanju skida samo 118–128 KB slika. LCP je naslov, za ~2,1 s. Pomeranje sadržaja (CLS) je 0,004–0,008, što je dobro.
- GA4 dolazi iz Webflow integracije, pa njegov trenutak učitavanja ne možemo da menjamo bez tvoje odluke (pitanje u četu).

| Gde | Pre | Posle |
|---|---|---|
| Komponenta Services Overview Hero (`20eff2a1-…`), 8 crteža u uglovima (`svc-hero_corner-img`, ~2 KB ukupno) | `loading="lazy"` | `loading="eager"` (atribut, kao 18.11. na Our Work) |

- Zašto: na telefonu je crtež gore levo ponekad bio poslednji LCP element (2,4–3,1 s), jer se učitavao tek kad ga pregledač „vidi“. PageSpeed posebno kažnjava LCP sliku koja je lazy. A/B, 5 + 5 učitavanja naizmenično: medijana LCP ista (naslov, ~2,07 s), ali crtež više nikad nije poslednji LCP. Stigne za ~1,5 s umesto ~2,4 s.
- Provereno na objavljenom stagingu: u HTML-u Services stranice promenjeno je samo tih 8 slika.
- **Probano i nije objavljeno:** deljenje našeg Services koda na manje korake (hero odmah, ostale sekcije posle). A/B 3 + 3: blokiranje 670 → 662 ms, unutar šuma. Kod ostaje kakav je bio.

## 23.11.2026: 5 case stranica bez case-a: noindex direktno u HTML-u, novo CMS polje „SEO robots“ (objavljeno na staging)
Tvoje „ajde uradi drugo ovo“ (predlog 2 uz audit case stranica). Rezerva: `backup/seo-robots-2026-11-23/` (šema i stavke Our Works, head kod šablona, objavljeni HTML svih 10 case stranica).

**Zašto:** stranice Biotech, LaSalle, Hypersonix, Harper i Intaker nemaju case. Od 12.11. noindex im dodaje skripta, koja ih i preusmerava na sajt klijenta. Google pokreće skripte i to vidi. Alati koji ih ne pokreću (Ahrefs, Semrush, Screaming Frog) videli su 5 praznih stranica bez naslova i H1, koje se mogu indeksirati.

| Gde | Pre | Posle |
|---|---|---|
| CMS Our Works (`6aba6bc07d6279b4b561771c`) | nema polja | novo polje **SEO robots** (`seo-robots`, običan tekst, nije obavezno), sa uputstvom u polju |
| Our Works, 5 stavki bez case-a (Biotech, LaSalle, Hypersonix, Harper, Intaker) | — | `noindex, follow` |
| Our Works, 6 stavki sa case-om (TrakPro, Veyor, Sustain, Shiftolic, Ballerine, Pythagora u draftu) | — | `index, follow` |
| Our Works Template (`6aba6bc07d6279b4b56176ff`), page head, na vrhu | nema | `<meta name="robots" content="{SEO robots}">`. Skripta za preusmerenje i ostatak head koda su isti |

- Promenjeno je samo novo polje. Ostala polja i status stavki su isti (Pythagora ostaje draft).
- Provereno na stagingu, svih 10 stranica, HTML naspram rezerve. Jedine razlike su novi meta tag sa komentarom i `dateModified` u schemi, jer Webflow beleži izmenu stavke. U pregledaču: 5 pravih case stranica ima „index, follow“ i svoj H1, bez JS grešaka; 5 praznih i dalje odmah šalje na sajt klijenta.
- **Za tim:** kad se napiše case za neki od ovih 5 projekata, uz Case title treba i „SEO robots“ promeniti u `index, follow`. Bez toga stranica ostaje noindex, iako preusmerenje prestane. Isto piše u uputstvu polja u CMS-u.
- U PageSpeed auditu ovih 5 adresa i dalje pokazuje sajt klijenta (PageSpeed prati preusmerenje). Treba ih izostaviti iz audita.

## 23.11.2026: Let's talk, brže učitavanje: iClosed uklonjen, telefon polje se učitava kasnije (objavljeno na staging)
Tvoje odluke: iClosed „Ukloni skriptu i sakrivenu sekciju“, telefon „Da, učitaj kasnije“. Rezerva (objavljeni HTML, stari head i footer kod stranice): `backup/lets-talk-perf-2026-11-23/`. Kod: `webflow-assets/site-code/lets-talk-head.html` i `lets-talk-footer.html` (custom code stranice Let's talk 6aba6bc07d6279b4b56176f8).

- **iClosed:** `widget.js` (app.iclosed.io) se učitavao svakom posetiocu, a forma ga više ne koristi (kalendar je naš, preko Cal.com). Skripta je uklonjena iz footer koda, CSS pravilo `.lt-booking .iclosed-widget` iz head koda. Sakrivena iClosed sekcija (07dca240-…) u Designer-u više ne postoji, pa tu nije bilo šta da se briše.
- **Telefon polje (intl-tel-input 25.3.1):** njegov CSS i skripta su se učitavali sa stranicom. Sada se učitavaju tek kad posetilac dodirne, klikne ili kuca u formi, ili kad otvori korak 2 (polje za telefon je u koraku 2). Polje se pokreće tek kad su i CSS i skripta stigli. Bez toga je na brzoj vezi broj ponekad stajao odmaknut od „+1“ (razmak 132px umesto 66px). Taj slučaj je pronađen i ispravljen pre završetka.
- **Isto kao pre:** izgled kartice (piksel-identično na 390 i 1440 px), zastavica i pozivni broj, država po IP-u, pun broj („+1641-234-567“) pri slanju, redosled stilova (CSS biblioteke je i dalje pre naših stilova forme). Nema JS grešaka. Webflow više ne šalje `Link: preload` zaglavlje za CSS telefona.
- **Merenje** (telefon, spora veza i 4× sporiji procesor, 3 merenja): pre FCP ~2,5 s, LCP 2,8–3,9 s, vreme blokiranja ~620 ms; posle FCP 2,2–2,5 s, LCP 3,1–3,5 s, vreme blokiranja ~420 ms (jednom 626 ms). Sa stranicom se više ne učitava ništa sa cdn.jsdelivr.net ni app.iclosed.io. Najveći preostali teret je GA4, koji ostaje.

## 23.11.2026: Let's talk, kontrast prigušenog teksta ostaje (odluka, ništa nije menjano)
Predlog: 4 teksta na Let's talk („Step 1 of 4“, napomena o vremenskoj zoni, rečenica o Privacy Policy, uloga ispod citata) malo manje prozirni, kontrast 3,4–4,0 → 4,6. Pregled: `notes/lets-talk-kontrast-pre-posle-2026-11-23.png`. Tvoja odluka: „to je tako u dizajnu ne bih to menjao“, isto kao 14.11. za prigušeni tekst na celom sajtu. Lighthouse pristupačnost na Let's talk ostaje 96 zbog kontrasta.

## 23.11.2026: Provera da li su linkovi opisni, svih 41 stranica (objavljeno na staging)
Tvoje „na svakom page-u proveri jesu li svi linkovi descriptive“. Alat: `webflow-assets/site-code/tools/links-audit.js` (svaki `<a href>`: vidljivi tekst, ime za čitače ekrana, adresa); spisak: `backup/home-images-2026-11-23/links-before.json` (3088 linkova).

- **Lighthouse („Links do not have descriptive text“):** 0 linkova sa generičkim tekstom („Learn more“, „Read more“, „Click here“, „More“, „Here“…) na svih 41 stranici.
- **Linkovi bez imena za čitače ekrana:** 0. Linkovi samo sa ikonicom ili slikom (društvene mreže, logo, Clutch, AI dugmad i deljenje na blogu, hero kartice, kartice projekata) imaju ime iz `aria-label` ili alt-a slike.
- **Popravljeno (izgled isti):** u Trusted karticama logo je postojao dva puta (običan i za hover), pa je čitač ekrana čitao „TrakPro TrakPro Perfect 100 SEO score“. Hover logo je sada `aria-hidden`, ime linka je „TrakPro Perfect 100 SEO score“. Stranice: Home, Services i 4 servisne stranice.
- **Tvoja odluka „ostavi kako jeste“ (vidljivi tekst se ne menja):**
  - blog, kutija sa autorom (21 post): „More details here“ → About#team;
  - Services, tabela za poređenje: 4× „Explore Service“ ka 4 različite stranice;
  - blog „Three Webflow features from 2026…“: dva linka „AI-powered SEO and AEO tools“ ka dva različita posta (uvod i naslov sekcije).

## 23.11.2026: Alt tekst na svim slikama (objavljeno na staging)
Tvoje „pre svega svim slikama na sajtu dodaj alt textove“. Spisak pre izmene: `backup/home-images-2026-11-23/alt-inventory-before.json`; alat koji broji slike bez alt-a u HTML-u (kao tvoj audit): `webflow-assets/site-code/tools/alt-inventory.py`.

- **Rezultat:** na 41 stranici bilo je 733 slike bez alt-a (144 različite slike, jer se navbar, footer i komponente ponavljaju). Sada je **0 od 2526** (npr. Home 0 od 106, bilo 51). Spisak posle: `backup/home-images-2026-11-23/alt-inventory-after.json`.
- **Pravilo:** slike koje nose sadržaj (logo, fotografije tima, snimci sajtova, naslovne slike) imaju opisni alt. Dekorativne slike (pozadine, oblici, ikonice pored teksta, vodeni žigovi, duplirani snimci) takođe imaju alt, ali i `aria-hidden="true"`, da ih čitači ekrana preskoče, kako preporučuje WCAG.

| Gde | Šta je dodato |
|---|---|
| Navbar (komponenta) | logo „Nues“; ilustracija „We're hiring“ (dekorativna) |
| Footer (komponenta) | LinkedIn, Instagram, fotografija „Worldwide — remote“, „N“ vodeni žig i pozadina CTA (dekorativni) |
| Reviews, Video Testimonials | vodeni žigovi klijenata i ikonice „play“ (dekorativni) |
| Home | Clutch logo, 2 fotografije tima, snimci u hero karticama (vezani za ime klijenta), pozadine, planina, ikonice servisa, bočni snimci projekata (alt iz CMS-a) |
| Service Hero, Service Cases (4 servisne stranice) | oblici i pill ikonica (dekorativni); 8 novih properties „Thumb alt 1a–2d“ za sličice stranica (npr. „Ballerine website Platform page“); bočni snimci vezani za postojeći „Screen alt“ |
| Services | ikonice u tabovima, tabeli i „Ask“ sekciji, oblici i 8 crteža u hero-u (dekorativni), pill i avatar „Nues“ |
| Our Work, šablon case stranica | kartice projekata, logotipi i pozadine tabova (alt iz CMS-a), pozadine, četkica, ikonice servisa |
| CMS Our Works (10 stavki) | prazni alt-ovi na pozadinama kartica, naslovnim slikama, pozadinama tabova, logotipima i snimcima, npr. „Ballerine project card background“, „TrakPro website preview“ |
| CMS Blogs (2 posta) | „Sanity vs Webflow CMS article cover“, „Source by Webflow article cover“ |
| Site head (galerija projekata) | sličica u galeriji: prazan alt → „Screen thumbnail“ + `aria-hidden` (dugme već ima svoj naziv) |
| About | hero pozadina i pill (dekorativni); 3 manje fotografije u Timeline-u vezane za postojeće „photo alt“ properties |
| Careers, Let's talk, Pricing | hero pozadine, pill ikonice, piramida, oblici i bar-kod (dekorativni); logo na računu „Nues“ |
| Resources, Blog, šablon blog posta | hero pozadine (dekorativne), kartice članaka i projekata (alt iz CMS-a), stare kartice sa placeholder slikama |
| Šablon case stranica, bočni snimci | alt vezan za ime projekta (na 4 case stranice ta polja su prazna i slika se ne prikazuje, ali je alt sada tu) |
| Navbar, kartica „Latest from Insights“ | „Latest Insights article cover“. Slika nije višak: skripta u footer kodu sajta u nju upisuje naslovnu sliku najnovijeg posta, pa nije obrisana |

- Dve CMS slike (Biotech logo, LaSalle snimak) Webflow je pri upisu alt-a sačuvao kao nov fajl; sadržaj je bajt po bajt isti.
- Hero Cards nisu menjani u CMS-u: API traži i URL slike, a ponovni uvoz bi im oduzeo manje verzije (srcset). Zato je alt na elementu vezan za ime klijenta.
- Provereno na objavljenom stagingu: axe na 11 stranica ne prijavljuje ništa novo (samo ranije poznati kontrast i imena linkova tima); JS grešaka nema.

## 23.11.2026: Home i servisne stranice, manje slike za isti izgled (objavljeno na staging)
Korak 2 iz plana po auditu (Home). Rezervna kopija: `backup/home-images-2026-11-23/` (objavljeni Home HTML, site head pre izmene, Our Works stavke).

| Gde | Pre | Posle |
|---|---|---|
| Site settings, custom code (head) | Webflow piše `sizes="100vw"` ili širinu fajla za slike u komponentama i CMS listama, pa pregledač skida fajl za ceo ekran | nova mala skripta (810 znakova, na kraju head-a) pre učitavanja postavlja `sizes` na stvarnu širinu slike: hero kartice na Home-u, slika u Trusted sekciji, snimci projekata (Home i Service Cases), kartice na Resources |

- Zašto skripta, a ne Webflow podešavanje: `sizes` je u Webflow-u zaključan atribut („reserved attribute name“, probano dva puta, kroz atribute i kroz podešavanja elementa). Skripta dira samo lazy slike koje već imaju srcset.
- Izgled isti: na 1920, 1440, 991, 767 i 412 px izabrani fajl je uvek bar onoliko širok koliko slika zauzima na ekranu puta gustina ekrana (proveravano na objavljenom stagingu, 0 premalih). JS grešaka nema.
- Izmereno na objavljenom stagingu, sve slike na stranici:

| Stranica | Desktop 1350 px | Telefon 412 px |
|---|---|---|
| Home | 2100 → 1659 KB | 1436 → 1299 KB |
| Growth (isto i ostale 3 servisne) | 1251 → 803 KB | 699 → 492 KB |
| Resources | 2558 → 2450 KB | 2397 → 2372 KB |

- Ostaje: snimci sajtova iz Our Works (na Home-u 702 KB i na telefonu) nemaju manje verzije, jer su u CMS ušli preko API-ja; Webflow ih pravi samo za slike ubačene kroz interfejs. Pokušaj da CMS polje dobije postojeći asset sa verzijama nije uspeo (Webflow zadrži isti fajl; Ballerine stavka je samo ponovo sačuvana, sadržaj isti). Ručni zadatak je u `MANUAL_TASKS.md`; posle zamene skripta odmah bira manju verziju.

## 22.11.2026: Our Work, hero se vidi odmah, pruge bez razvlačenja slike (objavljeno na staging)
Korak 1 iz plana po auditu. Tvoj izbor za hero: „Naš reveal kao na Home-u“. Rezervna kopija: `backup/our-work-perf-2026-11-22/` (objavljeni HTML i ceo zapis IX3 interakcije „Our Work hero load“).

| Gde | Pre | Posle |
|---|---|---|
| Our Work, hero (pill, H1, podnaslov, bedževi, slajder) | IX3 „Our Work hero load“ (izranjanje 0,9–1,4 s); Webflow ih krije (`visibility:hidden`) dok se `webflow.js` ne učita | atribut `data-reveal` kao na Home hero-u: isti efekat (fade + izranjanje), ali počinje čim stigne HTML; IX3 interakcija uklonjena |
| Our Work, pruge iza hero-a (`ow-hero_stripes`) | `<img>` 8×2058 px razvučen na celu širinu (`object-fit: fill`) | div iste klase sa istom slikom kao pozadinom (`background-size: 100% 100%`), `aria-hidden` |

- Uzrok sporog LCP-a: hero je bio sakriven dok se ne učita i pokrene `webflow.js` (na usporenom telefonu ~7 s). Ostale stranice koriste naš reveal, koji ne čeka `webflow.js`.
- Izmereno na objavljenom stagingu, telefon 412 px, mreža ~1,6 Mbps i procesor 4× sporiji (kao Lighthouse): naslov se pojavljuje posle 2,0 s (bilo 7,1 s), slika slajdera posle 3,6 s (bilo 7,5 s).
- Izgled posle animacije isti: pozicije pill-a, H1, slajdera i pruga iste na 1440 i 390 px, screenshot hero-a se razlikuje samo u trepćućem kursoru i kadru videa u slajderu. Razvučenih slika više nema (Best practices „image-aspect-ratio“). JS grešaka nema.
- Ostale IX3 animacije na Our Work (case, mreža, naslovi, brojevi) su ispod prvog ekrana i nisu menjane.

## 22.11.2026: Ceo sajt, GA4 se učitava jednom i Minify (objavljeno na staging)
Tvoje „ajmo redom“ posle analize audita i odgovori: GA4 „Da, ukloni“, Minify „Uključiću ja sada“, Aeonik WOFF2 „Ne znam, preskoči“, Google fontovi kao sopstveni „Kasnije“. Rezervna kopija: `backup/ga-once-2026-11-22/` (site head i footer kod sa sajta pre izmene).

| Gde | Pre | Posle |
|---|---|---|
| Site settings, custom code (head) | `<script async src="https://www.googletagmanager.com/gtag/js?id=G-NNTMD9FV5D">` + `gtag("config","G-NNTMD9FV5D")`, a isti GA4 učitava i Webflow integracija | ta dva reda uklonjena; GA4 učitava samo Webflow integracija (Site settings → Apps & Integrations), isti nalog |
| Site settings → Publishing → Advanced (ti, ručno) | Minify HTML uključen, CSS i JS isključeni | Minify CSS i JS uključeni: CSS sajta je sada `.min.css`, 491 KB umesto 603 KB (pre kompresije) |

- Provereno na objavljenom stagingu: na Home, Services, Let's talk, blog postu i Ballerine-u head kod je identičan `webflow-assets/site-code/site-head.min.html`, `googletagmanager.com/gtag/js` se više ne učitava, ostaje jedna kopija GA4 i jedan `config`; GA šalje zahtev (`google-analytics.com/g/s/collect`). Na svih 42 naše stranice nema JS grešaka posle izmene i Minify-ja.
- Za tebe: u GA4 → Reports → Realtime proveri da poseta stagingu stiže (jednom po otvaranju stranice).
- Asynchronously load JS i Per page CSS su ostali isključeni: mogu da pokvare naše skripte i stilove koje kod dodaje tek u pregledaču. Probaćemo ih posebno, uz poređenje svih stranica.

## 22.11.2026: Services, „Not sure what you need?“ i hero kao komponente sa properties (objavljeno na staging)
Tvoje „i ovo napravi kao komponentu“ (Ask Nues) i „i ovo zbog menjanja teksta treba da bude napravi komponentu“ (hero „Four ways in / one crew behind them“). Rezervna kopija: `backup/services-components-2026-11-22/` (objavljeni HTML i kod stranice pre izmene).

| Komponenta (grupa Services) | Gde | Properties |
|---|---|---|
| Services Ask `c3cd7a89-…` | Services | Header: Heading, Lead. Prompt: Prompt start („We need“), Assistant name („Nues“), Thinking label, Avatar. Answer: Answer without JavaScript (tekst za pretraživače i bez JS-a), Suggestions intro („Not quite it? Try“). Po servisu (4): Question, Answer (`[s]` = čip servisa, `{od\|do\|prefiks\|sufiks}` = broj koji broji), Service name, Explore text, Explore link (page link kao pre), Icon, Suggestion |
| Services Overview Hero `20eff2a1-…` | Services | Pill: Pill text, Pill link (link na sekciju #tour kao pre), Pill icon. Heading (prvi red H1), Heading highlight (drugi red, gradijent). Buttons: Button text + link (#tour), Second button text + link (Our Work, page link). Po servisu (4): Service text (rečenica ispod naslova dok je ugao upaljen; prva je i podnaslov pre skripte), Drawing (lit), Drawing (dim) |

- Ask: boje servisa (`data-ink`, `data-tint`) i ključ servisa (`data-service`) ostaju fiksni u komponenti, jer ih koriste CSS i skripta; sve ostalo je property.
- Ask, kod stranice (footer): „We need“, „Nues“ i „Thinking“ su bili upisani u skriptu; sada ih skripta čita iz komponente (tekst trake, ime i novi atribut `data-thinking`), uz iste vrednosti kao rezervu.
- Hero: H1 je ostao `Four ways in<br><span class="text-gradient is-launch">…</span>`; tekst oba reda i tekst dugmeta su u `<span>` bez klase (Webflow Span i tekst pored ikonice ne mogu da se vežu za property), kao u Service Hero komponenti. Podnaslov i prva rečenica ugla su isti property, pa ostaju usklađeni.
- Provereno na objavljenom stagingu naspram backup-a: screenshot hero-a i Ask sekcije isti piksel po piksel na 1440×900, 820×1180 i 390×844; tekst, slike, linkovi, atributi i klase cele stranice isti (jedino novo je `data-thinking="Thinking"`); hero rotira rečenice istim redom, Ask kuca „We need a new website.“, pokazuje „Thinking“ pa „Nues“, odgovor i link „Explore Design & Development“ (/services/design-development), klik na predlog „Nobody finds us on Google.“ prebacuje na SEO & AEO sa istom ikonicom; JS grešaka nema.

## 22.11.2026: Services, sekcija „Four services“ kao Webflow Tabs (objavljeno na staging)
Tvoje „napravi ovo kao webflow tabove“. Rezervna kopija: `backup/services-tabs-2026-11-22/` (objavljeni HTML i kod stranice pre izmene, i iz repozitorijuma i sa Webflow-a).

| Gde | Pre | Posle |
|---|---|---|
| Services, `services-tabs_stage` | 4 pozadine, `services-tabs_inner` > padding > container > `services-tabs_panels` > 4 panela (paneli 2–4 sa combo `is-off`), `services-tabs_menu` sa 4 Link Block-a | 4 pozadine i Webflow Tabs (`services-tabs_tabs`): Tabs Content = `services-tabs_inner`, 4 Tab Pane-a (`services-tabs_pane`), svaki sa svojim padding > container > panel; Tabs Menu = `services-tabs_menu`, 4 Tab Link-a (`services-tabs_tab`) sa istim sadržajem |
| Nove klase | | `services-tabs_tabs` (flex kolona, position static, da meni ostane pozicioniran prema stage-u), `services-tabs_pane` (širina 100%) |
| `services-tabs_menu` | | boja #fff i 18px (15px na telefonu). Client-First globalni stil `.w-tab-link{color:inherit;font-size:inherit}` poništava boju i veličinu Tab Link-a, pa ih link sada nasleđuje od menija (globalni stil nije diran). |
| Kod stranice (head) | `.services-tabs_panels{display:grid}`, `is-off` override | Tabs Content slaže 4 pane-a u istu ćeliju mreže (`align-self:stretch`, kao stari paneli), prelazi ostaju isti |
| Kod stranice (footer) | klik i tastatura na svakom tabu | isti tok (scroll na desktopu, autoplay na tabletu i telefonu); klik i tasteri se hvataju na meniju pre Webflow-ovog tab handlera (on bi dodao svoj fade), skripta pali `w--current` i `w--tab-active`, ARIA ide na Tab Pane |

- U Designeru: klik na tab (ili izbor Tab Pane-a u Navigatoru) pokazuje taj servis za uređivanje, umesto starog `is-off` sakrivanja.
- Klase `services-tabs_panels` i combo `is-off` više nisu na stranici; stilovi nisu brisani.
- Provereno na objavljenom stagingu naspram backup-a: screenshot cele sekcije isti piksel po piksel na 1440×900 (sva 4 koraka skrola), 820×1180 i 390×844 (tab 1 i tab 3). Pozicije i veličine tabova, pill-a, naslova, lista i dugmadi iste na 1440, 1024 i 390; klik na tab (skrol do koraka na desktopu), strelice i Home na tastaturi, autoplay i reduced motion rade; Webflow-ov fade se ne uključuje, URL se ne menja; tekst, slike i atributi cele stranice isti; JS grešaka nema.

## 22.11.2026: Sekcije koje se ponavljaju postaju komponente sa properties (objavljeno na staging)
Tvoje „za svaku sekciju koja se pojavljuje dva ili više puta na sajtu da napraviš component-u, i da svaki content unutar nje može da se menja preko properties … i slike“. Rezervna kopija objavljenog HTML-a svih 15 stranica pre izmena: `backup/components-2026-11-22/`.

| Komponenta (grupa Sections) | Gde | Properties |
|---|---|---|
| About Timeline `9a2e9b0d-…` | About | Heading + po godini (2023–2026): godina, naslov, tekst, veličina tima, oznaka, fotografija, alt. Ista fotografija godine je na grafikonu, u balončiću i na telefonu (32 vezana elementa). |
| Trusted `6f85bd4f-…` | Home, Services, Design & Development, Webflow Development, Growth, SEO & AEO (6 instanci) | Header: Heading, Link text, Link. Video: Video image + alt, Video logo + alt, Video stat, Video stat label, Video URL (Vimeo link za dugme play, `data-video-src`). Varijante Default / Launch / Build / Plus / SEO. Slot „Case cards“. |

| Team `08a1843e-…` (postojala, bez properties) | About, Careers | Heading; po članu (7): Show member, Name, Role, Photo, Photo alt, LinkedIn, Link label (aria-label); Hiring text, Hiring button text, Hiring button link (na obe stranice page link na Let's talk kao pre) |
| Video Testimonials `4a0378cd-…` (postojala) | Home, Our Work, Pricing, 4 servisne (7) | Heading; po videu (2): Video image + alt, Logo + alt, Video URL (`data-video-src`, isti Vimeo kao pre), Play label, Quote, Quote highlight, Signature, Name, Role |
| Reviews `6bd64d63-…` (postojala) | Home, About, Services, 4 servisne (7) | Heading, Clutch link, Clutch label; po recenziji (5): Tab, Logo + alt, Quote, Role, Company, Industry, Watermark |
| Service Cases `34b22d05-…` (postojala, varijante ostaju) | 4 servisne | Heading; po projektu (2): Cover, Screen + alt (ista slika u tri okvira), Tag, Thumb a–d, Gallery name/domain/pages (popup galerija), Case link, Logo + alt, Text, Text muted, Stat, Stat label |
| Service Numbers `b93b6b62-…` (postojala, varijante ostaju) | 5 stranica | Heading, Value 1–4, Label 1–4 |

| Service Hero `4e3b548d-…` (grupa Services) | Design & Development, Webflow Development, Growth, SEO & AEO | Pill text, Pill link, Pill icon, Heading (prvi red H1), Heading highlight (reči u gradijentu), Subheading, Button text + link, Second button text + link, Shape 1–3. Varijante Default / Launch / Build / Plus / SEO. |

- Service Hero: boje teme su bile combo klase (`svc-hero is-build`, `svc-hero_pill is-plus`, `svc-btn is-seo`, `text-gradient is-launch`, `svc-hero_content is-wide`). Combo klasa ne može da se menja po varijanti, pa elementi u komponenti imaju osnovne klase, a vrednosti combo klasa su preslikane 1:1 u stilove varijanti. Launch ima i širi sadržaj (62.5rem, kao `is-wide` na Design & Development).
- Gradijent reči u H1: spoljni `<span class="text-gradient">` je ostao, jer site skripta za telefon po njemu čuva prelom reda ispred tih reči. Unutra je novi `<span class="svc-hero_highlight">` (nova klasa, ista svojstva kao `text-gradient is-launch`) koji svaka varijanta boji svojim gradijentom.
- Animacija oblika („Services hero shapes rise“) cilja klasu `svc-hero_shape`, pa radi i u komponenti.
- Provereno na objavljenom stagingu, 4 stranice, 1440 i 390 px: pozicije i veličine sekcije, sadržaja, pill-a, H1, podnaslova, dugmadi i oblika iste; boja pozadine, pill-a, dugmeta i gradijent isti; prelom reda u H1 na telefonu isti; linkovi isti (page linkovi na Let's talk i Our Work).
- Nisu pretvorene, uz razlog: „Full-service web transformation“ (na svakoj servisnoj stranici druga struktura i sadržaj, Design & Development ima tabove, SEO ima 3D scenu); Privacy i Terms (isti okvir, ali telo je jedan Rich Text sa potpuno drugim tekstom, a Webflow API Rich Text property puni samo običnim tekstom, bez naslova i lista); 404 (jedna stranica). Navbar, Footer, CTA, Service FAQ i Global Styles su već bili komponente.
- Gde je tekst bio „običan tekst + span“ (citat u Video Testimonials, tekst projekta u Service Cases), prvi deo je u novom `<span>` bez klase, a istaknuti deo u `<span>` unutar postojećeg (Webflow Span se ne veže za property). Razmaci su sačuvani (provereno u HTML-u).
- Provereno na objavljenom stagingu, svih 15 stranica, ceo `<main>` naspram backup-a: tekst (bez ubačenih razmaka, pa bi se video i izgubljen razmak), slike i alt, atributi (href, target, rel, aria, data) i klase isti. Jedine nove stvari su `data-video-src`, klasa `trusted_list` i Webflow-ove `w-variant-…` klase. JS grešaka nema ni na jednoj stranici; tab 3 u Reviews prikazuje Harper (Head of Growth); galerija projekta se otvara (ballerine.com); oba videa otvaraju isti Vimeo kao pre (…052 Intaker, …053 Ballerine).
- Trusted ima CMS listu (Our Works kartice), a Webflow ne dozvoljava CMS listu unutar komponente („Components can't hold a live CMS binding“). Zato lista ostaje na stranici, u slotu „Case cards“ komponente, sa istim podešavanjima (Show in hero section, sort Number in section).
- `<section class="section_trusted is-…">` ostaje na stranici sa svojom klasom teme, jer site kod veže hover boje za nju (`.section_trusted.is-plus …` za strelicu i kartice) i jer `is-seo` daje SEO promenljive karticama u slotu. Komponenta je sve unutar sekcije.
- Boje teme unutar komponente su varijante (stare combo klase `is-launch/is-build/is-plus/is-seo` na strelici, overlay-u i oznaci videa preslikane 1:1 u stilove varijanti). Services koristi Default, jer je njegov `is-build` na oznaci iste boje kao osnovna (#0d1928).
- Slot dodaje jedan `<div>` oko liste, pa se mreža kartica na desktopu skupila (450 → 174 px). Nova klasa `trusted_list` (height 100%) na CMS listi to vraća.
- Home link ostaje veza na stranicu Our Work (page link), ostale stranice `/our-work#ow-work` kao pre.
- Provereno na objavljenom stagingu, svih 6 stranica, 1440 i 390 px: tekst, slike i alt isti kao u backup-u; pozicije i veličine sekcije, videa, mreže i kartica iste; boje strelice, overlay-a i oznake iste; hover kartica i strelice isti; play otvara isti Vimeo video; JS grešaka nema.

## 22.11.2026: Let's talk, zemlja za telefon po IP adresi (objavljeno na staging)
Aleksandru je u Srbiji forma nudila +44, jer je zemlja birana po jeziku pregledača (en-GB → GB). Tvoje „može li preko geolocation … ako može odradi“.

| Gde | Pre | Posle |
|---|---|---|
| Let's talk footer, polje Phone | zemlja iz jezika pregledača (`navigator.languages`) | prvo jezik (odmah), pa zemlja po IP adresi sa `/cdn-cgi/trace` na našem domenu (Cloudflare, preko kog Webflow servira sajt, vraća `loc=RS`); menja se samo ako posetilac još nije otvorio polje ni otkucao broj |

- Bez spoljnog servisa i bez pitanja „dozvoli lokaciju“: Cloudflare već vidi IP kao CDN sajta, pa nema novog primaoca podataka ni izmene Privacy Policy. Radi i na stagingu i na www.nues.agency (provereno).
- Ako Cloudflare ne odgovori ili vrati nepoznatu zemlju (`XX`, Tor `T1`), ostaje izbor po jeziku. Posetilac i dalje može ručno da promeni zemlju.
- Provereno na objavljenom stagingu: pregledač en-GB + Cloudflare RS → +381; sr-RS + DE → +49; Cloudflare ne radi → +44 (jezik); posetilac otvorio polje pre odgovora → ne menja se. JS grešaka nema.
- Rezervna kopija: `backup/page-code/2026-11-21-lets-talk-wizard/lets-talk-footer-before-geo.html`.

## 22.11.2026: Privacy Policy, Cal.com umesto iClosed (objavljeno na staging)
Tvoje „izmeni ovo u privacy policy da više ne koristimo iClosed već Cal.com“. Rezervna kopija: `backup/page-text/privacy-policy-before-2026-11-22.md`.

| Gde (Privacy policy, `6aba6bc07d6279b4b5617704`) | Pre | Posle |
|---|---|---|
| Cookies, stavka liste | „Cookies from embedded services, such as our video player (Vimeo) and booking calendar (iClosed), set when you watch a video or book a call“ | „Cookies from embedded services, such as our video player (Vimeo), set when you watch a video“ |
| Deljenje podataka, stavka liste | „With service providers that help operate the website (hosting, analytics, etc.)“ | „With service providers that help operate the website (hosting, analytics, call scheduling through Cal.com, etc.)“ |

- Zašto Cal.com nije u rečenici o kolačićima: naš kalendar nije Cal.com embed, nego poziva Cal.com API iz pregledača bez kolačića (zahtev ka drugom domenu bez `credentials`, pa pregledač ne čuva `__cf_bm` koji API vraća). Zato je Cal.com naveden kao pružalac usluge zakazivanja.
- Webflow ne menja tekst stavke liste preko API-ja („This element doesn't support text“), pa su ubačene nove stavke (`<li>`, bez klase, kao i ostale) i obrisane stare.
- Provereno na objavljenoj stranici: „iClosed“ se više ne pojavljuje, obe nove stavke su tu.
- Ostaje (na odobrenje): rečenica da se podaci iz Let's talk forme čuvaju u Google tabeli i pre slanja.

## 21.11.2026: Lead tabela, Slack obaveštenja (Apps Script v4, proba, čeka webhook)
**Odloženo (21.11.):** tvoje „ako treba admin onda preskačemo za sad slanje na Slack“. U tabeli i dalje radi v3; v4 ostaje u repou za kasnije.

Tvoje „napravio sam kanal i hoću da samo za sad imam ja pristup … da bude u nekoj testnoj fazi“. Kanal #leads-test je privatan, jedini član si ti.

| Šta | Pre (v3) | Posle (v4) |
|---|---|---|
| Slack | – | provera na 10 minuta: ko je ostavio email ili telefon i nije zakazao 30 min posle poslednje aktivnosti dobija jednu poruku „Did not book“, svako zakazivanje jednu poruku „Booked a call“ |
| Kolone | 19 | + sakrivena „Slack sent“ (šta je i kad poslato; „before Slack“ za redove koji su postojali pre uključivanja) |
| Meni Nues | Tidy up the Leads sheet | + Turn on Slack alerts, Send a Slack test message, Turn off Slack alerts |
| Podešavanja | – | na vrhu skripte: `ABANDON_MINUTES = 30`, `NOTIFY_BOOKED = true`; Script property `ABANDON_MINUTES` (npr. 2) za brzu probu |

- Webhook URL se čuva samo u Script Properties (`SLACK_WEBHOOK_URL`), ne u kodu, repou ni na sajtu.
- Tekst posetioca se u poruci escape-uje (`&`, `<`, `>`), pa ne može da postane link ni @channel.
- Poruka: status, ime · email · telefon, firma, sajt, budžet, izvor, napomena (do 500 znakova), link na red u tabeli.
- Provereno na tabeli u memoriji i lažnom Slack-u: uključivanje (stari red „before Slack“, okidač na 10 min, poruka u kanal), odmah posle unosa nema poruke, posle 40 min tačno jedna „Did not book“, ponovna provera bez duplikata, posle zakazivanja „Booked a call“ sa skraćenim terminom, stari red koji kasnije zakaže ne dobija poruku.
- Rezervna kopija v3: `backup/page-code/2026-11-21-lets-talk-wizard/leads-apps-script-v3.gs`.

## 21.11.2026: Lead tabela čitljivija, Apps Script v3 (čeka da ga zameniš u Apps Script-u)
Tvoje „napravi da bude malo čitljivije“. Na sajtu se ništa ne menja (forma šalje iste podatke).

| Šta | Pre (v1/v2) | Posle (v3) |
|---|---|---|
| Redosled kolona | Lead ID, First seen, Last update, Step reached, Booked, Booking time, Email, Name, … | Last activity, Step reached, Name, Email, Phone, Company, Website, Budget, How they heard about us, Notes, Meeting, Guests, Time zone, Came from, UTM, pa sakrivene: First seen, Page, Lead ID, Sent at (ms) |
| Datum | samo datum | datum i vreme (dd.mm.yyyy hh:mm) |
| Redosled redova | novi red na dnu | novi posetilac na vrhu; meni sortira sve po poslednjoj aktivnosti |
| Boje | – | zeleno = zakazao, žuto = poslao formu a nije zakazao, crveno = stao u formi (napomena na zaglavlju „Step reached“) |
| Zaglavlje | podebljano | tamno, zamrznuto, sa filterom |
| Kolona „Booked“ | Yes/No | uklonjena: „5 Booked“ u „Step reached“ kaže isto |
| Termin | „Monday, November 23, 2026 · 9:30 AM – 10:00 AM (Europe/Belgrade)“ | „Mon 23 Nov 2026, 9:30 AM – 10:00 AM (Europe/Belgrade)“ |
| Ostalo | – | Notes se prelama u više redova, ostale kolone u jednom; prazan „Sheet1“ se briše, „Leads“ je prvi list; meni **Nues → Tidy up the Leads sheet** |

- Kolone se nalaze po nazivu zaglavlja: naziv se menja samo u skripti (`COLUMNS`), ne u tabeli.
- Prvi unos posle nove verzije sam prebacuje postojeće redove u novi raspored (ili meni Nues).
- Provereno na tabeli u memoriji sa rasporedom kao u tvojoj: stari redovi prebačeni, najnoviji na vrhu, „=formula test“ i telefoni ostaju tekst, kasni stariji zahtev se zanemaruje.
- Rezervna kopija v2: `backup/page-code/2026-11-21-lets-talk-wizard/leads-apps-script-v2.gs`.

## 21.11.2026: Let's talk forma, lead tabela povezana (proba na tvom nalogu, objavljeno na staging)
| Gde | Pre | Posle |
|---|---|---|
| `.lt-form` (`71fe9368-…-2d2d5f621ca1`), atribut `data-lead-url` | nije postojao | `https://script.google.com/macros/s/AKfycbyfoKxH…/exec` (tvoja tabela „Nues Leads (test)“ na luka@nues.agency) |
| Footer kod, slanje u tabelu | svaka promena odmah šalje zahtev (12 po prolazu, paralelno) | jedan zahtev u isto vreme, u redu čeka samo najnovije stanje; kad se stranica sakrije ili zatvori, najnovije stanje ide odmah (beacon); svaki zahtev nosi vreme slanja (`ts`) |
| Apps Script (`webflow-assets/lead-capture/leads-apps-script.gs`) | v1 | v2: red se nalazi preko TextFinder-a, zahtev stariji od poslednjeg upisanog se zanemaruje (nova kolona „Sent at (ms)“). **Treba da ga zameniš u Apps Script-u** (MANUAL_TASKS.md) |

- Zašto: Apps Script upisuje oko 2 s po zahtevu i obrađuje jedan po jedan. Sa 12 paralelnih zahteva prvi probni red je ostao na koraku 2.
- Provereno na objavljenom stagingu, bez presretanja mreže (Playwright presretanje blokira keepalive zahteve i davalo je lažnu grešku): 5 zahteva redom (koraci 1, 2, 3, 3, 5), red „Test (Claude, staging v4)“ u tabeli ima sve: korak 5, Booked: Yes, termin, email, telefon, firmu, sajt, budžet, izvor, napomenu, zonu, stranicu, UTM. Webflow forma nije poslata (uspeh simuliran), termin nije zakazan (Cal.com odgovor simuliran u stranici).
- U tabeli je 8 probnih redova (Lead ID `claude-…` i redovi sa imenom „Test (Claude, …)“). Možeš ih obrisati.
- Okruženje ovog rada: dozvoljeni hostovi `script.google.com` i `script.googleusercontent.com` (da bih mogao da proverim tabelu iz test pregledača).
- Rezervne kopije: `backup/page-code/2026-11-21-lets-talk-wizard/lets-talk-footer-leads-v1.html`, `leads-apps-script-v1.gs`.

## 21.11.2026: Let's talk forma, čuvanje onoga što posetilac ukuca (proba, kod objavljen na staging, još neaktivan)
Darkovo pitanje „kad neko krene da popunjava podatke … ko god šta ukuca ostaje“ i tvoje „ajde da napravimo probno … na mom“ nalogu.

| Gde | Pre | Posle |
|---|---|---|
| Let's talk, footer kod | podaci se čuvaju tek kad se klikne „Continue to calendar“ (Webflow Forms) i kad se zakaže (Cal.com) | ako `.lt-form` ima `data-lead-url`, sve što se ukuca šalje se u Google tabelu: posle svake promene polja, na svakom koraku, kad posetilac sakrije ili zatvori stranicu, kad se otvori kalendar i kad zakaže |
| Nova skripta za tabelu | – | `webflow-assets/lead-capture/leads-apps-script.gs` (Google Apps Script, web app) |

- Jedan red po posetiocu (ID ostaje isti i posle osvežavanja u istom tabu). Red se dopunjuje, a ništa već upisano se ne briše. Kolone: Lead ID, First seen, Last update, Step reached, Booked, Booking time, Email, Name, Phone, Company, Website, Budget, How they heard about us, Notes, Guests, Time zone, Page, Referrer, UTM.
- Tekst posetioca se upisuje kao tekst (vrednost koja počinje sa = + - ili @ ne može da postane formula).
- **Još ne radi na stagingu:** `data-lead-url` nije upisan dok ne pošalješ adresu tabele (koraci u MANUAL_TASKS.md).
- Provereno: skripta na probnoj tabeli u memoriji (dopuna reda, korak ne ide unazad, telefon i formule kao tekst). Kod stranice proveren u mom pregledaču sa lažnom adresom tabele: 12 slanja za ceo prolaz, isti ID, podaci iz koraka 2 sačuvani i bez klika na „Continue“, JS grešaka nema. Objavljeni footer je isti kao fajl u repou.
- Rezervna kopija prethodnog footera: `backup/page-code/2026-11-21-lets-talk-wizard/lets-talk-footer-before-leads.html`.

## 21.11.2026: Let's talk forma u koracima, kartica stalne visine (objavljeno na staging)
Tvoje „ajde odradi ovo što si mi predložio“ (predlog sa slike `notes/forma-sada-vs-predlog-2026-11-21.png`). Rezervna kopija pre izmene: `backup/page-code/2026-11-21-lets-talk-wizard/` (head i footer kod, objavljeni HTML sekcije, vrednosti stilova).

| Gde | Pre | Posle |
|---|---|---|
| Visina kartice (desktop) | 813 → 1406 → 984 → 327 px po koracima | 813 px u svim koracima (`lt-form` height 813px; laptop 1024 i telefon 390 isto, bez skrolovanja unutar kartice) |
| Zaglavlje kartice | „Fill out the form · Book your event“ (`lt-form_steps`, obrisano) | traka sa 4 dela + „Contact / About you / Your project / Book your event“ i „Step 1 of 4“ (`lt-form_progress`, `-bar`, `-seg` + `is-done`, `-label`, `-name`, `-count`) |
| Polja forme | sva u jednoj listi, ostala se pojavljuju posle Email + Name | 3 grupe (`lt-form_stage` + `is-active`, `data-lt-stage` 1–3): Email, Name / Phone, Company, Website / Budget, How did you hear about us, Notes (Notes premešten na kraj) |
| Dugmad | jedno „Continue“ (slanje) | „Continue“ u koracima 1–2 (`lt-form_submit` + `is-next`, `data-lt-next`), pravo slanje „Continue to calendar“ samo u koraku 3 (`lt-form_submit` + `is-final`), „← Back“ u koracima 2–3 (`lt-form_back`) |
| Budget i izvor | radio lista | dugmići u redu (`lt-form_options` red sa prelomom, `lt-form_option` kao pill, izabran je taman) |
| Notes | visina 120 px | 96 px |
| Kalendar | zona, pa „Add guests (Optional) 0/5“, termini u jednoj koloni, Confirm pored termina | zona i „+ Guests“ u jednom redu (`lt-cal_row`), termini u 3 kolone sa skrolom unutar kartice, izabran termin označen (`lt-cal_slot` + `is-selected`), „Confirm 10:30 AM“ dole preko cele širine |
| Thank you | kartica 327 px | ista visina, tekst centriran (tekst nepromenjen) |

- Zašto posebno dugme „Continue“: forma ima Webflow zaštitu od spama (Cloudflare Turnstile) i dok ona ne prođe, pravo dugme za slanje je zaključano. Ovako zaštita radi u pozadini dok posetilac popunjava korake 1–2.
- Enter u polju vodi na sledeći korak; prazna obavezna polja zaustavljaju prelaz uz poruku pregledača.
- Novi tekstovi na sajtu (čekaju tvoje odobrenje, copy nije finalan): „Contact“, „About you“, „Your project“, „Step 1 of 4“, „Continue to calendar“, „← Back“, „+ Guests“, „Guest email“, „Confirm 10:30 AM“, „Done“, „Pick a day“.
- U Designer-u se vidi samo grupa 1; grupe 2 i 3 se uređuju uključivanjem `is-active` na njima.
- Kod: `webflow-assets/site-code/lets-talk-head.html` i `lets-talk-footer.html` (isti su kao na stranici, provereno na objavljenoj stranici). iClosed skripta je i dalje u footeru (čeka tvoju potvrdu).
- Ostali su neiskorišćeni stilovi ove forme: `lt-form_steps`, `lt-form_step`, `lt-form_step-dot`, `lt-form_step-text`, `lt-form_form.is-short`, `lt-form.is-expanded`, `lt-form_cal-empty`, `lt-cal_pick`, `lt-cal_guests-head`, `lt-cal_count`. Nisam ih brisao.
- Provereno (1440, 1024, 390; slanje forme i zakazivanje presretnuti, ništa nije poslato ni zakazano): svi koraci, Back, prazna polja, termini, gosti, zona, potvrda, JS grešaka nema. Snimci: `notes/lets-talk-forma-koraci-desktop-2026-11-21.png`, `notes/lets-talk-forma-koraci-phone-2026-11-21.png`.

## 21.11.2026: Let's talk forma, uporedni prikaz „sada vs predlog“ (bez izmena na sajtu)
Tvoje „uradi mi kako je dizajn sad, a kakav je ako uradiš ove promene“.

- **Sada** (snimljeno na stagingu, desktop 1440): visina kartice po koracima 813 → 1406 → 984 → 327 px (početak, posle Email + Name, kalendar, thank you).
- **Predlog**: ista stranica, predlog primenjen samo u mom lokalnom pregledaču (CSS i JS ubačeni u Playwright, ništa nije objavljeno ni sačuvano u Webflow-u). Kartica je u svih 5 koraka 813 px: Kontakt → Firma → Projekat → Termin → Thank you.
- Zakazivanje je u testu presretnuto lokalno (`POST /v2/bookings` vraća lažan odgovor), pa pravi termin nije napravljen.
- Novi tekstovi u predlogu („Step 1 of 4“, „Contact“, „About you“, „Your project“, „Continue to calendar“, „← Back“, „+ Guests“, „Confirm 10:30 AM“) čekaju tvoje odobrenje.
- Slika: `notes/forma-sada-vs-predlog-2026-11-21.png`.

## 21.11.2026: Let's talk, slider sa 3 citata iz sekcije „Verified reviews“ (objavljeno na staging)
Tvoje „ovaj slider na contact stranici popuni sa neka tri testimonialsa iz ove sekcije“. Izvor: sekcija `#reviews` na Home (ista je na About i servisnim stranicama), tekst proveren na stagingu 21.11.

| Slajd | Pre | Posle |
|---|---|---|
| 1 | „We are thrilled with the work Nues did…“, Or Moshkovitz, Marketing Director at Ballerine, sa fotografijom | „If you’re looking for a team to build your B2B Saas website fast and right I would definitely recommend Nues.“ · **Founder**, Shiftolic · Workforce |
| 2 | „Three competitors asked us who built our site…“, Or Moshkovitz, sa fotografijom | „When I need something, the team responds quickly, and that is what’s the most important.“ · **Marketing Director**, Ballerine · Fintech |
| 3 | (nije postojao) | „The honest feedback stung for about a day. Then the new site outperformed the old one in every metric we track.“ · **Head of Growth**, Harper · Insurance |

- Menjan je samo slider u novoj (vidljivoj) sekciji; sakrivena originalna sekcija i dalje ima stara dva slajda.
- Tekst citata je isti kao u izvoru; spoljni navodnici („ “) su izostavljeni, kao i do sada u ovom slideru. Pošto citati u izvoru nemaju ime ni fotografiju osobe, slajdovi su bez fotografije: uloga podebljano, firma i oblast sivo (iste klase `lt-quote_name` / `lt-quote_role`).
- Treći slajd je pravi Webflow slajd: napravljen privremeni slider, njegov slajd premešten u ovaj, privremeni slider obrisan.
- Provereno (1440 i 390): 3 slajda, 3 tačke, strelica „sledeći“ ide 1 → 2 → 3 → 1, JS grešaka nema. Snimak: `notes/lets-talk-slider-citati-2026-11-21.png`.

## 21.11.2026: Let's talk, sakrivena stara sekcija sa iClosed-om, ostaje nova forma sa našim kalendarom (objavljeno na staging)
Tvoje „sakrij gornju sekciju, a donju ostavi i publishuj na staging“.

| Gde | Pre | Posle |
|---|---|---|
| Let's talk, originalna sekcija `lt-hero` (`07dca240-…-f9c3fa418061`, iClosed) | vidljiva | Visibility isključeno (ne objavljuje se; element i dalje postoji u Designer-u, vraća se uključivanjem) |
| Nova sekcija (`71fe9368-…-5d2d5f621ca6`), naslov „The first 30 minutes / are on us.“ | H2 (da stranica ne bi imala dva H1) | H1, iste klase i isti izgled, jer je H1 originalne sekcije sada sakriven |

- Kod stranice nije menjan: iClosed skripta se i dalje učitava u footeru, ali bez iClosed bloka na stranici ne radi ništa. Uklanja se kad potvrdiš da stara sekcija ide zauvek.
- Provereno (1440 i 390): jedna sekcija, nema iClosed bloka, jedan H1, zaključani kalendar sa 6 slobodnih dana, bez širenja u stranu i bez JS grešaka.

## 21.11.2026: Let's talk, prvo pravo zakazivanje kroz naš kalendar (test, ništa nije menjano u Webflow-u)
Tvoje „ajde probaj mail luka@nues.agency, da se samo na taj nalog šalje“. Forma na stagingu popunjena sa luka@nues.agency, bez gostiju; Webflow slanje forme je simulirano (da obaveštenje o prijavi ne ode timu), a zakazivanje u Cal.com je pravo.
- Termin: ponedeljak 23.11.2026, 16:30–17:00 (Europe/Belgrade), događaj „30min“ na test Cal.com nalogu. Cal.com odgovor: 201, status „accepted“, uid `4cFPmFHep7NUbYLWWtGDdP`.
- Na stranici se pojavilo „You're booked“ sa tačnim datumom i vremenom; JS grešaka nema. Snimak: `notes/kalendar-pravo-zakazivanje-2026-11-21.png`.
- Termin nije otkazan; otkazuje se na tvoje „da“ (iz Cal.com-a, iz emaila ili preko API-ja).

## 20.11.2026: Let's talk, naš kalendar umesto iClosed-a, preko Cal.com API-ja (test sekcija, objavljeno na staging)
Tvoje „možemo li preko nekog koda da napravimo i naš custom kalendar“ i test Cal.com nalog. Kopija koda pre izmene: `backup/page-code/2026-11-20-lets-talk-form/lets-talk-head-before-3.html`, `lets-talk-footer-before-3.html`. Originalna sekcija sa iClosed-om nije dirana.

- **Kako radi:** forma (korak 1) se šalje kao Webflow forma „Book a call“, pa se prikazuje naš kalendar. Slobodni termini se čitaju sa `api.cal.com/v2/slots`, a termin se zakazuje sa `api.cal.com/v2/bookings`. Za javni događaj ključ nije potreban, a Cal.com dozvoljava pozive sa bilo kog sajta (provereno 20.11.). Cal.com i dalje šalje potvrde, pravi termin u kalendaru i nudi otkazivanje i pomeranje termina.
- **Događaj:** `data-cal-link="luka-radomirovic-0rujrx/30min"` na `.lt-form` (test nalog; za klijenta se menja samo ovaj atribut).
- **Kalendar:** mesec sa stvarnim slobodnim danima (prvi slobodan dan izabran), termini za dan, 12h/24h, vremenska zona kao dropdown sa pretragom, do 5 gostiju po emailu, klik na termin otvara Confirm pored njega, posle potvrde „You're booked“ sa datumom, vremenom i zonom. Zaključani kalendar u koraku 1 sada označava stvarne slobodne dane.
- **Napomena u terminu:** telefon, kompanija, sajt, budžet, „How did you hear“ i poruka iz forme.
- **Stilovi:** 46 novih klasa `lt-cal*` (sa 6 combo klasa i 6 hover stanja) i `lt-form_preview-day.is-available`, sve nativno u Webflow-u; elemente crta skripta. Obrisan privremeni element `lt-form_cal-empty`.
- **Kod stranice:** footer ponovo napisan (17 648 znakova; skripta forme + kalendar, bez Cal.com embed-a), head dopunjen sa 5 pravila. Upisano preko agenta i provereno da je identično fajlovima u repou.
- **Mreža okruženja:** dozvoljeni `api.cal.com`, `app.cal.com`, `cal.com` (za test sa moje strane).
- **Provereno:** lokalno sa stvarnim terminima i na stagingu (1440 i 390): slobodni dani, termini, 24h, pretraga zone sa preračunom termina, gost, sledeći mesec, Confirm i Thank you; JS grešaka nema. Zakazivanje je u testu presretnuto (nije poslato u Cal.com), jer Cal.com odbija nepostojeći email gosta, a tvoj email ne koristim bez dozvole. Pravo zakazivanje treba probati jednom ručno.
- **Novi tekstovi (za odobrenje):** „You're booked“, „A calendar invitation has been sent to …“, „Pick a day“, „No available times this month. Try the next month.“, „That time was just taken. Please pick another one.“ i poruke o grešci.
- Snimci: `notes/kalendar-1-forma-2026-11-20.png`, `notes/kalendar-2-termin-confirm-2026-11-20.png`, `notes/kalendar-3-vremenska-zona-2026-11-20.png`, `notes/kalendar-4-thank-you-telefon-2026-11-20.png`, `notes/kalendar-telefon-2026-11-20.png`.

## 20.11.2026: Let's talk, nova forma prati iClosed korake (test sekcija, objavljeno na staging)
Tvoje „ajde update-uj“ posle skice toka (https://claude.ai/artifact/188kMfwhLtBWjuosWLMk2y). Kopija koda pre izmene: `backup/page-code/2026-11-20-lets-talk-form/lets-talk-head-before-2.html`, `lets-talk-footer-before-2.html`. Originalna sekcija sa iClosed-om nije dirana.

| Korak | Pre | Posle |
|---|---|---|
| 1 | Email i Name sa nazivom iznad polja; ispod forme ništa | naziv u samom polju („Email *“, „Name *“; vidljivi nazivi sakriveni, ostaju za čitače ekrana); ispod rečenice o pristanku bled, zaključan kalendar tekućeg meseca sa porukom „Please fill out the form before choosing your time slot.“ |
| 2 | ostala polja se otvore posle Email i Name | isto, i zaključani kalendar nestaje |
| 3 | oznaka „Fill out the form“ samo postane siva | dobija kvačicu ✓, aktivno je „Book your event“ |

- Novi elementi: `lt-form_preview` (`98de35f8-…-b98f522e28ca`) sa `lt-form_preview-cal` i `lt-form_preview-tip`. Nove klase sa nativnim svojstvima: `lt-form_preview`, `lt-form_preview-cal`, `lt-form_preview-head`, `lt-form_preview-arrows`, `lt-form_preview-arrow`, `lt-form_preview-grid`, `lt-form_preview-dow`, `lt-form_preview-day`, `lt-form_preview-tip`, combo `lt-form_label.is-hidden`, `lt-form.is-expanded`, `lt-form_step.is-done`.
- Mesec u zaključanom kalendaru crta skripta (tekući mesec, nedelja prva kao kod iClosed-a). Slobodni dani nisu označeni dok se ne poveže Cal.com, da ne bih izmišljao termine.
- Provereno (1440 i 390): na početku kalendar vidljiv i naziv u poljima; posle unosa emaila i imena kalendar nestaje i otvaraju se ostala polja; posle (simuliranog) slanja prvi korak ima ✓; JS grešaka nema. Snimci: `notes/lets-talk-nova-forma-v2-pocetak-2026-11-20.png`, `…-v2-koraci-…`, `…-v2-telefon-…`.

## 20.11.2026: Let's talk, kopija sekcije sa novom formom umesto iClosed-a (test, objavljeno na staging)
Tvoje „kopiraj ovu sekciju i u sekciji ispod napravi to kako si zamislio“. Originalna sekcija sa iClosed-om nije dirana. Kopija pre izmene: `backup/page-code/2026-11-20-lets-talk-form/` (head i footer kod stranice, objavljeni HTML sekcije).

| Gde | Šta |
|---|---|
| Let's talk (`6aba6bc07d6279b4b56176f8`), ispod originalne sekcije | nova sekcija `lt-hero` (`71fe9368-…-5d2d5f621ca6`): ista leva strana (oznaka, naslov, podnaslov, slider sa 2 citata), desno nova kartica `lt-form` |
| Naslov u kopiji | H2 sa istim klasama (`heading-style-h1`), da stranica ostane sa jednim H1 |
| Korak 1 | Webflow forma „Book a call“ sa istih 8 obaveznih polja kao iClosed: Email, Name, Phone Number, Company Name, Website URL, Budget (5 opcija), „Please share anything…“, „How did you hear about us?“ (6 opcija). Kao kod iClosed-a, prvo se vide samo Email i Name; ostala polja se otvore kad su oba popunjena. Prijave idu u Webflow → Forms. |
| Telefon | intl-tel-input 25.3.1 (MIT, jsDelivr): zastava i pozivni broj, zemlja po jeziku pregledača (npr. sr-RS → +381); šalje se ceo broj |
| Korak 2 | posle uspešnog slanja: oznaka koraka prelazi na „Book your event“, a umesto forme se prikazuje Cal.com kalendar sa upisanim imenom, emailom i odgovorima u napomeni. Dok link nije upisan u `data-cal-link`, stoji polje „The Cal.com calendar appears here once the account is connected.“ |
| Nove klase (sve sa nativnim svojstvima) | `lt-form`, `lt-form_steps`, `lt-form_step` (+`is-active`), `lt-form_step-dot`, `lt-form_step-text`, `lt-form_body`, `lt-form_panel` (+`is-details`, `is-calendar`), `lt-form_header`, `lt-form_title`, `lt-form_text`, `lt-form_note`, `lt-form_form-block`, `lt-form_form` (+`is-short`), `lt-form_field`, `lt-form_label` (+`is-legend`), `lt-form_req`, `lt-form_input` (+`is-area`; focus i placeholder nativno), `lt-form_group`, `lt-form_options`, `lt-form_option` (::before/::after sakriveni nativno), `lt-form_radio`, `lt-form_option-text`, `lt-form_submit` (hover nativno), `lt-form_legal`, `lt-form_legal-link`, `lt-form_cal`, `lt-form_cal-empty`, combo `lt-form.is-open` |
| Let's talk head kod | dodato na kraj: CSS biblioteke za telefon, stanja koraka, boja radio dugmadi, sakrivanje polja dok se ne popune Email i Name. Postojeći kod nije menjan. |
| Let's talk footer kod | dodato na kraj: biblioteka za telefon i skripta za korake i Cal.com. iClosed skripta za originalnu sekciju ostaje. |

- Provereno na stagingu (1440, 820, 390): oba bloka postoje, jedan H1, slider sa 2 slajda, nema širenja u stranu ni JS grešaka; korak 1 prvo prikazuje 3 elementa, posle unosa emaila i imena svih 9; prelazak na korak 2 proveren simulacijom uspeha (prava prijava nije poslata, da ne bi otišao email timu).
- Nije provereno: pravo slanje forme sa Turnstile-om i Cal.com kalendar (nema naloga, a app.cal.com mi je blokiran). Kod za Cal.com je standardni ugrađeni kalendar; proverava se kad link stigne.
- Alat je dvaput odbio dve sporedne izmene, pa su stale po pravilu: `for` na oznakama polja (oznake nisu vezane za polja) i tekst poruka posle slanja (ostale su Webflow-ove: „Thank you! Your submission has been received!“ / „Oops! Something went wrong…“). Mogu ručno u Designer-u.
- Novi tekst (copy), za odobrenje: „By entering your information, you agree to our Privacy Policy.“ i privremeni tekst u koraku 2. Ostali tekstovi su preuzeti iz iClosed-a.
- Snimci: `notes/lets-talk-nova-forma-korak1-2026-11-20.png`, `notes/lets-talk-nova-forma-sva-polja-2026-11-20.png`, `notes/lets-talk-nova-forma-telefon-2026-11-20.png`.

## 20.11.2026: Flow Conf post ostaje u draftu (odluka, ništa nije menjano u Webflow-u)
Tvoje „neka ostane u draftu“. Draft status posta nije diran. Pravilo 301 `/blog/from-guests-to-sponsors-notes-from-flow-conf-2026` → `/blog` u MANUAL_TASKS 5 više nije uslovno; ako tim kasnije objavi post, to pravilo se briše (slug je isti). Ažurirani i `notes/301-mapa-2026-11-17.md` i spisak.

## 20.11.2026: obrisani stara CTA grafika i stari hero video (Assets)
Tvoje „obriši staru verziju CTA, i obriši stare video snimke koje ne koristimo“. Kopije svih fajlova: `backup/assets/unused-2026-11-20/`.

| Asset | Šta je bio | Zašto ne treba |
|---|---|---|
| `6afb8acb1ba525d9d1a53a4c` home-cta-bg.avif (25 KB) | pozadina Home CTA od 16.11. | zamenjena novom CTA sekcijom 20.11. |
| `6ad11f575f7e670a211dfdfe` home-cta-lines.svg (2 KB) | linije u CTA pre 16.11. (`backup/elements/home-cta-section-2026-11-16.json`) | ne koristi se od 16.11. |
| `6ad657e9faa3c82f31f4bdd1` nues-hero-bg.mp4 (0,9 MB) | stari pozadinski video za hero (otpremljen 19.10.) | nigde se ne koristi |
| `6ad657e9faa3c82f31f4bded` nues-hero-bg.webm (0,26 MB) | isti video, webm | nigde se ne koristi |

- Provera pre brisanja: nijedan od 4 fajla se ne pominje na 48 objavljenih stranica, u CSS-u ni JS-u sajta, ni u custom kodu u repou; na draft stranicama (Webflow Integrations, Style Guide) i među skrivenim elementima na Home nema video elemenata ni starih CTA klasa.
- U Assets sada ostaju samo 4 videa i svi se koriste u Our Work slideru (TrakPro + 3 izravnata).
- Provereno posle brisanja: Home i Our Work bez neispravnih fajlova i bez JS grešaka.

## 20.11.2026: obrisana 3 stara videa za Our Work slider (Assets)
Tvoje „možemo li ove koje ne koristimo da obrišemo“. Pre brisanja: nijedna stavka u Our Works ne koristi stare linkove (proverenih svih 11), a originali su sačuvani u `backup/assets/slider-video-old-2026-11-20/` (md5: sustain eff6590b…, shiftolic ec96dc04…, ballerine dda94ccf…).
- Obrisani asset-i: `6af646c4deb177f9145906ae` sustain-slider.mp4, `6af646caa0271d7cf124d95c` shiftolic-slider.mp4, `6af646d045263033b2f2e934` ballerine-slider.mp4.
- TrakPro video (`6af646bf70e562225ced8c49`) i 3 nova `*-slider-smooth.mp4` ostaju.
- Provereno posle brisanja (/our-work, 1440 i 390): sva 4 videa u slideru se puštaju, JS grešaka nema.
- Pomoćna draft stranica „Slider videos“ (`6af6466b9f4f3eaa0bb1fa80`) nije menjana; njena 3 Background Video elementa sa starim videima sada su prazna. Stranica se ne objavljuje.

## 20.11.2026: Our Work slider, izravnati videi za Sustain, Shiftolic i Ballerine (objavljeno na staging)
Ti si otpremio 3 fajla kroz draft stranicu „Slider videos“; fajlovi na Webflow CDN-u su bajt po bajt isti kao `webflow-assets/video/slider-smooth-2026-11-19/` (md5 se poklapa za sva tri). Kopija pre izmene: `backup/cms-items/our-works-slider-video-before-2026-11-20.json`.

| Our Works stavka | polje Slider video (`slider-video-2`), staro | novo |
|---|---|---|
| Sustain Commercial Solar (`6aba6bc07d6279b4b561798c`) | `…/6af646c4deb177f9145906ae_sustain-slider.mp4` | `…/6b00840c457b359a796596b1_sustain-slider-smooth.mp4` |
| Shiftolic (`6aba6bc07d6279b4b561798b`) | `…/6af646caa0271d7cf124d95c_shiftolic-slider.mp4` | `…/6b00840ca865e7a6541ee7b4_shiftolic-slider-smooth.mp4` |
| Ballerine (`6aba6bc07d6279b4b5617989`) | `…/6af646d045263033b2f2e934_ballerine-slider.mp4` | `…/6b00840cd66a691392842118_ballerine-slider-smooth.mp4` |

- Menjano samo to polje; draft status stavki nije diran (sve tri su i dalje objavljene). TrakPro video nije menjan.
- Provera posle objave (/our-work, 1440 i 390): slajdovi imaju nove linkove, klikom na svaku traku video se pušta (2140×1280; 13,4 s, 15,0 s, 14,8 s), JS grešaka nema.
- Stari fajlovi (`*-slider.mp4`) su ostali u Assets; ne brišu se bez tvog „da“.

## 20.11.2026: Home CTA, dugme bez pomeranja za mišem (objavljeno na staging)
Tvoje „ne sviđa mi se pomeranje button-a na hover, neka na button-u ostane hover kao i na svim ostalim buttonima“. Kopija pre izmene: `backup/page-code/2026-11-20-home-cta/home-head-before-2.html`, `home-footer-before-2.html`.
- Home head: uklonjen CSS koji je pomerao `home-cta_actions` (translate za mišem).
- Home footer: uklonjen deo skripte koji je pratio miš na dugmetu.
- Ostaje: naginjanje N ka mišu i osvetljen N dok je miš na dugmetu (ili dok je dugme u fokusu); dugme ima isti „Shift“ hover kao ostala dugmad.
- Provereno posle objave: kod na stranici je identičan fajlovima u repou; pri prelasku mišem preko dugmeta ono se ne pomera (0 px), N se osvetli i nagne, JS grešaka nema.

## 20.11.2026: Home, nova CTA sekcija (Figma 9098:24) umesto iClosed kartice (objavljeno na staging)
Tvoj fajl `nues-mid-cta-section.html` i Figma 9098:24: „sekcija će ipak izgledati ovako, samo button da ima koji vodi na contact page“. Kopija pre izmene: `backup/page-code/2026-11-20-home-cta/` (stablo elemenata, objavljeni HTML sekcije, Home head i footer kod).

| Gde | Pre | Posle |
|---|---|---|
| Home › section_home-cta, pozadina | slika `home-cta_bg` (asset `6afb8acb…_home-cta-bg.avif`) | tamnoplava sekcija: `home-cta_backdrop` sa `home-cta_halo` (dva radijalna sjaja), `home-cta_beam` (snop svetla) i `home-cta_mark` (stakleni N, SVG u Embed-u, odsečen donjom ivicom) |
| desna kolona | `home-cta_booking` sa iClosed widgetom | uklonjena |
| ispod naslova | ništa | `home-cta_actions` › dugme `button` „Book a free intro call“ (stranica Let's talk, `/lets-talk`), isti „Shift“ hover kao ostala dugmad |
| home-cta_component | poravnanje gore, bez min. visine | desktop: min. visina 350px i centrirano po visini (sekcija 550px, kao Figma); tablet: 220px mesta ispod teksta za N |
| Home footer kod | učitavanje iClosed skripte za ovu sekciju | N se blago naginje ka mišu; hover ili fokus na dugmetu ga osvetli (`.is-lit`) i ubrza odsjaj; dugme prati miš nekoliko piksela |
| Home head kod | CSS za iClosed kolonu (992–1279px) | položaj N uz ivicu kontejnera, odsjaj preko stakla na 7 s, `.is-lit`, smanjen pokret; N se na 992–1279px smanjuje sa ekranom |

- Nove klase (sve sa nativnim svojstvima): `home-cta_backdrop`, `home-cta_halo`, `home-cta_beam`, `home-cta_mark`, `home-cta_actions`, combo `section_home-cta.is-lit`. Tekstovi (zvezdice, 5.0 sa linkom na Clutch, „Free 30-Minute Intro“, naslov) nisu menjani.
- Provera posle objave (1440, 1100, 820, 390): na 1440 sekcija je 550px, naslov počinje na 50px, dugme 252×60 na 348px od vrha (Figma 252×62 na ~352). N nigde ne prelazi preko teksta ni dugmeta, stranica nije šira od ekrana, JS grešaka nema, dugme vodi na `/lets-talk`. Snimci: `notes/home-cta-figma-vs-staging-2026-11-20.png`, `notes/home-cta-tablet-telefon-2026-11-20.png`.
- Home više ne učitava iClosed skriptu. Slika `home-cta-bg.avif` je ostala u Assets (ne koristi se); briše se samo na tvoje „da“.

## 20.11.2026: ručni sitemap bez 5 case stranica bez studije (pripremljeno za lansiranje, ništa nije menjano u Webflow-u)
Tvoja odluka: opcija (a). Fajl: `webflow-assets/seo/sitemap-manual.xml`; koraci: MANUAL_TASKS, „Pri lansiranju“, tačka 3.
- Kontrola sitemap-a po CMS stavci (bolje rešenje, automatski sitemap ostaje) na sadašnjem planu ne radi: API vraća 403 „Site plan doesn't support sitemap indexing controls“. Probati ponovo na plaćenom planu.
- U fajlu je 41 adresa: 15 stranica, 5 case studija (Ballerine, Shiftolic, Sustain, TrakPro, Veyor) i 21 blog post. Proveren je svaki: odgovara 200 i nema noindex. Izostavljeni: 5 case stranica bez studije (sve imaju noindex), 404, Password, draft stranice (Style Guide, Slider videos, Webflow Integrations) i draft post o Flow Conf. Šabloni Hero Cards i Jobs ne prave javne stranice (404 / prazna kolekcija).
- Domen u fajlu: `https://www.nues.agency` (kao sitemap starog sajta). Na stagingu sitemap ne postoji (404), pa se ovo vidi tek na pravom domenu.

## 20.11.2026: cene uklonjene sa sajta (objavljeno na staging)
Tvoje „što se tiče cena ukloni ih skroz sa sajta“. Isti spisak kao pri sakrivanju 17.11. (`notes/cene-2026-11-17.md`); od tada se nisu pojavile nove cene. Kopije: `backup/elements/prices-hidden-2026-11-20.json`, `backup/schema/services-prices-before-2026-11-20.json`.

| Gde | Pre | Posle |
|---|---|---|
| Home, „Four ways“, kartica Design & Development | From $8k / Starting price | element ima isključen Visibility |
| Services, statistika na 4 taba | From $8k, From $5k, From $2k, $3,000 / Per month | isključen Visibility |
| Services, tabela „Side by side“, red „Starting at“ (naziv + 4 ćelije) | $8,000, $5,000, $2,000 / month, $3,000 / month | isključen Visibility |
| Pricing, 4 kartice paketa, „Investment from“ | $8,000, $20,000, [$X,XXX]/month ×2 | isključen Visibility |
| Pricing, klizač u sekciji preporuke | from $8k, from $20k | isključen Visibility |
| Design & Development, JSON-LD | `offers` 8000 USD | bez `offers` |
| Webflow Development, JSON-LD | `offers` 5000 USD; opis se završavao sa „Starting at $5,000.“ | bez `offers` i bez te rečenice |

- Element sa isključenim Visibility ne ide u objavljeni HTML, a u Designer-u ostaje, pa se cene vraćaju jednim klikom.
- Posle objave: nijedna cena usluga na 20 stranica (15 statičnih + 5 case), ni u tekstu ni u schema-i. Tabela na Services i kartice na Pricing izgledaju uredno, bez praznih mesta: `notes/services-tabela-bez-cena-2026-11-20.png`, `notes/pricing-kartica-bez-cene-2026-11-20.png`. JS grešaka nema.
- Ostalo kao i 17.11. (nisu cene usluga): „Change orders $0“ na Pricing, kalkulator preporuke na Pricing ($4,000 / $40,000 / $40k / $50k+), besplatan uvodni poziv u schema-i na Let's talk (`price: 0`), cene tuđih alata u blogu.

## 20.11.2026: slike za deljenje (og:image) više nisu AVIF (objavljeno na staging)
Tvoje „da“ na predlog da se 7 slika zameni WebP verzijama. Kopija polja pre izmene: `backup/cms-items/share-image-before-2026-11-20.json`. WebP fajlovi: `webflow-assets/og/webp-2026-11-20/`.

**Zašto ne novo polje „Share image“ sa JPG-om, kako je ranije predloženo:** Webflow PNG i JPG slike iz CMS-a na sajtu sam servira kao AVIF (npr. TrakPro slika je u CMS-u bila PNG, a na stranici AVIF; isto JPG slike u blog tekstovima). WebP ostavlja kakav jeste. LinkedIn AVIF ne prikazuje; WebP je prošao na javnom testu (joost.blog), ali LinkedIn to zvanično ne navodi za preglede linkova.

| Stranica | Polje | Pre | Posle |
|---|---|---|---|
| Ballerine | Our Works › Main image | AVIF 25 KB | WebP 48 KB |
| Shiftolic | Our Works › Main image | AVIF 16 KB | WebP 37 KB |
| Sustain Commercial Solar | Our Works › Main image | AVIF 33 KB | WebP 61 KB |
| TrakPro | Our Works › Main image | PNG u CMS-u, AVIF na sajtu | WebP 57 KB |
| Veyor Digital | Our Works › Main image | AVIF 83 KB | WebP 200 KB |
| Sanity vs Webflow (blog) | Blogs › Thumbnail image | PNG 1,7 MB u CMS-u, AVIF na sajtu | WebP 32 KB |
| Source by Webflow (blog) | Blogs › Thumbnail image | PNG 1,8 MB u CMS-u, AVIF na sajtu | WebP 32 KB |

- Iste slike, iste dimenzije, menja se samo format (WebP, kvalitet 85; providnost kod Ballerine i Shiftolic sačuvana). Alt je ostao prazan, kao i pre.
- Iste slike se vide i na stranicama: na case stranici (centralni ekran), na karticama (Our Work, Home, Resources) i u heroju i karticama bloga. Provereno na 11 stranica: 43 slike se učitavaju, nijedna nije slomljena, stari AVIF fajlovi se više ne koriste.
- Posle objave: og:image i twitter:image na 7 stranica su nove WebP slike (200, image/webp). Ceo sajt: 31 stranica WebP, 15 JPG, 0 AVIF.
- Ostaje za posle lansiranja: proveriti nekoliko adresa u LinkedIn Post Inspector-u (radi samo na javnom domenu). Ako LinkedIn ne prikaže WebP, sledeći korak je JPG preko koda u šablonu.

## 19.11.2026: alt tekst na 46 slika u blog tekstovima (objavljeno na staging)
Tvoje „ma odobravam sve“: svi predlozi sa stranice za pregled (https://claude.ai/artifact/BG3BpjGKmLqLW43tMnPT7t) idu onako kako su napisani. Kopija pre izmene (sveže pročitana neposredno pre upisa): `backup/cms-items/blog-alt-before-2026-11-19.json`. Predlozi sa adresama slika: `notes/blog-alt-predlozi-2026-11-19.json`.

**Gde:** kolekcija Blogs (`6aba6bc07d6279b4b5617769`), polje Content, 21 objavljen post. Svaka slika u tekstu dobila je opis umesto praznog alt-a (u CMS-u je stajalo `__wf_reserved_inherit`, a na stranici prazan alt).

- Primer: Source by Webflow, slika naočara sa kodom: prazno → „Robot hands holding glasses that show the code behind a website wireframe“.
- Opisi su na engleskom, do 125 znakova, i kažu samo šta je na slici. Na ilustracijama sa robotom piše „Nues robot“.
- Slike su uparene po ID-ju fajla, ne po redosledu (na sajtu se serviraju kao AVIF, u CMS-u su PNG/JPG/WebP).
- Provera pre upisa: u svakom postu je jedina razlika alt na slikama.
- Provera posle upisa: tekst svih 21 posta je u CMS-u identičan pripremljenom. Ostala polja, draft status i ostali postovi nisu promenjeni.
- Provera posle objave: na stranicama postova svih 46 slika ima tačan opis, nijedna slika u tekstu nema prazan alt.
- Nije dirano: draft post o Flow Conf (2 slike, nije javan) i naslovne slike postova (thumbnail).

## 19.11.2026: svaka stranica usluge ima svoj podnaslov ispod H1, iz Figme (objavljeno na staging)
Tvoje „prepravi“: tekstovi iz Figme (Copy page, okviri `7759:2605`, `7759:3231`, `7759:5948`, `7759:6574`), a SEO & AEO sa gramatičkom ispravkom. Kopija pre izmene: `backup/elements/service-subtitle-2026-11-19.json`.

Pre, na sve 4 stranice: „Strategy, brand, copy, design and the Webflow build, from one senior crew on a date we commit to.“

| Stranica | Element | Posle |
|---|---|---|
| Design & Development (`6aba6bc07d6279b4b5617701`) | `00864f78-…d517` | We take your brand from blank page to live site. Stop filing tickets to change a headline. |
| Webflow Development (`6aba6bc07d6279b4b5617702`) | `d90503e0-…0052` | Have your own design? Bring it, making it work on the web is on us. |
| SEO & AEO (`6ad9125fa551cf984d9bb34a`) | `8f1f3bed-…6b68` | You can have great design and a pixel‑perfect website, but if no one can see it, what’s the point? |
| Growth (`6aba6bc07d6279b4b56176fd`) | `7c77e956-…5eca` | We keep your site moving as fast as your team. |

- SEO & AEO, razlika u odnosu na Figmu („You can have great design, and pixel perfect website, …“): bez zareza posle „design“, dodato „a“, „pixel-perfect“ sa crticom. Crtica je neprelomiva (U+2011), jer se na telefonu reč lomila na „pixel-“ / „perfect“. Izgleda isto (Aeonik ima taj znak, iste je širine).
- Bez ručnog preloma reda. U Figmi su prva tri teksta u dva reda; ovde se tekst sam prelama. Desktop: Design & Development i SEO & AEO u 2 reda, Webflow Development i Growth u 1. Telefon: 2–3 reda.
- Menjan je samo tekst; klasa i stil su isti.
- Snimci: `notes/servisi-podnaslovi-desktop-2026-11-19.png`, `notes/servisi-podnaslovi-telefon-2026-11-19.png`.
- Provera posle objave: stari tekst više nije ni na jednoj od 4 stranice, novi je vidljiv na 1440 i 390 px.

## 19.11.2026: naslovi na vrhu stranice se pojavljuju bez čekanja skripti (objavljeno na staging)
Tvoje „uradi“ (stavka 3 u `notes/preostalo-2026-11-19.md`). Kopija pre izmene: `backup/site-code/2026-11-19-early-reveal/`.

**Gde:** Site settings, Custom code, Head (`webflow-assets/site-code/site-head.min.html`, čitljiva verzija `site-head.html`). Dodati su jedan `<style>` i jedan `<script>` odmah posle postojećeg CSS-a za reveal.

**Pre:** elementi sa `data-reveal` u prvom ekranu (H1, podnaslov, dugmad) čekali su da se učitaju jQuery, Webflow i GSAP. Na telefonu su bili skriveni 5–7 s. Na Home-u se H1 pojavljivao tek kroz rezervni tajmer od 4 s, i to bez animacije.

**Posle:** mala skripta u head-u pokreće istu animaciju (isti pomak, trajanje i kašnjenja) čim se element pojavi u HTML-u. Elementi koje je ona pokrenula dobijaju `data-reveal-early`, pa ih skripta u footer-u više ne dira. Elementi ispod prvog ekrana rade kao i ranije.

Merenje na telefonu (150 ms kašnjenja, 1,6 Mb/s, procesor 4× sporiji; medijana 3 merenja, staro i novo naizmenično):

| Stranica | Šta je mereno | Pre | Posle |
|---|---|---|---|
| Services | LCP | 5,9 s | 2,5 s |
| Design & Development | LCP | 5,8 s | 1,7 s |
| Webflow Development | LCP | 6,0 s | 2,6 s |
| SEO & AEO | LCP | 5,9 s | 1,7 s |
| Growth | LCP | 6,0 s | 2,6 s |
| About | LCP | 6,5 s | 2,7 s |
| Home | H1 ceo vidljiv | 5,6 s | 2,5 s |
| Pricing | LCP | oko 3,2 s | oko 3,2 s (bez promene) |

- Provera posle objave: nova head verzija je identična fajlu u repou na svih 16 proverenih stranica. Uživo na telefonu je H1 ceo vidljiv za 2,7–3,4 s.
- Funkcionalna provera pre objave (15 stranica, širina 390 i 1440): nijedan element ne ostaje skriven posle skrola, JS grešaka nema.
- Ostaje isto: rezervni tajmer od 4 s, režim smanjenog pokreta (animacije isključene), stranice bez elemenata u prvom ekranu (Our Work, Careers, Resources).

## 19.11.2026: obrisano 7 neiskorišćenih slika iz Assets
Tvoje „ako ih ne koristimo obriši ih slobodno“.

| Asset ID | Fajl |
|---|---|
| `6afdfc4d6d774da1f4976353` | round-aleksandar-dumic.webp |
| `6afdfc4f6d0969692980e642` | round-danilo-stikovic.webp |
| `6afdfc5058f0c62e98a9720e` | round-daris-henjas.webp |
| `6afdfc520be8b8900f9b9146` | round-darko-milosevic.webp |
| `6afdfc53811f2999a52abbc9` | round-luka-radomirovic.webp |
| `6afdfc5535d8fbab6d0f75c7` | round-mihajlo-nikolic.webp |
| `6afdfc57bf2b4f97176dbebd` | round-pavle-stikovic.webp |

- Otpremljeni su 18.11. samo da bi se upisali u Teams CMS. Webflow je pri upisu napravio svoje kopije (npr. `6afdfc6f5d1d02055342bfde_…`), pa originali nigde nisu bili povezani. Proverio sam 20 stranica pre brisanja.
- Posle brisanja se fotke tima na svih 5 case stranica i dalje učitavaju (19 od 19).
- Fajlovi su i dalje u repou: `webflow-assets/team/round-photos-2026-11-18/`.

## 19.11.2026: QA bočne kolone na case stranicama, 3 ispravke (objavljeno na staging)
Tvoje „aj uradi qa ovoga“. Ceo izveštaj: `notes/qa-case-bocna-kolona-2026-11-19.md`. Kopija koda pre ispravki: `backup/page-code/2026-11-19-case-rail/case-footer-before-3.html`.

| Gde | Pre | Posle |
|---|---|---|
| Our Works Template (`6aba6bc07d6279b4b56176ff`), footer, bočna kolona | pri brzom skrolu (oba smera) i sporom skrolu nagore galerija je prelazila preko kolone dok je ova klizila (70 od 100 testova) | dok klizi udesno, galerija gura kolonu ispred sebe; 0 od 100 testova, i 40 od 40 na objavljenom sajtu |
| isto, On this page klik | radilo je i Webflow-ovo ugrađeno skrolovanje, pa je naslov završavao na −24 do 0 px (iza menija) | samo naše skrolovanje; naslov na 120 px |
| isto, klik i otvaranje na #naslovu | cilj se računao pre animacije pojavljivanja naslova (24 px), pa je naslov završavao na 96 px | računa se konačan položaj; 120 px |

- Tablet i telefon: kolona se ne pomera. Režim smanjenog pokreta i promena veličine prozora: bez problema.
- JS greške: nema.
- Posle objave je footer identičan fajlu u repou na svih 5 case stranica.

## 19.11.2026: case stranice, bočna kolona i pri skrolu nagore odlazi udesno (objavljeno na staging)
Tvoje „i kad se vraća gore, da ide u desno“. Kopija koda pre izmene: `backup/page-code/2026-11-19-case-rail/case-footer-before-2.html`.

| Gde | Pre | Posle |
|---|---|---|
| Our Works Template (`6aba6bc07d6279b4b56176ff`), footer kod, bočna kolona | pri skrolu nagore, kad galerija stigne odozgo, kolona je odjednom skakala nagore van ekrana (izmereno: vrh kolone sa 120 na −928 px) | ostaje na svom mestu (120 px od vrha) i za oko 0,55 s klizne udesno van ekrana, isto kao pri skrolu nadole |

- Kad galerija prođe ispod nje i odmakne se 120 px, kolona se vraća zdesna.
- Pri skrolu nadole nema promene: i dalje se penje ispred galerije dok klizi udesno, a odlazi i vraća se na istim mestima kao posle jutrošnje izmene.
- Posle objave je footer identičan fajlu u repou na Ballerine, TrakPro i Shiftolic stranici.

## 19.11.2026: case stranice, bočna kolona drži 120 px razmaka od galerije (objavljeno na staging)
Tvoje „popravi ovo, neka se ranije miče“ (snimak Ballerine case stranice). Kopija koda pre izmene: `backup/page-code/2026-11-19-case-rail/case-footer-before.html`.

| Gde | Pre | Posle |
|---|---|---|
| Our Works Template (`6aba6bc07d6279b4b56176ff`), footer kod, bočna kolona (Services used + On this page) | odlazila je u stranu kad je galerija na 40 px od nje, a vraćala se čim galerija pređe njen vrh (5–10 px razmaka, deluje zalepljeno) | odlazi kad je galerija na 120 px, a vraća se tek kad je galerija 120 px iznad nje (praktično van ekrana); nagore se sklanja na isti način |

Merenje na Ballerine stranici:

| Ekran | Odlazak, pre → posle | Povratak, pre → posle |
|---|---|---|
| 1000×625 | skrol 2716 → 2636 (80 px ranije) | galerija 5 px iznad kolone → 125 px |
| 1440×900 | skrol 2333 → 2253 (80 px ranije) | galerija 10 px iznad kolone → 130 px |

- Posle objave je footer identičan fajlu `webflow-assets/site-code/case-template-footer.html` na Ballerine, TrakPro i Shiftolic stranici. U HTML-u su se promenili samo ovi redovi.
- On this page i dalje radi (Background, The challenge, What we shipped, The result).
- Nema novih JS grešaka. Jedina je i dalje „WebFont is not defined“, zato što u testu blokiram Google fontove.

## 19.11.2026: Our Work slider, izravnati videi (pripremljeno, nije na sajtu)
Tvoje „ajde pokušaj“. U Sustain, Shiftolic i Ballerine videu svaka zamrznuta sličica usred kretanja (7, 15 i 15 sličica) zamenjena je izračunatom sličicom između susedne dve. TrakPro nema zastoja. Fajlovi su u `webflow-assets/video/slider-smooth-2026-11-19/`, a poređenje u `notes/slider-staro-levo-novo-desno-2026-11-19.mp4`. Na sajt idu kad se otpreme u Webflow Assets i upišu u polje „Slider video“.
- Ispravka: prva analiza od 19.11. (brojevi skrolovanja, npr. `112, 52, 36, 0`) bila je pogrešna. Videi su animacije, a ne snimci skrola.

## 19.11.2026: Our Work slider, sledeći video se skida tek na pola trenutnog (objavljeno na staging)
Tvoje „odradi“ na problem 4b iz audita. Kopija koda pre izmene: `backup/page-code/2026-11-19-ow-video/our-work-footer-before.html`.

| Gde | Pre | Posle |
|---|---|---|
| Our Work (`6aba6bc07d6279b4b56176fe`), footer kod, slider na vrhu | odmah po otvaranju skidaju se dva videa: trenutni (TrakPro) i sledeći (Sustain, 1,7 MB) | skida se samo trenutni; sledeći počinje kad je trenutni slajd na pola (video na pola trajanja, a slajd sa slikom posle 3 od 6 sekundi) |

Merenje (snimak mreže i stanje slajdova, 40 s):

| | Pre | Posle |
|---|---|---|
| Desktop: videi na početku | TrakPro i Sustain u 1,6 s | samo TrakPro; Sustain u 8 s |
| Desktop: prelaz na drugi slajd | 14 s, oko 1 s se vidi slika pa krene video | 14 s, video kreće odmah |
| Telefon (spora mreža, procesor 4× sporiji): drugi slajd | 23 s (TrakPro se sporo puštao jer je delio mrežu) | 17 s, Sustain kreće odmah |

- Slajdovi se i dalje menjaju istim redom, a na kraju se vraća na prvi.
- JS greška je i dalje jedna („WebFont is not defined“), ista kao pre. Javlja se samo zato što u testu blokiram Google fontove.
- Posle objave je footer na stranici identičan fajlu `webflow-assets/site-code/our-work-page-footer.html`. U HTML-u su se promenili samo ovi redovi.

**4a (kartice na vrhu Resources) nije urađeno.** Kartice uzimaju sliku iz polja Our Works „Full page screenshot“. Isto polje koriste i kartice projekata koje se skroluju na hover, pa se snimak ne može iseći. Polje Cover image izgleda drugačije za Veyor, Shiftolic, TrakPro i Intaker (`notes/resources-kartice-cover-vs-snimak-2026-11-19.png`). Za 4a je potrebno novo CMS polje, a predlog čeka odobrenje.

## 18.11.2026: strukturisani podaci (schema), WebSite, datum projekta i znakovi (objavljeno na staging)
Tvoje „da“ na problem 3 iz audita (a, b i c). Kopije pre izmene: `backup/schema/home-organization-before-2026-11-18.json` i `backup/page-code/2026-11-18-schema/` (head kod oba šablona).

| Gde | Pre | Posle |
|---|---|---|
| a. Home (`6aba6bc07d6279b4b56176f1`), JSON-LD u podešavanjima stranice | samo Organization | `@graph`: isti Organization (dodat samo `@id` „/#organization“) + WebSite (`name` Nues, `url` „/“, `inLanguage` en, `publisher` = Organization). Ništa izmišljeno, bez `alternateName` i pretrage. |
| b. Our Works Template (`6aba6bc07d6279b4b56176ff`), head, Article `datePublished` | polje Published On: datum poslednjeg objavljivanja sajta (svi projekti 17.11.2026) | polje Created On: kada je projekat unet (npr. Ballerine 19.5.2026, TrakPro 3.9.2026) |
| c. Our Works Template i Blogs Template (`6aba6bc07d6279b4b5617706`), head | Webflow upisuje CMS tekst u kod sa HTML znakovima (`&amp;`, `&#39;`), pa je u schemi pisalo „SEO &amp;amp; AEO“ i „Shiftolic&amp;#39;s“ | mala skripta posle JSON-LD blokova vraća ih u obične znakove („SEO & AEO“, „Shiftolic's“) čim se stranica učita; Google čita schemu posle prikaza stranice |

- Provera posle objave: HTML Home, 2 case i 2 blog stranice upoređen sa stanjem pre. Razlikuju se samo ovi redovi. Organization je isti kao kopija.
- Svi JSON-LD blokovi su ispravni, a posle prikaza nema nijednog HTML znaka.
- JS greška je i dalje jedna („WebFont is not defined“), ista pre i posle. Javlja se samo zato što u testu blokiram Google fontove.
- Ako se schema u šablonima menja: skripta radi samo kada u bloku ima HTML znakova, a nevažeći JSON ostavlja kakav jeste.

## 18.11.2026: slike u prvom ekranu „eager“ samo tamo gde merenje pokazuje dobitak (objavljeno na staging)
Tvoje „b“ na problem 2 iz audita. Webflow MCP nema podešavanje „Load“ za slike, ali atribut `loading="eager"` na slici Webflow prepisuje preko svog `lazy` (provereno u objavljenom HTML-u, nema duplikata). Pre izmene slike nisu imale nijedan atribut.

**A/B merenje** na telefonu (procesor 4× sporiji, oko 1,6 Mb/s, 150 ms), po 4 učitavanja naizmenično, medijana LCP:

| Stranica | lazy (pre) | eager | Odluka |
|---|---|---|---|
| Our Work | 8,5 s | 7,1 s | ostaje eager |
| Blog post (šablon) | 2,4 s | 1,6 s | ostaje eager |
| Blog (lista) | 3,2 s | 6,0 s (samo pozadina: 8,9 s) | vraćeno na lazy |
| Case stranica (TrakPro) | 3,4 s | 5,6 s | vraćeno na lazy |

Na Blogu i case stranicama eager slike otimaju mrežu skriptama, a tekst u prvom ekranu čeka te skripte (problem 2A), pa sve kasni.

| Element (stranica) | Pre | Posle |
|---|---|---|
| Our Work (`6aba6bc07d6279b4b56176fe`): `ow-hs_img` (slider, 4 slike) i `ow-hero_stripes` | lazy | `loading="eager"` |
| Blogs Template (`6aba6bc07d6279b4b5617706`): pozadina `495f04a6…` i glavna slika `31ee2357…` | lazy | `loading="eager"` |
| Blog (`6aba6bc07d6279b4b5617705`) i Our Works Template (`6aba6bc07d6279b4b56176ff`) | lazy | probno eager, pa vraćeno (atribut obrisan); stanje isto kao pre |

- Kada se uradi 2A (tekst bez čekanja skripti), vredi ponovo izmeriti eager na case stranicama.

## 18.11.2026: Open Graph na /services i /services/seo-aeo (objavljeno na staging)
Tvoje „da“ na problem 1 iz audita. Kopija podešavanja: `backup/pages/og-services-2026-11-18.json`.

| Stranica | Pre | Posle |
|---|---|---|
| Services (`6ae0e4a4872d8069c67b0475`) | og:title, og:description, twitter:title i twitter:description ne postoje („isto kao SEO“ isključeno, bez sopstvenog teksta) | uključeno „isto kao SEO naslov / opis“ |
| SEO & AEO (`6ad9125fa551cf984d9bb34a`) | isto | isto |

- Tekst je postojeći SEO naslov i opis, a slika za deljenje je ista.
- Posle objave obe stranice imaju svih 5 oznaka (og:title, og:description, og:image, twitter:title, twitter:description).
- Ispravka audita: većina mreža bi i bez ovih oznaka uzela običan naslov stranice, pa ovo nije bio kvar nego doslednost sa ostatkom sajta.

## 18.11.2026: Teams, nove fotografije u krugu na case stranicama (objavljeno na staging)
Tvoje „dodaj ih u cms u team collection listu“, za slike iz Drive foldera „Slike za our work single“ (Mihajlo, 18.11.). Kopija starih vrednosti: `backup/cms-items/teams-round-photo-2026-11-18.json`.
- **Polje:** „Round photo“ u kolekciji Teams. Prema svom opisu, ono je baš za ovo: portret sa providnom pozadinom, glava i ramena, za krug na case stranicama.
- **Priprema:** originali su PNG 2000×2000 (2,0–2,5 MB) i kadriraniji su od sadašnjih slika. Svaku sam uklopio u isti format kao dosadašnja slika te osobe (WebP 1000×1228, 23–40 KB): glava je iste veličine i na istom mestu, pa krug izgleda isto, a stilovi nisu dirani.
  - Luka i Darko su povećani oko 5%, da slika pokrije ceo krug do dna.
  - Fajlovi su u `webflow-assets/team/round-photos-2026-11-18/`, a poređenje staro/novo u `notes/team-round-photos-2026-11-18.png`.

| Teams (`6aba6bc07d6279b4b561778a`) | Round photo pre | Posle |
|---|---|---|
| Aleksandar Dumic, Danilo Stikovic, Daris Henjas, Darko Milosevic, Luka Radomirovic, Mihajlo Nikolic, Pavle Stikovic | `about-team-<ime>.webp` | `round-<ime>.webp` (nove slike, alt = ime) |

- Otpremljeno preko repoa: jsDelivr za 5 slika, a za 2 direktan GitHub link (jsDelivr je odbio, jer je repo prešao njegovih 50 MB). Fajlovi u Webflow-u su identični lokalnim (md5).
- Objavljeno je svih 7 stavki. Ostala polja i draft status nisu menjani.
- **Provereno:** svih 5 case stranica (Ballerine, Shiftolic, Sustain, TrakPro, Veyor) prikazuje nove slike, na desktopu i telefonu.
- U biblioteci asseta je ostalo 7 otpremljenih `round-….webp` fajlova koje CMS ne koristi (CMS je napravio svoje kopije). Ne brišem ih bez tvog „da“.

## 18.11.2026: Services, „Four services“: razmak ispod oblika pred kraj taba (objavljeno na staging)
Tvoje „popravi ovo da se pri kraju taba ne pravi razmak između ekrana i ovog oblika“. Kopija koda pre izmene: `backup/page-code/2026-11-18-services-shape/services-head-before.html`.
- **Uzrok:** na desktopu se sekcija zalepi za ekran, a skrolovanje prolazi kroz 4 servisa. Dok se skroluje kroz jedan servis, oblik se blago podiže (paralaksa): na početku je 24 px ispod dna, a na kraju 24 px iznad dna. Zato se pred kraj svakog taba otvarala tamna traka od oko 23 px između oblika i dna ekrana.

| Services (`6ae0e4a4872d8069c67b0475`), page head | Pre | Posle |
|---|---|---|
| `[data-services-tabs].is-scroll .services-tabs_bg.is-current .services-tabs_shape` | `translate: 0 calc((var(--svs-p,.5) - .5) * -48px)` (od +24 do −24 px) | `translate: 0 calc((1 - var(--svs-p,.5)) * 48px)` (od +48 do 0 px) |

- Pomeranje je isto (48 px naviše kroz jedan servis), samo se završava tačno na dnu ekrana. Tablet i telefon (tabovi koji se sami menjaju) nisu dirani.
- **Provereno:**
  - pre objave, ubacivanjem koda u stranicu: stara verzija na kraju svakog taba ima traku od 23 px, a nova je nema;
  - posle objave: kod na stagingu je identičan fajlu `webflow-assets/site-code/services-page-head.html`;
  - na 1440×900, 1512×790, 1920×1080 i 1280×720, na početku, sredini i kraju svakog od 4 taba, oblik nigde nije iznad dna ekrana.

## 17.11.2026 (veče): spljošten krug sa strelicom na case karticama (objavljeno na staging)
Tvoje „vidis kako se krug spljostio u trusted by sekciji, popravi“. Kopija stilova: `backup/styles/case-card-arrow-2026-11-17.json`.
- Uzrok: krug (`case-card_arrow`, 40×40) je u flex redu pored teksta i smeo je da se suzi. Kad je tekst dugačak („Built from scratch in 2 weeks“), krug se stisnuo na 23–38 px širine. To se dešavalo na skoro svim širinama ekrana, na Home i Services.

| Klasa (Style Manager) | Pre | Posle |
|---|---|---|
| `case-card_arrow` | flex `0 1 auto` (sme da se suzi) | flex `0 0 auto`: ne raste i ne skuplja se |
| `case-card_bottom` | bez razmaka između teksta i kruga | `column-gap: 0.75rem` (bez toga je tekst prilazio krugu na 4 px) |

- Provereno posle objave, Home i Services, na 11 širina od 1440 do 360: svih 8 krugova je 40×40, a tekst je najmanje 12 px od kruga.
- Na nekim širinama tekst kartice sada ide u 3 reda umesto u 2, jer krug više ne ustupa mesto tekstu.

## 17.11.2026 (veče): Careers, animacija otvaranja koverte (objavljeno na staging)
Tvoje „popravi ovu animaciju otvaranja koverte“. Kopija koda pre izmene: `backup/page-code/2026-11-17-careers-envelope/careers-head-before.html`. Poređenje pre/posle: `notes/careers-koverta-pre-posle-2026-11-17.png`.

**Šta je bilo pogrešno** (snimljeno sličicu po sličicu, na tačna vremena):
- Prvih 200 ms posle prelaska mišem preklop se skoro nije pomerao, jer je kriva kretanja na početku vrlo spora.
- Preklop se zatim za oko 100 ms sklopio u liniju i nestao. Druga polovina okreta se nije videla, jer je unutrašnja strana preklopa (#121c2b) skoro iste boje kao pozadina sekcije (#0d1928). Izgledalo je kao da preklop nestaje, a ne da se otvara.
- Pri zatvaranju je preklop „iskakao niotkuda“ na pola puta. Senka na džepu se vraćala dok je koverta još bila otvorena.

| Careers (`6ada16efb73db28b0b5cbad8`), page head, blok koverte | Pre | Posle |
|---|---|---|
| Okret preklopa pri otvaranju | .55s, `cubic-bezier(.65,0,.35,1)`, preklop je „na ivici“ (90°) tek na .27s | .6s, `cubic-bezier(.3,0,.2,1)`: kreće odmah i na 90° je na .19s, kada prelazi iza pisma |
| Unutrašnja strana preklopa dok se podiže | odmah tamna (#121c2b), nevidljiva | ostaje boje preklopa, pa se vidi kako se podiže; za .4s potamni u #121c2b (novi `.careers-job_flap::after`) |
| Pismo / tekst na pismu | kreću na .25s / .45s | .2s / .4s (odmah kad preklop prođe 90°) |
| Zatvaranje | preklop se pojavi tek na 90° | posvetli dok se spušta, na 90° prelazi ispred pisma (.47s) i spušta se na .75s |
| Senka na džepu pri zatvaranju | vraća se od .3s, dok je koverta otvorena | vraća se od .5s, kad preklop pada |
| Perspektiva kartice | 1600px | 1000px, okret se jasnije vidi kao 3D |
| `prefers-reduced-motion` | bez prelaza za pismo i preklop | isto, plus unutrašnja strana preklopa i senka |

- Važi za praznu kovertu („No open roles right now“) i za kartice pozicija, jer dele iste klase.
- Zatvorena i otvorena koverta su piksel po piksel iste kao pre (i kao Figma 7104:399); menja se samo kretanje između. Telefon je nepromenjen (koverta je otvorena, bez animacije).
- Provereno posle objave:
  - kod na stagingu je identičan fajlu `webflow-assets/site-code/careers-page-head.html`;
  - svih 46 sličica sa žive stranice se poklapa sa testom;
  - fokus tastaturom otvara kovertu, klik otvara popup, Escape ga zatvara i koverta se zatvori;
  - 0 JS grešaka.

## 17.11.2026 (veče): Ballerine tim
Tvoje „samo za ballerinu dodaj i pavla“. Kopija: `backup/cms-items/ballerine-team-2026-11-17-2040.json`.
| Polje | Pre | Posle |
|---|---|---|
| Ballerine → Team | Aleksandar Dumic, Darko Milosevic | Aleksandar Dumic, Darko Milosevic, Pavle Stikovic |
- Objavljeno i provereno na stagingu: case stranica prikazuje sva tri.
- Polja Team – Design, Team – Webflow, Team – SEO & AEO i Team – Growth sajt ne koristi. Na šablonu case stranice postoji samo jedna lista ljudi, vezana za polje Team. 
- **Na tvoje „izbrisi visak polja“ ta 4 polja su obrisana iz Our Works.** Definicije i Ballerine vrednosti su sačuvane u `backup/cms-items/our-works-unused-team-fields-2026-11-17.json`. Polje Team je ostalo, a grupe polja su netaknute. Objavljeno; svih 5 case stranica radi (200) i prikazuje isti tim kao pre brisanja.
- Prazna kolekcija „Case team“ i dalje postoji. API ne može da briše kolekcije, pa se briše ručno: CMS → Case team → Settings → Delete collection.

## 17.11.2026 (veče): stavke 2–6 iz večernjeg QA-a, objavljeno na staging
Tvoje „1. ne radimo, a ove ostale ajmo redom“. Clutch („5.0 on Clutch“) ostaje kako jeste.

**2 i 3. Blog: alt tekst i slike sa drugog Webflow sajta.** Kopija pre izmene: `backup/cms-items/blog-content-images-2026-11-17.json` (14 postova, polje Content).
- Ponovo je snimljeno polje Content na 14 postova: 13 objavljenih i Flow Conf, koji ostaje draft. Tekst je isti kao pre; promenjeno je samo `alt="__wf_reserved_inherit"` u `alt=""`.
- Posle snimanja, Webflow je sam prebacio 25 slika sa CDN-a sajta `6a0bc2572a345c5cad437d47` u ovaj sajt. Taj sajt opslužuje i sadašnji www.nues.agency, pa bi slike nestale kad se stari sajt ugasi.
- Na AEO vs SEO i SaaS content marketing 4 slike više nemaju doslovni alt „__wf_reserved_inherit“. Nastao je pri ranijim izmenama teksta preko API-ja.
- Provereno:
  - sačuvani tekst svih 14 postova se poklapa sa originalom znak po znak, osim adresa slika;
  - svih 29 adresa slika vraća 200;
  - na objavljenom sajtu nema „__wf_reserved_inherit“ ni slika sa drugog sajta;
  - tabele (HTML embed sa stilom) su ostale iste.
- Slike u tekstu i dalje imaju prazan alt, kao i pre. Opisni alt tekstovi su posebna stavka.

**4. TrakPro case, greške u tekstu.** Kopija: `backup/cms-items/trakpro-typos-2026-11-17.json`.
| Polje | Pre | Posle |
|---|---|---|
| The Solution | „"Before TrakPro"section“ | „"Before TrakPro" section“ |
| The Solution | „Couldflare fallback“ | „Cloudflare fallback“ |
| The Result | „SEO went from to a perfect 100“ | „SEO reached a perfect 100“ |
| The Achievement | „no developred involved“ | „no developer involved“ |
- Ni stari sajt nema početni SEO rezultat (ista rečenica bez broja), pa broj nije izmišljen. Ako tim ima stari rezultat, rečenica može da se vrati na „went from X to a perfect 100“.
- TrakPro je u međuvremenu u Webflow-u sačuvan kao **draft** (izmena tima, ne moja), pa je ispravka sačuvana, ali nije uživo dok se stavka ne objavi. Isto važi za izmene timova na Shiftolic i Veyor.

**5. Pristupačnost (axe „nested-interactive“).** Nova registrovana skripta sajta `nuesA11yFixes` 1.0.0, footer, sve stranice. Izvor: `webflow-assets/site-code/a11y-fixes.js`; objavljena verzija je `a11y-fixes.min.js` (1574 znaka, ograničenje je 2000). Postojeći head i footer kod nisu menjani.
- Meni na desktopu:
  - link „Services“/„Resources“ je jedina kontrola: Enter otvara stranicu, Space otvara meni, Escape ga zatvara;
  - hover i klik rade kao pre;
  - Webflow-ov toggle više nije dugme sa linkom unutra.
- Meni na telefonu: dodir na „Services“ otvara meni kao pre; oznaka nema href, jer tamo ionako ne vodi na stranicu.
- Home „Every project“: bočni ekrani više nisu dugmad unutar dugmeta. Klik mišem na njih i dalje otvara galeriju; tastatura otvara galeriju i strelicama ide kroz ekrane.
- Provereno pre objave ubacivanjem skripte na stagingu, i posle objave: axe 0 na desktopu i telefonu (i sa otvorenim menijem), bez JS grešaka.
- Uklanjanje: Site settings → Custom code → registrovane skripte, ili preko API-ja `remove_site_script nuesa11yfixes`.

## 17.11.2026: odgovori tima (Aleksandar) primenjeni, objavljeno na staging
Odgovori iz Slack-a na liste „Sadržaj od tima“ i „Tvoje odluke“. Kopije pre izmena su u `backup/` (putanje uz svaku stavku).

**Privacy i Terms se indeksiraju.** `backup/page-code/2026-11-17-legal-noindex/`
| Stranica | Pre | Posle |
|---|---|---|
| Privacy policy, Terms of service (head kod stranice) | `<meta name="robots" content="noindex">` + stilovi za liste i naslove | samo stilovi; robots meta nema. Isto u `webflow-assets/site-code/legal-pages-head.html` |

**Our Works CMS.** `backup/cms-items/our-works-team-services-2026-11-17.json`
| Projekat | Polje | Pre | Posle |
|---|---|---|---|
| Hypersonix | Stat 1 | „Soon“ / „Rebuild in progress“ | prazno, kao ostali projekti bez case studije |
| Hypersonix | Card text (Trusted) | „Rebuild in progress“ | „Aerospace“ (industrija, kao Intaker i Harper) |
| Harper | Filter category | prazno (nije bio ni pod jednim filterom) | SaaS (broker osiguranja za firme koji radi preko svoje platforme; od 5 postojećih filtera najbliži) |
| TrakPro | Services used | prazno | Design & Development, SEO & AEO (iz teksta case studije: dizajn od nule, build, lokalizacija, SEO i AI readiness) |
| TrakPro | Team | prazno | Mihajlo Nikolic, Aleksandar Dumic, Daris Henjas, Darko Milosevic |
| Shiftolic | Team | prazno | Pavle Stikovic, Luka Radomirovic, Daris Henjas, Darko Milosevic |
| Veyor Digital | Team | prazno | Aleksandar Dumic, Luka Radomirovic, Daris Henjas, Darko Milosevic |
| Sustain Commercial Solar | Team | prazno | Luka Radomirovic, Aleksandar Dumic, Darko Milosevic |
- Timovi su raspoređeni po ulogama iz Teams kolekcije (dizajn, Webflow, growth i SEO, PM) i po uslugama u case studiji, kako je Aleksandar tražio („izmešaj, da je realno“). Ballerine (Aleksandar, Luka, Pavle) nije diran.
- **Posle toga (19:09–19:12) timovi su izmenjeni direktno u Webflow-u, ne preko mene, i objavljeni.** Stanje sada: Shiftolic i TrakPro: Mihajlo Nikolic, Luka Radomirovic; Veyor, Sustain i Ballerine: Aleksandar Dumic, Darko Milosevic. Kod Ballerine je promenjeno i nekorišćeno polje „Team – Webflow“ (Aleksandar, Darko). Sekcija „The team behind this project“ prikazuje tačno ovo (provereno na desktopu i telefonu): `notes/case-tim-desktop-2026-11-17.png`, `notes/case-tim-telefon-2026-11-17.png`.

**Svaka stranica usluge ima svoj H1, iz Figme (Copy page, okviri `7759:2605`, `7759:3231`, `7759:5948`, `7759:6574`).** `backup/elements/service-h1-2026-11-17.json`
| Stranica | Pre | Posle |
|---|---|---|
| Design & Development | Zero to a live site, / in weeks not quarters | Every pixel of your vision, / landed in Webflow |
| Webflow Development | isto kao gore | The art is yours, / and everything in it |
| SEO & AEO | isto kao gore | AI is recommending someone, / make sure it’s you |
| Growth | isto kao gore | Team of your own, / long after launch |
- Struktura naslova ista (prvi red, prelom, drugi red u gradijentu usluge); menjan je samo tekst.
- Design & Development: hero dobio postojeću combo klasu `svc-hero_content.is-wide` (62.5rem), jer je prvi red širok 848 px, a hero je bio 745 px pa je „vision,“ padalo u treći red. Sada su dva reda, kao u Figmi (850 px). Ostale tri stranice nisu dirane.
- Podnaslov ispod H1 je i dalje isti na sve 4 stranice; predlog iz Figme je u poruci u četu, nije menjan.
- Snimci: `notes/servisi-h1-desktop-2026-11-17.png`, `notes/servisi-h1-telefon-2026-11-17.png`.

**Privacy policy, odeljak „Cookies“ (bio je kopija „Data Sharing“).** `backup/elements/privacy-cookies-2026-11-17.json`
| Pre | Posle |
|---|---|
| We do not sell your personal data. | Cookies are small text files a website stores in your browser. You can block or delete them at any time in your browser settings, though some parts of the website may not work as expected without them. |
| Your data may only be shared in the following cases: | This website uses: |
| When required by law | Essential cookies, which the website needs to load and work properly |
| With service providers that help operate the website (hosting, analytics, etc.) | Analytics cookies from Google Analytics, which show us in aggregate which pages are visited and how people find the website |
| To protect our rights and ensure safety | Cookies from embedded services, such as our video player (Vimeo) and booking calendar (iClosed), set when you watch a video or book a call |
- Navedeno je samo ono što sajt stvarno učitava: GA4 (`G-NNTMD9FV5D`), Vimeo, iClosed. Snimak: `notes/privacy-cookies-2026-11-17.png`.

**Organization schema: pravno lice Nues Digital OÜ i profili.** `backup/schema/organization-legal-before-2026-11-17.json`
| Stranica | Pre | Posle |
|---|---|---|
| Home (Organization) | bez pravnih podataka, `sameAs: []` | + legalName „Nues Digital OÜ“, registarski kod 17377418, vatID EE102989731, adresa Tornimäe tn 5, 10145 Tallinn, Harju maakond, EE, email u contactPoint hello@nues.agency (isti kao u footeru), sameAs Clutch, LinkedIn, Instagram |
| About (Organization u „about“) | bez legalName i sameAs | + legalName i isti sameAs |
- Izvor: e-Äriregister (ariregister.rik.ee/eng/company/17377418), proveren 17.11.2026. Adresa u registru je adresa kontakt osobe (DigiRepresent Services OÜ), ne kancelarija.
- Clutch ocena (4.8, 5 recenzija) nije dodata kao aggregateRating: Google ne prikazuje zvezdice za ocene koje firma objavi o sebi.

**301 mapa.** Sitemap starog sajta ima 40 adresa; 34 postoje na novom sajtu sa istom putanjom, 6 ne postoji. Spisak i predlog: `notes/301-mapa-2026-11-17.md`, MANUAL_TASKS 5. Redirect se unosi ručno pri lansiranju.

## 17.11.2026: odluka, recenzije ostaju tačno kao u Figmi
Tvoje „napravi sve kao u Figmi“ 17.11. Provereno prema Figmi (Copy page, okviri `7759:651`–`7759:1015`): tekst, uloge, industrije, boje kartica (#005287, #6f3a1d, #7b2c29, #201f23, #1a40b2) i tipografija (citat 32 px, 800 px širine; uloga 14 px Medium; firma i industrija 14 px) su isti na sajtu. Ništa nije menjano:
- greške u kucanju u citatima ostaju kako su u Figmi;
- industrije u recenzijama (Workforce, Fintech, Legal, Construction) i u video utiscima (Intaker, Legal tech; Ballerine, AI technology) su i u Figmi takve;
- tab ostaje „Shiftolic“: Figma i sama ima oba oblika („Shiftolic“ u okviru `7759:824`, „Shiftholic“ u ostala četiri).

## 17.11.2026: konačne recenzije u sekciji „Verified reviews, real stories“ (objavljeno na staging)
Tvoji Figma linkovi 17.11. (Copy page, Home `7759:1227`, okviri `7759:651`, `7759:824`, `7759:882`, `7759:944`, `7759:1015`). Kopija pre izmene: `backup/components/reviews-text-2026-11-17.json`.
Komponenta „Reviews“ (`6bd64d63-…67a1`) je jedna za 7 stranica (Home, About, Services, 4 servisne), pa je izmena urađena jednom, u komponenti.
| Tab | Pre | Posle |
|---|---|---|
| Shiftolic | „The honest feedback stung…“ · Marketing Director · Shiftolic · Healthcare | „If you’re looking for a team to build your B2B Saas website fast and right I would definitely recommend Nues.“ · Founder · Shiftolic · Workforce |
| Ballerine | „The honest feedback stung…“ (sa prelomom) · Marketing Director · Ballerine · AI technology | „When I need something, the team responds quickly, and that is what’s the most important.“ · Marketing Director · Ballerine · Fintech |
| Harper | „The honest feedback stung…“ · Marketing Director · Harper (bez industrije) | isti citat · Head of Growth · Harper · Insurance (dodata dva bloka, „·“ i „Insurance“, kao kod ostalih) |
| Intaker | „Even without the price difference, I would still have picked nues.“ · Joseph Rudolo · Intaker · Legal tech | „When priorities needed to shift, they were able to adjust. That level of communication and partnership that made a huge difference“ · Marketing Director · Intaker · Legal |
| Veyor | „The honest feedback stung…“ · Marketing Director · Veyor · Construction software | „Apart from the craft, which was perfect, what stood out was team’s dedication to improving everyday.“ · CEO · Veyor · Construction |
- Tekst je prenet doslovno iz Figme, uključujući „Saas“, citat Intaker-a bez tačke na kraju i „everyday“ (vidi poruku u četu).
- Nazivi tabova ostaju „Shiftolic“; u Figmi tab piše „Shiftholic“, što je greška u kucanju.
- Provereno na stagingu: svih 7 stranica prikazuje istih 5 recenzija, bez JS grešaka. Snimak: `notes/recenzije-harper-2026-11-17.png`.
- Let’s talk ima svoj, poseban slider citata (Or Moshkovitz, „Marketing Director at Ballerine“); nije deo ovih Figma okvira i nije menjan.

## 17.11.2026: cene vraćene (objavljeno na staging)
Tvoje „vrati sve cene da budu prikazane“ 17.11. Vraćeno tačno stanje od pre sakrivanja:
- svih 16 elemenata sa cenom (Home, Services, Pricing) ponovo imaju Visibility uključen (spisak: `backup/elements/prices-hidden-2026-11-17.json`);
- JSON-LD na Design & Development i Webflow Development vraćen iz `backup/schema/services-prices-before-2026-11-17.json` (`offers` 8000 i 5000 USD, „Starting at $5,000.“ u opisu).
- Provereno na stagingu: vide se iste cene kao pre (From $8k na Home; From $8k/$5k/$2k, $3,000 i red „Starting at“ na Services; $8,000, $20,000, [$X,XXX]/month ×2 i from $8k/$20k na Pricing), schema ima 8000 i 5000, bez JS grešaka.
- FAQ odgovori i Trusted kartice ostaju kako su upisani (FAQ odgovori ne navode cene, pa važe i sa prikazanim cenama).
- Analiza prikazivanja i sakrivanja cena: `notes/analiza-cene-2026-11-17.md`.

## 17.11.2026: cene sakrivene, Trusted kartice sa pravim metrikama, FAQ odgovori (objavljeno na staging)
Tvoj zahtev 17.11.: „za FAQ napiši ti … ali naglasi šta si napisao i zapamti“, „price … samo ga hajduj“, „trusted kartice, uzmi metrike sa starog nues sajta“.

### Cene
Spisak i detalji: `notes/cene-2026-11-17.md`. Kopije: `backup/elements/prices-hidden-2026-11-17.json`, `backup/schema/services-prices-before-2026-11-17.json`.
| Gde | Pre | Posle |
|---|---|---|
| Home, Services, Pricing: 16 elemenata sa cenom (statistike, red „Starting at“ u tabeli, „Investment from“ na 4 Pricing kartice, „from $8k/$20k“ ispod klizača) | vidljivi | Visibility isključen (nisu obrisani) |
| Design & Development i Webflow Development, JSON-LD | `offers` sa cenom 8000 i 5000 USD, „Starting at $5,000.“ u opisu | bez `offers` i bez cene u opisu |
- Ostavljeno: „Change orders $0“, kalkulator preporuke na Pricing ($4,000 / $40,000 / $40k / $50k+) i cene tuđih alata u blogu.
- Proveren JS na Services: skripta tabele vezuje nazive redova za ćelije po redosledu, a sakriven je poslednji red u obe kolone, pa se ništa ne pomera (16 naziva redova, 8 ćelija po koloni, bez grešaka).
- Snimci: `notes/services-tabela-bez-cena-2026-11-17.png`, `notes/pricing-kartica-bez-cene-2026-11-17.png`.

### Trusted kartice (CMS Our Works → Card text)
Metrike sa starog sajta (nues.agency/our-work, pročitano preko Firecrawl-a). Kopija pre izmene: `backup/cms-items/our-works-card-text-2026-11-17.json`.
| Projekat | Pre | Posle | Izvor |
|---|---|---|---|
| Veyor Digital | 3x organic traffic | 1,000+ CMS items migrated | stari sajt |
| Shiftolic | 3x organic traffic | Built from scratch in 2 weeks | stari sajt („2 weeks Delivery time“, „From scratch“) |
| TrakPro | 3x organic traffic | Perfect 100 SEO score | stari sajt |
| Intaker | 3x organic traffic | Legal tech | nema metrike na starom sajtu; industrija iz CMS-a |
| Harper | 3x organic traffic | Insurance | nema metrike na starom sajtu; industrija iz CMS-a |
| Hypersonix | 3x organic traffic | Rebuild in progress | nema metrike; isto kao Stat 1 u CMS-u |
| Ballerine | 3x organic traffic | 16x engagement time growth | stari sajt |
| Sustain Commercial Solar | 3x organic traffic | 80+ pages launched | stari sajt |
- Za Intaker, Harper i Hypersonix ovo je privremeno, dok tim ne da broj.

### FAQ odgovori (napisao Claude, čeka proveru tima)
Svih 30 odgovora i šta tim treba da potvrdi: `notes/faq-odgovori-claude-2026-11-17.md`.
| Gde | Pre | Posle |
|---|---|---|
| Services i 4 servisne stranice, komponenta „Service FAQ“, odgovori 2 do 6 | `[Add the answer to: …]` (podrazumevana vrednost komponente) | odgovor za tu stranicu, upisan samo na toj stranici; komponenta nije menjana |
| Pricing, 5 paragrafa `pr-faq_text` | `[Answer to be provided]` | odgovori |
- Pisano samo iz onoga što već stoji na sajtu, bez cena. Odgovor „Yes“ na „Can you work with our developers?“ je pretpostavka i treba potvrdu.
- Provereno na stagingu (7 stranica, desktop i telefon): nijedna naša cena se ne vidi, nema placeholder odgovora, Trusted kartice imaju nove tekstove, nema JS grešaka.

## 17.11.2026: meta title i description na 13 stranica (objavljeno na staging)
Tvoje „odobravam sve“ 17.11. za predloge iz `notes/seo-predlozi-2026-11-13.md` (ranija odluka od 13.11. bila je da se ovo radi posle launcha). Kopije pre izmene: `backup/page-settings/meta-before-2026-11-17.json`, `backup/cms-items/meta-before-2026-11-17.json`.
Granice: title do 60 znakova, description 120–155.
| Gde | Pre | Posle |
|---|---|---|
| Careers, description | Join a senior Webflow team that ships every week. Remote-first, flexible hours, real weekends and time to grow. See open roles at Nues or send an open application. (163) | Join a senior Webflow team that ships every week. Remote-first, flexible hours and real weekends. See open roles at Nues or send an open application. (149) |
| Pricing, title | Pricing \| Nues (14) | Webflow pricing, one price agreed up front \| Nues (49) |
| Resources, description | Insights, case studies and Webflow integration guides from Nues in one place. Learn from the projects we have shipped. (118) | Insights, case studies and Webflow integration guides from Nues in one place. Learn from the Webflow projects we have designed, built and shipped. (146) |
| Blog, description | Practical notes on Webflow, SEO, AEO and conversion from the Nues team, written from real client builds. (104) | Practical notes on Webflow, SEO, AEO and conversion from the Nues team: guides, comparisons and how-tos written from real client builds. (136) |
| Privacy, title | Privacy Policy \| NUES (21) | Privacy Policy \| Nues (21) |
| Privacy, description | Learn how NUES collects, uses, and protects your personal information. Review our privacy practices, data security measures, and your rights. (141) | Learn how Nues collects, uses, and protects your personal information. Review our privacy practices, data security measures, and your rights. (141) |
| Terms, title | Terms of Service \| NUES (23) | Terms of Service \| Nues (23) |
| Terms, description | Read NUES Terms of Service for web design, Webflow development, and digital services. Understand project terms, payment policies, and client responsibilities. (158) | Read the Nues Terms of Service for web design and Webflow development: project terms, payment policies and client responsibilities. (131) |
| Home, title | Webflow agency that designs, builds, and grows websites \| Nues (62) | Webflow agency that designs, builds and grows sites \| Nues (58) |
| Home, description | A Webflow agency designing and building websites for fast-growing teams. Custom Webflow development, scalable CMS, and performance dialed in from the first line of code. (169) | Webflow agency designing and building sites for fast-growing teams. Custom Webflow development, scalable CMS and performance from the first line of code. (153) |
| Blog „Sanity vs Webflow CMS“, meta-title (CMS) | Sanity vs Webflow CMS: which one your team actually needs \| Nues (64) | Sanity vs Webflow CMS: which one your team needs \| Nues (55) |
| Blog „Source by Webflow“, meta-title (CMS) | Source by Webflow: what it is and what it means for teams on Webflow \| Nues (75) | Source by Webflow: what it means for Webflow teams \| Nues (57) |
| Blog „How to improve your website conversion rate“, meta-description (CMS) | Most sites have a conversion problem, not a traffic problem. How to improve website conversion through speed, clarity, forms, trust, and mobile, before testing. (160) | Most sites have a conversion problem, not a traffic problem. How to improve conversion through speed, clarity, forms, trust and mobile, before testing. (151) |
| Blog „Webflow for B2B lead generation“, meta-description (CMS) | How to use Webflow for lead generation: fast landing pages, gated content, forms that convert, and CRM integration.  (116) | How to use Webflow for B2B lead generation: fast landing pages, gated content, forms that convert and CRM integration that turns your site into a pipeline. (155) |
| Blog „Webflow vs Wix“, meta-description (CMS) | An honest 2026 comparison of Webflow and Wix, including Wix Studio: where each wins, and how to choose for your site.  (118) | An honest 2026 comparison of Webflow vs Wix, including Wix Studio: where each platform wins and how to choose the right one for your website. (141) |
| Case Shiftolic, meta-description (CMS) | Designing and building Shiftolic's website from scratch in two weeks. Visual identity, Webflow development, and scalable CMS for a US healthcare marketplace. (157) | Shiftolic's website designed and built from scratch in two weeks: visual identity, Webflow development and scalable CMS for a US healthcare marketplace. (152) |
| Pricing i Careers, Open Graph | og:title i og:description nisu postojali (deljenje linka nije imalo naslov ni opis) | preuzimaju SEO title i description, kao ostale stranice |
- Home title: od dve ponuđene verzije uzeta je B („…designs, builds and grows sites“), najbliža dosadašnjoj. Verzija A („Webflow agency for websites that sell | Nues“) ostaje kao opcija.
- B2B lead gen opis: u predlogu od 13.11. stajalo je „integration that turn“, ispravljeno u „that turns“.
- CMS: promenjena su samo polja Meta title i Meta description (upoređeno polje po polje pre i posle); ostatak stavki je isti.
- Provereno na stagingu: od 46 adresa nijedna stranica nije van granica. Izuzetak je 5 case stranica bez napisanog case-a (Intaker, Harper, Hypersonix, LaSalle, Biotech), koje su od 12.11. noindex i preusmeravaju na sajt klijenta. og:title i og:description su isti kao title i description na svim izmenjenim stranicama.

## 17.11.2026: dve greške u tekstu, Terms i blog „AEO vs SEO“ (objavljeno na staging)
Tvoje „napravi ovo dvoje“ 17.11. Kopije pre izmene: `backup/elements/terms-typo-paragraph-2026-11-17.json`, `backup/cms-items/blog-aeo-vs-seo-2026-11-17.json`.
| Gde | Pre | Posle |
|---|---|---|
| Terms of Service, prvi paragraf (Paragraph `2e0275db-5baa-bc63-7803-172d6a3bf7a8`) | „…modify, expand, or disconti-nue any service offering…“ | „…modify, expand, or discontinue any service offering…“ |
| Blog „AEO vs SEO in 2026“ (CMS Blogs, stavka `6aba6bc07d6279b4b56179a3`), polje Content, drugi odeljak | `AEO,<a …> answer engine optimization</a>,` (razmak unutar linka, podvlaka kreće pre reči) | `AEO, <a …>answer engine optimization</a>,` (razmak ispred linka) |
- Ostatak teksta oba mesta je isti, znak po znak (provereno posle upisa).
- Usput, pri upisu polja Content, Webflow je sam kopirao dve slike iz tog posta (`robotseo.png`, `web.png`) iz Assets-a drugog Webflow projekta (`6a0bc257…`) u Assets ovog sajta (`6aba6bc0…`), pa im se promenila adresa. Fajlovi su isti, bajt po bajt (proveren SHA-1), i obe nove adrese vraćaju 200. Post više ne zavisi od tuđeg projekta za te dve slike.
- Provereno na stagingu: na Terms nema „disconti-nue“; u postu link počinje rečju „answer“.

## 17.11.2026: odluka, boje na servisnim stranicama ostaju kako jesu (QA grupa 5, stavka 6)
Tvoje „neka ostane kako jeste“ 17.11. Provera prema Figmi (Services FINAL) je pokazala da se sajt poklapa: ljubičast naslov „Verified reviews“ na Growth, zelena podvlaka u video citatu i zelene zvezdice u CTA na svim stranicama, i zvezdice u „Verified reviews“ u boji stranice. Jedina razlika ostaje kako jeste: naslov „Verified reviews“ (i video citati na SEO & AEO) je na sajtu #0d1928, a u Figmi je u skoro crnoj nijansi boje stranice (#082216, #131a26, #321f0d). Ništa nije menjano.

## 17.11.2026: odluka, citati u video utiscima ostaju kao u Figmi (QA grupa 5, stavka 5)
Tvoje „kao u Figmi neka bude“ 17.11. Citat Joseph Rudolo (Intaker) ostaje u navodnicima, citat Or Moshkovitz (Ballerine) ostaje bez njih, kao u svim FINAL verzijama u Figmi (Home, Services, Our Work, Pricing). Sekcija je ista na 7 stranica (Home, Our Work, Pricing, 4 servisne). Ništa nije menjano. Snimak stanja: `notes/video-citati-sada-2026-11-17.png`.

## 17.11.2026: oštrija fotografija u kartici „Ideas become live sites“ na Home (objavljeno na staging)
Tvoje „slika u levoj kartici je baš lošeg kvaliteta, popravi je“ 17.11. Kopija pre izmene: `backup/elements/home-crew-left-image-2026-11-17.json`. Pregled pre i posle: `notes/home-kartica-slika-desktop-2026-11-17.png`, `notes/home-kartica-slika-telefon-2026-11-17.png`.
| Gde | Pre | Posle |
|---|---|---|
| Home, leva kartica u „crew“ sekciji (Image `4e866e62-4feb-6163-0b45-7cd9640f2ccb`, klase `home-crew_image is-left`) | asset `6ad11fd5b78766c3453970d7` `home-crew-raw-3.avif`, 512×342 px, 7 KB: na ekranu razvučena oko 3 puta (na telefonu 3x i do 5 puta), mutna | asset `6afc73abaed05009a0a0fcc1` `home-crew-ideas-live-sites-1920.avif`, 1920×1280 px, 62 KB |
- Ista fotografija, isti kadar i iste boje: izvor je `NEB02694.jpg` iz dizajnerovog Drive foldera (Home / Navigation, 7008×4672, sRGB), ista slika koju koristi Figma (Home FINAL, čvor 4926:2512), samo smanjena na 1920 px. Razlika u boji prema staroj slici je u proseku oko 2 od 255.
- Odnos strana je isti kao pre (3:2), pa `object-fit: cover` i `object-position: 23% 50%` prikazuju isti deo slike. Klase, stil, `loading="lazy"` i prazan alt nisu menjani.
- Veličina je izabrana prema najvećem prikazu: kartica je do 890×438 px (tablet) i 349×418 px na telefonu, pa je na ekranima 2x i 3x potrebno oko 1.800–1.900 px širine.
- Provereno na stagingu (1440 px 2x i 390 px 3x): učitava se nova slika 1920×1280, kadar isti, bez JS grešaka.
- Stari asset `home-crew-raw-3.avif` je ostao u biblioteci (nije obrisan); više se ne koristi na ovom elementu.

## 17.11.2026: odluka, kartica „Webflow natives, fiercely honest“ na Home ostaje kako jeste (QA grupa 5, stavka 4)
Tvoje „ne menjaj tu ništa“ 17.11. Predlog sa spuštenom fotografijom (`notes/home-kartica-lice-predlog-2026-11-17.png`) nije primenjen; ništa nije menjano.

## 17.11.2026: odluka, tabovi na telefonu ostaju u dva reda (QA grupa 5, stavka 3)
Tvoje „preskoči, okej mi je ovo ovako kako je sad“ 17.11. „Design & Development“ i „Webflow Development“ ostaju u dva reda u tabovima na telefonu (Home „Four ways“, Pricing hero, Services Tour, Services poređenje). Ništa nije menjano. Snimak stanja: `notes/tabovi-telefon-sada-2026-11-17.png`.

## 17.11.2026: CTA podnaslov, prelom posle crte umesto pre nje (QA grupa 5, stavka 2, objavljeno na staging)
Tvoje „uradi“ 17.11. posle pregleda (`notes/cta-podnaslov-predlog-2026-11-17.png`). Kopija pre izmene: `backup/page-code/2026-11-17-headings/site-footer.html` (site footer pre obe izmene od 17.11.).
| Gde | Pre | Posle |
|---|---|---|
| CTA na dnu svih stranica (`cta-v2_subtitle`), desktop i tablet | „A 30-minute call. You leave with a plan and an estimate“ / „— whether you hire us or not.“ | „…and an estimate —“ / „whether you hire us or not.“ |
| Isto, telefon | 3 reda, „and an estimate“ sam u srednjem redu, treći red počinje crtom | „A 30-minute call. You leave“ / „with a plan and an estimate —“ / „whether you hire us or not.“ |
| Site footer kod | — | u bloku za naslove: crta posle preloma se premešta ispred njega, sa razmakom koji ne lomi red (pa crta ne može da počne red); podnaslov se prelama ravnomerno (`text-wrap: balance`) |
- Tekst je isti; menja se samo mesto preloma. Provereno na stagingu na Home, Pricing, blog postu, TrakPro case-u i Careers, na 1440, 820 i 390 px.
- Webflow je pri upisu escape oznake u ovom pravilu (`\u2014`, `\u00a0`) pretvorio u prave znakove; ponašanje je isto, a lokalna kopija je usklađena sa upisanim kodom.

## 17.11.2026: naslovi na telefonu bez jedne reči same u redu (QA grupa 5, stavka 1, objavljeno na staging)
Tvoje „uradi“ 17.11. posle pregleda pre i posle (`notes/naslovi-telefon-predlog-2026-11-17.png`). Kopija pre izmene: `backup/page-code/2026-11-17-headings/` (site head i footer kod). Head kod nije menjan.
| Gde | Pre | Posle |
|---|---|---|
| Svi naslovi (h1–h3 i `heading-style-h*`), do 767 px | prelamaju se redom, pa poslednja reč često ostaje sama („deserves.“, „website.“, „industries“, „itself.“…); ručni prelomi postavljeni za desktop važe i na telefonu | redovi se prelamaju ravnomerno (`text-wrap: balance`); ručni prelom se na telefonu ne poštuje, osim preloma ispred zelenog dela naslova (`.text-gradient`, npr. „no surprises after“ na Pricing) |
| Site footer kod (na kraju) | — | CSS za gore + kratka skripta koja na mestu svakog preloma ostavi razmak (da se reči ne spoje), prelom ispred zelenog dela označi kao „ostaje“ i tek onda uključi sakrivanje preloma (klasa `nues-hb` na `<html>`) |
- Desktop i tablet (od 768 px) se ne menjaju: provereno na 20 stranica na 1440 i 820 px, iste visine i isti broj redova u svim naslovima.
- Na telefonu (390 px, 20 stranica): naslova sa jednom rečju samom u poslednjem redu sada ima 1 umesto 41; spojenih reči nema. Jedini koji je ostao je naslov u Services Tour-u („Design & / Development“), koji je po dizajnu u dva reda.
- Tekst naslova nije menjan. Ako skripta ne radi, naslovi izgledaju kao pre (prelomi ostaju), samo ravnomernije prelomljeni.

## 17.11.2026: tabele u blog postovima i duplirani ID-jevi na Home (QA tačka 4, objavljeno na staging)
Tvoje „kreni sa tačkom 4“ 17.11. Kopije pre izmene: `backup/page-code/2026-11-17-blog-tables/blogs-template-footer.html`, `backup/elements/home-ways-card-domid-2026-11-17.json`.
| Gde | Pre | Posle |
|---|---|---|
| Blogs Template, footer kod | tabela šira od ekrana se skroluje u stranu bez ikakvog znaka; tastaturom se ne može fokusirati (axe: scrollable-region-focusable, 13 postova na telefonu) | dok tabela ima skrivene kolone, desno je senka u boji tabele (nestaje kad se doskroluje do kraja); tabela dobija fokus tastaturom (tabindex), ulogu region i opis „Table, scroll sideways to see all columns“, i zeleni okvir pri fokusu. Kad tabela stane, ništa se ne dodaje |
| Home, „Four ways“, 4 kartice u špilu (`home-ways_card`) | DOM ID `ways-tab-design`, `-webflow`, `-seo`, `-growth`, isti kao na tabovima | bez ID-ja; ID imaju samo tabovi, na koje panel pokazuje (`aria-labelledby`). Skripta karticu nalazi po klasi, ne po ID-ju |
- Provereno na stagingu: na 390 px tabela u „AEO vs SEO“ i „Webflow vs Wix“ ima senku i fokus, posle skrola do kraja senka nestaje; na 1440 px tabela koja stane nema ništa dodato, a šira („Webflow vs Wix“, 900 px) ima. axe više ne javlja scrollable-region-focusable.
- Home: nema dupliranih ID-jeva osim jednog koji Webflow sam pravi za CMS listu (`wf-template-…`, skriveni šablon, ne može se menjati). Tabovi rade: klik na SEO & AEO podiže tu karticu i otvara njen panel.

## 17.11.2026: About, „The journey behind building Nues“ radi i na skrol i na klik po godinama, kao Tour na Services (objavljeno na staging)
Tvoj zahtev 17.11, uz snimke About i Services: „ova sekcija na about page-u, promeni je da bude i scroll i tabovi, kao ova services sekcija“. Kopija pre izmene: `backup/page-code/2026-11-17-about-timeline/` (About head i footer kod). Head kod nije menjan.
| Gde | Pre | Posle |
|---|---|---|
| Desktop (od 992 px širine i 720 px visine) | grafikon se sam vrti kroz 2023–2026 (6,5 s po godini) kad uđe u ekran; klik na godinu skače na nju | grafikon ostaje zakačen ispod navbara dok se skroluje (300vh, kao Tour na Services); svaka četvrtina skrola je jedna godina, linija se crta do te godine i otvara njenu priču i sliku; pilula godine se puni dok skroluješ; klik na godinu (pilula, krug ili slika) skroluje do te godine |
| Tablet, telefon i „smanji animacije“ | kao gore | isto kao pre (vrti se sam, klik skače na godinu) |
| About footer kod | skripta grafikona i CSS u head-u | skripta proširena režimom skrola; dodat mali CSS blok (`.about-timeline.is-scroll`: overflow clip umesto hidden, jer hidden ne da elementu da se zakači; prazan blok od 300vh posle grafikona; zakačen grafikon najviše onoliko širok da stane u visinu ekrana) |
- Klasu `is-scroll` dodaje skripta, kao `is-on` i `is-auto` koje je sekcija već koristila.
- Provereno na stagingu (1440x900, 1280x720, 1920x1080, 1024x768, 390x844): grafikon se zakači i prolazi kroz 2023, 2024, 2025 i 2026, pa se otkači i stranica ide dalje; klik na 2026 i 2024 skroluje do te godine; na 1280x720 grafikon je malo uži (1082 px) da ceo stane na ekran; na telefonu se ništa nije promenilo. Bez JS grešaka.

## 16.11.2026: Home OG slika na 6 stranica bez svoje (objavljeno na staging)
Tvoje „oni nek koriste isti kao i homepage“ 16.11: stranice za koje u Drive folderu nije bilo OG slike dobile su Home sliku. Pre izmene nijedna nije imala OG sliku (stanje u listi stranica od 16.11, sve `imageAssetId: null`).
| Stranica | Pre | Posle |
|---|---|---|
| Pricing, Let's talk, Blog, Resources, Privacy policy, Terms of service | bez OG slike | `nues-og-home.jpg` (asset 6afb8fdb780d6de45c2ec743) |
- OG naslov i opis nisu menjani.
- Provereno na stagingu: `og:image` je na svih 6 stranica. Sada svih 46 objavljenih stranica ima OG sliku (9 sa svojom slikom od dizajnera, 6 sa Home slikom, 31 blog i case study iz CMS-a).

## 16.11.2026: Open Graph slike od dizajnera (objavljeno na staging)
Tvoj zahtev 16.11: „sada update-uj, open graph images“ (Drive folder sa 13 PNG fajlova, 2400x1260). Pre izmene nijedna stranica nije imala OG sliku; kopija stanja: `backup/page-settings/og-images-before-2026-11-16.json`.
Slike su smanjene na 1200x630 JPEG (41–82 KB umesto ~3 MB), sačuvane u `webflow-assets/og/` i uploadovane u Webflow assets (alt tekst = tekst sa slike).
| Stranica | Pre | Posle (fajl iz Drive-a → asset) |
|---|---|---|
| Home | bez OG slike | `og-home-v10@2x.png` → `nues-og-home.jpg` |
| About | bez OG slike | `og-about@2x.png` → `nues-og-about.jpg` |
| Services | bez OG slike | `og-services@2x.png` → `nues-og-services.jpg` |
| Design & Development | bez OG slike | `og-services-design-dev2elopment@2x.png` → `nues-og-services-design-development.jpg` |
| Webflow Development | bez OG slike | `og-services-webflow-development@2x.png` → `nues-og-services-webflow-development.jpg` |
| SEO & AEO | bez OG slike | `og-services-seo-aeo@2x.png` → `nues-og-services-seo-aeo.jpg` |
| Growth | bez OG slike | `og-services-growth@2x.png` → `nues-og-services-growth.jpg` |
| Our Work | bez OG slike | `og-our-work@2x.png` → `nues-og-our-work.jpg` |
| Careers | bez OG slike | `og-careers@2x.png` → `nues-og-careers.jpg` |
| Webflow Integrations (draft, nije objavljena) | bez OG slike | `og-integrations@2x.png` → `nues-og-integrations.jpg` |
- Gde je u folderu bilo više verzija, uzeta je novija: Home `v10` (ne `v8`), About `og-about` (ne `v5`, starija 30 min), Design & Development `dev2elopment` (8 min novija; unutrašnji krug svetliji, kao kod ostalih servisa).
- OG naslov i opis nisu menjani. Pricing, Let's talk, Blog, Resources, Privacy i Terms nemaju sliku u folderu, pa su ostali bez OG slike. Blog i case study šabloni i dalje koriste sliku iz CMS-a.
- Provereno na stagingu: `og:image` je na svih 9 objavljenih stranica i pokazuje na novi asset (200, image/jpeg).

## 16.11.2026: Home CTA, kartica sa iClosed-om bez „kutije u kutiji“ (objavljeno na staging)
Tvoje „ružno izgleda sad, napravi da je lepše“ 16.11, uz snimak: iClosed crta svoj panel širok oko 480 px sa sivim okvirom, a kartica je bila 648 px, pa se videla kutija u kutiji sa praznim belim poljima levo i desno.
| Gde | Pre | Posle |
|---|---|---|
| `home-cta_booking` (desktop) | širi se do 648 px (flex 1) | 478 px, kao `lt-booking` na Let's talk; stoji uz desnu ivicu (`home-cta_component` justify space-between) |
| `home-cta_booking` (tablet i telefon) | 100% širine | 100%, najviše 478 px, levo poravnata |
| iClosed widget u kartici | `iclosed-widget` | `iclosed-widget` + combo `is-flush`: 1 px širi sa svake strane i 1 px gore, pa ivica kartice odseca sivi okvir iClosed panela |
| Home head kod, 992–1279 px | naslov 4.3vw | naslov zauzima prostor koji ostane pored kartice: min(58 px, (širina ekrana − 640 px) / 10.4) |
- Provereno na stagingu: kartica 478 px i 50 px od desne ivice na 1440; widget 480 px sa pomakom −1 px na svim širinama; naslov u dva reda od 992 do 1440 px. Sam iClosed i dalje ne mogu da vidim (domen mi je blokiran).

## 16.11.2026: Home, srednja CTA sekcija po novom dizajnu (Figma 8814:30) sa iClosed zakazivanjem (objavljeno na staging)
Tvoj zahtev 16.11: sekciju „Have a project in mind?“ zameniti dizajnom iz Figme (8814:30 i 8820:147), s tim da desno umesto forme bude iClosed kao na Let's talk. Kopije pre izmene: `backup/elements/home-cta-section-2026-11-16.json` (cela stara struktura), `backup/page-code/2026-11-16-home-cta/` (Home head i footer kod).
| Gde | Pre | Posle |
|---|---|---|
| Pozadina | tamnoplava + zeleni sjaj (`home-cta_glow`) + linije (`home-cta_lines`, slika) | slika iz Drive foldera (`nues-home-cta-bg@2x.png`, 2880x1320, kao AVIF 24 KB, asset `home-cta-bg.avif`), preko cele sekcije, poravnata levo (`home-cta_bg`) |
| Raspored | naslov levo, dugme „Book an intro call“ desno | ocena + naslov levo, bela kartica sa iClosed widgetom desno (razmak 100 px, kartica do 50 px od desne ivice) |
| Ocena | ispod naslova; zvezdice zelene; „5.0 on Clutch · free 30-minute intro“, 60% providno | iznad naslova; zvezdice bele (combo `is-white`, footer zadržava zelene); „5.0 · Free 30-Minute Intro“, puna bela, medium |
| Naslov | `heading-style-h3` (Geist 48 px) | `heading-style-h2` (Aeonik 58 px, visina reda 1.1), kao u Figmi |
| Desno | link „Book an intro call“ ka Let's talk | `home-cta_booking` (bela, zaobljenje 24 px, na telefonu 16 px) sa `iclosed-widget` (isti URL kao na Let's talk: discovery-call) |
| Home footer kod | (nije bilo) | skripta koja učitava iClosed tek kada se sekcija približi ekranu (800 px ranije), da vrh stranice ostane brz |
| Home head kod, 992–1279 px | (nije bilo) | naslov 4.3vw i razmak 50 px, da naslov ostane u dva reda pored kartice |
- Stari elementi (sjaj, linije, dugme, tekst „5.0 on Clutch“) su uklonjeni. Njihove klase i slika linija ostaju u Webflow-u, nisu brisane.
- Clutch link (zvezdice i „5.0“) i dalje vodi na Clutch; opis za čitače ekrana: „5.0 on Clutch, read Nues reviews“.
- Pokušaj da se iClosed skripta doda kao registrovana skripta stranice vratio je grešku 404 (dva puta), pa je stavljena u Home footer kod; registrovana skripta koju sam pri tome napravio je obrisana.
- Provereno na stagingu (1440, 1279, 1100, 992, 991, 800, 390 px): na 1440 sve mere kao u Figmi (tekst 50 px od leve ivice, kartica 648 px i 50 px od desne, gornji razmak 100 px, naslov 58/63.8 px); naslov u dva reda na svim širinama desktopa; ispod 992 px kartica ide ispod naslova preko cele širine. iClosed se u mom pregledaču ne učitava (domen mi je blokiran), pa je kartica u mojim snimcima prazna; posetiocima se prikazuje kao na Let's talk.

## 14.11.2026: odluka, kontrast teksta se ne menja
Tvoje „nemoj ništa od ovoga dirati“ 14.11. na predlog `notes/kontrast-predlog-2026-11-14.png`. Sporedni tekst ostaje kakav jeste: tamnoplavi 40–50%, beli 40%, oznake na plavoj kartici recenzije 60%, kao i prigušeni tabovi i kartice. Ništa nije menjano u Webflow-u. Lighthouse će i dalje prijavljivati „color-contrast“ na tim mestima.

## 14.11.2026: tačkice istaknutih tekstova na /blog, veća površina za klik (objavljeno na staging)
Tvoje „uradi“ 14.11. na predlog `notes/blog-tackice-predlog-2026-11-14.png`. Druga od tri preostale stavke iz audita, drugi deo. Kopije pre izmene: `backup/page-code/2026-11-14-dots/blog-head.html`, `backup/styles/ins-featured_dots-2026-11-14.json`.
| Gde | Pre | Posle |
|---|---|---|
| Blog, head kod: `.ins-feat-dot` | dugme 8x8 px (aktivno 28x8) | dugme 24x24 px (aktivno 44x24) sa istom tačkicom 8x8 (28x8) nacrtanom u sredini; prsten za tastaturu iste veličine kao pre |
| Klasa `ins-featured_dots` (Designer) | razmak 8px; desno/dole 50/50 (tablet 36/40, telefon desno 24, gore 38) | razmak 0; desno/dole 42/42 (tablet 28/32, telefon desno 16, gore 30) |
- Vidljiva razlika je samo razmak između tačkica, 16 px umesto 8 px. Tačkice su iste veličine i boje, poslednja je na istom mestu, visina ista (provereno na 1440, 1100, 900, 600 i 390 px).
- Klik na tačkicu i dalje menja istaknuti tekst.
- Provereno na stagingu: provera „target-size“ na tačkicama prolazi na svim širinama.

## 14.11.2026: veća površina za klik na Services i Resources u navbaru (objavljeno na staging)
Druga od tri preostale stavke iz audita („premala dugmad“), prvi deo. Kopija stila pre izmene: `backup/styles/navbar2_toggle-link-2026-11-14.json`.
| Gde | Pre | Posle |
|---|---|---|
| Klasa `navbar2_toggle-link` (naslovi Services i Resources u navbaru), desktop | bez razmaka, površina za klik 19,5 px visine | padding gore i dole 12px, margin gore i dole -12px: površina 43,5 px, kao ostali linkovi u navbaru |
| Ista klasa, tablet i manje (≤991 px) | (nasleđivalo bi desktop) | padding i margin 0, kao do sada (u mobilnom meniju link je već 26 do 31 px) |
- Ništa se ne pomera: položaj svih elemenata navbara je isti do piksela na 1440, 1100, 991 i 390 px (sa otvorenim menijem na manjim širinama).
- Hover i padajući meni rade kao pre (veća površina je unutar istog elementa koji otvara meni).
- Provereno na stagingu: provera „target-size“ u navbaru prolazi na svim širinama.
- Tačkice za listanje istaknutih tekstova na /blog: urađene posle odobrenja (unos iznad).

## 14.11.2026: opisi linkova za čitače ekrana sadrže tekst koji piše na njima (objavljeno na staging)
Tvoje „radi jednu po jednu redom“ 14.11, prva od tri preostale stavke iz audita. Kopije pre izmene: `backup/page-code/2026-11-14-labels/`.
| Gde | Pre | Posle |
|---|---|---|
| Footer komponenta, Clutch link (vidljivo „5.0 on Clutch“), važi na svih 41 stranici | `aria-label="Nues reviews on Clutch, rated 5.0"` | `aria-label="5.0 on Clutch, read Nues reviews"` |
| Our Works Template, footer kod: kartice tima | opis „Ime on LinkedIn“; ime i uloga bez razmaka, pa ih čitač ekrana čita kao jednu reč („DumicHead“) | opis „Ime, uloga, on LinkedIn“ i nevidljiv razmak između imena i uloge (2 reda koda) |
- Ništa vidljivo nije menjano. Raspored kartica tima je isti do piksela na 1440 i 390 px (provereno pre upisa).
- Ostali Clutch linkovi (Home hero, CTA, Reviews) već prolaze proveru, nisu dirani.
- Provereno na stagingu: novi opis je na svih 41 stranici; Lighthouse „label-content-name-mismatch“ prolazi na About, Ballerine i Shiftolic. Ballerine 95 → 96 (telefon), 91 → 93 (desktop); Shiftolic 98 → 100 i 95 → 96.

## 14.11.2026: liste na Blog i Our Work i redosled naslova na Privacy i Terms (objavljeno na staging)
Tvoje „radi“ 14.11. Kopije koda pre izmene: `backup/page-code/2026-11-14-lists/` (Blog footer, Our Work footer, head Privacy i Terms).
| Gde | Pre | Posle |
|---|---|---|
| Blog, footer kod: filteri kategorija (`.ins-filter_list`) | Webflow lista (`role="list"`), a stavke su dugmad, pa lista nema nijednu stavku | grupa dugmadi: `role="group"`, `aria-label="Filter insights by category"` (1 red koda) |
| Our Work, footer kod: crtice hero slajdera (`.ow-hs-bars_list`) | `role="list"`, stavke su dugmad | `role="group"`, `aria-label="Choose a project"` (2 reda) |
| Our Work, footer kod: paneli case studija (`.ow-cs_list`) | `role="list"`, stavke su paneli tabova | `role="presentation"`, samo omotač; paneli i tabovi isti kao pre (2 reda) |
| Privacy policy, tekst (Rich Text) | naslovi H4 (7) i H6 (3), posle H1 | H2 (7) i H3 (3) |
| Terms of service, tekst (Rich Text) | naslovi H4 (8), posle H1 | H2 (8) |
| Privacy i Terms, head kod | pravila samo za H4 i H6 | dodata pravila da H2 i H3 izgledaju isto kao ranije H4 i H6 (sve 4 veličine ekrana) |
- Webflow API ne može da napravi stilove za naslove unutar Rich Text-a (u Designer-u „All H2 headings“ u `legal-rich_text`), zato su pravila u head kodu te dve stranice, pored postojećeg pravila za liste. Stari stilovi za H4 i H6 nisu dirani.
- Ponašanje filtera, slajdera i tabova nije menjano; dodati su samo atributi.
- Provereno na stagingu:
  - pre objave, u pregledaču: zamena nivoa naslova sa novim pravilima daje iste veličine, razmake i položaj svih 18 naslova na 1440, 900, 700 i 390 px;
  - posle objave: visina stranica, položaj naslova i lista isti kao pre na Blog, Our Work, Privacy i Terms (4 širine);
  - Lighthouse pristupačnost: Blog 92 → 97, Our Work 90 → 96, Privacy i Terms 97 → 100 (telefon) i 93 → 96 (desktop). Provere „aria-required-children“ i „heading-order“ prolaze, nijedna nova greška.
- Ostaje iz audita (nije deo ove izmene): Clutch link čiji opis za čitače ekrana ne sadrži vidljiv tekst, premala dugmad na nekim mestima i kontrast na Our Work na telefonu.

## 14.11.2026: oznaka glavnog sadržaja (`<main>`) na svim stranicama (objavljeno na staging)
Tvoje „uradi“ 14.11. Na 16 Webflow stranica postojeći omotač sadržaja `main-wrapper` (između navbara i footera) dobio je tag Main umesto Div, preko obične Webflow opcije za tag. Nije dodat nijedan element, klase i stilovi su isti. Spisak elemenata i stari tag: `backup/elements/main-wrapper-tag-2026-11-14.json`.
| Gde | Pre | Posle |
|---|---|---|
| About, Services, 4 servisne stranice, Our Work, Pricing, Let's talk, Careers, Blog, Resources, Privacy policy, Terms of service | `div.main-wrapper` | `main.main-wrapper` |
| Blogs Template (21 post) i Our Works Template (5 case stranica) | `div.main-wrapper` | `main.main-wrapper` |
- Home i 404 su već imali `<main>`, nisu dirani.
- Provereno na stagingu:
  - svih 41 stranica ima tačno jednu `<main>`, a navbar i footer su van nje;
  - visina stranice, širina i visina omotača i njegov CSS su isti pre i posle na 17 stranica (sve vrste stranica), na 1440 i 390 px;
  - Lighthouse pristupačnost (mobilni): About 100, blog post „Webflow vs Wix“ 100 (ranije 98); provera „landmark-one-main“ prolazi.
- Napomena: u poruci pre izmene naveo sam 35 stranica bez `<main>`; tačan broj je bio 40 (sve osim Home).

## 14.11.2026: stari logo u kodu za Google zamenjen našim Nues znakom (objavljeno na staging)
Tvoje „zameni ga“ 14.11. Stari logo je fajl iz drugog Webflow projekta (`69b4443f…/69ffd79d11a1a944721ccfa9_navbar-logo.svg`, crno-roza). Novi je naš tamni Nues znak iz Assets-a (`6aba6bc0…/6adbb6b72708019a0404c6a6_pricing-receipt-logo.svg`, isti kao na Let's talk i na Pricing računu). Kopije pre izmene: `backup/schema/home-2026-11-14.json`, `backup/schema/about-2026-11-14.json`, `backup/page-code/2026-11-14-logo/`.
| Gde | Pre | Posle |
|---|---|---|
| Home, JSON-LD (Organization), `logo` | stari logo | Nues znak |
| About, JSON-LD (AboutPage, Organization), `logo` | stari logo | Nues znak |
| Blogs Template, head kod (Article schema, `publisher.logo`), važi za 21 blog post | stari logo | Nues znak |
| Our Works Template, head kod (Article schema, `author.logo` i `publisher.logo`), važi za 5 case stranica | stari logo (2 puta) | Nues znak (2 puta) |
- Ostatak schema i koda je isti znak po znak (upisani kod upoređen sa pripremljenim fajlom; About JSON-LD upoređen sa kopijom).
- Lokalne kopije `webflow-assets/site-code/blogs-template-head.html` i `our-works-template-head.html` ažurirane da budu iste kao na sajtu.
- Ništa vidljivo na stranicama nije menjano, samo kod za Google.
- Provereno na stagingu: stari logo se ne pojavljuje ni na jednoj od 41 stranice; Nues znak je na 30 (Home, About, Pricing, Let's talk, 21 post, 5 case stranica).

## 14.11.2026: blog link sa about:blank, status B2B posta i Review schema na Let's talk (objavljeno na staging)
Tvoje „uradi“ 14.11. Kopije pre izmene: `backup/cms-items/blog-saas-content-marketing-2026-11-14.json`, `backup/cms-items/blog-b2b-saas-seo-2026-11-14.json`, `backup/schema/lets-talk-2026-11-14.json`.
| Gde | Pre | Posle |
|---|---|---|
| Blog „SaaS content marketing in 2026“, polje Content, link „B2B SaaS SEO guide“ (odeljak Distribution) | `href="https://about:blank"`, otvara se u novom tabu | `href="/blog/b2b-saas-seo-in-2026-a-strategy-guide-for-marketing-leaders"`, isto kao drugi link na isti vodič u tom postu |
| Blog „B2B SaaS SEO in 2026“, status u CMS-u | Draft od 12.10. (javna je bila verzija od 28.09.) | objavljeno. Tekst, title, opis, slika i FAQ su isti kao u objavljenoj verziji (upoređeno rečenicu po rečenicu) |
| Let's talk, JSON-LD | sadržao `review` (ocena 5, Or Moshkovitz, Ballerine, citat „Three competitors asked us…“) | `review` uklonjen; ostatak (ContactPage, Organization, Service) isti |
| Let's talk, JSON-LD, logo organizacije | fajl iz drugog Webflow projekta (crno-roza logo) | naš tamni Nues znak iz Assets-a (`pricing-receipt-logo.svg`, isti kao na Pricing računu) |
- Beleška „nova verzija B2B posta je u draftu“ bila je netačna: postoji samo jedna stavka, a razlika je bila samo status.
- Ostatak teksta oba posta je ostao znak po znak isti (provereno posle upisa).
- Citat i dalje stoji vidljiv u slideru recenzija na Let's talk; uklonjen je samo iz koda za Google.
- Provereno na stagingu:
  - u postu nema about:blank, a oba linka „B2B SaaS SEO guide“ vode na vodič;
  - B2B post vraća 200;
  - Let's talk JSON-LD nema `review`, a logo vraća 200.
- Isti stari logo je bio i u Organization schema na Home; zamenjen kasnije istog dana (unos iznad).

## 14.11.2026: Our Work mreža u redosledu iz Figme, novo CMS polje „Our Work order“ (objavljeno na staging)
Tvoje odobrenje 14.11. Kopija pre izmene (sortiranje liste i Order vrednosti): `backup/cms-items/our-work-order-2026-11-14.json`.
| Šta | Pre | Posle |
|---|---|---|
| Our Works, novo polje | nema | „Our Work order“ (Number, slug `our-work-order`), u grupi „1 · Basics“ odmah posle Order. Help: samo Our Work mreža, manji broj ide prvi |
| Our Works, help tekst polja Order | „Trusted strip, Our Work grid and Resources“ | „Trusted strip and Resources“, uz napomenu da Our Work mreža koristi Our Work order |
| Our Work stranica, lista `ow-grid_wrap`, sortiranje | po Order (Veyor, Shiftolic, TrakPro, Intaker, Harper, Hypersonix, Ballerine, Sustain, LaSalle, Biotech) | po Our Work order: Intaker, Ballerine, Shiftolic, Veyor, Harper, Sustain, LaSalle, Biotech, Hypersonix, TrakPro (Figma 6361:3425, sekcija „Every site we shipped“, ponovo pročitano 14.11.) |
- Upisan Our Work order od 1 do 10 za tih 10 projekata. Pythagora je u draftu i nije dirana. Pre izmene nijedna stavka nije imala neobjavljene promene.
- Trusted traka (Home i servisne stranice) i Resources i dalje koriste Order, pa je njihov redosled isti kao pre.
- Provereno na stagingu u sirovom HTML-u: mreža na /our-work ima istih 10 kartica, u redosledu iz Figme.

## 14.11.2026: ponovljen SEO audit (bez izmena u Webflow-u)
Isti postupak kao 13.11. (svih 41 stranica, mobilni i desktop), rezultati su u `reports/audit-2026-11-14/`. Tabela je osvežena i sada ispod svake ocene pokazuje razliku od 13.11.: https://claude.ai/artifact/6hbiiooYKFkgdDm2s7Rc4H
- Provere HTML-a (title, description, H1, schema, OG, canonical, alt): nijedna promena na 41 stranici.
- Prosek ocena:
  - mobilni Performance 61 (bio 57);
  - pristupačnost 97, best practices 100, SEO 100, agentic browsing 98, kao 13.11.;
  - desktop isti (88 / 95 / 100 / 100 / 98).
- Rast mobilnog Performance-a je razlika između dva merenja, ne promena na sajtu: na sajtu ništa nije menjano. Najviše se pomerio Home (37 → 57, LCP 8,0 → 3,8 s).
- Iste provere ne prolaze na istom broju stranica kao 13.11.

## 14.11.2026: odluka, OG slike pravi dizajner
- Tvoja odluka: moje OG slike (v2 ispod) se ne koriste, sve pravi dizajner. Fajlovi ostaju u repou samo kao referenca. U Webflow-u ništa nije menjano.

## 14.11.2026: nove slike za deljenje (og:image), bez izmena u Webflow-u
Aleksandrov zahtev: svaka glavna stranica dobija svoju sliku (kao Flow Ninja), CMS stranice koriste svoju CMS sliku, ostale jednu univerzalnu.
- 14 slika 1200×630 JPG (46–99 KB) u `webflow-assets/og-v2/`:
  - 13 pojedinačnih;
  - `og-universal.jpg` za stranice koje se ne dele.
- Svaka pojedinačna slika je pravi hero te stranice sa staginga. Navbar, dugmad i sitan tekst su uklonjeni, logo je dodat gore levo, a naslov je uvećan.
- Na servisnim stranicama naslov je ime usluge, a ispod je postojeći title stranice. Ništa od teksta nije novo.
- Univerzalna: Clutch i Certified Partner bedževi, naslov sa Home-a i veliki Nues znak u dnu.
- Skripta: `webflow-assets/og-v2/render.js`. Pregled: `notes/og-v2-pregled-2026-11-14.jpg`.
- Sledeći korak je upload u Assets (MANUAL_TASKS 13), pa povezivanje preko API-ja.
- Nađeno: og:image na blog postovima i case stranicama je AVIF (npr. „Untitled (1).avif“), a LinkedIn AVIF verovatno ne prikazuje.

## 13.11.2026: SEO audit celog sajta (bez izmena u Webflow-u)
Samo merenje, na sajtu se ništa ne menja. Tabela: https://claude.ai/artifact/6hbiiooYKFkgdDm2s7Rc4H
- Lighthouse 13.6.0 (Performance, pristupačnost, best practices, SEO, agentic browsing), mobilni i desktop, 1 merenje po stranici, svih 41 stranica na stagingu (15 stranica, 5 case-ova, 21 blog post), plus provere sirovog HTML-a (title, description, H1, schema, OG, canonical, noindex, alt).
- Sve je u `reports/audit-2026-11-13/`: `run-lh.sh`, `html-checks.py`, `build-data.py`, sirovi rezultati u `lighthouse/`, sažetak u `pages.json`/`pages.csv`, `opportunities.json`, `failing-audits.json`.
- SEO je računat bez provere „blocked from indexing” (staging robots.txt), a best practices bez grešaka u konzoli koje dolaze samo od adresa blokiranih u okruženju za merenje. Originalne ocene su u kolonama `*Raw`.

## 13.11.2026: SEO, putanja stranice (BreadcrumbList schema) na blog postovima i case stranicama (objavljeno na staging)
Google iz ovoga pravi putanju u rezultatu pretrage (npr. „Resources › Insights › naslov“ umesto gole adrese). Vidljivi deo stranica se ne menja. Kopija pre izmene (tačan kod sa sajta): `backup/page-code/2026-11-13-breadcrumbs/`.
| Šablon (head kod) | Pre | Posle |
|---|---|---|
| Blogs Template | BlogPosting + stilovi | dodat BreadcrumbList: Resources (/resources) › Insights (/blog) › naslov posta (polje Name, /blog/slug). Isti redosled kao putanja koja već piše na stranici |
| Our Works Template | skripta za prazne case-ove + Article + stilovi | dodat BreadcrumbList: Our Work (/our-work) › ime projekta (polje Name, /our-work/slug) |
- Postojeći BlogPosting, Article, skripta i stilovi su ostali bajt po bajt isti; deployovan kod je identičan `webflow-assets/site-code/blogs-template-head.html` i `our-works-template-head.html`.
- Provereno na stagingu: svih 21 blog post i 5 napisanih case stranica imaju ispravan JSON, zadnja stavka putanje je baš ta stranica, sve 29 adresa iz putanja vraćaju 200.
- Adrese su relativne (/blog/…), kao u ostaloj schema-i. Uz odluku o domenu (QUESTIONS 7) sve se prebacuje na pune adrese.

## 13.11.2026: Home „Four ways“, kartica više ne prolazi kroz prednju (objavljeno na staging)
Komentar tima: kad se kartice smenjuju, kartica koja treba da bude prva prođe kroz onu ispred. Kopija pre izmene: `backup/page-code/2026-11-13/home-footer.html` (isto što je bilo na sajtu).
- Uzrok: izabrana kartica izlazila je iz špila samo 26% udesno, pa je u trenutku kad pređe u prednji sloj još bila preko prednje kartice i „iskakala“ kroz nju.
| Šta (Home page footer, skripta Four ways) | Pre | Posle |
|---|---|---|
| Tačka do koje kartica izlazi (`OUT`) | 26% desno, 9% gore, nagib 7°, uvećanje 1.02 | 104% desno (cela širina kartice), 6% gore, nagib 8°, bez uvećanja: kartica je potpuno van špila kad pređe napred |
| Trajanje prelaza | 1000 ms | 1100 ms (duži put, isti osećaj brzine) |
- Na telefonu kartica kratko izađe van ekrana desno i vrati se na vrh špila.
- Usput je na sajt otišla i izmena od 13.11. koja nije bila objavljena: pomeranje belog „pill“-a ispod tabova u mreži 2×2 na tabletu i telefonu (`moveLine`). Do sada je pill na 820 i 390 px bio pogrešne visine; sada prati aktivni tab (provereno: tabovi 1, 3, 4 na 1440, 820 i 390 px).
- Deployovan Home footer (14.196 znakova) identičan je `webflow-assets/site-code/home-footer.html`. Snimak kadar po kadar: `notes/four-ways-swap-2026-11-13.png`.

## 13.11.2026: video popup, treći pokušaj: bez zamućenja pozadine (objavljeno na staging)
Tvoja poruka: tamni kvadrat je i dalje tu. Kopija pre izmene: `site-head.min.html` u commit-u 653d4bf.
- Analiza tvog snimka: tamni kvadrat je boja zatamnjenja (#080c14) nanesena još jednom, oko 60% providnosti, tačno u pravougaoniku Vimeo plejera. Sve unutar prozora je već odsečeno maskom, pa to crta browser, ne naš element. Najverovatniji uzrok je zamućenje pozadine (`backdrop-filter`) ispod Vimeo iframe-a: browser ga u pravougaoniku plejera iscrta dva puta. Galerija projekata ima isto zamućenje, ali u njoj su slike, ne iframe, i tamo problema nema.
| Šta | Pre | Posle |
|---|---|---|
| Pozadina iza video prozora (`.vmodal:before`) | `rgba(8,12,20,.84)` + `backdrop-filter: blur(6px)` | `rgba(8,12,20,.9)`, bez zamućenja (malo jača boja da stranica iza i dalje bude mirna) |
- Ostalo isto: maska na uglovima, X bez prstena, radius 16 / 12 px.
- Provereno u Chromium-u: svih 21 video dugmadi na 8 stranica otvara prozor ispravno, bez JS grešaka. Na tvom browseru i sa pravim Vimeo videom ovo odavde ne mogu da proverim.
- Deployovan head (39.032 znaka) identičan je `webflow-assets/site-code/site-head.min.html`.
- Potvrđeno: ti si proverio na svom browseru sa pravim Vimeo videom, tamnog kvadrata više nema.

## 13.11.2026: video popup, drugi pokušaj: maska na uglovima + X bez prstena (objavljeno na staging)
Tvoj drugi snimak: tamni kvadrat je i dalje bio tu, a X je imao beli prsten oko sebe. Kopija pre izmene: `site-head.min.html` i `site-footer.min.html` u commit-u 6507132.
| Šta | Pre | Posle |
|---|---|---|
| Uglovi prozora (`.vmodal_box`) | `overflow:hidden` + radius, `isolation:isolate`, senka `0 30px 80px rgba(0,0,0,.45)` | maska `-webkit-mask-image` u obliku prozora: sve unutra (Vimeo plejer, pozadina) seče se tačno po radiusu. Senke više nema: maska bi je ionako odsekla, a na tamnoj pozadini se jedva videla (tamni kvadrat je bio iste providnosti kao ta senka, 0,45) |
| Fokus pri otvaranju (site footer) | fokus ide na X, pa se oko njega crta beli prsten za tastaturu | fokus ide na sam prozor (bez okvira); X izgleda kao ranije. Tasterom Tab se i dalje dolazi do X-a, i tada se prsten vidi |
- Radius ostaje 16 px / 12 px, X je isti kao pre (bela zaobljena kocka).
- Provereno u Chromium-u na Home (1440 i 390 px) i /services/growth, sa lažnim Vimeo plejerom: uglovi čisti, X bez prstena posle klika, Tab vodi na X, Esc zatvara, bez JS grešaka. Safari i pravi Vimeo ovde nemam.
- Deployovani head (39.092 znaka) i footer (30.571 znak) identični su fajlovima u repou.
- Naknadno provereno: svi video testimonials i Trusted video kartice na sajtu otvaraju isti prozor, pa ispravka važi svuda. Otvoreno je svako od 21 video dugme na Home, /services, 4 servisne stranice, /our-work i /pricing (1440 i 390 px): sva su OK. Četiri skrivena elementa na /our-work su izvori videa za hero slider, ne video testimonials.

## 13.11.2026: video popup (video testimonials), tamni kvadrat iza zaobljenih uglova (objavljeno na staging)
Tvoj snimak: iza zaobljenog ugla videa vidi se tamni kvadratni ugao. Uzrok: zatamnjenje i zamućenje pozadine (backdrop-filter) bili su na istom elementu koji drži video, a Safari tada pogrešno crta uglove. Kopija pre izmene: `webflow-assets/site-code/site-head.min.html` u commit-u 94175d4 (stanje posle izmene galerije, pre ove).
| Šta | Pre | Posle |
|---|---|---|
| Zatamnjenje + zamućenje | na `.vmodal` (roditelj videa) | na posebnom sloju `.vmodal:before` iza videa, kao `.pg_dim` u galeriji |
| Pojavljivanje | ceo `.vmodal` menja providnost | sloj iza i video menjaju providnost odvojeno (isto trajanje 0,35 s) |
| Uglovi | radius samo na `.vmodal_box` | `.vmodal_box` dobija `isolation:isolate`; video i Vimeo iframe nasleđuju radius |
- Radius ostaje isti: 16 px na desktopu, 12 px na telefonu. Dugme X se nije menjalo.
- Provereno u Chromium-u na Home (1440 i 390 px) i /services/growth: otvaranje, zatvaranje na X, Esc, klik pored videa, zamućenje radi, bez JS grešaka. Safari ovde nemam, pa to treba pogledati na Mac-u ili iPhone-u.
- Deployovan head je identičan `webflow-assets/site-code/site-head.min.html` (39.023 znaka).

## 13.11.2026: galerija projekata (popup sa sliderom), manji radijusi (objavljeno na staging)
Po komentaru tima (manji radius bi lepše izgledao), tvoje „ajde da popravimo“. Menja se samo CSS popupa u site head-u; važi za Home (Every project) i sve 4 servisne stranice (Service Cases). Kopija pre izmene: `backup/page-code/2026-11-13-popup/`.
| Element | Pre (desktop / telefon) | Posle (desktop / telefon) |
|---|---|---|
| Glavni ekran u slideru (`.pg_slide`) | 32 px / 16 px | 16 px / 8 px |
| Male kartice ispod (`.pg_thumb`) | 12 px / 8 px | 6 px / 4 px |
- Deployovan head je identičan `webflow-assets/site-code/site-head.min.html` (38.802 znaka). Animacija otvaranja uzima radius sa ekrana, pa prati novu vrednost.
- Provereno na 1440 i 390 px: popup se otvara, nema JS grešaka. Pre/posle: `notes/popup-radius-2026-11-13-desktop.png` i `-mobile.png`.

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
