import { SitemapItemLoose } from 'sitemap';
import type { SitemapOptions } from './index';

const STATUS_CODE_PAGE_REGEXP = /\/[0-9]{3}\/?$/;

/** Construct sitemap.xml given a set of URLs */
export function generateSitemap(pages: string[], opts: SitemapOptions) {
  const { changefreq, priority: prioritySrc, lastmod: lastmodSrc, locales } = opts || {};
  // TODO: find way to respect <link rel="canonical"> URLs here
  const urls = [...pages].filter((url) => !STATUS_CODE_PAGE_REGEXP.test(url));
  urls.sort((a, b) => a.localeCompare(b, 'en', { numeric: true })); // sort alphabetically so sitemap is same each time

  const lastmod = lastmodSrc?.toISOString();
  const priority = typeof prioritySrc === 'number' ? prioritySrc : undefined;

  const urlData = urls.map((url) => {
    const result: SitemapItemLoose = {
      url,
      lastmod,
      priority,
      changefreq,
    };
    return result;
  });

  return urlData;
}
