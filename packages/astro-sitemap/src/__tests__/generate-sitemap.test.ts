import { generateSitemap } from '../generate-sitemap';
import type { SitemapOptions } from '../index';

const finalSiteUrl = 'https://example.com';
const locales = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
};
const defaultLocale = 'en';
const options: SitemapOptions = {
  i18n: {
    locales,
    defaultLocale,
  },
};

describe('test generateSitemap', () => {
  /*
  it('smoke, should throw', () => {
    expect(() => generateSitemap([finalSiteUrl], '', options)).toThrow();
  });
  it('empty pages, should be equal 0', () => {
    const urlData = generateSitemap([], finalSiteUrl, options);
    expect(urlData.length).toEqual(0);
  });
  it('no locales, should be equal', () => {
    const pages = [
      `${finalSiteUrl}`,
      `${finalSiteUrl}/abc`,
      `${finalSiteUrl}/def`,
      'https://not-our/a',
    ];
    const urlData = generateSitemap(pages, finalSiteUrl, options);
    expect(urlData.length).toEqual(pages.length);
    for (let i = 0; i < pages.length; i++) {
      expect(urlData[i].url).toBe(pages[i]);
    }
  });
  */
  it('locales, should be equal', () => {
    const pages = [
      `${finalSiteUrl}`,
      `${finalSiteUrl}/abc`,
      `${finalSiteUrl}/es`,
      `${finalSiteUrl}/es/abc`,
      `${finalSiteUrl}/es/abc/def`,
      `${finalSiteUrl}/fr`,
      `${finalSiteUrl}/zn/abc`,
      'https://not-our/a',
    ];
    const urlData = generateSitemap(pages, finalSiteUrl, options);
    expect(urlData.length).toEqual(pages.length);
    for (let i = 0; i < pages.length; i++) {
      expect(urlData[i].url).toBe(pages[i]);
    }
    expect(urlData[0].links).toBeDefined();
    expect(urlData[0]?.links?.length).toEqual(3);

    expect(urlData[1].links).toBeDefined();
    expect(urlData[1]?.links?.length).toEqual(2);

    expect(urlData[2].links).toBeDefined();
    expect(urlData[2]?.links?.length).toEqual(3);

    expect(urlData[3].links).toBeDefined();
    expect(urlData[3]?.links?.length).toEqual(2);

    expect(urlData[4].links).toBeUndefined();

    expect(urlData[5].links).toBeDefined();
    expect(urlData[5]?.links?.length).toEqual(3);

    expect(urlData[6].links).toBeUndefined();

    expect(urlData[7].links).toBeUndefined();
  });
});
