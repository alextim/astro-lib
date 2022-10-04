import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://not-used-by-integration.com', // 'canonicalURL' from external config is used instead
  integrations: [sitemap()],
});
