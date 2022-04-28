# Demo for astro-robots-txt integration

This simple demo shows how to use the additional configuration to allow or disallow indexing.

The _site.config.mjs_ file exports singe flag named `preventIndexing`.

This flag is used in two places:

- _astro.config.mjs_:  in **astro-robots-txt** integration options to set a pattern for `disallow` in _robots.txt_;
- _index.astro_:  to set the robots meta in the page's `<head>` section.
