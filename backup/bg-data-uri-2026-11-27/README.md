# Pozadina hero sekcije na telefonu upisana u kod stranice (27.11.2026), rezerva

- `resources-page-head-before.html`, `home-head-before.html`: head kod stranica pre izmene (bio je isti kao na sajtu, provereno).
- Izmena: na kraj head koda dodat jedan `<style>` blok. Na ekranima do 767 px slika pozadine dobija `content:url("data:...")` sa istom slikom (Resources: `insights-hero-bg` 1080 px, 1,6 KB; Home: `home-hero-bg-v3-hq` 1080 px, 6,6 KB). Fajlovi: `webflow-assets/perf/hero-bg/`.
- Vraćanje: head kod iz ovog foldera nazad na stranicu (Data API `set_page_freeform_code`), pa objava.
