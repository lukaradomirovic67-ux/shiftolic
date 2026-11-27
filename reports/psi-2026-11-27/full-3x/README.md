# Pun audit, 27.11.2026 uveče

Tvoje „posle opet opali audit“, posle nove Ballerine slike, alt tekstova u Flow Conf postu i naslova za 5 projekata bez studije. Staging, 42 indeksne stranice (+ 404 u proverama HTML-a i u pregledaču). Isti postupak kao juče (`reports/psi-2026-11-26/full-3x-v2/`).

## Šta je mereno
- **PageSpeed** (API v5, Lighthouse 13): 42 stranice × telefon i desktop × 3 kruga = 252 merenja. Krugovi su bar 4 minuta razmaknuti, a svako merenje ima svoj `fetchTime` (proveravano: 84 od 84 fajla ima 3 različita vremena, nijedna keširana kopija). Prosek: `average-3x-circles.md` (dogovoreni format), pojedinačna merenja: `runs.json`.
- **Spora merenja** (`slow-host-check.txt`): poređenje sa jučerašnjim, sa svim merenjima i bez onih u kojima je PageSpeed server kasnio.
- **Šta PageSpeed označava na koliko stranica**: `failing-checks.txt` (prvi krug).
- **Statička provera HTML-a** (`static-audit.py` → `static-audit.json`): kao juče, plus nova provera slika sa praznim alt-om (`alt=""`) koje nisu sakrivene od čitača ekrana. Juče ju je preskočila, pa su dve takve slike u Flow Conf postu prošle neprimećeno.
- **Provera u pregledaču** (`crawl-qa.js` → `crawl-qa.json`): 43 stranice × telefon 390 i desktop 1440, skrol cele stranice.

## Rezultat
- **Telefon 86 (juče 89), LCP 3,8 s (juče 3,4 s). Desktop 98 (juče 98).** Accessibility 98,8, Best Practices 100, SEO 66 (samo zbog staging robots.txt).
- **Pad na telefonu ne dolazi od sajta.** Danas je PageSpeed server kasnio sa prvim prikazom u **39 od 126** merenja na telefonu (juče 14). U takvom merenju izmereni prvi prikaz traje 1,2 do 2,3 s umesto ~0,25 s, a PageSpeed iz toga računa LCP od oko 6,2 s i za istu stranicu daje 60 do 75. Bez tih merenja: **telefon 90,0 (juče 90,1), LCP 3,28 s (juče 3,25 s)**, odnosno isto kao juče.
- Potvrda da se stranice nisu promenile: Home i Design & Development danas učitavaju iste fajlove kao juče (isti broj zahteva i ista veličina; promenio se samo naziv Webflow skripte posle objave), a jedini fajl koji blokira prikaz je isti Webflow CSS.
- Najviše pogođene stranice su one gde su sva ili skoro sva merenja bila spora: Design & Development (3 od 3 spora, 69), Webflow Development (2 od 3, 79), Home (2 od 3, 81), Our Work (2 od 3, 70). Kada merenje nije bilo sporo, iste stranice daju kao juče ili bolje (Home 97, Webflow Development 88, SEO & AEO 89 i 93).
- About: 91 (juče 99). Jedno merenje je bilo sporo, a u druga dva su se jednom produžilo blokiranje glavne niti (490 ms) i jednom LCP (3,3 s). Fajlovi stranice su isti kao juče, pa je to oscilacija merenja, ne izmena.
- Case stranice su bolje nego juče: 94 → 96 (Ballerine 78 → 85).
- **Pregledač (86 učitavanja): 0 JS grešaka, 0 pokvarenih slika, 0 horizontalnog skrola, 0 neuspelih zahteva ka sajtu.** Prijavljeni su samo GA4 zahtevi prekinuti pri zatvaranju stranice i blokade proxy-ja u mom okruženju, kao juče.
- **HTML:** svih 43 vraća 200. Title je na svakoj stranici, bez duplikata i nijedan nije duži od 60 znakova. Description postoji svuda osim na 404. Svaka stranica ima tačno jedan H1, a JSON-LD se svuda ispravno čita. **Nijedna slika nema prazan alt**, a nijedna ni nedostajući alt atribut. Nijedan interni link nije pokvaren.
  - Tri „pokvarena interna linka“ u izveštaju alata (`'+c.src+'`, `'+c.thumb+'`, `'+(r.currentSrc||…`) nisu linkovi, nego tekst unutar skripte za galeriju u head kodu sajta. Alat ih je pogrešno pročitao i juče.
  - Jedan „pokvaren spoljni“ (Webflow placeholder SVG, 403) je u skrivenoj staroj sekciji na Resources. Poznato je, ne vidi se i ne učitava se.
- **5 projekata bez studije** (nisu među 42 jer su noindex): sada imaju title, description i og:title, i i dalje šalju na sajt klijenta (provereno 27.11, vidi CHANGELOG).

## Šta je poznato i nije novo (u MANUAL_TASKS ili tvoja odluka)
- Canonical nema nijedna stranica i nema sitemap-a: traži plaćeni plan i „Global canonical tag URL“ (MANUAL_TASKS 1–3).
- SEO 66 i „Page is blocked from indexing“: staging robots.txt.
- Kontrast sitnih sivih tekstova (13 stranica): tvoja odluka „to ne menjamo“.
- „Reduce unused JavaScript“ i „Render-blocking requests“: GA4, webflow.js, jQuery, GSAP i Webflow CSS (tvoje odluke).

## Predlozi koji i dalje stoje (ništa nije menjano)
1. **Blog, avatari autora**: učitavaju se u 1600×1600 px, a prikazani su mali (desktop ~448 KB viška).
2. **About, fotografije tima**: prevelike za male kartice.
3. **Our Work, kartice na telefonu**: učitavaju cele telefonske screenshotove; sličica kao na Resources bi uštedela ~500 KB.
4. **Tri blog posta** (AEO vs SEO, B2B SaaS SEO, Webflow for ecommerce): tabele bez zaglavlja (`td-has-header`).
5. **Services**: page kod nije minifikovan (2 KB).
