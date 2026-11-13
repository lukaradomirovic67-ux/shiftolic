# SEO predlozi za odobrenje (13.11.2026)

**Tvoja odluka 13.11.:**
- og:image pravi dizajner, a ja ih povezujem kad stignu.
- Tačke 2, 3 i 4 (title i description, isti H1 na servisnim stranicama, cene) idu na launch ovakve kakve jesu i menjaju se posle launcha.
- Moji predlozi slika (`og-predlozi`) ostaju samo kao referenca.

Ovo je tekst, pa ništa od ovoga ne menjam bez tvog „ok“.
- Može ceo spisak, može po tačkama, a može i sa tvojom izmenom.
- Predlozi koriste samo tvrdnje koje već postoje na sajtu.
- Granice: title do 60 znakova, description od 120 do 155 znakova (duže Google seče, kraće ostavlja prazan prostor).

## 1. Title i description (statične stranice)

| Stranica | Sada | Predlog | Dužina |
|---|---|---|---|
| Home, title | Webflow agency that designs, builds, and grows websites \| Nues (62) | A: Webflow agency for websites that sell \| Nues · B: Webflow agency that designs, builds and grows sites \| Nues | 44 / 58 |
| Home, description | „A Webflow agency designing and building websites … from the first line of code.“ (169) | Webflow agency designing and building sites for fast-growing teams. Custom Webflow development, scalable CMS and performance from the first line of code. | 153 |
| Pricing, title | Pricing \| Nues (14) | Webflow pricing, one price agreed up front \| Nues | 49 |
| Careers, description | (163) | Join a senior Webflow team that ships every week. Remote-first, flexible hours and real weekends. See open roles at Nues or send an open application. | 149 |
| Blog, description | (104) | Practical notes on Webflow, SEO, AEO and conversion from the Nues team: guides, comparisons and how-tos written from real client builds. | 136 |
| Resources, description | (118) | Insights, case studies and Webflow integration guides from Nues in one place. Learn from the Webflow projects we have designed, built and shipped. | 146 |
| Privacy i Terms | „\| NUES“, a Terms description ima 158 znakova | „Privacy Policy \| Nues“, „Terms of Service \| Nues“, a u opisima „Nues“ umesto „NUES“. Terms: Read the Nues Terms of Service for web design and Webflow development: project terms, payment policies and client responsibilities. | 131 |

## 2. Blog postovi i case stranice (CMS polja Meta title / Meta description)

| Stavka | Polje | Predlog | Dužina |
|---|---|---|---|
| Sanity vs Webflow CMS | title (64) | Sanity vs Webflow CMS: which one your team needs \| Nues | 55 |
| Source by Webflow | title (75) | Source by Webflow: what it means for Webflow teams \| Nues | 57 |
| How to improve your website conversion rate | description (160) | Most sites have a conversion problem, not a traffic problem. How to improve conversion through speed, clarity, forms, trust and mobile, before testing. | 151 |
| Webflow for B2B lead generation | description (116, sa razmakom na kraju) | How to use Webflow for B2B lead generation: fast landing pages, gated content, forms that convert and CRM integration that turn your site into a pipeline. | 154 |
| Webflow vs Wix | description (118, sa razmakom na kraju) | An honest 2026 comparison of Webflow vs Wix, including Wix Studio: where each platform wins and how to choose the right one for your website. | 141 |
| Shiftolic (case) | description (157) | Shiftolic's website designed and built from scratch in two weeks: visual identity, Webflow development and scalable CMS for a US healthcare marketplace. | 152 |

## 3. Isti H1 na sve četiri servisne stranice
Design & Development, Webflow Development, SEO & AEO i Growth imaju isti H1: „Zero to a live site, in weeks not quarters“.
- Za Google su to četiri stranice sa istim glavnim naslovom, pa je teže rangirati svaku za svoju uslugu.
- Ako u Figmi postoje posebni naslovi, uzimam njih. Ako ne postoje, predlozi su rečenice koje već postoje na sajtu:
  - Design & Development: ostaje „Zero to a live site, in weeks not quarters“.
  - Webflow Development: „You bring the design, we bring it to life in Webflow“ (iz njenog meta opisa).
  - SEO & AEO: „Rankings and AI citations, month after month“ (iz njenog meta opisa).
  - Growth: „A senior crew on your site, every month“ (sa Growth kartice na /services).

## 4. Slike za deljenje (og:image)
Predlozi su u `notes/og-predlozi-2026-11-13.png`, a fajlovi (1200×630 JPG, oko 40 KB) u `webflow-assets/perf/manual/og/`.
- Na slici su logo, oznaka i naslov stranice; naslovi su postojeći H1.
- Na servisnim stranicama je ime usluge, zbog tačke 3.
- Blog postovi i case stranice već uzimaju sliku iz CMS-a (Thumbnail, Cover image) i ostaju takvi.
- Posle tvog „ok“ ide MANUAL_TASKS 13: ti ih ubaciš u Assets, ja ih povežem preko API-ja.

## 5. Cene u schema-i
- Schema na servisnim stranicama kaže $8.000 (Design & Development) i $5.000 (Webflow Development), a na samim stranicama cene nema.
- /services prikazuje „From $8k / $5k / $2k / $3,000“, a Pricing „from $8,000“ i „from $20,000“.
- Kad se odluči koje cene važe, uskladiću schema-u. Do tada je ne diram.
