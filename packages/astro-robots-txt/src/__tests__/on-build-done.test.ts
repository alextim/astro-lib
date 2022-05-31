import type { AstroConfig } from 'astro';
import fs from 'node:fs';

import { Logger } from '@/at-utils';
import type { RobotsTxtOptions } from '../index';
import onBuildDone from '../on-build-done';

vi.mock('@/at-utils');

const logger = new Logger('dummy-astro-robots-txt');
const config = {
  site: 'https://example.com',
};
const dir = new URL('file:/');

describe('onBuildDone', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const fn = vi.fn();
  fs.writeFileSync = fn;

  const getRobotsTxt = (opts: RobotsTxtOptions) => onBuildDone(opts, config as AstroConfig, dir, logger);

  it('options = {}, should return default robots.txt', () => {
    getRobotsTxt({});
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('options = undefined, should return default robots.txt', () => {
    getRobotsTxt(undefined);
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });

  // sitemap
  it('sitemap = true, should return default robots.txt', () => {
    getRobotsTxt({ sitemap: true });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('sitemap = false, should return robots.txt without `Sitemap:`', () => {
    getRobotsTxt({ sitemap: false });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('sitemap = "", should return robots.txt without `Sitemap:`', () => {
    getRobotsTxt({ sitemap: '' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('sitemap is valid URL string, should return `Sitemap: https://test`', () => {
    getRobotsTxt({ sitemap: 'https://test' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('sitemap is valid array of URL string, should return array of Sitemap', () => {
    getRobotsTxt({ sitemap: ['https://test1', 'https://test2'] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('sitemap = [], should return robots.txt without `Sitemap:`', () => {
    getRobotsTxt({ sitemap: [] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });

  // host
  it('host = "", should return robots.txt without `Host:`', () => {
    getRobotsTxt({ host: '' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('host is valid, should return robots.txt with `Host: abc`', () => {
    getRobotsTxt({ host: 'abc' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('host is valid, should return robots.txt with `Host: abc.com`', () => {
    getRobotsTxt({ host: 'abc.com' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('host is not valid, logger.success not called`', () => {
    getRobotsTxt({ host: 'abc:1' });
    expect(logger.warn).toBeCalled();
    expect(logger.success).toBeCalledTimes(0);
  });

  // policy
  it('policy is undefined, should return default robots.txt', () => {
    getRobotsTxt({ policy: undefined });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('crawlDelay: 34, should return `Crawl-delay: 34`', () => {
    getRobotsTxt({ policy: [{ allow: '/', userAgent: 'test', crawlDelay: 34 }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('allow is array, and disallow is array, should return arrays', () => {
    getRobotsTxt({ policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: 'test2' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('Disallow is empty', () => {
    getRobotsTxt({ policy: [{ disallow: '', userAgent: 'test3' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });

  it('cleanParam: "s"', () => {
    getRobotsTxt({ policy: [{ disallow: '/', cleanParam: 's', userAgent: 'test4' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
  it('cleanParam is empty', () => {
    getRobotsTxt({ policy: [{ allow: '/', cleanParam: '', userAgent: '*' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
    expect(logger.success).toBeCalled();
  });
});
