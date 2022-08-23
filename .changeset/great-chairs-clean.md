---
"astro-sitemap": minor
"astro-webmanifest": minor
---

- deps update: Astro v1.0.
- Breaking: `node-html-parser` package is dropped to speed up the generated pages post processing. The link tags will not be inserted if generated page doesn't contain `<head>` section, no automatic `<head>` creation.
