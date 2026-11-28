# Pun audit posle „zelenih“ koraka (27.11.2026 uveče → 28.11.2026)

Isti postupak kao `reports/psi-2026-11-27/full-3x/`: 42 stranice × telefon i desktop × 3 kruga = 252 merenja, krugovi bar 4 minuta razmaknuti, svako merenje sa svojim `fetchTime` (84 od 84 fajla, nijedna keširana kopija). Tabela: `average-3x-circles.md`, pojedinačna merenja: `runs.json`, poređenje sa sporim merenjima i bez njih: `slow-host-check.txt`, provera u pregledaču: `crawl-qa.json`.

## Rezultat
- **Telefon 89 (pre koraka 86), LCP 3,1 s (pre 3,8 s). Bez sporih merenja: 92,4 (pre 90,0), LCP 2,7 s (pre 3,3 s).** Desktop 97.
- PageSpeed server je i ovaj put često kasnio: 49 od 126 merenja na telefonu (juče 39). Zbog toga su neke stranice u tabeli niže nego u merenjima posle svakog koraka (npr. Sustain 91, Veyor 92 sa sporim merenjima; bez njih 100 i 90–100).
- **Zelene na telefonu (prosek 3 kruga):** Design & Development 100, SEO & AEO 100, Growth 99, Webflow Development 97, Careers 100, Resources 99, Pricing 99, Services 97, About 94, Let's talk 92, Terms 91, Privacy 90, Shiftolic 98, TrakPro 94, Veyor 92, Sustain 91, 6 blog postova 90–94.
- Pregledač (43 stranice × telefon i desktop, 86 učitavanja): 0 JS grešaka, 0 pokvarenih slika, 0 horizontalnog skrola, 0 neuspelih zahteva ka sajtu (samo GA4 prekinut pri zatvaranju i blokade proxy-ja u mom okruženju, kao ranije).
- **Žute:** Our Work 62 (sva 3 merenja sa sporim serverom; ranije normalna merenja ~75), Ballerine 73 (normalno merenje 81), Blog 83, Home 87, 16 blog postova 77–89.

## Zašto su ove žute
Na svakoj od njih je glavni element na vrhu (LCP) slika: screenshot projekta (Our Work, Ballerine), kartica posta (Blog), pozadina (Home, blog postovi). PageSpeed za sliku na vrhu ubraja i fontove koji stignu pre nje: Aeonik u OTF formatu, 2–3 debljine po ~60 KB (+ Caveat 51 KB gde ima potpisa). Iz merenja: blog post sa ~120 KB fontova u tom trenutku 88, sa ~60 KB 92–95, bez fontova 97.

Tvoje odluke 27.11.: font ostaje (OTF), „Asynchronously load JS“ ne sada. Bez toga ove stranice ostaju oko 85–90 na telefonu.

## Šta bi još pomoglo (sve traži tvoju odluku)
1. Aeonik u WOFF2 (isti font, manji fajl): blog postovi, Blog, Home, Ballerine i Our Work.
2. „Asynchronously load JS“: Privacy, Terms i Let's talk (sada 90–92, prvi prikaz ~2,5 s jer Webflow skripte idu pre njega na kratkim stranicama).
3. GA4 kasnije učitavanje: u sporim merenjima GA4 skripta pravi najveća blokiranja (npr. AEO vs SEO, treći krug: 598 + 419 ms od ukupno 1.621 ms).
4. Izmene rasporeda na telefonu (dizajn): da naslov bude veći od slike na vrhu (npr. glavna slika posta ispod naslova na telefonu). Tada glavni element postaje tekst, kao na servisnim stranicama (99–100).
