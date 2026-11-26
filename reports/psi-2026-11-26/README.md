# PageSpeed Insights, staging, 26.11.2026

PageSpeed Insights API v5 (Lighthouse 13.6.0), 42 indexable pages (`notes/audit-urls-staging.txt`), mobile + desktop, one run each.
`summary.json`: scores (performance, accessibility, best-practices, seo) and LCP, TBT, CLS, FCP, Speed Index per page and strategy.
SEO 66 everywhere = staging robots.txt (`Disallow: /`), goes away on the real domain.

Slow LCP elements found (mobile):
- Let's talk 15.1 s: hero subtitle `p.hero_subtitle` (fade in, data-reveal-early).
- Service pages 6.3-6.4 s: decorative `img.svc-hero_shape` (SVG, loading=lazy).
- Careers 6.0 s: button label `span.btn-shift_text` (created by the button script; render delay 2.5 s).
- Our Work 5.9 s: first slider image (eager, no fetchpriority, load delay 0.9 s).
- Ballerine 5.9 s: case hero image (eager + high priority, fade kept by decision, render delay 1.7 s).
- Resources 5.1 s: hero background `insights-hero-bg.avif` (loading=lazy).
- Blog posts 5.1-5.5 s on 6 posts: hero background `insights-hero-bg.avif` (eager), render delay ~1.1 s.
