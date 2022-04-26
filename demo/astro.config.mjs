import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    robotsTxt({
      sitemap: 'https://aaaa',
      host: 'some.com',
      policy: [
        { userAgent: '*', crawlDelay: 77, disallow: ['/a', '/b'] },
        { userAgent: 'gg', allow: ['/c', '/d'] },
      ],
    }),
  ],
});
