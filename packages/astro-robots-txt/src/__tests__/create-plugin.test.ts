import { fs as memoryFs } from 'memfs';

jest.doMock(
  'node:fs',
  jest.fn(() => memoryFs),
);

import type { AstroConfig } from 'astro';
import fs from 'node:fs';
import createPlugin, { type RobotsTxtOptions } from '../index';

const getRobotsTxt = async (opts: RobotsTxtOptions) => {
  const site = 'https://example.com';
  const config = { site } as AstroConfig;
  const dir = new URL('file:/');

  const plugin = createPlugin(opts);

  const astroConfigDone = plugin.hooks['astro:config:done'];
  const astroBuildDone = plugin.hooks['astro:build:done'];
  if (astroConfigDone) {
    await astroConfigDone({ config, setAdapter: () => {} });
  }
  if (astroBuildDone) {
    await astroBuildDone({ dir, pages: [], routes: [] });
  }
  const fileUrl = new URL('robots.txt', dir);
  try {
    const content = fs.readFileSync(fileUrl, 'utf8');
    fs.unlinkSync(fileUrl);
    return content;
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      console.error(err);
    }
    return undefined;
  }
};

describe('createPlugin', () => {
  it('options = {}, should return default robots.txt', async () => {
    expect(await getRobotsTxt({})).toMatchSnapshot();
  });
  it('options = undefined, should return default robots.txt', async () => {
    expect(await getRobotsTxt(undefined)).toMatchSnapshot();
  });

  /**
   * sitemap
   */
  it('sitemap = true, should return default robots.txt', async () => {
    expect(await getRobotsTxt({ sitemap: true })).toMatchSnapshot();
  });
  it('sitemap = false, should return robots.txt without `Sitemap:`', async () => {
    expect(await getRobotsTxt({ sitemap: false })).toMatchSnapshot();
  });
  it('sitemap = "", should return robots.txt without `Sitemap:`', async () => {
    expect(await getRobotsTxt({ sitemap: '' })).toMatchSnapshot();
  });
  it('sitemap is valid URL string, should return `Sitemap: https://test`', async () => {
    expect(await getRobotsTxt({ sitemap: 'https://test' })).toMatchSnapshot();
  });
  it('sitemap is valid array of URL string, should return array of Sitemap', async () => {
    expect(await getRobotsTxt({ sitemap: ['https://test1', 'https://test2'] })).toMatchSnapshot();
  });
  it('sitemap = [], should return robots.txt without `Sitemap:`', async () => {
    expect(await getRobotsTxt({ sitemap: [] })).toMatchSnapshot();
  });

  /**
   * host
   */
  it('host = "", should return robots.txt without `Host:`', async () => {
    expect(await getRobotsTxt({ host: '' })).toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc`', async () => {
    expect(await getRobotsTxt({ host: 'abc' })).toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc.com`', async () => {
    expect(await getRobotsTxt({ host: 'abc.com' })).toMatchSnapshot();
  });
  it('host is not valid, no call`', async () => {
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    await getRobotsTxt({ host: 'abc:1' });
    expect(writeFileSpy).toBeCalledTimes(0);
  });

  /**
   * policy
   */
  it('policy is undefined, should return default robots.txt', async () => {
    expect(await getRobotsTxt({ policy: undefined })).toMatchSnapshot();
  });
  it('crawlDelay: 34, should return `Crawl-delay: 34`', async () => {
    expect(await getRobotsTxt({ policy: [{ allow: '/', userAgent: 'test', crawlDelay: 34 }] })).toMatchSnapshot();
  });
  it('allow is array, and disallow is array, should return arrays', async () => {
    expect(await getRobotsTxt({ policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: 'test2' }] })).toMatchSnapshot();
  });
  it('Disallow is empty', async () => {
    expect(await getRobotsTxt({ policy: [{ disallow: '', userAgent: 'test3' }] })).toMatchSnapshot();
  });

  it('cleanParam: "s"', async () => {
    expect(await getRobotsTxt({ policy: [{ disallow: '/', cleanParam: 's', userAgent: 'test4' }] })).toMatchSnapshot();
  });
  it('cleanParam is empty', async () => {
    expect(await getRobotsTxt({ policy: [{ allow: '/', cleanParam: '', userAgent: '*' }] })).toMatchSnapshot();
  });
});
