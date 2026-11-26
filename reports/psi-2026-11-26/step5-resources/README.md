# PageSpeed tačka 2 (Resources, rad glavne niti), 26.11.2026

- `urls.txt`: 8 stranica na kojima radi skripta za slike ispod prvog ekrana (Resources, Home, Our Work, Services, 4 servisne).
- `average-3x-circles.md`: prosek 3 merenja u dogovorenom formatu (`notes/psi-report-format.md`). Ostali `average-3x.*`: isti podaci u CSV/JSON.
- `runs.json`: svako merenje posebno (skor, LCP, TBT i prvi prikaz koji je PageSpeed server stvarno izmerio, `observed_fcp_ms`).
- `ab-head.js`: lokalni A/B (Playwright, telefon, CPU 4×, bez keša), stari site head protiv novog na istoj stranici, naizmenično.

PageSpeed vraća keširanu kopiju kad se ista adresa traži ponovo u roku od oko minut. Prvi put su 7 od 16 merenja bila kopije; obrisane su i izmerene ponovo, pa su sva 3 merenja posebna (različit `fetchTime`).

Kad PageSpeed server kasni sa prvim prikazom (`observed_fcp_ms` preko ~900 ms umesto ~250 ms), simulirani LCP skoči na ~6,5 s, jer simulacija tada uračuna sve zahteve pre tog trenutka. To se dešavalo i pre izmene: 13% merenja telefona u punom merenju (42 stranice × 3), 28% u merenju tačke 1, 21% ovde.
