import type { RobotsTxtOptions } from '../index';
import { isOptsValid } from '../is-opts-valid';

const site = 'https://example.com';

describe('test isOptsValid', () => {
  it('site = undefined, should throw', () => {
    expect(() => isOptsValid(undefined, {})).toThrowError();
  });

  it('site = "", should throw', () => {
    expect(() => isOptsValid('', {})).toThrowError();
  });

  /**
   * sitemap
   */
  it('sitemap = true, should return true', () => {
    expect(isOptsValid(site, { sitemap: true })).toBeTruthy();
  });
  it('sitemap = false, should return true', () => {
    expect(isOptsValid(site, { sitemap: false })).toBeTruthy();
  });
  it('sitemap = "", should return true', () => {
    expect(isOptsValid(site, { sitemap: '' })).toBeTruthy();
  });
  it('sitemap = "aa", should throw', () => {
    expect(() => isOptsValid(site, { sitemap: 'aa' })).toThrowError();
  });
  it('sitemap = "ftp://aa", should throw', () => {
    expect(() => isOptsValid(site, { sitemap: 'ftp://aa' })).toThrowError();
  });
  it('sitemap = "http://aa", should return true', () => {
    expect(isOptsValid(site, { sitemap: 'http://aa' })).toBeTruthy();
  });
  it('sitemap = "[]", should return true', () => {
    expect(isOptsValid(site, { sitemap: [] })).toBeTruthy();
  });
  it('sitemap = "[``]", should return true', () => {
    expect(isOptsValid(site, { sitemap: [''] })).toBeTruthy();
  });
  it('sitemap = "[`aa`]", should throw', () => {
    expect(() => isOptsValid(site, { sitemap: ['aa'] })).toThrowError();
  });
  it('sitemap = "[`ftp://aa`]", should throw', () => {
    expect(() => isOptsValid(site, { sitemap: ['ftp://aa'] })).toThrowError();
  });
  it('sitemap = "[`http://aa`]", should throw', () => {
    expect(isOptsValid(site, { sitemap: ['http://aa'] })).toBeTruthy();
  });

  /**
   * host
   */
  it('host is not valid, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc:1',
    };
    expect(() => isOptsValid(site, options)).toThrowError();
  });
  it('host is empty, should be true', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: '',
    };
    expect(isOptsValid(site, options)).toBeTruthy();
  });

  /**
   * policy
   */
  it('policy = [], should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [],
    };
    expect(() => isOptsValid(site, options)).toThrowError();
  });
  it('userAgent is empty, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '' }],
    };
    expect(() => isOptsValid(site, options)).toThrowError();
  });

  // crawlDelay
  it('crawlDelay: 0, should return true', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 0 }],
    };
    expect(isOptsValid(site, options)).toBeTruthy();
  });
  it('crawlDelay: undefined, should return true', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: undefined }],
    };
    expect(isOptsValid(site, options)).toBeTruthy();
  });
  it('crawlDelay: negative, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: -10 }],
    };
    expect(() => isOptsValid(site, options)).toThrowError();
  });
  it('crawlDelay: 100/0, should throw', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 100 / 0 }],
    };
    expect(() => isOptsValid(site, options)).toThrowError();
  });
  it('crawlDelay: 34, should return true', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 34 }],
    };
    expect(isOptsValid(site, options)).toBeTruthy();
  });
});
