import type { SitemapOptions } from './index.js';

export const SITEMAP_CONFIG_DEFAULTS: SitemapOptions & any = {
  createLinkInHead: true,
  entryLimit: 45000,
  xmlns: {
    xhtml: true,
  },
};
