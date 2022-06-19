import type { RobotsTxtOptions } from '../index';
import { validateOptions } from '../validate-options';
import { ROBOTS_TXT_CONFIG_DEFAULTS } from '../config-defaults';

const site = 'https://example.com';

describe('test validateOptions', () => {
  it('site = undefined, should throw', () => {
    expect(() => validateOptions(undefined, {})).toThrow();
  });

  it('site = "", should throw', () => {
    expect(() => validateOptions('', {})).toThrow();
  });

  it('opts = {}, should not throw', () => {
    const fn = () => validateOptions(site, {});
    expect(fn).not.toThrow();
    expect(fn()).toEqual(ROBOTS_TXT_CONFIG_DEFAULTS);
  });

  it('opts = undefined, should not throw ', () => {
    const fn = () => validateOptions(site, undefined);
    expect(fn).not.toThrow();
    expect(fn()).toEqual(ROBOTS_TXT_CONFIG_DEFAULTS);
  });

  // sitemap
  it('sitemap = true, should not throw', () => {
    const fn = () => validateOptions(site, { sitemap: true });
    expect(fn).not.toThrow();
    expect(fn()).toEqual(ROBOTS_TXT_CONFIG_DEFAULTS);
  });
  it('sitemap = false, should not throw', () => {
    const fn = () => validateOptions(site, { sitemap: false });
    expect(fn).not.toThrow();
    expect(fn()?.sitemap).toBeFalsy();
  });
  it('sitemap = "", should throw', () => {
    expect(() => validateOptions(site, { sitemap: '' })).toThrow();
  });
  it('sitemap = "aa", should throw', () => {
    expect(() => validateOptions(site, { sitemap: 'aa' })).toThrow();
  });
  it('sitemap = "ftp://aa", should throw', () => {
    expect(() => validateOptions(site, { sitemap: 'ftp://aa' })).toThrow();
  });
  it('sitemap = "http://aa", should not throw', () => {
    const fn = () => validateOptions(site, { sitemap: 'http://aa' });
    expect(fn).not.toThrow();
    expect(fn()?.sitemap).toBe('http://aa');
  });
  it('sitemap = "[]", should not throw', () => {
    const fn = () => validateOptions(site, { sitemap: [] });
    expect(fn).not.toThrow();
    expect(fn()?.sitemap).toEqual([]);
  });
  it('sitemap = "[``]", should throw', () => {
    expect(() => validateOptions(site, { sitemap: [''] })).toThrow();
  });
  it('sitemap = "[`aa`]", should throw', () => {
    expect(() => validateOptions(site, { sitemap: ['aa'] })).toThrow();
  });
  it('sitemap = "[`ftp://aa`]", should throw', () => {
    expect(() => validateOptions(site, { sitemap: ['ftp://aa'] })).toThrow();
  });
  it('sitemap = "[`http://aa`]", should not throw', () => {
    const fn = () => validateOptions(site, { sitemap: ['http://aa'] });
    expect(fn).not.toThrow();
    expect(fn()?.sitemap).toEqual(['http://aa']);
  });

  // host
  it('host is not valid, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc:1',
    };
    expect(() => validateOptions(site, options)).toThrow();
  });
  it('host is empty, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: '',
    };
    const fn = () => validateOptions(site, options);
    expect(fn).not.toThrow();
    const result = fn();
    expect(result?.sitemap).toBeFalsy();
    expect(result?.host).toBe('');
  });

  // policy
  it('policy = [], should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [],
    };
    expect(() => validateOptions(site, options)).toThrow();
  });
  it('userAgent is empty, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '' }],
    };
    expect(() => validateOptions(site, options)).toThrow();
  });

  // crawlDelay
  it('crawlDelay: 0, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 0 }],
    };
    const fn = () => validateOptions(site, options);
    expect(fn).not.toThrow();
    const result = fn();
    expect(result?.policy).toEqual(options.policy);
  });
  it('crawlDelay: undefined, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: undefined }],
    };
    const fn = () => validateOptions(site, options);
    expect(fn).not.toThrow();
    const result = fn();
    expect(result?.policy).toEqual(options.policy);
  });
  it('crawlDelay: negative, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: -10 }],
    };
    expect(() => validateOptions(site, options)).toThrow();
  });
  it('crawlDelay: 100/0, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 100 / 0 }],
    };
    expect(() => validateOptions(site, options)).toThrow();
  });
  it('crawlDelay: 34, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 34 }],
    };
    const fn = () => validateOptions(site, options);
    expect(fn).not.toThrow();
    const result = fn();
    expect(result?.policy).toEqual(options.policy);
  });

  // sitemapBaseFileName
  it('`sitemapBaseFileName` is `abc`, should not throw', () => {
    expect(() => validateOptions(site, { sitemapBaseFileName: 'abc' })).not.toThrow();
  });
  it('`sitemapBaseFileName` is `/abc`, should throw', () => {
    expect(() => validateOptions(site, { sitemapBaseFileName: '/abc' })).toThrow();
  });
  it('`sitemapBaseFileName` is ``, should throw', () => {
    expect(() => validateOptions(site, { sitemapBaseFileName: '' })).toThrow();
  });

  // transform
  it('transform = func, should not throw', () => {
    const opts = {
      transform: () => {},
    };
    expect(() => validateOptions(site, opts as unknown as RobotsTxtOptions)).not.toThrow();
  });
  it('transform = async func, should not throw', () => {
    const opts: RobotsTxtOptions = {
      transform: async () => {
        return 'test';
      },
    };
    expect(() => validateOptions(site, opts)).not.toThrow();
  });
  it('transform = async func, should not throw', () => {
    const opts = {
      transform: async () => {
        return 1;
      },
    };
    expect(() => validateOptions(site, opts as unknown as RobotsTxtOptions)).not.toThrow();
  });
  it('transform is not func, should throw', () => {
    const opts = {
      transform: {},
    };
    expect(() => validateOptions(site, opts as unknown as RobotsTxtOptions)).toThrow();
  });
});
