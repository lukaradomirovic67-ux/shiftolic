# CHANGELOG (SEO, AEO i performanse)

Svaka izmena u Webflow-u: šta, gde (stranica, kolekcija ili element ID), staro → novo, zašto.
Stanje pre svih izmena je u `backup/` (10.11.2026).

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
