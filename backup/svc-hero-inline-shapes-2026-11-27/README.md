# Service Hero: oblici kao inline SVG (27.11.2026), rezerva

Stanje pre izmene komponente **Service Hero** (`4e3b548d-a974-4137-1ebd-5e172242a366`, 4 instance: Design & Development, Webflow Development, SEO & AEO, Growth).

- `published/`: objavljeni HTML 4 servisne stranice pre izmene.
- `shapes-svg/`: 12 SVG fajlova oblika (3 po stranici), tačno kako su bili na CDN-u.
- `shots-before/`: hero na 390, 768 i 1440 px posle animacije oblika.
- Struktura pre izmene: `.svc-hero_shapes` (div, aria-hidden) sa 3 Image elementa (`…a368`, `…a369`, `…a36a`), klasa `svc-hero_shape`, atributi `aria-hidden="true" loading="eager" fetchpriority="high"`, alt „Decorative shape“, slike iz propova:
  - Shape 1 `b243bd3f-ab86-df35-e8ab-30b8aab558b8` (podrazumevano `6ad7ddc21aae68e820dc29a5`, launch-shape-1)
  - Shape 2 `f7d004af-14e3-eff1-274b-5374cf2d86ca` (podrazumevano `6ad7ddc23a35a60cfa7506f0`, launch-shape-2)
  - Shape 3 `12a7a16c-6323-b507-a4c9-f123617cdd63` (podrazumevano `6ad7ddc22d0af8df4663fe8a`, launch-shape-3)
- Vrednosti po stranici (iz objavljenog HTML-a): D&D launch-shape-1/2/3, Webflow Development build-shape-1/2/3, SEO & AEO seo-shape-1/2/3, Growth plus-shape-1/2/3 (ID-jevi asseta su u imenima fajlova u `shapes-svg/`).

Vraćanje: u komponenti vratiti 3 Image elementa sa klasom `svc-hero_shape` i istim atributima, napraviti Image propove i vezati ih, na instancama postaviti asset ID-jeve iz `shapes-svg/`.
