import type { RobotsTxtOptions } from './index';

export const ROBOTS_TXT_CONFIG_DEFAULTS: RobotsTxtOptions & any = {
  sitemap: true,
  policy: [
    {
      allow: '/',
      userAgent: '*',
    },
  ],
  sitemapBaseFileName: 'sitemap-index',
};
