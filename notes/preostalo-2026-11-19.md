# Šta je ostalo (19.11.2026)

Ovo je jedini aktuelni spisak. `preostalo-2026-11-17.md` i stariji su istorija.

## Mogu odmah, na „da“
1. **llms.txt:** nova verzija je spremna (`notes/llms-txt-predlog-2026-11-18.txt`). *Preskočeno 19.11. na tvoj zahtev.*
2. **Brisanje 7 neiskorišćenih slika `round-*.webp` iz Assets:** stare verzije fotki tima, nigde se ne koriste. *Urađeno 19.11.*
3. **Hero naslov na telefonu bez čekanja skripti (problem 2A iz audita):** LCP na telefonu je 5–7,5 s, jer je naslov sakriven dok se skripte ne učitaju. *Urađeno 19.11., objavljeno (sada 1,7–2,7 s).*
4. **Podnaslov ispod H1 na 4 servisne stranice:** iz Figme Copy page, svaka stranica ima svoj. *Urađeno 19.11., objavljeno.*
5. **Alt tekst za 46 slika u blog tekstovima (21 post):** ja pišem, tim odobrava. *19.11.: predlozi su napisani i na stranici za pregled (https://claude.ai/artifact/BG3BpjGKmLqLW43tMnPT7t), spisak sa adresama slika je u `notes/blog-alt-predlozi-2026-11-19.json`. Urađeno 19.11.: sve odobreno, upisano u CMS i objavljeno.*
6. **og:image je AVIF na 7 stranica** (LinkedIn ga ne prikazuje): predlog je novo CMS polje „Share image“, koje treba odobriti. *Urađeno 20.11. drugačije: novo polje ne bi pomoglo (Webflow i JPG servira kao AVIF), pa je 7 slika zamenjeno WebP verzijama; posle lansiranja proveriti u LinkedIn Post Inspector-u.*
7. **Geist kao font sa našeg servera:** umesto Google WebFont loader-a. *Napomena 20.11.: ovo si 13.11. odlučio da ne radimo (MANUAL_TASKS #8); traži ručni upload fonta u Webflow podešavanjima.*

## Čeka da otpremiš
- **3 izravnata videa za Our Work slider** (Sustain, Shiftolic, Ballerine): u Webflow Assets, pa ih ja upisujem u CMS (`webflow-assets/video/slider-smooth-2026-11-19/`).

## Odluke (ti ili Aleksandar)
- **Dupli GA4:** koji ostaje. Preporuka: Webflow integracija, a kod iz Head da se obriše.
- **Cookie banner (Finsweet ili CookieYes) i Consent Mode:** sada se prati bez pristanka.
- **Cene:**
  - „[$X,XXX]“ 2 puta na Pricing;
  - $5,000 na Services naspram $20,000 na Pricing;
  - 30 dana podrške naspram nedelju dana;
  - greška u „How we compare“.
- **FAQ:** 30 odgovora (moj nacrt) i 4 pitanja čekaju potvrdu. Posle toga ide FAQPage schema.
- **5 projekata bez studije** (Biotech, Harper, Hypersonix, Intaker, LaSalle): izbaciti iz sitemap-a ili napisati studije.
- **iClosed kartica na Home:** varijanta A ili B.
- **Domen:** www kao glavni.
- **Izgled:**
  - jedna reč sama u poslednjem redu naslova na telefonu;
  - prelom u CTA podnaslovu;
  - „Design & Development“ u dva reda;
  - tekst preko lica na kartici „Webflow natives“;
  - tamnija siva za sporedni tekst (kontrast).
- **Case timovi:** Daris i Pavle nisu ni na jednoj case stranici; Growth i SEO & AEO su bez osobe.
- **Flow Conf post:** objaviti ga ili ide 301 na /blog.
- **Prazna CMS kolekcija „Case team“:** obrisati (vi).

## Tim (sadržaj)
- ~~Draft izmene Shiftolic, Veyor i TrakPro (od 17.11.) treba objaviti.~~ *Provereno 20.11.: objavljene su (17.11. u 20:45).*
- Stat 1 broj za Intaker, Harper, LaSalle, Biotech i Hypersonix (opciono).
- Bolji logo fajlovi za LaSalle, Sustain i Hypersonix; OG slike od dizajnera; vodiči za integracije.

## Na dan lansiranja (MANUAL_TASKS)
- Plaćeni plan i domen; Global canonical, sitemap i robots.txt za produkciju.
- 301 preusmeravanja (8 redova).
- Email obaveštenja za forme, probna prijava na Careers.
- Search Console i Bing, ponovni audit na pravom domenu.

## Ručno proveriti u pregledaču (blokirano u mom okruženju)
- iClosed kalendar i Vimeo snimci.
- Slanje formi, Turnstile i GA4 događaji.
- Google fontovi.
- Careers piramida i fizika na 404.
