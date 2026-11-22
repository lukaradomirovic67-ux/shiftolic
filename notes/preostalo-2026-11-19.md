# Šta je ostalo (19.11.2026)

**22.11.: aktuelni spisak je dokument „Nues: dan lansiranja, šta je ostalo“ (https://claude.ai/artifact/HqHMAKy5V6s5fTkQ44bKJv); sadrži sve otvorene stavke, i one iz nove Let's talk forme.** Ovo ispod je istorija.

Ovo je bio jedini aktuelni spisak. **20.11.: ostali su samo koraci za dan lansiranja; plan je u dokumentu „Nues sajt: plan za dan lansiranja“ (https://claude.ai/artifact/V4tEXQmhwvypfyfAmCFABV).** Namerno ostavljene stvari su u `notes/nereseno.md`. `preostalo-2026-11-17.md` i stariji su istorija.

## Mogu odmah, na „da“
1. **llms.txt:** nova verzija je spremna (`notes/llms-txt-predlog-2026-11-18.txt`). *Preskočeno 19.11. na tvoj zahtev.*
2. **Brisanje 7 neiskorišćenih slika `round-*.webp` iz Assets:** stare verzije fotki tima, nigde se ne koriste. *Urađeno 19.11.*
3. **Hero naslov na telefonu bez čekanja skripti (problem 2A iz audita):** LCP na telefonu je 5–7,5 s, jer je naslov sakriven dok se skripte ne učitaju. *Urađeno 19.11., objavljeno (sada 1,7–2,7 s).*
4. **Podnaslov ispod H1 na 4 servisne stranice:** iz Figme Copy page, svaka stranica ima svoj. *Urađeno 19.11., objavljeno.*
5. **Alt tekst za 46 slika u blog tekstovima (21 post):** ja pišem, tim odobrava. *19.11.: predlozi su napisani i na stranici za pregled (https://claude.ai/artifact/BG3BpjGKmLqLW43tMnPT7t), spisak sa adresama slika je u `notes/blog-alt-predlozi-2026-11-19.json`. Urađeno 19.11.: sve odobreno, upisano u CMS i objavljeno.*
6. **og:image je AVIF na 7 stranica** (LinkedIn ga ne prikazuje): predlog je novo CMS polje „Share image“, koje treba odobriti. *Urađeno 20.11. drugačije: novo polje ne bi pomoglo (Webflow i JPG servira kao AVIF), pa je 7 slika zamenjeno WebP verzijama; posle lansiranja proveriti u LinkedIn Post Inspector-u.*
7. **Geist kao font sa našeg servera:** umesto Google WebFont loader-a. *Napomena 20.11.: ovo si 13.11. odlučio da ne radimo (MANUAL_TASKS #8); traži ručni upload fonta u Webflow podešavanjima.*

## Čeka da otpremiš
- ~~**Stara pozadinska slika Home CTA** (`home-cta-bg.avif`)~~: **obrisana 20.11.**, zajedno sa starim CTA linijama i neiskorišćenim hero videom (CHANGELOG 20.11.).
- ~~**3 izravnata videa za Our Work slider** (Sustain, Shiftolic, Ballerine)~~: **urađeno 20.11.** Ti si otpremio fajlove, ja sam ih upisao u CMS i objavio na staging (CHANGELOG 20.11.).

## Odluke (ti ili Aleksandar)
- **Dupli GA4:** koji ostaje. Preporuka: Webflow integracija, a kod iz Head da se obriše. *20.11.: preskočeno, tvoja odluka; kod u Head ostaje.*
- **Cookie banner (Finsweet ili CookieYes) i Consent Mode:** sada se prati bez pristanka. *20.11.: preskočeno, tvoja odluka.*
- **Cene:** *20.11.: uklonjene sa sajta (tvoja odluka). Ostaje greška u tabeli „How we compare“ ispod.*
  - „[$X,XXX]“ 2 puta na Pricing;
  - $5,000 na Services naspram $20,000 na Pricing;
  - 30 dana podrške naspram nedelju dana;
  - greška u „How we compare“.
  - *20.11.: kalkulator preporuke („$4,000 / $40,000“), „Change orders $0“ i red „What you pay“ u „How we compare“ ostaju kako jesu, tvoja odluka („nemoj to dirati“).*
- **FAQ:** 30 odgovora (moj nacrt) i 4 pitanja čekaju potvrdu. Posle toga ide FAQPage schema. *20.11.: ostaje kako jeste, upisano u `notes/nereseno.md`.*
- **5 projekata bez studije** (Biotech, Harper, Hypersonix, Intaker, LaSalle): izbaciti iz sitemap-a ili napisati studije. *20.11.: opcija (a), ručni sitemap pripremljen (`webflow-assets/seo/sitemap-manual.xml`), ubacuje se na dan lansiranja (MANUAL_TASKS tačka 3).*
- **iClosed kartica na Home:** varijanta A ili B. *20.11.: rešeno drugačije, umesto kartice je nova CTA sekcija sa dugmetom ka Let's talk (Figma 9098:24).*
- **Domen:** www kao glavni. *20.11.: još nije na redu (tvoja odluka).*
- ~~**Izgled**~~ *Provereno 20.11.: svih 5 je već rešeno, stavke su greškom ostale na spisku.*
  - ~~jedna reč sama u poslednjem redu naslova na telefonu~~: urađeno 17.11. (`text-wrap: balance`); 20.11. na telefonu na 15 stranica nema nijednog takvog naslova.
  - ~~prelom u CTA podnaslovu~~: urađeno 17.11. (crta na kraju prvog reda).
  - ~~„Design & Development“ u dva reda~~: odluka 17.11., ostaje.
  - ~~tekst preko lica na kartici „Webflow natives“~~: odluka 17.11., ostaje.
  - ~~tamnija siva za sporedni tekst (kontrast)~~: odluka 14.11., ne dira se.
- ~~**Case timovi:** Daris i Pavle nisu ni na jednoj case stranici; Growth i SEO & AEO su bez osobe.~~ *Provereno 20.11.: tim je izmenio timove, Daris je na TrakPro, Veyor i Sustain, Pavle na Sustain, Shiftolic i Ballerine (3–4 osobe po case-u).*
- ~~**Flow Conf post:** objaviti ga ili ide 301 na /blog.~~ *20.11.: ostaje u draftu (tvoja odluka); stara adresa ide 301 na /blog na dan lansiranja (MANUAL_TASKS 5).*
- ~~**Prazna CMS kolekcija „Case team“:** obrisati (vi).~~ *Provereno 20.11.: kolekcija više ne postoji (tim ju je obrisao).*

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
