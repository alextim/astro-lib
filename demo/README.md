# Demo for astro-robots-txt integration

This simple demo shows how to use the additional configuration to allow or disallow indexing.

The _site.config.mjs_ file exports singe flag named `disableIndexing`.

This flag is used in two places:

- _astro.config.mjs_:  in the **astro-robots-txt** integration options to set a pattern for `disallow` in a _robots.txt_;
- _index.astro_:  to set the robots meta in the page's `<head>` section.
