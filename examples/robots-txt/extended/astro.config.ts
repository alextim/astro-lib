import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

//
// The external config is used.
// So, we commented all below.
//
/*
import siteConfig from './site.config.mjs';

const robotsConfig = {
  policy: [
    {
      userAgent: '*',
      // The next line enables or disables the crawling on the `robots.txt` level
      disallow: siteConfig.disableIndexing ? '/' : '',
    },
  ],
};
*/

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
    sitemap(),
    robotsTxt(),
    // robotsTxt(robotsConfig),
  ],
});
