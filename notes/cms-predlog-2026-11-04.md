# CMS: predlog čiste strukture (4.11.2026) — čeka odobrenje

Cilj: marketing (uz dizajnera za slike) sam dodaje projekte (Our Works) i blog postove, bez polja koja niko ne razume.
Osnova: revizija od 4.11. — šeme svih 10 kolekcija, popunjenost polja u svim stavkama i 258 povezivanja na stranicama,
šablonima i u skriptama (detalji: scratchpad cmsaudit/bind/usage.md i bindings.json).

Pravila: nazivi polja na engleskom; svako polje za sliku ima help text sa veličinom; grupe polja prate redosled unosa
(Basics → Images → Case study → Show on); preimenovanje NE kvari veze (veze idu preko ID-ja polja, slug ostaje isti).
Ništa se ne briše pre odobrenja i pre provere uslovne vidljivosti u Designeru (API je ne prikazuje).

## Our Works (62 polja → 48, u 5 grupa)

### 1. Basics (obavezno za svaki projekat)
| Polje (novo ime) | Sada | Gde se vidi |
|---|---|---|
| Name | Name | svuda |
| Industry | Industry (industry-2) | kartice: Home, Our Work, Resources, case |
| Filter category | Work category | filter na Our Work |
| Website link | Website Link | dugme na case strani, kartice (data-site) |
| Order | Number in sec home section | redosled svih lista |
| Card text | Short card text | Trusted kartice (Home + usluge) |
| Stat 1 value / label | Metric Value 1 / Label 1 | kartice + case hero |

### 2. Images (priprema dizajner)
| Polje | Sada | Specifikacija |
|---|---|---|
| Logo white | Logo with hover | SVG, beli; sivi izgled pravi CSS |
| Logo color | Logo with color | SVG u bojama brenda (Our Work hero) |
| Card background | Card background | 1600×1000, boje klijenta + znak |
| Full page screenshot | Hero screen center | cela početna, širina 1440, JPG ≤ 8 MB |
| Cover image | Main Image | 1600×1000, vrh početne; Our Work hero, deljenje na mrežama |
| Client icon | Client icon | kvadrat 128×128 (opciono) |

### 3. Case study page (samo ako postoji napisana studija)
Case title + Title highlight (spaja Heading i Hero title) · Stat 2, Stat 3 (spaja Metric 2 i Hero stat 2/3) ·
Screen left / Screen right (opciono) · Background, Challenge, Solution, Result, Achievement (rich text) ·
Case image 1 / 2 (sada Second/Third Featuerd Image) · Quote, Quote author, Quote role, Quote signature ·
Meta title, Meta description.

### 4. Show on (prekidači + šta svaki traži)
- Show on Home & services (sada "Show in sec home section") — Trusted traka.
- Show in Our Work slider (OW hero slider) — traži Cover image, Logo color, Stat 1.
- Show in Our Work tabs (OW case tabs) — traži Before image, After image, Tab label / Tab headline / Tab text (sada Fade in / Big / Small text).
- Show in Home "Every project" — traži Every project background (Main bg image), Every project images (Other images…), Gallery page names.

### Briše se (14)
Bez ikakve upotrebe: Services Delivered, Images, Featured, First Featured, Gallery images.
Samo u JSON-LD: Intro (zamenjuje ga Meta description).
Duplikati posle spajanja: Logo, Logo without hover, Website domain (domen se čita iz Website link skriptom),
Heading ili Hero title (ostaje jedno), Metric Value 2, Metric Label 2, Hero stat 1 value, Hero stat 1 label.
Spajanje traži: prevezivanje elemenata na case strani / karticama, prenos podataka (6 stavki), male izmene skripti.

## Blogs (16 → 13)
- Featured: jedan prekidač umesto tri (Blog slajder + Resources: najnoviji istaknuti je veliki, sledeća 3 mala).
- Summary: jedno polje umesto Short description + Meta description (kartice, meni i SEO opis) — ODLUKA.
- Publish date (sada Custom date), Read time, Thumbnail (1600×900), TL;DR, Content, Author, Category, FAQ, Meta title, Name, Slug.
- Obavezna: Name, Category, Author, Publish date, Thumbnail, Summary, Content.
- FAQ ostaje (14 postova ga koristi; lista na šablonu se proverava u Designeru).

## Ostale kolekcije
- Teams → preimenovati u "Authors" (koristi se samo kao autor bloga; tim na About je statičan).
- Insights categories → "Blog categories"; polje "Order" (sada Blog main page order number).
- Faqs → "Blog FAQs".
- Jobs, Hero Cards → ostaju kakve jesu (sva polja se koriste, help tekstovi postoje).
- Services Nues → briše se cela kolekcija (samo Name; jedina veza je neiskorišćeno Services Delivered).
- Integrations + Integrations categories → predlog: briše se (1 stavka, šablon se ne objavljuje, stranica Webflow
  Integrations je statična) — ODLUKA.

## Odluke za tim
1. Odobrenje brisanja 14 polja u Our Works i spajanja duplikata.
2. Integrations kolekcije: brisanje ili čuvanje za kasnije.
3. Jedan "Order" za sve liste ili poseban redosled za Our Work mrežu (Figma redosled se razlikuje od Home).
4. Blog: jedno "Summary" umesto Short description + Meta description.
5. Jezik help tekstova (engleski kao sada ili srpski za marketing).

## STATUS 4.11. (posle odobrenja "uradi kako misliš")
Urađeno u Our Works (bez vizuelne promene, objavljeno na webflow.io):
- 48 polja preimenovano + help tekst sa veličinama slika; 14 polja za uklanjanje označeno "Old · …" ("do not fill").
- Grupe u editoru: 1 Basics · 2 Images (designer) · 3 Case study page · 4 Show on · 5 SEO · Old · do not fill.
- Cover image (1600x1000, vrh pune stranice) za Harper, Intaker, Hypersonix, Biotech (repo webflow-assets/ourwork-hq/*-cover.webp).
- Filter category: Intaker = AI; Hypersonix, Biotech, LaSalle = Industrial (Harper ostavljen timu: Insurance → koji tab?).
- Ballerine Case title = "A risk platform the marketing team now runs on its own" (do sada u Hero title).

Faza 2 — VEČERAS, traži otvoren Designer (uslovna vidljivost se ne vidi kroz API):
1. Case stranica (Our Works Template): h1 → Case title; brojke u jednoj grupi Stat 1–3 (Stat 1 = Metric 1, Stat 2 = Metric 2,
   Stat 3 = Hero stat 3); logo → Logo white; JSON-LD opis → Meta description. Ballerine će tada imati 16x / 30+ / 0.9s.
2. Kartice: sivi logo iz Logo white preko CSS-a (umesto Logo grey); domen iz Website link skriptom (slider traka + galerija).
3. Provera uslovne vidljivosti za stara polja (Featured, First Featured…), pa brisanje 14 "Old" polja i kolekcije Services Nues.
4. Objava na staging + snimci case stranice i svih sekcija.

Šta marketing treba da dopuni (nije izmišljano):
- Biotech, LaSalle: Card text, Stat 1, Logo color, Case title + tekst studije, SEO.
- Hypersonix: Stat 1 je "Soon / Rebuild in progress"; Logo color, studija, SEO.
- Harper: Filter category, Stat 1, studija, SEO.  Intaker: Stat 1, Logo color, studija, SEO.
- Placeholder: Card text "3x organic traffic" je isti kod Ballerine, Harper, Intaker, Hypersonix; Ballerine story
  "+214% / demo requests after relaunch" i case brojke 6 weeks / +214% liče na Figma placeholder.
- Pythagora je draft (nema slike).

## Faze rada
1. Bez vizuelne promene: preimenovanja, help tekstovi sa veličinama slika, grupe polja, obavezna polja,
   brisanje neiskorišćenih polja i kolekcija (posle provere u Designeru).
2. Spajanja: prevezivanje, prenos podataka, izmene skripti; provera na stagingu (desktop/tablet/telefon).
3. Kratko uputstvo (srpski) "kako dodati projekat / blog post" + specifikacija slika za dizajnera.

## 5.11.
- Home hero kartice: vode na case studiju kad projekat ima Case title, inače na sajt klijenta u novom tabu
  (podatak se čita iz Trusted kartica na Home; Home footer kod). Projekti van Trusted trake koriste Link polje kartice.
- Website link upisan: LaSalle (https://www.lasalleagri.com/), Biotech (https://www.biotechinnovationsag.com/),
  i u Link polju njihovih hero kartica.
- Our Works: polje "Slider video" (grupa 4 · Show on) je Link polje: upisuje se direktan link na MP4/WebM fajl
  (ne YouTube/Vimeo stranica). CMS File polje ne prima MP4, pa je File polje zamenjeno Link poljem (slug slider-video-2).
  Obrisano "Old · Gallery images" (isti fajlovi kao Every project screens) jer kolekcija ima limit od 60 polja.
  Our Work slider pušta video preko Cover image; slajd traje koliko video. Prazno polje = Cover image 6 s.
- Our Work slider: Sustain uključen, Veyor isključen. Sustain video dodat 5.11. (sustain-slider.mp4, 1,7 MB).
- Slider video linkovi u CMS-u (Shiftolic, Ballerine, TrakPro, Sustain) vode na fajlove u repou preko jsDelivr CDN-a
  (webflow-assets/ourwork-video/, commit 46bba2e). Nov video: fajl u repo (ili bilo koji direktan MP4 link), link u polje.
- Povezivanje: skriveni link .ow-hs_video-src u slajdu ima atribut data-video-src vezan za polje Slider video
  (link binding preko API-ja je padao na Webflow konfliktu). Our Work footer kod čita samo taj atribut; rezervni
  linkovi (FALLBACK) su obrisani iz koda.
