# Šta je ostalo (17.11.2026, veče, posle novog QA-a)

Staging: https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io/
Ovo je jedini aktuelni spisak. Starije liste (`qa-2026-11-17.md`, `preostalo-2026-11-13.md`, `pre-launch-2026-11-11.md`) su istorija.

**18.11.: novi QA i detaljan audit u `notes/audit-2026-11-18.md`.** QA je čist. Novo iz audita:
- dupli GA4;
- praćenje bez pristanka;
- stari llms.txt (predlog novog: `notes/llms-txt-predlog-2026-11-18.txt`);
- spor LCP na telefonu (H1 sakriven do skripti, lazy slike u prvom ekranu);
- og:title i og:description fale na /services i /services/seo-aeo;
- 5 case adresa bez studije u budućem sitemap-u;
- sitnice u schema.

Stavka 8 (razmak na kraju meta opisa) je rešena.

## 1. Kako je provereno
- Svih 47 javnih adresa, desktop (1440) i telefon (390), ukupno 94 učitavanja:
  - 15 stranica, 404, 21 blog post, 10 case stranica.
- Automatski:
  - status i JS greške;
  - slike i alt tekst;
  - širina na telefonu;
  - placeholder tekst i poznate greške u kucanju;
  - title, description, H1, robots, og:image;
  - schema;
  - pristupačnost (axe, bez kontrasta);
  - svi interni linkovi.
- Interakcije:
  - meni na telefonu (6 stranica);
  - padajuće liste Services i Resources;
  - FAQ (otvaranje i tekst odgovora);
  - filteri na Blog i Our Work.
- Direktno u CMS-u: svih 22 blog posta (meta, slike, linkovi u tekstu), Our Works stavke.

**Čisto:**
- 0 JS grešaka sajta (jedine su od Google fontova i GA4, koji su blokirani u mom okruženju);
- 0 slomljenih slika i 0 slika bez alt atributa;
- nijedna stranica nije šira od ekrana na telefonu;
- svih 41 interni link vraća 200;
- nema dupliranih title, description ni H1;
- svaka stranica ima tačno jedan H1;
- schema je ispravna na svim stranicama;
- nijedna stranica nema noindex;
- meni, padajuće liste, FAQ i filteri rade.
- Filteri prikazuju: Harper pod SaaS, Hypersonix pod Industrial; Commerce je sakriven, jer nema projekata.
- Danas promenjeno i provereno:
  - Privacy i Terms se indeksiraju;
  - H1 na 4 servisne stranice;
  - Cookies tekst;
  - schema sa Nues Digital OÜ;
  - CMS izmene;
  - Careers: animacija otvaranja i zatvaranja koverte (preklop se sad vidi dok se podiže i spušta).

## 2. Novo nađeno večeras
| # | Šta | Gde | Ko |
|---|---|---|---|
| 1 | ~~Footer kaže **„5.0 on Clutch“**, a Clutch pokazuje **4.8** (5 recenzija) | footer, svih 47 stranica | **odluka: ostaje kako jeste** ~~ |
| 2 | Alt tekst slika je doslovno **„__wf_reserved_inherit“** (4 slike); verovatno posledica izmena teksta preko API-ja (14. i 17.11.) | blog: AEO vs SEO in 2026, SaaS content marketing in 2026 | **urađeno 17.11. veče** |
| 3 | **25 slika u 12 blog postova** učitava se sa CDN-a drugog Webflow sajta (`6a0bc2572a345c5cad437d47`), ne ovog. Ako se taj sajt obriše ili prestane da se plaća, slike nestaju | 11 objavljenih postova + Flow Conf (draft) | **urađeno 17.11. veče** (25 slika, provereno) |
| 4 | Ostale slike u blog tekstovima imaju prazan alt (oko 40) | 21 post | ja pišem opise, tim odobri (može i posle lansiranja) |
| 5 | TrakPro case: „SEO went from to a perfect 100“ (fali broj), „developred“, „Couldflare“ | /our-work/trak-pro | **ispravljeno, ali TrakPro je draft (izmena tima), uživo kad se objavi** |
| 6 | Pristupačnost: „Services“ i „Resources“ u meniju su dugme sa linkom unutra (axe „nested-interactive“); isto kartice u „Every project“ galeriji na Home | desktop meni, 47 stranica; Home | **urađeno 17.11. veče** (skripta `nuesA11yFixes`) |
| 7 | Slika za deljenje (og:image) je **AVIF** na 7 stranica; LinkedIn je verovatno ne prikazuje | 5 case stranica, 2 bloga (Sanity vs Webflow, Source by Webflow) | čeka odluku: predlog novo CMS polje „Share image“ sa JPG slikama |
| 8 | Meta description sa razmakom na kraju | 11 blog postova | ja, sitno |
| 9 | Isti id `wf-template-…` dva puta na Home (Webflow-ov element) | Home | sitno, može da ostane |
| 10 | Case timovi: po 2 osobe; Growth (Shiftolic, Veyor) i SEO & AEO (TrakPro) bez osobe; Daris i Pavle nisu ni na jednoj case stranici | 5 case stranica | odluka Aleksandar |

**Draft stavke (17.11. veče):** Shiftolic, Veyor i TrakPro su u Webflow-u sačuvani kao draft (izmene timova). Uživo je i dalje stara verzija, dok ih neko ne objavi.

## 3. Sadržaj koji čeka tim
- **FAQ:** 30 odgovora su moj nacrt i čekaju potvrdu. Uz to su 4 pitanja za tim, u `notes/faq-odgovori-claude-2026-11-17.md`.
- **Cene:** odluka je u dokumentu „Cene na sajtu: prikazati ili sakriti?“. Na sajtu je i dalje:
  - „[$X,XXX]/month“ 2 puta na Pricing (SEO & AEO, Growth);
  - Webflow Development: $5,000 na Services, $20,000 na Pricing;
  - „30 days of support“ na Services, „a week on call“ na Pricing i Webflow Development;
  - Pricing, „How we compare“: kolona Nues u redu „What you pay“ kaže „A team shared across clients“ (greška).
- **Podnaslov ispod H1** je isti na 4 servisne stranice. Figma Copy page ima poseban za svaku (predlog poslat u četu); ubacujem na „uradi“.
- **Stat 1 broj** za Intaker, Harper, LaSalle, Biotech, Hypersonix (opciono). Intaker tab na Our Work ima prazno mesto za broj.
- **Flow Conf post** je u draftu: objaviti ga ili ide 301 na /blog.
- **Od ranije:**
  - bolji fajlovi logoa za LaSalle, Sustain i Hypersonix;
  - OG slike od dizajnera;
  - vodiči za integracije;
  - naslov „Trusted by ambitious teams…“ iznad FAQ-a (tako je i u Figmi).

## 4. Odluke (ti ili Aleksandar)
- **iClosed kartica na Home (tvoj dizajn sa danima i terminima):** varijanta A (forma, pa iClosed sa popunjenim podacima) ili B (pravi termini preko iClosed API-ja i malog servera). Preporuka B. Čeka: izbor, API ključ, Cloudflare ili Vercel. Detalji: `notes/iclosed-mogucnosti-2026-11-17.md`, odeljak 4.
- **Cookie banner:** preporuka je besplatni Finsweet, ako ga TrakPro koristi; inače CookieYes Free. Kad se odluči, ugrađujem ga i vezujem za GA4 (Consent Mode v2).
- **Domen:** www kao glavni. Moja preporuka, čeka potvrdu.
- **Izgled, iz jutarnjeg QA-a, čeka odobrenje:**
  - jedna reč sama u poslednjem redu naslova na telefonu („deserves.“, „front,“ i druge);
  - prelom u CTA podnaslovu;
  - „Design & Development“ u dva reda u tabovima na telefonu;
  - tekst preko lica na Home kartici „Webflow natives“.
- **Prazna CMS kolekcija „Case team“:** obrisati (brisanje ostavljam vama).

## 5. Na dan lansiranja (MANUAL_TASKS)
- Plaćeni plan, domen, Global canonical, auto sitemap, robots.txt za produkciju. Na stagingu je sitemap 404 i `Disallow: /`, što je ispravno.
- 301 preusmeravanja: 8 redova u MANUAL_TASKS 5 (`notes/301-mapa-2026-11-17.md`).
- Email obaveštenja za forme, probna prijava na Careers sa CV-om.
- Google Search Console i Bing, ponovni audit na pravom domenu.

## 6. Ne mogu da proverim iz svog okruženja (proveriti ručno u browseru)
Ti servisi su blokirani u mom okruženju:
- iClosed kalendar na Let's talk;
- Vimeo snimci;
- slanje formi, Turnstile i GA4 događaji;
- Google fontovi;
- Careers 3D piramida i fizika na 404.
