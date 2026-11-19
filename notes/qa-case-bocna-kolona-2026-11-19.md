# QA: bočna kolona na case stranicama (19.11.2026)

Stranice sa bočnom kolonom i galerijom: Ballerine, Shiftolic, Sustain Commercial Solar, TrakPro, Veyor Digital. Ostalih 5 projekata (Biotech, Harper, Hypersonix, Intaker, LaSalle) namerno vodi na sajt klijenta.

## Šta je provereno

| Provera | Kako | Rezultat |
|---|---|---|
| Preklapanje kolone i galerije | skrol nadole i nagore, 600 i 2500 px/s, širine 992, 1000, 1280, 1440 i 1920, svaka sličica | pre ispravke: preklapanje u 70 od 100 slučajeva (brz skrol u oba smera, spor nagore); posle: 0 od 100 (i 40 od 40 na objavljenom sajtu) |
| Kolona posle skrola | da li je cela na ekranu kad nije sklonjena | ok u svim slučajevima |
| Tablet i telefon (991, 768, 390) | skrol kroz celu stranicu | kolona se ne pomera, ok |
| Smanjen pokret (reduced motion) | isti test preklapanja, 1000 i 1440 | 0 preklapanja |
| Promena veličine prozora | 1440 → 900 → 1440 | kolona se vraća na mesto, bez preklapanja |
| On this page, klik | 8 klikova po stranici, 1000 i 1440 | pre: naslov na −24 do 0 px (iza menija, delimično odsečen); posle: tačno 120 px, adresa (#) se menja, aktivan je pravi link |
| Otvaranje stranice na naslovu (#) | 4 naslova × 5 stranica | pre: 96–107 px; posle: 120 px (jedan 119) |
| JS greške | sve stranice | nema (osim „WebFont is not defined“, koji nastaje samo zato što test blokira Google fontove) |

## Pronađeno i ispravljeno

1. **Preklapanje pri brzom skrolu.** Kolona za 0,55 s klizi udesno. Ako je galerija stigla brže, prešla je preko kolone. Sada galerija gura kolonu ispred sebe dok ova klizi: nagore pri skrolu nadole, nadole pri skrolu nagore. Razmak ostaje oko 95–120 px.
2. **Klik u On this page.** Uz naše skrolovanje radilo je i Webflow-ovo ugrađeno skrolovanje za #linkove, pa je naslov završavao na ivici ekrana. Sada radi samo naše.
3. **Naslov 24 px pomeren.** Naslovi se pojavljuju animacijom i dolaze 24 px odozdo, a skript je računao cilj pre animacije. Sada računa konačan položaj.

Kopije koda pre svake izmene: `backup/page-code/2026-11-19-case-rail/`.
