# Our Work slider: izravnati videi (19.11.2026)

Isti videi kao na sajtu (Sustain, Shiftolic, Ballerine), samo bez zamrznutih sličica usred kretanja. Svaka sličica koja je bila ista kao prethodna, a sve oko nje se kretalo, zamenjena je sličicom izračunatom između susedne dve (ffmpeg minterpolate). Ostale sličice su iste, samo ponovo kodirane (x264 CRF 24, 60 fps, 2140x1280, faststart).

| Video | Zamenjenih sličica | Gde | Veličina (staro → novo) |
|---|---|---|---|
| sustain | 7 | 1,2–2,0 s | 1,70 → 1,99 MB |
| shiftolic | 15 | 7,8–9,0 s, 11,3 s, 12,0 s | 1,40 → 1,56 MB |
| ballerine | 15 | 0,4–1,6 s, 7,7 s, 9,8–12,5 s | 1,23 → 1,42 MB |

TrakPro nema zamrznutih sličica i nije menjan. Originali su na sajtu: `cdn.prod.website-files.com/6aba6bc07d6279b4b561771f/6af646c4deb177f9145906ae_sustain-slider.mp4`, `6af646caa0271d7cf124d95c_shiftolic-slider.mp4`, `6af646d045263033b2f2e934_ballerine-slider.mp4`.
