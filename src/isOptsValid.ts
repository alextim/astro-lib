import type { PolicyItem, RobotsTxtOptions } from './index';

import { ILogger } from './utils/Logger';
import { isValidHostname } from './utils/isValidHostname';
import { isValidUrl } from './utils/isValidUrl';
import { isValidHttpUrl } from './utils/isValidHttpUrl';

let logger: ILogger;

const validateSitemapItem = (sitemap: string): boolean => {
  if (!isValidUrl(sitemap)) {
    logger.warn('Option `sitemap` contains not valid url.');
    return false;
  }
  if (!isValidHttpUrl(sitemap)) {
    logger.warn('Option `sitemap` needs `http` or `https` protocol in url.');
    return false;
  }
  return true;
};

const isValidSitemap = (sitemap: string | string[] | boolean) => {
  if (typeof sitemap !== 'string' && typeof sitemap !== 'boolean' && !Array.isArray(sitemap)) {
    logger.warn('The robots.txt integration requires `sitemap` option to be string, array of strings or boolean.');
    return false;
  }
  if (sitemap) {
    if (typeof sitemap === 'string') {
      if (!validateSitemapItem(sitemap)) {
        return false;
      }
    } else if (Array.isArray(sitemap)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of sitemap) {
        if (!validateSitemapItem(item)) {
          return false;
        }
      }
    }
  }

  return true;
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

export const isOptsValid = (site: string | undefined, { host, sitemap, policy }: RobotsTxtOptions, _logger: ILogger) => {
  logger = _logger;
  if (!site) {
    logger.warn('`site` property is required in `astro.config.mjs`.');
    return false;
  }

  if (host && !isValidHostname(host)) {
    logger.warn('Option `host` does not contain correct host.');
    return false;
  }

  if (sitemap && !isValidSitemap(sitemap)) {
    return false;
  }

  if (policy && !isValidPolicy(policy)) {
    return false;
  }

  return true;
};
