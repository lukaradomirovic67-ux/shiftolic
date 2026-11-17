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
