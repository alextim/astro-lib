---
'astro-sitemap': minor
---

### Minor changes

- The external config logic is implemented using [@proload/core](https://github.com/natemoo-re/proload) as well as [Astro](https://github.com/withastro/astro). Typescript configs are supported now.

- The *changefreq* option property type changed from the `ChangeFreq` type to the `EnumChangeFreq` enum to make it compatible with [sitemap](https://github.com/ekalinin/sitemap.js).

### Patch changes

- chore: deps update
