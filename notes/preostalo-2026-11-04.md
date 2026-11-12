# Nues sajt: šta je ostalo do kraja (stanje 4.11.2026)

Staging: https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io/
Stavke označene sa (27.10.) su iz revizije od 27.10. i treba ih ponovo proveriti.

## 1. Čeka tim: sadržaj i odluke
- [x] Our Work: slike cele stranice za Veyor, TrakPro, Sustain i LaSalle (JPG iz Drive foldera, urađeno 5.11.;
      Hypersonix i Biotech 4.11.). LaSalle dobio i Cover image.
- [ ] Our Work: redosled kartica kao u Figmi (Intaker, Ballerine, Shiftolic, Veyor, Harper, Sustain, LaSalle,
      Biotech, Hypersonix, TrakPro). Treba novo CMS polje "Our Work order" (Number) — čeka odobrenje.
      Postojeće number-in-section deli Home.
- [ ] Our Work before/after tabovi (Figma: Ballerine, Harper, Intaker; sada Ballerine, Shiftolic):
      Intaker rečenica + stat; Harper before screenshot + tekst + stat.
- [ ] Our Work hero slider, prvi slajd Intaker: glavna slika, logo u boji, metrika.
- [ ] Placeholder tekstovi (27.10.):
  - FAQ odgovori na 4 servisne stranice "[Add the answer to: ...]"
  - Pricing FAQ: 5 od 6 "[Answer to be provided]"
  - Pricing cene SEO & AEO i Growth "[$X,XXX]/month"
  - Recenzije: Shiftolic/Harper/Veyor koriste citat Ballerine-a; na servisnim stranicama 4 od 5 slajdova isti citat
  - Let's talk: 2. slajd testimonijala pripisan Or Moshkovitz
  - (rešeno, provereno 12.11.) Home Services panel: "+214% / Timeline" (Figma "6 to 8 weeks / Kickoff to launch")
  - Hypersonix metrika "Soon / Rebuild in progress"
- [ ] Koraci na nuesLaunch / nuesBuild / nues+ / nuesSEO odstupaju od Figme — odluka koji tekst važi (27.10.).
- [x] Linkovi (27.10.): Service Cases strelice vode na /our-work umesto na case stranice; hiring kartica
      "Book a Call" -> /lets-talk (možda /careers); Home Crew srednja kartica "See all services" bez linka.
      (provereno 12.11.: Service Cases vode na /our-work/<slug>, „See all services“ na /services, „Book a call“ svuda na /lets-talk)

## 2. Tehnički (radim ja)
- [ ] Resources stranica po Figmi 7670:106; linkovi "Integrations" i breadcrumb "Resources" i dalje vode na staru verziju.
- [ ] Webflow Integrations stranica po Figmi 7319:484.
- [x] Blog: avatari autora. (provereno 12.11.: na /blog su prave fotografije autora)
- [ ] Zamena slika boljim verzijama iz Drive foldera 1-UqCWAmyFEtaCDTP4ESeKaOFu_ohH4mq.
- [ ] Ubacivanje kad je Webflow Designer otvoren (MCP app); fajlovi su spremni u webflow-assets/site-hq/ (spisak u scratchpad drive2/PENDING.md):
      About fotografija; navbar ilustracija; Shiftolic ekran u Service Cases; beli logoi Intaker i Ballerine
      (trusted video + Video Testimonials); logoi i ikone integracija na Resources; Todoist logo na Integrations stranici.
- [ ] Finalni QA svih stranica prema Figmi (27 nodova), desktop/tablet/telefon.
- [ ] Screenshotovi svih stranica i sekcija koje koriste CMS (traženo 4.11.).

## 3. Pred lansiranje
- [ ] Plaćeni Webflow site plan: custom domen, bez "Made in Webflow" bedža, limiti formi, CV upload u Careers formi.
- [ ] Povezati nues.agency i objaviti na produkciju (do tada objavljujem samo na webflow.io).
- [ ] 301 preusmeravanja ručno u Site settings: /services/main -> /services, plus stari URL-ovi.
- [ ] Email obaveštenja za forme (Careers application, kontakt).
- [ ] SEO: meta title/description za stranice i CMS stavke (mnoga polja prazna), OG slike, alt tekstovi.
- [ ] Probna prijava kroz Careers formu sa CV-om kad plan bude aktivan.
- [ ] Čišćenje Style Managera (radi tim).

## Urađeno 4.11.
- Careers apply popup (Figma 8042:31 / 7984:103 / 8050:210): native Webflow forma, otvaranje iz pisma, CV upload, slanje, ekran "Thank you".
- Glatkija animacija otvaranja i zatvaranja popup-a.
- Careers: razmak filteri–koverte po Figmi (careers-jobs_list margin-top 3.45% / telefon 7.15%); 3D piramida po veličini iz Figme.
- Our Work: cele stranice za Hypersonix i Biotech (skrol na hover).
