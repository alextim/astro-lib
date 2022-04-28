import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import config from './site.config.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          disallow: config.preventIndexing ? '/' : '',
        },
      ],
    }),
    sitemap(),
  ],
});
