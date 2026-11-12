# MANUAL_TASKS (radi se ručno u Webflow-u, Search Console-u i GA4)

Ažurirano: 10.11.2026 (faza 0). Webflow API na ovom planu ne može: 301 preusmeravanja i robots.txt (samo Enterprise,
greška `not_enterprise_plan_site`), sitemap kontrole po stranici (403) i podešavanja sajta (global canonical, auto sitemap).
Putanje u meniju proverite u trenutnom Webflow interfejsu. Nazivi se ponekad menjaju.

## Pri lansiranju (domen se sada NE povezuje)
1. **Plaćeni site plan.** Bez njega nema custom domena, sitemap-a ni uklanjanja „Made in Webflow“ bedža.
2. **Site settings → SEO → Global canonical tag URL**: upisati izabrani domen (QUESTIONS 7). Tek tada svaka stranica dobija
   self-referencing canonical. Sada nijedna stranica nema canonical.
3. **Site settings → SEO → Sitemap → Auto-generate sitemap**: uključiti.
4. **Site settings → SEO → Indexing**: na webflow.io subdomenu ostaviti zabranu indeksiranja (sada `Disallow: /`, ispravno).
   Za produkciju: robots.txt koji dozvoljava indeksiranje i navodi sitemap.
5. **Site settings → Publishing → 301 redirects**, dodati:
   | Stara adresa | Nova adresa |
   |---|---|
   | /services/main | /services |
   | /services/nues-launch | /services/design-development |
   | /services/nues-build | /services/webflow-development |
   | /services/nues-plus | /services/growth |
   | /services/nues-seo | /services/seo-aeo |
   Plus adrese starog sajta kad stigne spisak (QUESTIONS 8).
6. **Google Search Console**: verifikacija domena (DNS TXT), slanje sitemap-a. **Bing Webmaster Tools**: uvoz iz GSC-a.

## Sada (van SEO faza)
7. **[ODLOŽENO 12.11.: integracije su u draftu dok se ne napišu]** **Uključiti stranice pojedinačnih integracija** (`/integrations/<slug>`). Šablon „Integrations Template“ postoji i nije draft,
   ali ga Webflow ne objavljuje (`shouldPublish: false`), pa je /integrations/webflow-salesforce-integration na stagingu 404.
   Linkovi „See the case studies“ na karticama Webflow Integrations stranice vode tamo. API ovo podešavanje ne menja.
   Klik-putanja (proverite nazive u trenutnom interfejsu):
   - Designer → **CMS** panel → kolekcija **Integrations** → ikonica podešavanja (zupčanik) → opcija za collection/template
     stranice (**Collection pages / Template page**) → uključiti → Save.
   - Ako tamo nije: **Pages** panel → **CMS Collection pages → Integrations Template** → zupčanik → proveriti da stranica nije
     isključena iz objave.
   - Zatim Publish samo na webflow.io i otvoriti /integrations/webflow-salesforce-integration (treba 200, ne 404).
   Napomena: Salesforce stavka nema napisan sadržaj (polje Content), pa će stranica biti skoro prazna dok se vodič ne napiše.

## Kasnije faze
Biće dopunjeno u fazama 1–6 (minifikacija, konverzija asseta, fontovi, sitemap izuzeci po stranici…).
