import type { PolicyItem, RobotsTxtOptions } from './index';

const capitaliseFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const addBackSlash = (s: string) => (s.endsWith('/') ? s : `${s}/`);

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

const getSitemapArr = (sitemap: string | string[] | boolean | undefined, filalSiteHref: string) => {
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
  // return [`${addBackslash(href)}sitemap.xml`];
  return [`${addBackSlash(filalSiteHref)}sitemap.xml`];
};

/**
 *
 * @param {string} finalSiteHref
 * @param {RobotsTxtOptions} options
 * @returns {string} Generated sitemap content
 *
 * @internal
 */
export const getRobotsTxtContent = (finalSiteHref: string, { host, sitemap, policy }: RobotsTxtOptions = {}) => {
  let result = '';

  policy?.forEach((item, index) => {
    result += generatePoliceItem(item, index);
  });

  getSitemapArr(sitemap, finalSiteHref)?.forEach((item) => {
    result += addLine('Sitemap', item);
  });

  if (host) {
    result += addLine('Host', host);
  }

  return result;
};
