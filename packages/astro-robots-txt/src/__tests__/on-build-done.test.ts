import type { AstroConfig } from 'astro';
import fs from 'node:fs';

import type { RobotsTxtOptions } from '../index';
import onBuildDone from '../on-build-done';

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

  const getRobotsTxt = (opts: RobotsTxtOptions) => onBuildDone(opts, config as AstroConfig, dir);

  it('options = {}, should return default robots.txt', () => {
    getRobotsTxt({});
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('options = undefined, should return default robots.txt', () => {
    getRobotsTxt(undefined);
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });

  // sitemap
  it('sitemap = true, should return default robots.txt', () => {
    getRobotsTxt({ sitemap: true });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('sitemap = false, should return robots.txt without `Sitemap:`', () => {
    getRobotsTxt({ sitemap: false });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('sitemap = "", should throw', () => {
    expect(() => getRobotsTxt({ sitemap: '' })).toThrow();
  });
  it('sitemap is valid URL string, should return `Sitemap: https://test`', () => {
    getRobotsTxt({ sitemap: 'https://test' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('sitemap is valid array of URL string, should return array of Sitemap', () => {
    getRobotsTxt({ sitemap: ['https://test1', 'https://test2'] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('sitemap = [], should return robots.txt without `Sitemap:`', () => {
    getRobotsTxt({ sitemap: [] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('sitemap = [""], should throw', () => {
    expect(() => getRobotsTxt({ sitemap: [''] })).toThrow();
  });

  // host
  it('host = "", should return robots.txt without `Host:`', () => {
    getRobotsTxt({ host: '' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc`', () => {
    getRobotsTxt({ host: 'abc' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc.com`', () => {
    getRobotsTxt({ host: 'abc.com' });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('host is not valid, expect throw', () => {
    expect(() => getRobotsTxt({ host: 'abc:1' })).toThrow();
  });

  // policy
  it('policy is undefined, should return default robots.txt', () => {
    getRobotsTxt({ policy: undefined });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('crawlDelay: 34, should return `Crawl-delay: 34`', () => {
    getRobotsTxt({ policy: [{ allow: '/', userAgent: 'test', crawlDelay: 34 }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('allow is array, and disallow is array, should return arrays', () => {
    getRobotsTxt({ policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: 'test2' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('Disallow is empty', () => {
    getRobotsTxt({ policy: [{ disallow: '', userAgent: 'test3' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });

  it('cleanParam: "s"', () => {
    getRobotsTxt({ policy: [{ disallow: '/', cleanParam: 's', userAgent: 'test4' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
  it('cleanParam is empty', () => {
    getRobotsTxt({ policy: [{ allow: '/', cleanParam: '', userAgent: '*' }] });
    expect(fn.mock.calls[0][1]).toMatchSnapshot();
  });
});
