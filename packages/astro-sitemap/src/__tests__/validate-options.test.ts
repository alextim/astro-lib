import type { SitemapItem, SitemapOptions } from '../index';
import { validateOptions } from '../validate-options';
import { SITEMAP_CONFIG_DEFAULTS } from '../config-defaults';

const site = 'https://example.com';

describe('test validateOptions', () => {
  // opts
  it('opts = {}, should not throw', () => {
    const fn = () => validateOptions(site, {});
    expect(fn).not.toThrow();
    expect(fn()).toEqual(SITEMAP_CONFIG_DEFAULTS);
  });
  it('opts = undefined, should not throw', () => {
    const fn = () => validateOptions(site, undefined);
    expect(fn).not.toThrow();
    expect(fn()).toEqual(SITEMAP_CONFIG_DEFAULTS);
  });

  // filter
  it('filter = valid func, should not throw', () => {
    const opts = {
      filter(s: string) {
        return s ? true : false;
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('filter = func(void):void, should not throw', () => {
    const opts = {
      filter(): void {},
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('filter = func(n):bool, should throw', () => {
    const opts = {
      filter(s: number) {
        return s ? true : false;
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('filter = func(s,s):bool, should throw', () => {
    const opts = {
      filter(s: string, s2: string) {
        return s || s2 ? true : false;
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('filter = func(s):s, should throw', () => {
    const opts = {
      filter(s: string) {
        return s;
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('filter is {}, should throw', () => {
    const opts = {
      filter: {},
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('filter is string, should throw', () => {
    const opts = {
      filter: 'abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // serialize
  it('serialize = func, should not throw', () => {
    const opts = {
      serialize: () => {},
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('serialize = async func, should not throw', () => {
    const opts: SitemapOptions = {
      serialize: async () => {
        return {} as SitemapItem;
      },
    };
    expect(() => validateOptions(site, opts)).not.toThrow();
  });
  it('serialize = async func, should not throw', () => {
    const opts = {
      serialize: async () => {
        return 1;
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('serialize is not func, should throw', () => {
    const opts = {
      serialize: {},
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // customPages
  it('customPages = [], should not throw', () => {
    const opts = {
      customPages: [],
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('customPages = [""], should throw', () => {
    const opts = {
      customPages: [''],
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('customPages = [1], should throw', () => {
    const opts = {
      customPages: [1],
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('customPages = ["abc"], should throw', () => {
    const opts = {
      customPages: ['abc'],
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('customPages = ["http://abc"], should not throw', () => {
    const opts = {
      customPages: ['http://abc'],
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // canonicalURL
  it('canonicalURL = undefined, should not throw', () => {
    const opts = {
      canonicalURL: undefined,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('canonicalURL = "", should throw', () => {
    const opts = {
      canonicalURL: '',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('canonicalURL = "abc", should throw', () => {
    const opts = {
      canonicalURL: 'abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('canonicalURL = 1, should throw', () => {
    const opts = {
      canonicalURL: 1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('canonicalURL = "http://abc", should not throw', () => {
    const opts = {
      canonicalURL: 'http://abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // site && canonicalURL
  const MSG_SITE_OR_CANONICALURL_REQUIRED = 'Required `site` astro.config option or `canonicalURL` integration option';
  it('site = undefined, opts = undefined should throw', () => {
    const opts = undefined;
    expect(() => validateOptions(undefined, opts as unknown as SitemapOptions)).toThrow(MSG_SITE_OR_CANONICALURL_REQUIRED);
  });
  it('site = undefined, opts = {} should throw', () => {
    const opts = {};
    expect(() => validateOptions(undefined, opts as unknown as SitemapOptions)).toThrow(MSG_SITE_OR_CANONICALURL_REQUIRED);
  });
  it('site = undefined, opts = {canonicalURL: undefined} should throw', () => {
    const opts = { canonicalURL: undefined };
    expect(() => validateOptions(undefined, opts as unknown as SitemapOptions)).toThrow(MSG_SITE_OR_CANONICALURL_REQUIRED);
  });
  it('site = ``, opts = undefined should throw', () => {
    const opts = undefined;
    expect(() => validateOptions('', opts as unknown as SitemapOptions)).toThrow(MSG_SITE_OR_CANONICALURL_REQUIRED);
  });
  it('site = ``, opts = {} should throw', () => {
    const opts = {};
    expect(() => validateOptions('', opts as unknown as SitemapOptions)).toThrow(MSG_SITE_OR_CANONICALURL_REQUIRED);
  });
  it('site = undefined, canonicalURL = `https://abc` should not throw', () => {
    const opts = {
      canonicalURL: 'https://abc',
    };
    const fn = () => validateOptions(undefined, opts as unknown as SitemapOptions);
    expect(fn).not.toThrow();
    expect(fn()).toEqual({ ...SITEMAP_CONFIG_DEFAULTS, ...opts });
  });
  it('site = "", canonicalURL = `https://abc` should not throw', () => {
    const opts = {
      canonicalURL: 'https://abc',
    };
    const fn = () => validateOptions('', opts as unknown as SitemapOptions);
    expect(fn).not.toThrow();
    expect(fn()).toEqual({ ...SITEMAP_CONFIG_DEFAULTS, ...opts });
  });

  // i18n
  it('i18n is {}, should throw', () => {
    const opts = {
      i18n: {},
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('i18n is [], should throw', () => {
    const opts = {
      i18n: [],
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('i18n is "", should throw', () => {
    const opts = {
      i18n: '',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // defaultLocale
  it('defaultLocale is empty, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: '',
        locales: { en: 'en' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('defaultLocale is number, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 0,
        locales: { en: 'en' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  it('defaultLocale is Ok, locales is empty, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('defaultLocale do not exist in locales, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'fr',
        locales: { en: 'en' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow('`defaultLocale` must exist in `locales` keys');
  });

  it('defaultLocale & locales are OK, should not throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // locales
  it('locales = {}, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: {},
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('locales = value is undefined, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: undefined },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('locales = value is empty, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: '' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('locales = value < 2, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: 1 },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  it('locales = value contain space, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'zh cmn' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow('Only English alphabet symbols and hyphen allowed');
  });
  it('locales = value contain non english, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'zh-фы' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow('Only English alphabet symbols and hyphen allowed');
  });
  it('locales = value = `zh-cmn-Hans_CN`, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'zh-cmn-Hans_CN' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow('Only English alphabet symbols and hyphen allowed');
  });

  it('locales = value = `zh-cmn-Hans-CN`, should not throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'zh-cmn-Hans-CN' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  it('locales = key is empty, should throw', () => {
    const opts = {
      i18n: {
        defaultLocale: 'en',
        locales: { '': 'zh-cmn-Hans-CN' },
      },
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // unknown
  it('`unknown` is `abc`, should throw', () => {
    const opts = {
      unknown: 'abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // entryLimit
  it('`entryLimit` is 1, should not throw', () => {
    const opts = {
      entryLimit: 1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`entryLimit` is -1, should throw', () => {
    const opts = {
      entryLimit: -1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`entryLimit` is string, should throw', () => {
    const opts = {
      entryLimit: 'abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // createLinkInHead
  it('`createLinkInHead` is true, should not throw', () => {
    const opts = {
      createLinkInHead: true,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`createLinkInHead` is 1, should throw', () => {
    const opts = {
      createLinkInHead: 1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`createLinkInHead` is string, should throw', () => {
    const opts = {
      createLinkInHead: 'abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // changefreq
  it('`changefreq` is undefined, should not throw', () => {
    const opts = {
      changefreq: undefined,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`changefreq` is "", should throw', () => {
    const opts = {
      changefreq: '',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`changefreq` is "abc", should throw', () => {
    const opts = {
      changefreq: 'abc',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`changefreq` is "weekly", should not throw', () => {
    const opts = {
      changefreq: 'weekly',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // lastmod
  it('`lastmod` is undefined, should not throw', () => {
    const opts = {
      lastmod: undefined,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`lastmod` is "", should throw', () => {
    const opts = {
      lastmod: '',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`lastmod` is "2012-01-01", should throw', () => {
    const opts = {
      lastmod: '2012-01-01',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`lastmod` is new Date(), should not throw', () => {
    const opts = {
      lastmod: new Date(),
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // priority
  it('`priority` is undefined, should not throw', () => {
    const opts = {
      priority: undefined,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`priority` is "", should throw', () => {
    const opts = {
      priority: '',
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`priority` is -1, should throw', () => {
    const opts = {
      priority: -1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`priority` is 1.1, should throw', () => {
    const opts = {
      priority: 1.1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`priority` is 0, should not throw', () => {
    const opts = {
      priority: 0,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`priority` is 0.5, should not throw', () => {
    const opts = {
      priority: 0.5,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`priority` is 1, should not throw', () => {
    const opts = {
      priority: 1,
    };
    expect(() => validateOptions(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
});
