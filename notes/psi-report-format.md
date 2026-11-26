# PageSpeed izveštaj: dogovoreni format (26.11.2026)

Tvoje „ovako će od sad izgledati svaka tabela, samo ćeš update-ovati podatke“.

- Svaka stranica se meri 3 puta (telefon i desktop), u tabeli je prosek.
- Krugovi: 🟢 90–100, 🟡 50–89, 🔴 0–49.
- Kolone: Stranica | 📱 Perf | A11y | BP | SEO | LCP | TBT | 🖥️ Perf | A11y | BP | SEO.
- Redosled: PROSEK svih, prosek blog postova, prosek case stranica, glavne stranice; zatim tabela case stranica; zatim blog postovi od najboljeg ka najslabijem.
- Generiše se skriptom `reports/psi-2026-11-26/full-3x/avg-3x.py` (izlaz `average-3x-circles.md`), uzorak: `reports/psi-2026-11-26/full-3x/average-3x-circles.md`.
- Sva 3 merenja moraju biti posebna: PageSpeed vraća keširanu kopiju kad se ista adresa traži ponovo u roku od oko minut. Krugovi su bar 4 minuta razmaknuti, a pre proseka se proverava da je `fetchTime` različit u sva 3 merenja (26.11.2026, tačka 2: 7 od 16 merenja su bila kopije).
