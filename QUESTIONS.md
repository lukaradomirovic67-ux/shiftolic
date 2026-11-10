# QUESTIONS (podaci koje samo vi imate)

Ažurirano: 10.11.2026 (faza 0). Ništa od ovoga ne izmišljam u copy-ju ni u schema markupu.

## Za nastavak merenja
1. ~~**Lighthouse**~~ rešeno 10.11.: instaliran uz npm `overrides` (`@puppeteer/browsers` 3.2.6). Baseline je u BASELINE.md, odeljak 3a.
2. **Mreža za merenje**: zahtev da se dozvole GTM, Webflow font CDN (fastly), cdnjs, iClosed, Cloudflare Turnstile i
   googleapis je odbijen. Ako ostaje tako, merim bez tih skripti i to beležim. Stvarni rezultati će biti lošiji.

## Kontekst projekta (polja u zadatku su bila prazna)
3. Primarno tržište i jezik. Pretpostavka: US i EU, engleski.
4. Glavna konverzija. Pretpostavka: zakazan uvodni poziv (iClosed na /lets-talk).
5. Ciljne ključne reči (seed lista) i 2–5 glavnih konkurenata. Potrebno za fazu 2 (KEYWORD_MAP).
6. Skripte trećih strana koje planirate na produkciji (GTM, HubSpot, chat, heatmap…). Sada je samo GA4 (G-NNTMD9FV5D).

## Domen i lansiranje (ne sada, domen ne povezujemo)
7. Kanonski domen: `https://www.nues.agency` ili `https://nues.agency`?
8. Spisak adresa starog sajta na nues.agency, za mapu 301 preusmeravanja. Iz ovog okruženja ne mogu da ga pročitam.

## Podaci za strukturirane podatke (faza 3)
9. Zvaničan naziv firme, godina osnivanja, adresa (Beograd: ulica, poštanski broj) i telefon, ako ih želite javno.
   Bez adrese ne pravim LocalBusiness.
10. Potvrda profila za `sameAs`: LinkedIn (company/nues-agency), Instagram (nues.agency), Clutch (profile/nues),
    Webflow (@nues). Ima li X/Twitter, YouTube, Dribbble?
11. Clutch: tačna ocena i broj recenzija (sajt navodi „5.0 on Clutch“). Na Let's talk već postoji Review/Rating schema.
    Da li su to doslovni citati sa Clutch-a? Google ignoriše ocene koje firma daje sama sebi, pa predlažem da se to ukloni.

## Odluke o sadržaju (iz QA od 8.11.)
12. Resources ima `noindex`. Skinuti ga sada ili tek kad nova verzija (Figma 7670:106) bude gotova?
13. 5 praznih case stranica (Intaker, Harper, Biotech, LaSalle, Hypersonix): popuniti ih, ili ih sakriti
    (noindex + kartice bez linka)?
14. Blog post „B2B SaaS SEO in 2026“ je u draftu, a stara verzija je živa i 6 postova linkuje na nju. Objaviti ga ili ukloniti?
