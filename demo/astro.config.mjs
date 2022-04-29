import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import config from './site.config.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-robots-txt' working with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          disallow: config.disableIndexing ? '/' : '',
        },
      ],
    }),
    sitemap(),
  ],
});
