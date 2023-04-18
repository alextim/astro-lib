import { promises as fs } from 'node:fs';

import type { ILogger } from '@/at-utils';

const addTailSlash = (s: string) => (s.endsWith('/') ? s : s + '/');
const removeHeadSlash = (s: string) => s.replace(/^\/+/, '');
const removeTrailingSlash = (s: string) => s.replace(/\/+$/, '');

const DEFAULT_LOCALE = '';

const getLocaleFromPathname = (s: string) => {
  if (!s) {
    return DEFAULT_LOCALE;
  }
  const [locale] = s.split('/');
  return locale;
};

const getFileDir = (pathname: string) => {
  const name = addTailSlash(pathname);
  const file = name === '404/' ? '404.html' : `${name}index.html`;
  return removeHeadSlash(file);
};

const getFileFile = (pathname: string) => {
  if (!pathname) {
    return 'index.html';
  }
  return `${removeTrailingSlash(pathname)}.html`;
};

export async function processPages(
  pages: { pathname: string }[],
  dir: URL,
  heads: Record<string, string>,
  buildFormat: string,
  logger: ILogger,
) {
  if (buildFormat !== 'directory' && buildFormat !== 'file') {
    throw new Error(`Unsupported build.format: '${buildFormat}' in your astro.config`);
  }

  const getData = (locale: string) => {
    const data = heads[locale] || heads[DEFAULT_LOCALE];
    if (!data) {
      throw new Error('Fatal in getData: empty `data`');
    }
    return data;
  };

  let insertedCount = 0;
  const HEAD_END_TAG = '</head>';
  for (const page of pages) {
    const locale = getLocaleFromPathname(page.pathname);

    const fileUrl = new URL(buildFormat === 'directory' ? getFileDir(page.pathname) : getFileFile(page.pathname), dir);

    const content = await fs.readFile(fileUrl, 'utf-8');

    const index = content.indexOf(HEAD_END_TAG);
    if (index === -1) {
      logger.info(`Cannot insert links. Reason: no <head> section in \`${fileUrl.pathname}\`.`);
    } else {
      const inlined = content.substring(0, index) + getData(locale) + content.substring(index);
      await fs.writeFile(fileUrl, inlined, 'utf-8');
      insertedCount += 1;
    }
  }
  return insertedCount;
}
