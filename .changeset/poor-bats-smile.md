---
"astro-robots-txt": patch
---

fix: `sitemap.xml` -> `sitemap-index.xml`,

because the output file name of **@astrojs/sitemap** >=0.2.0 is `sitemap-index.xml`.
