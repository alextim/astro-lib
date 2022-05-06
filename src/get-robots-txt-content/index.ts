import type { PolicyItem, RobotsTxtOptions } from '../index';

import { ILogger } from '../utils/Logger';
import { isValidHostname } from '../utils/isValidHostname';
import { isValidHttpUrl } from '../utils/isValidHttpUrl';
import { addLine, generatePoliceItem } from './helpers';

let logger: ILogger;

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

const isValidSitemap = (sitemap: string | string[] | boolean) => {
  if (typeof sitemap !== 'string' && typeof sitemap !== 'boolean' && !Array.isArray(sitemap)) {
    logger.warn('The robots.txt integration requires `sitemap` option to be string, array of strings or boolean.');
    return false;
  }
  if (!sitemap) {
    return true;
  }
  if (typeof sitemap === 'string') {
    if (!isValidHttpUrl(sitemap)) {
      logger.warn('Option `sitemap` contains not valid url.');
      return false;
    }
  } else if (Array.isArray(sitemap)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of sitemap) {
      if (!isValidHttpUrl(item)) {
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

const isValidCleanParamItem = (item: any) => {
  if (typeof item !== 'string') {
    logger.warn('String in `cleanParam` option should be a string.');
    return false;
  }
  if (item.length > 500) {
    logger.warn('String in `cleanParam` option should have no more than 500 characters.');
    return false;
  }
  return true;
};

const isValidPolicy = (policy: PolicyItem[]) => {
  if (!policy) {
    logger.warn('Options `policy` should be defined.');
    return false;
  }
  if (!Array.isArray(policy)) {
    logger.warn('Options `policy` must be array.');
    return false;
  }
  if (policy.length === 0) {
    logger.warn('Options `policy` must be not empty array.');
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of policy) {
    if (!item.userAgent || item.userAgent.length === 0) {
      logger.warn('Each `policy` should have a single string `userAgent` option.');
      return false;
    }

    if (item.crawlDelay && typeof item.crawlDelay !== 'number' && !Number.isFinite(item.crawlDelay)) {
      logger.warn('Option `crawlDelay` must be an integer or a float.');
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
        logger.warn('Option `cleanParam` should be a string or an array.');
        return false;
      }
    }
  }
  return true;
};

export const getRobotsTxtContent = (
  site: string | undefined,
  { host = '', sitemap = true, policy = [{ allow: '/', userAgent: '*' }] }: RobotsTxtOptions,
  _logger: ILogger,
) => {
  logger = _logger;
  if (!site) {
    logger.warn('`site` property is required in `astro.config.mjs`.');
    return undefined;
  }

  if (host && !isValidHostname(host)) {
    logger.warn('Option `host` does not contain correct host.');
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
