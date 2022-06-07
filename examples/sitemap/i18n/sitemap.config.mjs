const canonicalURL = 'https://example.com';
/** @type {import('astro-sitemap').SitemapOptions} */
const sitemapConfig = {
  filter: (page) => !/404/.test(page), // exclude 404 pages
  customPages: [`${canonicalURL}/virtual-one.html`, `${canonicalURL}/virtual-two.html`],
  canonicalURL,

  // added
  locales: { en: 'en-US' },
  outfile: 'custom-sitemap.xml',

  // sitemap specific
  changefreq: 'monthly',
  lastmod: new Date(),
  priority: 0.8,
};

export default sitemapConfig;
