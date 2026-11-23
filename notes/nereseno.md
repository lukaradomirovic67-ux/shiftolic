# Nerešeno (napomene)

Stvari koje su namerno ostavljene kakve jesu, da se reše kasnije. Novije na vrhu.

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
- **Dupli GA4**: GA4 se učitava dva puta (kod u Head + Webflow integracija), pa se posete verovatno broje dvaput. Kod u Head ostaje.
- **Cookie banner i Consent Mode**: GA4 i Google fontovi se učitavaju pre pristanka (firma u EU). Nema bannera.
- **Pricing, tabela „How we compare“**: u koloni Nues, red „What you pay“, piše „A team shared across clients“ (tekst iz kolone za agenciju). Ostaje, uz kalkulator preporuke i „Change orders $0“ („nemoj to dirati“).
- **Geist sa našeg servera**: ne radi se (odluka od 13.11., potvrđeno 20.11.).
