import { getRobotsTxtContent, type RobotsTxtOptions } from '../src/index';

const site = 'https://example.com';

describe('test Robots txt', () => {
  it('site = undefined, should return undefined', () => {
    expect(getRobotsTxtContent(undefined, {})).toBeUndefined();
  });

  it('site = "", should return undefined', () => {
    expect(getRobotsTxtContent('', {})).toBeUndefined();
  });

  it('options = {}, should return default robots.txt', () => {
    const a = ['User-agent: *', 'Allow: /', 'Sitemap: https://example.com/sitemap.xml', ''];
    const s = getRobotsTxtContent(site, {});
    expect(s?.split('\n')).toEqual(a);
  });

  /**
   * sitemap
   */
  it('sitemap = true, should return default robots.txt', () => {
    const a = ['User-agent: *', 'Allow: /', 'Sitemap: https://example.com/sitemap.xml', ''];
    const s = getRobotsTxtContent(site, {});
    expect(s?.split('\n')).toEqual(a);
  });

  it('sitemap = false, should return robots.txt without `Sitemap:`', () => {
    const a = ['User-agent: *', 'Allow: /', ''];

    const options: RobotsTxtOptions = {
      sitemap: false,
    };
    const s = getRobotsTxtContent(site, options);
    expect(s?.split('\n')).toEqual(a);
  });

  it('sitemap = "", should return robots.txt without `Sitemap:`', () => {
    const a = ['User-agent: *', 'Allow: /', ''];

    const options: RobotsTxtOptions = {
      sitemap: '',
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });

  it('sitemap is not valid URL string, should return undefined', () => {
    const options: RobotsTxtOptions = {
      sitemap: 'qqq',
    };
    expect(getRobotsTxtContent(site, options)).toBeUndefined();
  });

  it('sitemap is valid URL string, should return `Sitemap: https://test`', () => {
    const a = ['User-agent: *', 'Allow: /', 'Sitemap: https://test', ''];
    const options: RobotsTxtOptions = {
      sitemap: 'https://test',
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });

  it('sitemap is valid array of URL string, should return array of Sitemap', () => {
    const a = ['User-agent: *', 'Allow: /', 'Sitemap: https://test1', 'Sitemap: https://test2', ''];
    const options: RobotsTxtOptions = {
      sitemap: ['https://test1', 'https://test2'],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });

  it('sitemap = [], should return no Sitemap', () => {
    const a = ['User-agent: *', 'Allow: /', ''];
    const options: RobotsTxtOptions = {
      sitemap: [],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });

  it('sitemap is array, one of elements is empty, should return undefined', () => {
    const options: RobotsTxtOptions = {
      sitemap: ['https://test1', ''],
    };
    expect(getRobotsTxtContent(site, options)).toBeUndefined();
  });
  it('sitemap is array, one of elements is not valid URL string, should return undefined', () => {
    const options: RobotsTxtOptions = {
      sitemap: ['https://test1', 'aa'],
    };
    expect(getRobotsTxtContent(site, options)).toBeUndefined();
  });
  /**
   * host
   */

  it('host = "", should return robots.txt without `Host:`', () => {
    const a = ['User-agent: *', 'Allow: /', ''];

    const options: RobotsTxtOptions = {
      sitemap: false,
      host: '',
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });

  it('host is not valid, should return undefined', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc:1',
    };
    expect(getRobotsTxtContent(site, options)).toBeUndefined();
  });

  it('host is valid, should return robots.txt with `Host: abc`', () => {
    const a = ['User-agent: *', 'Allow: /', 'Host: abc', ''];

    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc',
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  it('host is valid, should return robots.txt with `Host: abc.com`', () => {
    const a = ['User-agent: *', 'Allow: /', 'Host: abc.com', ''];

    const options: RobotsTxtOptions = {
      sitemap: false,
      host: 'abc.com',
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  /**
   * policy
   */
  it('policy is undefined, should return default robots.txt', () => {
    const a = ['User-agent: *', 'Allow: /', ''];

    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: undefined,
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  it('policy = [], should return undefined', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [],
    };
    expect(getRobotsTxtContent(site, options)).toBeUndefined();
  });
  it('userAgent is empty, should return undefined', () => {
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '' }],
    };
    expect(getRobotsTxtContent(site, options)).toBeUndefined();
  });
  it('crawlDelay: 34, should return `Crawl-delay: 34`', () => {
    const a = ['User-agent: *', 'Allow: /', 'Crawl-delay: 34', ''];
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: '/', userAgent: '*', crawlDelay: 34 }],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  it('allow is array, and disallow is array, should return arrays', () => {
    const a = ['User-agent: *', 'Disallow: /1', 'Disallow: /2', 'Allow: /3', 'Allow: /4', ''];
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ allow: ['/3', '/4'], disallow: ['/1', '/2'], userAgent: '*' }],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  it('Disallow is empty', () => {
    const a = ['User-agent: *', 'Disallow:', ''];
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ disallow: '', userAgent: '*' }],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  it('cleanParam: "s"', () => {
    const a = ['User-agent: *', 'Disallow: /', 'Clean-param: s', ''];
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ disallow: '/', cleanParam: 's', userAgent: '*' }],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
  it('cleanParam is empty', () => {
    const a = ['User-agent: *', 'Disallow: /', ''];
    const options: RobotsTxtOptions = {
      sitemap: false,
      policy: [{ disallow: '/', cleanParam: '', userAgent: '*' }],
    };
    expect(getRobotsTxtContent(site, options)?.split('\n')).toEqual(a);
  });
});
