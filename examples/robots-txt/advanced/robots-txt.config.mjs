import siteConfig from './site.config.mjs';

/** @type {import('astro-robots-txt').RobotsTxtOptions} */
const robotsConfig = {
  policy: [
    {
      userAgent: '*',
      // The next line enables or disables the crawling on the `robots.txt` level
      disallow: siteConfig.disableIndexing ? '/' : '',
    },
  ],
};

export default robotsConfig;
