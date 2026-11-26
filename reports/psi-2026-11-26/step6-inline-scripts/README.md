# PageSpeed tačka 3 (dve male skripte direktno u site footer), 26.11.2026

- `urls.txt`: 6 stranica (Home, Our Work, Resources, Design & Development, Blog, Careers).
- `average-3x-circles.md`: prosek 3 merenja u dogovorenom formatu (`notes/psi-report-format.md`). Ostali `average-3x.*`: isti podaci u CSV/JSON.
- `runs.json`: svako merenje posebno (skor, LCP, TBT, prvi prikaz koji je PageSpeed server stvarno izmerio `observed_fcp_ms`, broj zahteva i zahtevi ka bivšim registrovanim skriptama).
- `inline-ab.js`: lokalno, stari footer + dve registrovane skripte protiv novog footera bez njih, na istoj stranici; poredi šta skripte urade (navbar atributi, galerija, domeni, potpis citata), tastaturu na navbaru, JS greške i zahteve.
- `race.js`: koliko često link u navbaru ostane bez `aria-controls` (stara trka u nuesA11yFixes, postoji i pre i posle).
- `verify-pub.py`: objavljeni footer znak po znak isti kao `site-footer.min.html`, bez `<script src>` ka dve skripte.

Krugovi merenja su bili 4 minuta razmaknuti; sva 3 merenja su posebna (različit `fetchTime`).
Zahtevi ka `nuescmsderived-1.0.0.js` i `nuesa11yfixes-1.0.1.js`: 96 u 48 merenja tačke 2, 0 u 36 merenja ovde. PageSpeed „Use efficient cache lifetimes“ ih više ne navodi.
