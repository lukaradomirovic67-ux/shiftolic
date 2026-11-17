# iClosed: šta možemo da menjamo (17.11.2026)

Izvori:
- `https://app.iclosed.io/assets/widget.js` (pročitan ceo);
- docs.iclosed.io: Embedding the scheduler, Scheduler Customizations, Prefill.

Sada: `<div class="iclosed-widget" data-url="https://app.iclosed.io/e/nues/discovery-call">` na Let's talk i u Home CTA kartici (Home ga učitava tek kad se sekcija približi ekranu).

## 1. U samom iClosed-u (Event → Customizations), radi onaj ko ima nalog
- Tema: svetla ili tamna.
- Brand boja: jedna boja ili gradijent.
- Napredne boje: pozadina, boja teksta, boja ivica, polja za unos, tekst na dugmetu.
- Logo.
- Raspored termina: mesečni ili nedeljni.
- Kalendar uz formu.
- Treptanje prvog polja.
- Sakrivanje detalja događaja.
- Slike domaćina.
- Tajmer od 3 minuta.
- Pitanja u formi (do 10) i „Pre-qualified form skipping“ (preskače formu kad su podaci već popunjeni).
- Stranica posle zakazivanja: preusmeravanje na naš URL (npr. /thank-you), plus njihov widget sa detaljima poziva na toj stranici.
- **Nema:** izbora fonta, sopstvenog CSS-a ni sakrivanja pojedinih delova osim ponuđenih prekidača.

## 2. Sa našeg sajta (mogu ja)
- **Okvir:** veličina, zaobljenje, senka, pozadina, sečenje ivica.
  - Na Home je to već urađeno: klasa `is-flush` odseca njihov sivi okvir.
  - Ako se u iClosed-u boja ivice postavi kao boja pozadine, sečenje više ne treba.
- **Visina:** iframe sam javlja svoju visinu (`iclosed.widget_height`) i skript je postavlja; ne mora fiksna visina.
- **Učitavanje:** njihov skelet dok se učitava je u našem DOM-u (`.iclosed-loader-*`, `.iclosed-placeholder`), pa ga možemo stilizovati ili zameniti svojim. Postoji i `data-load-delay`.
- **Popup umesto stranice:** svako dugme sa `data-iclosed-link="…"` otvara njihov popup. „Book a call“ dugmad na sajtu mogu da otvaraju kalendar na licu mesta, bez prelaska na /lets-talk. Pozadinu popup-a (`.iclosed-popup-overlay`, `.iclosed-popup-container`) stilizujemo mi.
- **Popunjavanje unapred:** svi parametri iz adrese naše stranice prelaze u kalendar:
  - `?iclosedName=…&iclosedEmail=…&iclosedPhone=…`;
  - identifikatori pitanja iz iClosed-a.
  
  Na primer, forma ili kalkulator na sajtu vodi na /lets-talk sa već upisanim emailom.
- **UTM:** utm_* i first_utm_* se automatski prosleđuju iz kolačića i iz adrese.
- **Pristanak za kolačiće:** `window.iClosedSetConsent({ i: analitika, o: marketing })` javlja kalendaru pristanak. Bez toga se prosleđuju i Facebook kolačići (`_fbp`, `_fbc`). Ovo se vezuje uz cookie banner.

## 3. Ne može
- Ništa unutar okvira: font, raspored, tekstovi, pojedini elementi. Okvir je sa drugog domena; iClosed to i sam navodi.
- Događaj „zakazano“ ne stiže na našu stranicu (skript prima samo visinu, preusmeravanje i skrol). Za GA4 konverziju postoje dva puta:
  - preusmeravanje posle zakazivanja na našu /thank-you stranicu i događaj tamo;
  - njihova Google integracija.
- Trikovi (CSS filter, skaliranje, maska preko okvira) su mogući, ali krhki i ne preporučujem ih.

Napomena: sam kalendar ne vidim iz svog okruženja (app.iclosed.io mi je blokiran), pa izgled unutar okvira proveravate vi.

## 4. Plan za Home karticu „Have a project in mind?“ (dizajn sa izborom dana i termina), čeka odluku
Tvoj dizajn 17.11.: korak 1 „Book a free intro call“ (5 dana, termini, Continue), korak 2 „Almost there“ (ime, email, projekat, „Confirm the call“).

**A. Brzo, samo Webflow (sat-dva):**
- U kartici je naša forma: ime, email i projekat. Na „Confirm the call“ otvara se iClosed (popup ili /lets-talk) sa već upisanim podacima (`iclosedName`, `iclosedEmail`, identifikator pitanja za projekat).
- Uz „Pre-qualified form skipping“ u iClosed-u posetilac odmah vidi termine.
- Korak sa danima i terminima izbacujemo, jer bez servera ne može da prikaže stvarne termine, a iClosed ne prima izabrani termin kroz link.
- Podatke čuvamo i kao Webflow formu, pa imamo kontakt i ako posetilac odustane.

**B. Tačno kao dizajn, preko iClosed API-ja (preporuka):**
- Kartica učitava stvarne slobodne termine (`POST /v1/events/eventDates`, `linkPrefix` `nues/discovery-call`) za 5 dana, u vremenskoj zoni posetioca.
- „Confirm the call“ zakazuje poziv direktno (`POST /v1/eventCalls`), bez odlaska sa stranice. Zakazani pozivi se pouzdano mere u GA4.
- Potrebno:
  - API ključ (iClosed → Settings → Developer; proveriti da ga plan ima);
  - mali server koji čuva ključ (Cloudflare Worker ili Vercel funkcija);
  - zaštita od spama.
- Može da se uradi i preko A: prvo A, pa B.

**Otvorena pitanja:**
1. A ili B?
2. Imate li API ključ?
3. Server na Cloudflare-u ili Vercel-u?

Uz to: brand boja u iClosed-u (Nues zelena), ivice u boji pozadine, i /thank-you stranica za GA4.

## 5. Dodatna provera (17.11. veče): API, planovi, rizici
Izvori:
- docs.iclosed.io: iClosed Public API, Introduction - Pricing, Prefill, Pre-qualified form skipping;
- developer.iclosed.io: uvod, changelog, OpenAPI specifikacija;
- iclosed.io/product/api;
- developers.cloudflare.com: Workers limits.

Sam API nisam mogao da probam: app.iclosed.io i developer.iclosed.io su blokirani u mom okruženju, a ključa nemamo.

**Da li imamo API**
- Po cenovniku iClosed-a, API i webhookovi su na sva tri plana: Startup $24, Growth $59, Business $120 mesečno. Razlikuje se samo limit zahteva.
- Limiti se u dokumentima ne slažu:
  - API dokumentacija: Startup 20 zahteva na 10 sekundi po endpointu, Business 100;
  - cenovnik: 20/50/100 „requests/sec“.
- Isti API članak kaže i da plan Startup možda nema stranicu Developers.
- **Zato treba proveriti u nalogu: Settings → Developers → API Keys.** Ako stranica postoji, ključ imamo bez doplate.
- Ključ može da ima ograničena prava (samo određeni moduli, samo čitanje ili pisanje) i rok trajanja.

**Šta API daje za karticu**
- `POST /v1/events/eventDates`: slobodni termini po danima, u vremenskoj zoni posetioca (`linkPrefix` `nues/discovery-call`).
- `POST /v1/eventCalls`: zakazuje poziv.
  - Obavezno: `dateTime` (UTC), `timeZone` i email ili telefon. Ime nije obavezno.
  - Po stranici o API-ju prolazi isto rutiranje i iste provere kao njihov kalendar.
- Pitanje „projekat“ ide u `secondaryQuestionsAnswer`, preko identifikatora pitanja.
- Webhookovi `call.booked`, `call.cancelled` i `call.rescheduled` postoje na svim planovima.

**Da li će pucati: rizici i rešenja (varijanta B)**
1. **API je nov.** Članak je ažuriran pre nedelju dana, changelog ima samo 2 stavke od jula 2026, a dokumenti se ponegde ne slažu (limiti, adrese). Zaštita: verzija v1, uz njihovo obećanje da nekompatibilne promene idu u `/v2/` sa najmanje 60 dana preklapanja.
2. **Limit od 20 zahteva na 10 s.** Kad bi svaki posetilac sam povlačio termine, 21. posetilac u 10 sekundi bi dobio grešku. Rešenje: server čuva termine 60 s, pa ide jedan poziv ka iClosed-u u minuti, bez obzira na broj posetilaca. Termini se učitavaju tek kad kartica uđe u ekran.
3. **Termin zauzet u međuvremenu.** API vraća grešku. Kartica tada osveži termine i traži da se izabere drugi.
4. **Mejlovi i pozivnica.** Specifikacija ne kaže izričito da poziv zakazan preko API-ja šalje potvrdu i kalendarsku pozivnicu. Događaj ima podešavanja za potvrdne mejlove, pa verovatno šalje. **Obavezno probno zakazivanje pre puštanja.**
5. **Spam.** Kartica zakazuje prave pozive. Zaštita:
   - Cloudflare Turnstile (već ga koristimo na formama);
   - ograničenje po IP adresi na serveru;
   - provera emaila.
6. **Server ili iClosed API ne radi.** Kartica tada prelazi na varijantu A i otvara iClosed kalendar sa popunjenim podacima, pa posetilac uvek može da zakaže.
7. **Šta gubimo u odnosu na njihov kalendar:**
   - GTM i Meta pixel unutar iClosed kalendara;
   - automatsko hvatanje UTM-a.

   UTM šaljemo sami (kontakt ima polje `utm`, proveriti u testu). Konverziju merimo mi, i to pouzdanije.
8. **Ključ.** Ključ nikad nije u browseru, samo na serveru (Cloudflare Worker secret).

**Server:** besplatni Cloudflare Workers ima 100.000 zahteva dnevno, a uz keš od 60 s potreba je daleko ispod toga. Za Vercel nisam završio proveru uslova besplatnog plana.

**Varijanta A: rizici**
- Na našoj strani nema šta da pukne. Koristimo zvanične parametre (`iclosedName`, `iclosedEmail`, `iclosedPhone`, identifikator pitanja) i zvanični widget.
- „Pre-qualified form skipping“ postoji na svim planovima. Uključuje se u događaju: Invitee Questions → prekidač.
  - Uslov: email ili telefon u ispravnom formatu. Inače posetilac vidi celu formu.
  - Kad je uključeno, preskaču se **sva** dodatna pitanja u iClosed formi.
  - Lead se upisuje kao „Qualified“, pa se okidač „Potential“ (Zapier, CRM) ne pali.
- iClosed savetuje da parametri budu u adresi stranice na kojoj je kalendar, ne u linku događaja, jer kalendar ponekad krene pre nego što ih pročita. Kod nas: posle naše forme kalendar se otvara u samoj kartici, sa parametrima u adresi.
- Mana: korak sa danima i terminima je iClosed-ov prozor, ne naš dizajn.

**Preporuka posle provere: B, sa A kao rezervnim putem.** Redosled:
1. U nalogu proveriti Settings → Developers i napraviti ključ sa pravima samo za Events, Calls, Contacts i Fields.
2. Sa ključem samo čitam termine, bez zakazivanja, da potvrdim format i vremenske zone.
3. Jedno probno zakazivanje i otkazivanje, da se vide mejlovi, pozivnica i link za poziv.
4. Tek onda pravim karticu.
