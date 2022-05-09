import fs from 'node:fs';
import type { AstroConfig } from 'astro';
import type { RobotsTxtOptions } from '../src/index';
import createPlugin from '../src/index';

const site = 'https://example.com';
const config = { site } as AstroConfig;
const dir = new URL('file:./robots.txt');

const defaultContent = 'User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n';
const nositemap = 'User-agent: *\nAllow: /\n';

describe('test createPlugin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const fnTestParam = async (pluginOptions: RobotsTxtOptions, param: string) => {
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    const plugin = createPlugin(pluginOptions);

    const fnConf = plugin.hooks['astro:config:done'];
    const fnDone = plugin.hooks['astro:build:done'];
    if (fnConf) {
      await fnConf({ config, setAdapter: () => {} });
    }
    if (fnDone) {
      await fnDone({ dir, pages: [], routes: [] });
    }
    expect(writeFileSpy).toHaveBeenCalledWith(dir, param);
  };

  const fnNotCalled = async (pluginOptions: RobotsTxtOptions) => {
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    const plugin = createPlugin(pluginOptions);

    const fnConf = plugin.hooks['astro:config:done'];
    const fnDone = plugin.hooks['astro:build:done'];
    if (fnConf) {
      await fnConf({ config, setAdapter: () => {} });
    }
    if (fnDone) {
      await fnDone({ dir, pages: [], routes: [] });
    }
    expect(writeFileSpy).toBeCalledTimes(0);
  };

  it('options = {}, should return default robots.txt', async () => {
    await fnTestParam({}, defaultContent);
  });
  it('options = undefined, should return default robots.txt', async () => {
    await fnTestParam({}, defaultContent);
  });

  /**
   * sitemap
   */
  it('sitemap = true, should return default robots.txt', async () => {
    await fnTestParam({ sitemap: true }, defaultContent);
  });
  it('sitemap = false, should return robots.txt without `Sitemap:`', async () => {
    await fnTestParam({ sitemap: false }, nositemap);
  });
  it('sitemap = "", should return robots.txt without `Sitemap:`', async () => {
    await fnTestParam({ sitemap: false }, nositemap);
  });

  it('sitemap is valid URL string, should return `Sitemap: https://test`', async () => {
    await fnTestParam(
      {
        sitemap: 'https://test',
      },
      'User-agent: *\nAllow: /\nSitemap: https://test\n',
    );
  });

  it('sitemap is valid array of URL string, should return array of Sitemap', async () => {
    await fnTestParam(
      {
        sitemap: ['https://test1', 'https://test2'],
      },
      'User-agent: *\nAllow: /\nSitemap: https://test1\nSitemap: https://test2\n',
    );
  });
  it('sitemap = [], should return robots.txt without `Sitemap:`', async () => {
    await fnTestParam({ sitemap: [] }, nositemap);
  });

  /**
   * host
   */
  it('host = "", should return robots.txt without `Host:`', async () => {
    await fnTestParam(
      {
        sitemap: false,
        host: '',
      },
      nositemap,
    );
  });

  it('host is valid, should return robots.txt with `Host: abc`', async () => {
    await fnTestParam(
      {
        sitemap: false,
        host: 'abc',
      },
      'User-agent: *\nAllow: /\nHost: abc\n',
    );
  });

  it('host is valid, should return robots.txt with `Host: abc.com`', async () => {
    await fnTestParam(
      {
        sitemap: false,
        host: 'abc.com',
      },
      'User-agent: *\nAllow: /\nHost: abc.com\n',
    );
  });

  it('host is not valid, no call`', async () => {
    await fnNotCalled({
      sitemap: false,
      host: 'abc:1',
    });
  });

  /**
   * policy
   */
  it('policy is undefined, should return default robots.txt', async () => {
    await fnTestParam(
      {
        sitemap: false,
        policy: undefined,
      },
      nositemap,
    );
  });

  it('crawlDelay: 34, should return `Crawl-delay: 34`', async () => {
    await fnTestParam(
      {
        sitemap: false,
        policy: [{ allow: '/', userAgent: 'test', crawlDelay: 34 }],
      },
      'User-agent: test\nAllow: /\nCrawl-delay: 34\n',
    );
  });

  it('allow is array, and disallow is array, should return arrays', async () => {
    await fnTestParam(
      {
        sitemap: false,
        policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: 'test' }],
      },
      'User-agent: test\nDisallow: /1\nDisallow: /2\nAllow: /3\nAllow: /4\n',
    );
  });

  it('Disallow is empty', async () => {
    await fnTestParam(
      {
        sitemap: false,
        policy: [{ disallow: '', userAgent: 'test' }],
      },
      'User-agent: test\nDisallow:\n',
    );
  });

  it('cleanParam: "s"', async () => {
    await fnTestParam(
      {
        sitemap: false,
        policy: [{ disallow: '/', cleanParam: 's', userAgent: 'test' }],
      },
      'User-agent: test\nDisallow: /\nClean-param: s\n',
    );
  });

  it('cleanParam is empty', async () => {
    await fnTestParam(
      {
        sitemap: false,
        policy: [{ allow: '/', cleanParam: '', userAgent: '*' }],
      },
      nositemap,
    );
  });
});
