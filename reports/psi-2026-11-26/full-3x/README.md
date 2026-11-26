# PageSpeed, 42 stranice × 3 merenja (26.11.2026, posle koraka 1–3)

PageSpeed Insights API (Lighthouse 13), telefon i desktop, svaka stranica izmerena 3 puta (252 merenja, 0 grešaka).
U tabeli je prosek tri merenja; u zagradi najniži i najviši skor na telefonu.

- `average-3x.md`: tabela iz izveštaja
- `average-3x.csv` / `average-3x.json`: svi proseci (skor, LCP, FCP, TBT, CLS, Speed Index, telefon i desktop; Accessibility, Best practices, SEO)
- `avg-3x.py`: skripta koja računa proseke iz sirovih rezultata

Prosek svih stranica: telefon 89 (LCP 3,5 s), desktop 98 (LCP 0,8 s). Jutros (jedno merenje): telefon 86, desktop 97.
Accessibility 98,8, Best practices 99,9, SEO 66 (staging je namerno zaključan za pretraživače, robots; na pravom domenu ide na 100).
