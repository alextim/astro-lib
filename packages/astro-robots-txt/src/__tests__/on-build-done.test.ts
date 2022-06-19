import type { AstroConfig } from 'astro';

import type { RobotsTxtOptions } from '../index';

import { validateOptions } from '../validate-options';
import { getRobotsTxtContent } from '../get-robots-txt-content';

const onBuildDone = async (pluginOptions: RobotsTxtOptions, config: AstroConfig) => {
  const opts = validateOptions(config.site, pluginOptions);

  const finalSiteHref = new URL(config.base, config.site).href;
  let robotsTxtContent = getRobotsTxtContent(finalSiteHref, opts);

  if (opts.transform) {
    try {
      robotsTxtContent = await Promise.resolve(opts.transform(robotsTxtContent));
    } catch (err) {}
  }
  return robotsTxtContent;
};

const config = {
  site: 'https://example.com',
  base: '/',
};

describe('onBuildDone', () => {
  const getRobotsTxt = async (opts: RobotsTxtOptions) => await onBuildDone(opts, config as AstroConfig);

  it('options = {}, should return default robots.txt', async () => {
    await expect(getRobotsTxt({})).resolves.toMatchSnapshot();
  });

  it('options = undefined, should return default robots.txt', async () => {
    await expect(getRobotsTxt(undefined)).resolves.toMatchSnapshot();
  });

  // sitemap
  it('sitemap = true, should return default robots.txt', async () => {
    await expect(getRobotsTxt({ sitemap: true })).resolves.toMatchSnapshot();
  });
  it('sitemap = false, should return robots.txt without `Sitemap:`', async () => {
    await expect(getRobotsTxt({ sitemap: false })).resolves.toMatchSnapshot();
  });
  it('sitemap = "", should throw', async () => {
    await expect(getRobotsTxt({ sitemap: '' })).rejects.toThrow();
  });
  it('sitemap is valid URL string, should return `Sitemap: https://test`', async () => {
    await expect(getRobotsTxt({ sitemap: 'https://test' })).resolves.toMatchSnapshot();
  });
  it('sitemap is valid array of URL string, should return array of Sitemap', async () => {
    await expect(getRobotsTxt({ sitemap: ['https://test1', 'https://test2'] })).resolves.toMatchSnapshot();
  });
  it('sitemap = [], should return robots.txt without `Sitemap:`', async () => {
    await expect(getRobotsTxt({ sitemap: [] })).resolves.toMatchSnapshot();
  });
  it('sitemap = [""], should throw', async () => {
    await expect(getRobotsTxt({ sitemap: [''] })).rejects.toThrow();
  });

  // host
  it('host = "", should return robots.txt without `Host:`', async () => {
    await expect(getRobotsTxt({ host: '' })).resolves.toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc`', async () => {
    await expect(getRobotsTxt({ host: 'abc' })).resolves.toMatchSnapshot();
  });
  it('host is valid, should return robots.txt with `Host: abc.com`', async () => {
    await expect(getRobotsTxt({ host: 'abc.com' })).resolves.toMatchSnapshot();
  });
  it('host is not valid, expect throw', async () => {
    await expect(getRobotsTxt({ host: 'abc:1' })).rejects.toThrow();
  });

  // policy
  it('policy is undefined, should return default robots.txt', async () => {
    await expect(getRobotsTxt({ policy: undefined })).resolves.toMatchSnapshot();
  });
  it('crawlDelay: 34, should return `Crawl-delay: 34`', async () => {
    await expect(getRobotsTxt({ policy: [{ allow: '/', userAgent: 'test', crawlDelay: 34 }] })).resolves.toMatchSnapshot();
  });
  it('allow is array, and disallow is array, should return arrays', async () => {
    await expect(
      getRobotsTxt({ policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: 'test2' }] }),
    ).resolves.toMatchSnapshot();
  });
  it('Disallow is empty', async () => {
    await expect(getRobotsTxt({ policy: [{ disallow: '', userAgent: 'test3' }] })).resolves.toMatchSnapshot();
  });

  it('cleanParam: "s"', async () => {
    await expect(getRobotsTxt({ policy: [{ disallow: '/', cleanParam: 's', userAgent: 'test4' }] })).resolves.toMatchSnapshot();
  });
  it('cleanParam is empty', async () => {
    await expect(getRobotsTxt({ policy: [{ allow: '/', cleanParam: '', userAgent: '*' }] })).resolves.toMatchSnapshot();
  });

  // sitemapBaseFileName
  it('sitemapBaseFileName = `abc`, should return robots.txt with sitemap=abc.xml', async () => {
    await expect(getRobotsTxt({ sitemapBaseFileName: 'abc' })).resolves.toMatchSnapshot();
  });

  // transform
  it('transform  = sync func, should return robots.txt with `# extra text`', async () => {
    const transform = (s: string) => `${s}# extra text\n`;
    const s = await getRobotsTxt({ transform });
    expect(s).toMatchSnapshot();
  });
  // transform
  it('transform  = async func, should return robots.txt with `# extra text`', async () => {
    const transform = (s: string) => {
      const result = `${s}# extra text\n`;
      const promise: Promise<string> = new Promise((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, 300);
      });
      return promise;
    };
    const s = await getRobotsTxt({ transform });
    expect(s).toMatchSnapshot();
  });
});
