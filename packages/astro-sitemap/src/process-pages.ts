import { promises as fs } from 'node:fs';
import type { ILogger } from '@/at-utils';

const addTailSlash = (s: string) => (s.endsWith('/') ? s : s + '/');
const removeHeadingSlash = (s: string) => s.replace(/^\/+/, '');
const removeTrailingSlash = (s: string) => s.replace(/\/+$/, '');

const getFileDir = (pathname: string) => {
  const name = addTailSlash(pathname);
  const file = name === '404/' ? '404.html' : `${name}index.html`;
  return removeHeadingSlash(file);
};

const getFileFile = (pathname: string) => (pathname ? `${removeTrailingSlash(pathname)}.html` : 'index.html');

export async function processPages(pages: { pathname: string }[], dir: URL, headHTML: string, buildFormat: string, logger: ILogger) {
  if (buildFormat !== 'directory' && buildFormat !== 'file') {
    throw new Error(`Unsupported build.format: '${buildFormat}' in your astro.config`);
  }

  let insertedCount = 0;
  const HEAD_END_TAG = '</head>';
  for (const page of pages) {
    const fileUrl = new URL(buildFormat === 'directory' ? getFileDir(page.pathname) : getFileFile(page.pathname), dir);

    const content = await fs.readFile(fileUrl, 'utf-8');

    const index = content.indexOf(HEAD_END_TAG);
    if (index === -1) {
      logger.info(`Cannot insert links. Reason: no <head> section in \`${fileUrl.pathname}\`.`);
    } else {
      const inlined = content.substring(0, index) + headHTML + content.substring(index);
      await fs.writeFile(fileUrl, inlined, 'utf-8');
      insertedCount += 1;
    }
  }
  return insertedCount;
}
