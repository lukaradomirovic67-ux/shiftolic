# Šta je ostalo (13. 11. 2026.)

Izvori: `MANUAL_TASKS.md`, `QUESTIONS.md`, `notes/pre-launch-2026-11-11.md` i SEO audit od 13.11. (https://claude.ai/artifact/6hbiiooYKFkgdDm2s7Rc4H).
Placeholderi su ponovo provereni na stagingu 13.11.

## 1. Sadržaj koji fali (tim)
- [ ] **FAQ odgovori**:
  - Services i 4 servisne stranice, po 5 (sada „[Add the answer to: …]“);
  - Pricing, 5 odgovora (sada „Answer to be provided“).
  - Kad stignu, ja dodajem FAQ schema.
- [ ] **Cene na Pricing** za SEO & AEO i Growth (sada „[$X,XXX]“).
- [ ] **Prave recenzije**: različiti citati, imena i firme. Sada je autor svuda samo „Marketing Director“, a citati se ponavljaju.
- [ ] **Our Works u CMS-u**:
  - Stat 1 za Biotech, LaSalle, Harper i Intaker;
  - broj za Intaker tab i odobrenje rečenice „How nues rebuilt Intaker's site…“ (moj nacrt, QUESTIONS 15–16);
  - Hypersonix: metrika umesto „Soon / Rebuild in progress“;
  - Team na TrakPro, Veyor, Sustain i Shiftolic, i „Services used“ za TrakPro;
  - Harper: filter kategorija i slike za galeriju.
- [ ] **OG slike** (dizajner): 15 stranica nema sliku za deljenje. Ubaciti u Assets i javiti, ja ih povezujem (MANUAL_TASKS 13).
- [ ] **Bolji fajlovi logoa** za LaSalle, Sustain i Hypersonix (sada su sitni).
- [ ] **Naslov iznad FAQ-a** („Trusted by ambitious teams across six industries“) ne odgovara sekciji (tako je i u Figmi).

## 2. Odluke (ti)
- [ ] **Blog „B2B SaaS SEO in 2026“**: nova verzija je u draftu, stara je živa (QUESTIONS 14).
  - Audit je našao i da u postu „SaaS content marketing in 2026“ link „B2B SaaS SEO guide“ vodi na `https://about:blank`.
  - Popravljam ga kad odlučiš koja verzija ostaje.
- [ ] **Our Work**:
  - redosled kartica kao u Figmi (novo CMS polje „Our Work order“);
  - prvi slajd hero slidera Intaker (slika, logo u boji, metrika).
- [ ] **Baner za kolačiće** za GA4, ako ciljate posetioce iz EU.
- [ ] **Prazna CMS kolekcija „Case team“**: obrisati (brisanje ostavljam vama).
- [ ] **Podaci za schema** (QUESTIONS 9–11):
  - zvaničan naziv firme, godina osnivanja, adresa i telefon;
  - profili za sameAs;
  - Clutch ocena i broj recenzija;
  - da li skidamo Review schema sa Let's talk.
- [ ] **Za mapu ključnih reči** (QUESTIONS 3–6):
  - tržište i jezik;
  - glavna konverzija;
  - ključne reči i 2–5 konkurenata;
  - skripte trećih strana na produkciji.

## 3. Ja, čim kažeš „može“ (iz audita)
Bez promene izgleda:
- [ ] `<main>` oblast na 35 stranica (pristupačnost).
- [ ] ARIA liste: filteri na /blog i trake slidera na /our-work. Na te dve stranice agentic browsing je 67.
- [ ] Poredak naslova na Privacy i Terms.
- [ ] Slika pruga u /our-work heru se prikazuje u pogrešnom odnosu stranica.
- [ ] Mete za dodir na desktopu: Lighthouse ih označava na svih 41 stranica, treba proveriti koje su.

Menja izgled, treba odobrenje:
- [ ] Kontrast teksta na 9 stranica (npr. „+0%“ u brojkama na Our Work).
- [ ] Brzina na mobilnom (prosek 57). Najviše bi se dobilo na:
  - neiskorišćenom JS i CSS-u;
  - fajlovima koji blokiraju prvi prikaz;
  - slikama na /our-work (3,1 MB) i /resources (2,4 MB).
  - Minify i Geist smo preskočili. Predlog pripremam ako želiš.

## 4. Pri lansiranju (ručno u Webflow-u, MANUAL_TASKS 1–7)
- [ ] Plaćeni site plan i povezivanje domena.
- [ ] Izbor domena: `www.nues.agency` ili `nues.agency` (QUESTIONS 7), pa Site settings → SEO → Global canonical tag URL.
- [ ] Auto-generate sitemap i robots.txt za produkciju.
- [ ] 301 preusmeravanja:
  - 5 starih servisnih adresa (MANUAL_TASKS 5);
  - stare adrese sa nues.agency (treba spisak, QUESTIONS 8).
- [ ] Email obaveštenja za forme i probna Careers prijava sa CV-om.
- [ ] Google Search Console (DNS verifikacija, sitemap) i Bing Webmaster Tools.
- [ ] Integracije, kad se vodiči napišu: uključiti šablon stranica (MANUAL_TASKS 7), skinuti draft i noindex.
- Posle toga ja: pune adrese u schema i Organization schema.

## 5. Posle lansiranja (dogovoreno)
- [ ] Title i description van granica:
  - Home, Sanity vs Webflow, Source by Webflow, Pricing, Privacy, Terms, Careers i /blog;
  - isti H1 na 4 servisne stranice.
  - Predlozi su u `notes/seo-predlozi-2026-11-13.md`.
- [ ] Ponovni audit na pravom domenu.

## 6. Proveri u svom pregledaču (moje okruženje ih ne otvara)
- [ ] iClosed kalendar na Let's talk.
- [ ] Vimeo snimci (video testimonials i Trusted kartica).
- [ ] Slanje formi, Turnstile i GA4.
- [ ] Careers 3D piramida, fizika na 404 i Caveat font za potpise.
