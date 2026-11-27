# Korak 4, druga verzija: samo klizanje samo kad hero ima tri screenshota (27.11.2026)

- Telefon, 3 kruga: Ballerine 82 / 72 / 82 (dva merenja sa sporim PageSpeed serverom), Shiftolic 99 / 100 / 100 (vraćen), Sustain 99 / 96 / 100, TrakPro 98 / 100 / 100, Veyor 100 / 100 / 100.
- Ballerine, merenja bez sporog servera: sa fade-om (pre izmene) 78, 78; samo klizanje 93, 92, 83, 82. Klizanje ostaje (tvoja odluka), bolje je za ~9 poena.
- Zašto Ballerine i sa fade-om ne može kao Shiftolic: posle fade-a (~1,85 s, kad reveal skripta skine klasu reveal-run) i pri svakoj smeni screenshotova (~5 s) Chrome ponovo iscrtava sliku i tada je beleži kao glavni element. Probano i `will-change:opacity` na screenshotovima (lokalno): ne pomaže.
- Ostatak do 90: slika na vrhu + fontovi (Aeonik 2 × 60 KB i Caveat 51 KB) u kritičnom trenutku.
