import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    robotsTxt({
      host: 'example.com',
      sitemap: [
        'https://example.com/main-sitemap.xml',
        'https://example.com/images-sitemap.xml'
      ],
      policy: [
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/search'],
          crawlDelay: 2,
        },
        {
          userAgent: 'OtherBot',
          allow: ['/allow-for-all-bots', '/allow-only-for-other-bot'],
          disallow: ['/admin', '/login'],
          crawlDelay: 2,
        },
        {
          userAgent: '*',
          allow: '/',
          disallow: '/search',
          crawlDelay: 10,
          cleanParam: 'ref /articles/',
        },
      ],
    }),
  ],
});
