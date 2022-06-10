---
"astro-sitemap": minor
---

# Key differences

## New Features

- `serialize`: function to control sitemap output;
- `entryLimit`: to split up large sitemap;
- `createLinkInHead`: add link to sitemap into `<head>` section of generated pages.

## Drops

The `outfile` option is dropped to make split up.  

Now the integration generates one `sitemap-index.xml` and several `sitemap-{i}.xml` if needed.
