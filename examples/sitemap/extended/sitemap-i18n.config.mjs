const canonicalURL = 'https:/example.com';
/** @type {import('astro-sitemap-i18n').SitemapOptions} */
const sitemapConfig = {
  filter: (page) => {
    return /404/.test(page);
  },
  customPages: [`${canonicalURL}/virtual-one.html`, `${canonicalURL}/virtual-two.html`, `${canonicalURL}/virtual-three.html`],
  canonicalURL,

  // added
  // locales?: string[];
  outfile: 'my-sytemap.xml',

  // sitemap specific
  changefreq: 'monthly',
  lastmod: new Date(),
  priority: 0.7,
};

export default sitemapConfig;
