# Nerešeno (napomene)

Stvari koje su namerno ostavljene kakve jesu, da se reše kasnije. Novije na vrhu.

## U TOKU (23.11.2026, prekinuto na tvoje „stopiraj ujutru nastavljamo“): lakše slike u blog tekstovima
- Nalaz: u 22 posta ima 48 slika u tekstu, ukupno 101,9 MB (26 slika preko 2 MB, sve 2880 px), a prikazuju se najviše 840 px. Nove verzije: WebP 1680 px (ili originalna širina ako je manja), kvalitet 90, ukupno 3,4 MB, golim okom iste (proveren najgori slučaj uvećan). Fajlovi: `webflow-assets/perf/blog-body/` (commit b1d70ee), spisak: `conversion.json`.
- Urađeno u CMS-u (Blogs, polje Content, samo adrese slika, tekst isti): 19 od 22 posta. Webflow je slike sam prebacio na svoj CDN (proveren bajt po bajt na prvom postu).
- **Nije objavljeno.** Izmene stoje u CMS-u kao neobjavljene, staging i dalje prikazuje stare slike.
- Ostala 3 posta:
  - `6aba6bc07d6279b4b5617999` webflow-vs-squarespace-in-2026-when-each-one-makes-sense
  - `6aba6bc07d6279b4b5617995` webflow-vs-wordpress-for-b2b-saas-in-2026-whats-changed-and-when-each-one-wins
  - `6aba6bc07d6279b4b5617997` best-15-webflow-apps-for-marketing-teams-in-2026
- Ujutru: ta 3 posta (sadržaj spreman u `backup/blog-body-images-2026-11-23/updates.json`), pa provera svih 22 skriptom (tekst isti, sve slike na Webflow CDN-u, vraćaju 200), pa objava i provera na stagingu.
- Rezerva pre izmene: `backup/blog-body-images-2026-11-23/blogs-before.json` (svih 23 posta, sveže pročitano u 23:05).

## Čeka tvoju odluku: Pricing, podnaslov u hero-u bez fade-a
- LCP na telefonu: sada 3,24–3,34 s (podnaslov se pojavljuje fade-om, Chrome ga računa pri kraju fade-a). Kad samo klizi (kao naslov na case stranicama): 1,87–2,06 s (5 od 5 merenja). Izmena bi bila jedna CSS linija u head kodu Pricing stranice.
- Ostalo na Pricing, Home i šablonu posta: axe bez novih grešaka (samo kontrast, ostaje po odluci od 14.11.); Home LCP 1,4 s; blog post 2,1–2,7 s.

## Posle konačnog copy-ja i lansiranja (23.11.2026)
Tvoja odluka: „to sve posle copy-ja i launcha može, ove tri tačke“.

1. **llms.txt:** predlog je u `notes/llms-txt-predlog-2026-11-18.txt`. Postavlja se posle konačnog copy-ja.
2. **FAQPage schema na 6 stranica** (Services, 4 servisne, Pricing): čeka da tim potvrdi 4 FAQ odgovora (vidi niže, „FAQ odgovori su i dalje nacrt“).
3. **Datum „Last updated“ na Privacy i Terms:** na stranicama piše Oct 19, 2026, a Privacy je posle toga menjan (Cookies sekcija, Cal.com 22.11.). Novi datum ide u tekst i u schema (`dateModified`) pri lansiranju.

## Case hero: snimci ostaju sa fade-in animacijom (23.11.2026)
Tvoja odluka: „Ostavi fade“. Na Ballerine-u i Shiftolic-u LCP je srednji snimak, koji Chrome računa tek na kraju fade-a: ~3,0 s na telefonu. Bez fade-a bi bilo 1,8–2,0 s. Naslov u hero-u je od 23.11. bez fade-a (samo klizanje), po tvom izboru.

## GA4 ostaje u Webflow integraciji, učitava se sa stranicom (23.11.2026)
Tvoja odluka: „Ostavi kako jeste“ (pitanje: GA4 tek posle prve interakcije posetioca).

- GA4 pravi 50–60% blokiranja na telefonu (Design & Development 640 → 250 ms bez GA4, Services 670 → 330 ms), pa ograničava PageSpeed skor na svim stranicama.
- Ostaje jer broji sve posete, i one bez ijedne interakcije. Google rangira po merenjima pravih posetilaca (LCP, INP, CLS), ne po lab skoru.

## FAQ odgovori su i dalje nacrt (20.11.2026)
Tvoja odluka: „neka ostane tako pa ćemo to menjati“.

- Na sajtu je 30 odgovora koje je Claude napisao 17.11. (Services, 4 servisne stranice, Pricing). Svi odgovori: `notes/faq-odgovori-claude-2026-11-17.md`.
- Tim treba da potvrdi ili ispravi:
  1. **„Can you work with our developers?“**: odgovor „Yes“ je pretpostavka; na sajtu nigde ne piše da radite sa developerima klijenta.
  2. **Podrška posle lansiranja**: Services kaže „30 days of support“, servisne stranice i Pricing „a week on call“. Odgovori prate svoju stranicu, pa se razlikuju.
  3. **Trajanje**: Services kaže Design & Development 6–8 nedelja i Webflow Development 4–6, a Pricing kartice 3–5 i 6–8. Odgovor na Pricing zato ne navodi brojeve.
  4. **Webflow Development stranica** prikazuje iste korake kao Design & Development (sa „Brand and copy“); odgovori tamo prate opis usluge, ne te korake.
- Kad se potvrde: FAQPage schema na tih 6 stranica (ja).

## Preskočeno 20.11.2026 (tvoja odluka)
- ~~**Dupli GA4**~~: rešeno 22.11. (tvoje „Da, ukloni“). GA4 se učitava jednom, preko Webflow integracije; kod u Head je uklonjen.
- **Cookie banner i Consent Mode**: GA4 i Google fontovi se učitavaju pre pristanka (firma u EU). Nema bannera.
- **Pricing, tabela „How we compare“**: u koloni Nues, red „What you pay“, piše „A team shared across clients“ (tekst iz kolone za agenciju). Ostaje, uz kalkulator preporuke i „Change orders $0“ („nemoj to dirati“).
- **Geist sa našeg servera**: ne radi se (odluka od 13.11., potvrđeno 20.11.).
