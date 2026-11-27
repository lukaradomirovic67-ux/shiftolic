# Poređenje sa spoljnim auditom (audit-scores_1.csv), 27.11.2026

- Njihov fajl: 27 adresa, jedno merenje po stranici. Moj: 42 stranice, prosek 3 posebna merenja (`../full-3x-v2/`).
- Zajedničke 22 stranice: telefon njihov prosek 86,2, moj 88,2; desktop 97,5 / 97,7. Accessibility, Best Practices i SEO isti na svih 22.
- Njihov telefonski skor je u rasponu mojih 3 merenja (±2) na 17 od 22 stranice. Van raspona (niže kod njih): Resources 75 (moj 84), SEO & AEO 74 (85–95), Design & Development 81 (86–95), Webflow Development 84 (89–97), Privacy 88 (91–93). Jedno merenje bez ponavljanja; PageSpeed server povremeno kasni sa prvim prikazom.
- 5 adresa koje ja ne merim (Biotech, Harper, Hypersonix, Intaker, LaSalle): od 12.11. noindex i preusmerenje na sajt klijenta (Our Works Template head). PageSpeed završi na sajtu klijenta (npr. /our-work/harper → harperinsure.com), pa su njihovi skorovi za te adrese skorovi tuđih sajtova. Njihov prosek 81 je zbog njih (bez njih 86).
- Agentic Browsing (PageSpeed kategorija `AGENTIC_BROWSING`): 100 na svih 42 naših stranica, telefon i desktop (`agentic-browsing-42-pages.json`). Kod njih 33–67 samo na 5 preusmerenih adresa (sajtovi klijenata).
- Tačno kod njih, kod mene nije bilo prijavljeno: „From guests to sponsors“ ima 2 slike u tekstu sa praznim alt (`…flow-sti-960.webp`, `…frame-47545-1680.webp`); moja provera je brojala samo slike bez alt atributa. Na 5 preusmerenih adresa naša stranica ima prazan `<title>` i meta opis (polja Meta title / Meta description prazna za projekte bez case-a).
