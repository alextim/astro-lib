import type { RobotsTxtOptions } from './index';

export const SITEMAP_CONFIG_DEFAULTS: RobotsTxtOptions & any = {
  sitemap: true,
  policy: [
    {
      allow: '/',
      userAgent: '*',
    },
  ],
};
