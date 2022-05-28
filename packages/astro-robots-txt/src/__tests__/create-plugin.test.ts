import { Logger } from '@/at-utils';

import type { RobotsTxtOptions } from '../index';

import { withOptions } from '../with-options';
import { isOptsValid } from '../is-opts-valid';
import { getRobotsTxtContent } from '../get-robots-txt-content';

vi.mock('@/at-utils', async () => {
  const utils = await vi.importActual('@/at-utils');
  return { ...(utils as object), Logger: vi.fn().mockImplementation(() => ({ warn: vi.fn() })) };
});

const logger = new Logger('dummy-astro-robots-txt');

const getRobotsTxt = (pluginOptions: RobotsTxtOptions) => {
  const site = 'https://example.com';

  const opts = withOptions(pluginOptions);

  if (!isOptsValid(site, opts, logger)) {
    return undefined;
  }

  const robotsTxtContent = getRobotsTxtContent(site, opts);
  return robotsTxtContent;
};

describe('createPlugin', () => {
  it('options = {}, should return default robots.txt', () => {
    expect(getRobotsTxt({})).toMatchSnapshot();
  });
  it('options = undefined, should return default robots.txt', () => {
    expect(getRobotsTxt(undefined)).toMatchSnapshot();
  });

  // sitemap
  it('sitemap = true, should return default robots.txt', () => {
    expect(getRobotsTxt({ sitemap: true })).toMatchSnapshot();
  });
  it('sitemap = false, should return robots.txt without `Sitemap:`', () => {
    expect(getRobotsTxt({ sitemap: false })).toMatchSnapshot();
  });
  it('sitemap = "", should return robots.txt without `Sitemap:`', () => {
    expect(getRobotsTxt({ sitemap: '' })).toMatchSnapshot();
  });
  it('sitemap is valid URL string, should return `Sitemap: https://test`', () => {
    expect(getRobotsTxt({ sitemap: 'https://test' })).toMatchSnapshot();
  });
  it('sitemap is valid array of URL string, should return array of Sitemap', () => {
    expect(getRobotsTxt({ sitemap: ['https://test1', 'https://test2'] })).toMatchSnapshot();
  });
  it('sitemap = [], should return robots.txt without `Sitemap:`', () => {
    expect(getRobotsTxt({ sitemap: [] })).toMatchSnapshot();
  });

  // host
  it('host = "", should return robots.txt without `Host:`', () => {
    expect(getRobotsTxt({ host: '' })).toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc`', () => {
    expect(getRobotsTxt({ host: 'abc' })).toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc.com`', () => {
    expect(getRobotsTxt({ host: 'abc.com' })).toMatchSnapshot();
  });
  it('host is not valid, undefined`', () => {
    expect(getRobotsTxt({ host: 'abc:1' })).toBeUndefined();
  });

  // policy
  it('policy is undefined, should return default robots.txt', () => {
    expect(getRobotsTxt({ policy: undefined })).toMatchSnapshot();
  });
  it('crawlDelay: 34, should return `Crawl-delay: 34`', () => {
    expect(getRobotsTxt({ policy: [{ allow: '/', userAgent: 'test', crawlDelay: 34 }] })).toMatchSnapshot();
  });
  it('allow is array, and disallow is array, should return arrays', () => {
    expect(getRobotsTxt({ policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: 'test2' }] })).toMatchSnapshot();
  });
  it('Disallow is empty', () => {
    expect(getRobotsTxt({ policy: [{ disallow: '', userAgent: 'test3' }] })).toMatchSnapshot();
  });

  it('cleanParam: "s"', () => {
    expect(getRobotsTxt({ policy: [{ disallow: '/', cleanParam: 's', userAgent: 'test4' }] })).toMatchSnapshot();
  });
  it('cleanParam is empty', () => {
    expect(getRobotsTxt({ policy: [{ allow: '/', cleanParam: '', userAgent: '*' }] })).toMatchSnapshot();
  });
});
