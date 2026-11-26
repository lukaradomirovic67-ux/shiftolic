# Pun audit, 26.11.2026 uveče (drugi put danas)

Tvoje „uradi opet jedan full audit“. Staging, 42 indeksne stranice (+ 404 u proverama u pregledaču).

## Šta je mereno
- **PageSpeed** (API v5, Lighthouse 13): 42 stranice × telefon i desktop × 3 kruga = 252 merenja. Krugovi su bar 4 minuta razmaknuti, a svako merenje ima svoj `fetchTime` (nijedno nije keširana kopija). Prosek: `average-3x-circles.md` (dogovoreni format), pojedinačna merenja: `runs.json`.
- **Šta PageSpeed označava na koliko stranica**: `failing-checks.txt` (`audits-agg.py`, prvi krug).
- **Statička provera HTML-a** (`static-audit.py` → `static-audit.json`): status, title i description (dužina, duplikati), broj H1, canonical, robots, Open Graph, JSON-LD (da li se čita), slike bez alt atributa, svaki link/slika/skripta (interni moraju da vrate 200).
- **Provera u pregledaču** (`crawl-qa.js` → `crawl-qa.json`): 43 stranice × telefon 390 i desktop 1440, skrol cele stranice: horizontalni skrol, pokvarene slike, JS greške, neuspeli zahtevi.

## Rezultat
- Telefon u proseku **89** (jutros 88,5 → sada 88,6), desktop **98**, LCP telefon 3,5 → 3,4 s, Accessibility 98,8, Best Practices 100, SEO 66 (samo zbog staging robots.txt: `Disallow: /`).
- Najveći skok od jutros: Resources 73 → 84, Webflow Development 84 → 94, Blog 80 → 89, About 93 → 99, Pricing 93 → 98, Let's talk 89 → 94.
- Pad na tri blog posta (Webflow forms 88 → 75, Signs your site 92 → 80, From guests to sponsors 88 → 80) i Careers (74 → 70): u tim merenjima PageSpeed server je kasnio sa prvim prikazom (izmereni FCP 1,2–2,3 s umesto ~0,25 s); ostala merenja istih stranica su kao jutros. Takvih merenja 14 od 126 (jutros 16).
- Pregledač: 0 JS grešaka, 0 pokvarenih slika, 0 horizontalnog skrola, 0 neuspelih zahteva ka sajtu (86 učitavanja). Prijavljeni su samo GA4 zahtevi prekinuti pri zatvaranju stranice i blokade proxy-ja u mom okruženju.
- HTML: svih 43 vraća 200; title 1 po stranici, bez duplikata, nijedan preko 60 znakova; description na svim osim 404; tačno jedan H1 na svakoj; JSON-LD se čita svuda; nijedna slika bez alt atributa; nijedan pokvaren interni link.

## Šta je poznato i nije novo (u MANUAL_TASKS ili tvoja odluka)
- Canonical nema nijedna stranica i nema sitemap-a: traži plaćeni plan i „Global canonical tag URL“ (MANUAL_TASKS 1–3).
- SEO 66 i „Page is blocked from indexing“: staging robots.txt.
- Kontrast sitnih sivih tekstova (13 stranica): tvoja odluka „to ne menjamo“.
- „Reduce unused JavaScript“ (~140 KB po stranici) i „Render-blocking requests“: GA4, webflow.js, jQuery, GSAP i Webflow CSS (tvoje odluke: GA4, „Per page CSS“, „Asynchronously load JS“).
- Skrivena stara sekcija na Resources (`section_blog42 resources-main-black-featured hide`) sa 3 placeholder slike i linkovima `#`: ne vidi se i slike se ne učitavaju; zatečeno, nije dirano.

## Šta još može da se popravi (predlozi, ništa nije menjano)
1. **Blog, avatari autora**: učitavaju se u 1600×1600 px (40–49 KB svaki), a prikazani su mali. Na desktopu PageSpeed procenjuje 448 KB viška na Blog stranici.
2. **About, fotografije tima**: 951×1228 px za male kartice, ~664 KB viška na desktopu.
3. **Our Work, kartice na telefonu**: i dalje učitavaju telefonske screenshotove cele stranice (640 × 3.000–5.000 px); ista sličica kao na Resources bi uštedela ~500 KB.
4. **Tri blog posta** (AEO vs SEO, B2B SaaS SEO, Webflow for ecommerce): tabele u tekstu nemaju zaglavlja (`td-has-header`), jedino preostalo Accessibility upozorenje osim kontrasta.
5. **Services**: page kod nije minifikovan (2 KB).
