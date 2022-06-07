const canonicalURL = 'https://example.com';
/** @type {import('astro-sitemap').SitemapOptions} */
const sitemapConfig = {
  filter: (page) => !/exclude-this/.test(page), // exclude pages from sitemap
  customPages: [`${canonicalURL}/virtual-one.html`, `${canonicalURL}/virtual-two.html`],
  canonicalURL,

  outfile: 'custom-sitemap.xml',

  // sitemap specific
  changefreq: 'monthly',
  lastmod: new Date(),
  priority: 0.8,
};

export default sitemapConfig;
