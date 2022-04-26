import fs from 'node:fs';
import type { AstroConfig, AstroIntegration } from 'astro';

const logError = (s: string) => {
  // eslint-disable-next-line no-console
  console.info("Couldn't create robots.txt");
  // eslint-disable-next-line no-console
  console.info(s, '\n');
};

const capitaliseFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const addLine = (name: string, rule: string | string[] | number) => {
  if (rule && Array.isArray(rule) && rule.length > 0) {
    let contents = '';
    rule.forEach((item) => {
      contents += addLine(name, item);
    });
    return contents;
  }

  const ruleContent = name === 'Allow' || name === 'Disallow' ? encodeURI(rule.toString()) : rule.toString();

  return `${capitaliseFirstLetter(name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())}:${
    ruleContent.length > 0 ? ` ${ruleContent}` : ''
  }\n`;
};

const generatePoliceItem = (item: PolicyItem, index: number) => {
  let contents = '';

  if (index !== 0) {
    contents += '\n';
  }

  contents += addLine('User-agent', item.userAgent);

  if (typeof item.disallow === 'string' || Array.isArray(item.disallow)) {
    contents += addLine('Disallow', item.disallow);
  }

  if (item.allow) {
    contents += addLine('Allow', item.allow);
  }

  if (item.crawlDelay) {
    contents += addLine('Crawl-delay', item.crawlDelay);
  }

  // Move from policy for next master version
  // https://yandex.ru/support/webmaster/controlling-robot/robots-txt.html
  if (item.cleanParam && item.cleanParam.length > 0) {
    contents += addLine('Clean-param', item.cleanParam);
  }

  return contents;
};

const generateRobotsTxt = (policy: PolicyItem[], sitemap: string[], host: string) => {
  let contents = '';

  policy.forEach((item, index) => {
    contents += generatePoliceItem(item, index);
  });

  sitemap.forEach((item) => {
    contents += addLine('Sitemap', item);
  });

  if (host) {
    contents += addLine('Host', host);
  }

  return contents;
};

const isValidUrl = (s: any) => {
  if (typeof s !== 'string') {
    return false;
  }
  if (!s) {
    return false;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy = new URL(s);
    return true;
  } catch {
    return false;
  }
};

const isValidSitemap = (sitemap: string | string[] | boolean) => {
  if (typeof sitemap !== 'string' && typeof sitemap !== 'boolean' && !Array.isArray(sitemap)) {
    logError('The robots.txt integration requires `sitemap` option to be string, array of strings or boolean.');
    return false;
  }
  if (!sitemap) {
    return true;
  }
  if (typeof sitemap === 'string') {
    if (!isValidUrl(sitemap)) {
      logError('Option `sitemap` contains not valid url.');
      return false;
    }
  } else if (Array.isArray(sitemap)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of sitemap) {
      if (!isValidUrl(item)) {
        return false;
      }
    }
  }

  return true;
};

const getSitemap = (sitemap: string | string[] | boolean, siteUrl: string) => {
  if (!sitemap) {
    return [];
  }
  if (typeof sitemap === 'string') {
    return [sitemap];
  }
  if (Array.isArray(sitemap)) {
    return sitemap;
  }
  return [`${siteUrl}${siteUrl.endsWith('/') ? '' : '/'}sitemap.xml`];
};

const isValidHostname = (value: string) => {
  if (typeof value !== 'string') {
    return false;
  }

  const validHostnameChars = /^[a-zA-Z0-9-.]{1,253}\.?$/g;
  if (!validHostnameChars.test(value)) {
    return false;
  }

  if (value.endsWith('.')) {
    // eslint-disable-next-line no-param-reassign
    value = value.slice(0, value.length - 1);
  }

  if (value.length > 253) {
    return false;
  }

  return value
    .split('.')
    .every((label) => /^([a-zA-Z0-9-]+)$/g.test(label) && label.length < 64 && !label.startsWith('-') && !label.endsWith('-'));
};

const isValidCleanParamItem = (item: any) => {
  if (typeof item !== 'string') {
    logError('String in `cleanParam` option should be a string');
    return false;
  }
  if (item.length > 500) {
    logError('String in `cleanParam` option should have no more than 500 characters');
    return false;
  }
  return true;
};

const isValidPolicy = (policy: PolicyItem[]) => {
  if (!policy) {
    logError('Options `policy` should be define');
    return false;
  }
  if (!Array.isArray(policy)) {
    logError('Options `policy` must be array');
    return false;
  }
  if (policy.length === 0) {
    logError('Options `policy` must be not empty array');
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of policy) {
    if (!item.userAgent || item.userAgent.length === 0) {
      logError('Each `policy` should have a single string `userAgent` option');
      return false;
    }

    if (item.crawlDelay && typeof item.crawlDelay !== 'number' && !Number.isFinite(item.crawlDelay)) {
      logError('Option `crawlDelay` must be an integer or a float');
      return false;
    }

    if (item.cleanParam) {
      if (Array.isArray(item.cleanParam)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const subItem of item.cleanParam) {
          if (!isValidCleanParamItem(subItem)) {
            return false;
          }
        }
      } else if (typeof item.cleanParam === 'string') {
        if (!isValidCleanParamItem(item.cleanParam)) {
          return false;
        }
      } else {
        logError('Option `cleanParam` should be a string or an array');
        return false;
      }
    }
  }
  return true;
};

export type PolicyItem = {
  userAgent: string;
  allow?: string | string[];
  disallow?: string | string[];
  cleanParam?: string | string[];
  crawlDelay?: number;
};

export type RobotsTxtOptions = {
  host?: string;
  sitemap?: string | string[] | boolean;
  policy?: PolicyItem[];
};

const defaultOptions: RobotsTxtOptions = {
  host: '',
  sitemap: true,
  policy: [
    {
      allow: '/',
      userAgent: '*',
    },
  ],
};

export const getRobotsTxtContent = (
  site: string | undefined,
  { host = '', sitemap = true, policy = [{ allow: '/', userAgent: '*' }] }: RobotsTxtOptions,
) => {
  if (!site) {
    logError('site is required in astro.config.mjs');
    return undefined;
  }

  if (host && !isValidHostname(host)) {
    logError('Option `host` does not contain correct host');
    return undefined;
  }

  if (!isValidSitemap(sitemap)) {
    return undefined;
  }

  const siteMap = getSitemap(sitemap, site);

  if (!isValidPolicy(policy)) {
    return undefined;
  }

  const robotsTxtContent = generateRobotsTxt(policy, siteMap, host);

  return robotsTxtContent;
};

const createPlugin = (pluginOptions = defaultOptions): AstroIntegration => {
  let config: AstroConfig;
  return {
    /**
     * Only official "@astrojs/*" integrations are currently supported.
     * To enable 3rd-party integrations, use the "--experimental-integrations" flag.
     * Breaking changes may occur in this API before Astro v1.0 is released.
     *
     */
    // name: '@astrojs/robots',
    name: 'astro-robots-txt',
    hooks: {
      'astro:config:done': async ({ config: _config }) => {
        config = _config;
      },
      'astro:build:done': async ({ dir }) => {
        const robotsTxtContent = getRobotsTxtContent(config.site, pluginOptions);
        if (!robotsTxtContent) {
          return;
        }

        try {
          const url = new URL('robots.txt', dir);
          fs.writeFileSync(url, robotsTxtContent);
          // eslint-disable-next-line no-console
          console.info('`robots.txt` is created\n');
        } catch (err) {
          logError((err as any).toString());
        }
      },
    },
  };
};

export default createPlugin;
