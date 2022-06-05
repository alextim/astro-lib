import type { RobotsTxtOptions } from '../index';
import { validateOpts } from '../validate-opts';

const site = 'https://example.com';

describe('test validateOpts', () => {
  it('site = undefined, should throw', () => {
    expect(() => validateOpts(undefined, {})).toThrowError();
  });

  it('site = "", should throw', () => {
    expect(() => validateOpts('', {})).toThrowError();
  });

  /**
   * sitemap
   */
  it('sitemap = true, should not throw', () => {
    expect(() => validateOpts(site, { sitemap: true })).not.toThrow();
  });
  it('sitemap = false, should not throw', () => {
    expect(() => validateOpts(site, { sitemap: false })).not.toThrow();
  });
  it('sitemap = "", should throw', () => {
    expect(() => validateOpts(site, { sitemap: '' })).toThrow();
  });
  it('sitemap = "aa", should throw', () => {
    expect(() => validateOpts(site, { sitemap: 'aa' })).toThrowError();
  });
  it('sitemap = "ftp://aa", should throw', () => {
    expect(() => validateOpts(site, { sitemap: 'ftp://aa' })).toThrowError();
  });
  it('sitemap = "http://aa", should not throw', () => {
    expect(() => validateOpts(site, { sitemap: 'http://aa' })).not.toThrow();
  });
  it('sitemap = "[]", should not throw', () => {
    expect(() => validateOpts(site, { sitemap: [] })).not.toThrow();
  });
  it('sitemap = "[``]", should throw', () => {
    expect(() => validateOpts(site, { sitemap: [''] })).toThrow();
  });
  it('sitemap = "[`aa`]", should throw', () => {
    expect(() => validateOpts(site, { sitemap: ['aa'] })).toThrowError();
  });
  it('sitemap = "[`ftp://aa`]", should throw', () => {
    expect(() => validateOpts(site, { sitemap: ['ftp://aa'] })).toThrowError();
  });
  it('sitemap = "[`http://aa`]", should not throw', () => {
    expect(() => validateOpts(site, { sitemap: ['http://aa'] })).not.toThrow();
  });

  /**
   * host
   */
  it('host is not valid, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc:1',
    };
    expect(() => validateOpts(site, options)).toThrowError();
  });
  it('host is empty, should be true', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: '',
    };
    expect(() => validateOpts(site, options)).not.toThrow();
  });

  /**
   * policy
   */
  it('policy = [], should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [],
    };
    expect(() => validateOpts(site, options)).toThrowError();
  });
  it('userAgent is empty, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '' }],
    };
    expect(() => validateOpts(site, options)).toThrowError();
  });

  // crawlDelay
  it('crawlDelay: 0, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 0 }],
    };
    expect(() => validateOpts(site, options)).not.toThrow();
  });
  it('crawlDelay: undefined, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: undefined }],
    };
    expect(() => validateOpts(site, options)).not.toThrow();
  });
  it('crawlDelay: negative, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: -10 }],
    };
    expect(() => validateOpts(site, options)).toThrowError();
  });
  it('crawlDelay: 100/0, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 100 / 0 }],
    };
    expect(() => validateOpts(site, options)).toThrowError();
  });
  it('crawlDelay: 34, should not throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 34 }],
    };
    expect(() => validateOpts(site, options)).not.toThrow();
  });
});
