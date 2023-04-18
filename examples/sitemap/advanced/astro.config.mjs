import { defineConfig } from 'astro/config';
import sitemap, { EnumChangefreq } from 'astro-sitemap';

const canonicalURL = 'http://localhost:3000';

const sitemapConfig = {
  canonicalURL,
  customPages: [`${canonicalURL}/virtual-one.html`, `${canonicalURL}/virtual-two.html`, `${canonicalURL}/virtual-3/`],

  filter: (page) => !/filter-this/.test(page), // exclude pages from sitemap
  exclude: ['404', 'exclude-*'],

  // The integration creates a separate `sitemap-${i}.xml` file for each batch of 2, then adds this file to index - `sitemap-index.xml`.
  entryLimit: 2, // default - 45000

  // print date not time
  lastmodDateOnly: true,

  // style to transform to another format, ignored by search engines
  xslUrl: `${canonicalURL}/sitemap.xsl`,

  // set the xml namespace
  xmlns: {
    xhtml: true,
    news: true,
    image: true,
    video: true,
    custom: [
      'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    ],
  },

  // sitemap specific
  changefreq: EnumChangefreq.YEARLY,
  lastmod: new Date('2019-12-31'),
  priority: 0.4,

  serialize(item) {
    if (/virtual-one/.test(item.url)) {
      return undefined;
    }

    if (/special-page/.test(item.url)) {
      item.changefreq = EnumChangefreq.DAILY;
      item.lastmod = new Date().toISOString();
      item.priority = 0.9;

      item.img = [
        {
          url: 'http://test.com/img1.jpg',
          caption: 'An image',
          title: 'The Title of Image One',
          geoLocation: 'London, United Kingdom',
          license: 'https://creativecommons.org/licenses/by/4.0/',
        },
        {
          url: 'http://test.com/img2.jpg',
          caption: 'Another image',
          title: 'The Title of Image Two',
          geoLocation: 'London, United Kingdom',
          license: 'https://creativecommons.org/licenses/by/4.0/',
        },
      ];
      item.video = [
        {
          thumbnail_loc: 'http://test.com/tmbn1.jpg',
          title: 'A video title',
          description: 'This is a video',
        },
        {
          thumbnail_loc: 'http://test.com/tmbn2.jpg',
          title: 'A video with an attribute',
          description: 'This is another video',
          player_loc: 'http://www.example.com/videoplayer.mp4?video=123',
          'player_loc:autoplay': 'ap=1',
          'player_loc:allow_embed': 'yes',
        },
      ];
    }
    return item;
  },

  createLinkInHead: false,
};

// https://astro.build/config
export default defineConfig({
  site: 'https://not-used-by-integration.com', // 'canonicalURL' from external config is used instead
  integrations: [sitemap(sitemapConfig)],
});
