# Webflow SEO backup

- Date: 2026-11-10
- Site id: `6aba6bc07d6279b4b561771f` (staging: nues-v2-0b5daf042c4fc951d8bc2555a97d416.webflow.io)
- Method: read-only Webflow MCP calls (get_/list_/query_ only). Nothing in Webflow was changed or published.
- Purpose: a snapshot of the current SEO-relevant state, so later changes can be reverted.

## Files

| File | Contents | Source call |
|---|---|---|
| `pages.json` | All 30 pages as full objects: id, title, slug, publishedPath, draft, archived, collectionId, parentId, seo, openGraph and the rest | `data_pages_tool list_pages` (limit 100) |
| `pages-jsonld.json` | JSON-LD schema markup for all 30 pages, primary locale. `jsonLdSchema` holds parsed objects and `rawJsonLdSchema` holds raw strings, such as the Blog template, which contains CMS bindings. 8 pages have markup. | `data_pages_tool query_pages_schema_markup` |
| `site-code.json` | Site-wide custom code: `head`, `footer` (raw freeform blocks), `freeformRaw` (the API response as returned), `registeredScripts`, `appliedScripts` | `data_scripts_tool get_site_freeform_code`, `get_registered_scripts`, `get_site_scripts` |
| `page-code/<slug>.json` | One file per page (30): pageId, title, slug, publishedPath, collectionId, `head`, `footer`, `appliedScripts`. Home has no slug, so its file is `6aba6bc07d6279b4b56176f1.json`. | `data_scripts_tool get_page_freeform_code`, `get_page_scripts` |
| `cms-schema.json` | All 11 collections with their full field definitions: id, slug, type, displayName, helpText, isRequired, validations, and field groups | `data_cms_tool get_collection_list` + `get_collection_details` |
| `cms-seo.json` | For every item in the 11 collections (129 items): id, cmsLocaleId, isDraft, isArchived, lastPublished, lastUpdated, name, slug, and only the SEO-related fieldData. That means meta-title, meta-description, fields whose slug contains meta/seo/og/thumbnail/main-image/cover/alt, and every Image/MultiImage field stored as `{fileId, url, alt}`. Rich text bodies are not stored. | `data_cms_tool list_collection_items` (limit 100; no collection needed paging) |

`html-snapshot-2026-11-10.tar.gz` was not produced by this export. It holds a separate snapshot of rendered HTML pages.

## Notes

- `get_page_scripts` returned 404 `resource_not_found` ("Custom code block not found") for every page. That means no registered scripts are applied at page level, so `appliedScripts` is `[]` in each page file. At site level, one registered script is applied: `nuescmsderived` v1.0.0 in the footer.
- Head and footer code was checked against the published staging HTML. Static pages match verbatim. The Our Works template head contains `{{wf ...}}` CMS bindings, which Webflow renders per item. Its literal parts match `/our-work/ballerine` in order.

## Not exported (no API access on this plan)

- **301 redirects**: Enterprise-only API, returns 403 `not_enterprise_plan_site`.
- **robots.txt**: Enterprise-only API, returns 403 `not_enterprise_plan_site`.
- **Sitemap inclusion flags** (per page and per collection): return 403 on this plan.
- **Site-level SEO settings** such as the global canonical URL and the auto-sitemap toggle have no API. Record them by hand from Site settings > SEO if needed.
