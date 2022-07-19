import type { PolicyItem, RobotsTxtOptions } from './index';

const capitaliseFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const addBackSlash = (s: string) => (s.endsWith('/') ? s : `${s}/`);

const addLine = (name: string, rule: string | string[] | number) => {
  if (rule && Array.isArray(rule) && rule.length > 0) {
    let content = '';
    rule.forEach((item) => {
      content += addLine(name, item);
    });
    return content;
  }

  const ruleContent = name === 'Allow' || name === 'Disallow' ? encodeURI(rule.toString()) : rule.toString();

  return `${capitaliseFirstLetter(name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())}:${
    ruleContent.length > 0 ? ` ${ruleContent}` : ''
  }\n`;
};

const generatePoliceItem = (item: PolicyItem, index: number) => {
  let content = '';

  if (index !== 0) {
    content += '\n';
  }

  content += addLine('User-agent', item.userAgent);

  if (typeof item.disallow === 'string' || Array.isArray(item.disallow)) {
    content += addLine('Disallow', item.disallow);
  }

  if (item.allow) {
    content += addLine('Allow', item.allow);
  }

  if (item.crawlDelay) {
    content += addLine('Crawl-delay', item.crawlDelay);
  }

  // Move from policy for next master version
  // https://yandex.ru/support/webmaster/controlling-robot/robots-txt.html
  if (item.cleanParam && item.cleanParam.length > 0) {
    content += addLine('Clean-param', item.cleanParam);
  }

  return content;
};

const getSitemapArr = (sitemap: string | string[] | boolean | undefined, finalSiteHref: string, sitemapBaseFileName: string) => {
  if (typeof sitemap !== 'undefined') {
    if (!sitemap) {
      return undefined;
    }
    if (Array.isArray(sitemap)) {
      return sitemap;
    }
    if (typeof sitemap === 'string') {
      return [sitemap];
    }
  }
  return [`${addBackSlash(finalSiteHref)}${sitemapBaseFileName}.xml`];
};

/**
 *
 * @param {string} finalSiteHref
 * @param {RobotsTxtOptions} options
 * @returns {string} Generated sitemap content
 *
 * @internal
 */
export const getRobotsTxtContent = (finalSiteHref: string, opts: RobotsTxtOptions) => {
  const { host, sitemap, policy, sitemapBaseFileName } = opts!;

  let result = '';

  policy?.forEach((item, index) => {
    result += generatePoliceItem(item, index);
  });

  getSitemapArr(sitemap, finalSiteHref, sitemapBaseFileName!)?.forEach((item) => {
    result += addLine('Sitemap', item);
  });

  if (host) {
    result += addLine('Host', host);
  }

  return result;
};
