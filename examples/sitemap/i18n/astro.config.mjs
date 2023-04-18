import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

import { i18n } from './src/i18n.mjs';

const sitemapConfig = {
  // added
  i18n: {
    defaultLocale: i18n.defaultLocale,
    locales: Object.entries(i18n.locales).reduce((prev, [locale, { lang }]) => {
      prev[locale] = lang;
      return prev;
    }, {}),
  },
};

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(sitemapConfig)],
});
