import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import robotsConfig from './robots-txt.config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    sitemap(),
    robotsTxt(robotsConfig),
    // robotsTxt(robotsConfig),
  ],
});
