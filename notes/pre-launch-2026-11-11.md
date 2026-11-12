# Pre lansiranja: šta je ostalo (11.11.2026)

Staging: https://nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io/

**Kako je provereno:**
- Automatska provera svih 47 javnih adresa, na desktopu (1440) i telefonu (390): 16 stranica, 21 blog post i 10 case studija.
- Šta je mereno: status, JS greške, neispravne slike, prazni naslovi, placeholder tekst, linkovi, title/description i širina na telefonu.
- Ciljano sam ponovo proverio stavke sa QA liste od 8.11. (`notes/qa-2026-11-08.md`).

Copy nije finalan, pa se ovde ocenjuje samo vidljiv placeholder, ne stil teksta.

Rezime automatske provere:
- Nijedna stranica ne vraća grešku. Sve JS greške potiču od GA4, koji je blokiran u mom okruženju; to nisu greške sajta.
- Nema slomljenih slika ni praznih naslova. Svaka stranica ima tačno jedan H1, osim 5 praznih case stranica.

## 1. Najveći problemi (redom važnosti)

1. **Vidljiv placeholder tekst na ključnim stranicama.** Posetilac odmah vidi da sajt nije gotov.
   - Services i 4 servisne stranice: svih 5 FAQ odgovora je „[Add the answer to: …]“.
   - Pricing i Webflow Integrations: FAQ odgovori su „[Answer to be provided]“.
   - Pricing, paketi SEO & AEO i Growth: cena je „Investment from [$X,XXX]/month“.
   - Recenzije (Home, servisne stranice, Pricing): isti citat se ponavlja 3 puta, autor je samo „Marketing Director“,
     a Ballerine citat je dva puta.
   - Hypersonix na kartici: „Soon / Rebuild in progress“.
2. **Telefon: stranica je šira od ekrana** na Services, 4 servisne stranice i Our Work (581 px na ekranu od 390 px).
   - Stranica se pomera u stranu, a navbar i hamburger beže van ekrana.
   - Uzrok je sekcija sa prstenovima („Measured after launch“). **Popravljam ja.**
3. **5 praznih case stranica je javno** (Intaker, Harper, Hypersonix, LaSalle, Biotech). Nemaju title, opis ni H1.
   - Na sajtu ih više niko ne linkuje, ali posle lansiranja ih Google nalazi preko sitemap-a i adresa u kodu.
   - Predlog: noindex i preusmerenje na sajt klijenta, bez vizuelne promene. Čeka tvoje „da“.
4. **Integrations:** linkovi „See the case studies“ vode na 404, dok se ne uključi šablon stranica integracija
   (MANUAL_TASKS 7). U CMS-u postoji samo Salesforce, bez loga i bez napisanog vodiča.
5. **(rešeno 12.11.) Videi u Our Work slideru dolaze iz GitHub repoa preko jsDelivr-a.** Sada su na Webflow-u (vidi CHANGELOG 12.11.).
   - Rade samo dok je repo javan, a u testu su se dva videa (Sustain, TrakPro) prekinula pri učitavanju.
   - Pre lansiranja ih treba prebaciti na Vimeo ili Webflow.
6. **Infrastruktura za lansiranje nije spremna:**
   - nema plaćenog plana: „Made in Webflow“ bedž je na svih 47 stranica, a nema custom domena ni CV uploada u Careers formi;
   - stare adrese (/services/main, /services/nues-*) vraćaju 404;
   - nema sitemap-a ni canonical-a.
7. **Kolačići:** GA4 se učitava bez banera za pristanak. Ako ciljate EU posetioce, to je pravno pitanje pre lansiranja.
8. **Nijedna statična stranica (16) nema OG sliku.** Link podeljen na LinkedIn ili Slack nema sliku.

## 2. Šta popravljam ja (greške)
- [x] Telefon, širina stranice (Services, 4 servisne, Our Work), vidi 1.2. Popravljeno 11.11., objavljeno na staging.
- [x] (popravljeno 11.11., objavljeno na staging) Pricing na tabletu (820): oznake ispod slidera se preklapaju („Design & Development“ / „Webflow Development“),
      a prva je odsečena levo.
- [x] (popravljeno 11.11., objavljeno na staging) Hamburger dugme je 24×18 px. Treba ga povećati na bar 44×44 (površina za prst), na svih 47 stranica.
- [x] (11.11., objavljeno na staging 12.11.) Blog paginacija: „2“ i „3“ su beli tekst na svetlosivoj podlozi (15% navy) i izgledaju kao isključeni.
- [x] (11.11., objavljeno na staging 12.11.) „Copy link“ na 21 blog postu je link sa `#` umesto dugmeta (pristupačnost).
- [x] (preuređeno 11.11., objavljeno na staging) Tabela „Side by side“ (Services) na tabletu i telefonu nema znak da se skroluje u stranu.
      Sada je prekidač sa 4 usluge i jedna kartica za izabranu uslugu (vidi CHANGELOG).
- [x] (12.11., objavljeno na staging) 5 praznih case stranica: noindex + preusmerenje na sajt klijenta dok je Case title prazan.
- [x] (12.11.) Bolje slike koje su čekale Designer: zamenjeno 8 logoa u Resources hero (SVG); ostale su već bile dovoljno oštre
      ili se više ne koriste (vidi CHANGELOG 12.11.). Ostaju sitni logoi LaSalle, Sustain i Hypersonix (treba bolji fajl).
- [x] Sitnice sa QA 8.11. (ponovo provereno 11.11.):
  - navodnik iza Clutch bedža: tako je u Figmi, ostaje;
  - sitni logoi LaSalle, Sustain i Hypersonix: treba bolji fajl loga (ide uz slike);
  - neaktivan tab „Veyor“: popravljeno (dvostruka providnost), objavljeno 12.11.;
  - naslov istaknutog posta preko „VS“ grafike: zavisi od naslovne slike, predlog čeka tvoju odluku;
  - tačke u listama: pravne stranice popravljene (objavljeno 12.11.), na blogu su već dobre.

## 3. Šta završava tim (sadržaj i odluke)
**Sadržaj koji fali**
- [ ] FAQ odgovori: Services i 4 servisne stranice (po 5), Pricing (5 od 6), Integrations.
- [ ] Cene za SEO & AEO i Growth na Pricing.
- [ ] Prave recenzije: različiti citati, imena i firme (sada se ponavljaju).
- [ ] Our Works:
  - Stat 1 za Biotech, LaSalle, Harper i Intaker;
  - broj i rečenica za Intaker tab (QUESTIONS 15–16);
  - Hypersonix metrika umesto „Soon“;
  - Team na 4 napisana case-a (TrakPro, Veyor, Sustain, Shiftolic);
  - „Services used“ za TrakPro;
  - Harper: Filter category i slike za galeriju.
- [ ] Integracije: nove stavke sa logom i kategorijom, i napisani vodiči (polje Content).
- [ ] Copy uopšte: isti hero tekst na 4 servisne stranice. Na Privacy policy sekcija „Cookies“ ponavlja „Data Sharing“.
      Iznad FAQ sekcija stoji naslov „Trusted by ambitious teams across six industries“; tako je i u Figmi, ali se ne slaže sa FAQ-om.

**Odluke**
- [x] (12.11.) 5 praznih case-ova sakriveni od Google-a (noindex + preusmerenje); kad se napišu, rade sami.
      Odluka 12.11.: ostaje samo skripta. Webflow prekidač „Sitemap indexing“ na stavkama se ne koristi; rizik je mali (vidi CHANGELOG 12.11.).
- [ ] Blog „B2B SaaS SEO in 2026“: nova verzija je u draftu, stara je živa i 6 postova linkuje na nju. Objaviti novu ili ukloniti?
      12.11.: preskočeno do kraja, po tvojoj odluci.
- [x] (12.11.) Resources: noindex skinut. Integracije su sakrivene na Resources i u navbaru; stranica Integrations je u draftu i ima noindex, a CMS integracija je u draftu dok se ne napiše.
- [ ] Our Work:
  - redosled kartica kao u Figmi (traži novo CMS polje „Our Work order“, čeka odobrenje);
  - prvi slajd hero slidera Intaker (treba glavna slika, logo u boji i metrika).
- [x] (12.11.) Careers hero: dugme je sada „See open roles“ i vodi na pozicije (#open-roles).
- [ ] Baner za kolačiće (GA4) za EU posetioce.
- [ ] Obrisati praznu kolekciju „Case team“ u CMS-u; brisanje ostavljam vama. Čišćenje Style Managera radi tim.

## 4. Ručno u Webflow-u pri lansiranju (`MANUAL_TASKS.md`)
- [ ] Plaćeni site plan, povezivanje domena (sada ne).
- [ ] Global canonical, auto sitemap, robots.txt za produkciju.
- [ ] 301 preusmeravanja: 5 starih adresa servisa i adrese starog sajta (QUESTIONS 8).
- [ ] Uključiti stranice integracija (MANUAL_TASKS 7).
- [ ] Email obaveštenja za forme. Probna Careers prijava sa CV-om kad plan bude aktivan.
- [ ] Google Search Console i Bing Webmaster Tools.

## 5. Nisam mogao da proverim (blokirano u mom okruženju)
- iClosed kalendar na Let's talk.
- Vimeo snimci, uključujući nove verzije za Ballerine i Intaker.
- Turnstile na formama, slanje formi, GA4.
- Careers 3D piramida (three.js), fizika na 404 (matter.js), Caveat font za potpise.

## 6. Posle: SEO i performanse (iz `BASELINE.md`)
- Mobilni Lighthouse Performance 56–66, LCP oko 7 s, FCP oko 5,5 s. Desktop 80–90.
- Home ima 3,3 MB (cilj < 1,5 MB), a Our Work 3,9 MB. Najviše prostora zauzimaju slike.
- Blokiraju prikaz: CSS od 89 KB (oko 1,5 s) i webfont.js za Google fontove (oko 0,9 s).
- Site head kod ima 49.223 od 50.000 znakova. Prvo ga treba smanjiti, inače nema mesta ni za šta novo.
- SEO:
  - nema canonical-a, sitemap-a ni OG slika;
  - 5 case stranica nema title (sada noindex + preusmerenje, 12.11.);
  - „View project“ u Our Work slideru i kartica u „What they had“ imaju `href="#"` u HTML-u (pravi link dobijaju tek skriptom);
  - pomoćne CMS šablon stranice su javne (Hero Cards, Case team, Jobs);
  - Review/Rating schema na Let's talk koju Google ignoriše (QUESTIONS 11);
  - za mapu ključnih reči trebaju mi odgovori iz QUESTIONS 3–6 i 9–10.
