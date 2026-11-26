# Cene vraćene 26.11.2026 (staging)

Tvoje „vrati tačno stare“. Stanje pre vraćanja:
- `published-*-before.html`: objavljeni HTML Services, Pricing, Design & Development, Webflow Development pre vraćanja (cene sakrivene).
- `jsonld-before.json`: schema obe servisne stranice pre vraćanja (bez `offers`).
- `jsonld-to-restore.json`: schema koja je vraćena (= `backup/schema/services-prices-before-2026-11-20.json`; razlika prema `jsonld-before.json` je samo `offers` i „Starting at $5,000.“ u opisu Webflow Development).
- Elementi kojima je uključen Visibility: isti spisak kao `backup/elements/prices-hidden-2026-11-20.json` (9 na Services, 6 na Pricing). Home element `af7570da-…-4a4e16c3f95d` više ne postoji: tim je 25.11. upisao nove cene na Home, one nisu menjane.
- `prices-scan-before.json` / `prices-scan-after.json`: svaki iznos u dolarima iz teksta i schema-e na 43 objavljene stranice, pre i posle (`prices-scan.py`).

Vraćanje u stanje bez cena: Visibility isključen na istih 15 elemenata i schema iz `jsonld-before.json`.
