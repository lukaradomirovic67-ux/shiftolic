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
