import type { SitemapOptions } from '../index';
import { validateOpts } from '../validate-opts';

const site = 'https://example.com';

describe('test validateOpts', () => {
  it('site = undefined, should throw', () => {
    expect(() => validateOpts(undefined, {})).toThrowError();
  });

  it('site = "", should throw', () => {
    expect(() => validateOpts('', {})).toThrowError();
  });

  // opts
  it('opts = {}, should not throw', () => {
    expect(() => validateOpts(site, {})).not.toThrow();
  });
  it('opts = undefined, should not throw', () => {
    expect(() => validateOpts(site, undefined)).not.toThrow();
  });

  // filter
  it('filter = func, should not throw', () => {
    const opts = {
      filter: () => {},
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('filter is not func, should throw', () => {
    const opts = {
      filter: {},
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // customPages
  it('customPages = [], should not throw', () => {
    const opts = {
      customPages: [],
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('customPages = [""], should throw', () => {
    const opts = {
      customPages: [''],
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('customPages = [1], should throw', () => {
    const opts = {
      customPages: [1],
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('customPages = ["abc"], should throw', () => {
    const opts = {
      customPages: ['abc'],
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('customPages = ["http://abc"], should not throw', () => {
    const opts = {
      customPages: ['http://abc'],
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // canonicalURL
  it('canonicalURL = undefined, should not throw', () => {
    const opts = {
      canonicalURL: undefined,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('canonicalURL = "", should throw', () => {
    const opts = {
      canonicalURL: '',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('canonicalURL = "abc", should throw', () => {
    const opts = {
      canonicalURL: 'abc',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('canonicalURL = 1, should throw', () => {
    const opts = {
      canonicalURL: 1,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('canonicalURL = "http://abc", should not throw', () => {
    const opts = {
      canonicalURL: 'http://abc',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // site && canonicalURL
  it('site = ``, opts = undefined should throw', () => {
    const opts = undefined;
    expect(() => validateOpts('', opts as unknown as SitemapOptions)).toThrow(
      'Required `site` astro.config option or `canonicalURL` integration option',
    );
  });
  it('site = ``, opts = {} should throw', () => {
    const opts = {};
    expect(() => validateOpts('', opts as unknown as SitemapOptions)).toThrow(
      'Required `site` astro.config option or `canonicalURL` integration option',
    );
  });
  it('site = ``, canonicalURL = `` should throw', () => {
    const opts = {
      canonicalURL: '',
    };
    expect(() => validateOpts('', opts as unknown as SitemapOptions)).toThrow();
  });
  it('site = ``, canonicalURL = `https://abc` should not throw', () => {
    const opts = {
      canonicalURL: 'https://abc',
    };
    expect(() => validateOpts('', opts as unknown as SitemapOptions)).not.toThrow();
  });

  // defaultLocale
  it('defaultLocale is empty, should throw', () => {
    const opts = {
      defaultLocale: '',
      locales: { en: 'en' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('defaultLocale is number, should throw', () => {
    const opts = {
      defaultLocale: 0,
      locales: { en: 'en' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });

  it('defaultLocale is Ok, locales is empty, should throw', () => {
    const opts = {
      defaultLocale: 'en',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow(
      'Provide both `defaultLocale` and `locales`, also `defaultLocale` must exists as `locales` key',
    );
  });
  it('defaultLocale do no`t exist in locales, should throw', () => {
    const opts = {
      defaultLocale: 'fr',
      locales: { en: 'en' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow(
      'Provide both `defaultLocale` and `locales`, also `defaultLocale` must exists as `locales` key',
    );
  });

  it('defaultLocale & locales are OK, should not throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: 'en' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // locales
  it('locales = {}, should not throw', () => {
    const opts = {
      locales: {},
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('locales = value is undefined, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: undefined },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('locales = value is empty, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: '' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('locales = value < 2, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: 1 },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });

  it('locales = value contain space, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: 'zh cmn' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow('Only English alphabet symbols and hyphen allowed');
  });
  it('locales = value contain non english, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: 'zh-фы' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow('Only English alphabet symbols and hyphen allowed');
  });
  it('locales = value = `zh-cmn-Hans_CN`, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: 'zh-cmn-Hans_CN' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow('Only English alphabet symbols and hyphen allowed');
  });

  it('locales = value = `zh-cmn-Hans-CN`, should not throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { en: 'zh-cmn-Hans-CN' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  it('locales = key is empty, should throw', () => {
    const opts = {
      defaultLocale: 'en',
      locales: { '': 'zh-cmn-Hans-CN' },
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // outfile
  it('`outfile` is `abc`, should not throw', () => {
    const opts = {
      outfile: 'abc',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`outfile` is `/abc`, should throw', () => {
    const opts = {
      outfile: '/abc',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`outfile` is ``, should not throw', () => {
    const opts = {
      outfile: '',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`outfile` is 1, should throw', () => {
    const opts = {
      outfile: 1,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });

  // changefreq
  it('`changefreq` is undefined, should not throw', () => {
    const opts = {
      changefreq: undefined,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`changefreq` is "", should throw', () => {
    const opts = {
      changefreq: '',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`changefreq` is "abc", should throw', () => {
    const opts = {
      changefreq: 'abc',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`changefreq` is "weekly", should not throw', () => {
    const opts = {
      changefreq: 'weekly',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // lastmod
  it('`lastmod` is undefined, should not throw', () => {
    const opts = {
      lastmod: undefined,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`lastmod` is "", should throw', () => {
    const opts = {
      lastmod: '',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`lastmod` is "2012-01-01", should throw', () => {
    const opts = {
      lastmod: '2012-01-01',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`lastmod` is new Date(), should not throw', () => {
    const opts = {
      lastmod: new Date(),
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });

  // priority
  it('`priority` is undefined, should not throw', () => {
    const opts = {
      priority: undefined,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`priority` is "", should throw', () => {
    const opts = {
      priority: '',
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`priority` is -1, should throw', () => {
    const opts = {
      priority: -1,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`priority` is 1.1, should throw', () => {
    const opts = {
      priority: 1.1,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).toThrow();
  });
  it('`priority` is 0, should not throw', () => {
    const opts = {
      priority: 0,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`priority` is 0.5, should not throw', () => {
    const opts = {
      priority: 0.5,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
  it('`priority` is 1, should not throw', () => {
    const opts = {
      priority: 1,
    };
    expect(() => validateOpts(site, opts as unknown as SitemapOptions)).not.toThrow();
  });
});
