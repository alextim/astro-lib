import { promises as fs } from 'node:fs';
import { parse, HTMLElement } from 'node-html-parser';
import { isObjectEmpty } from '@/at-utils';

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

export async function processPages(pages: { pathname: string }[], dir: URL, heads: Record<string, string>, buildFormat: string) {
  if (pages.length === 0) {
    return;
  }
  if (isObjectEmpty(heads)) {
    return;
  }
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

  for (const page of pages) {
    const locale = getLocaleFromPathname(page.pathname);

    const fileUrl = new URL(buildFormat === 'directory' ? getFileDir(page.pathname) : getFileFile(page.pathname), dir);

    const html = await fs.readFile(fileUrl, 'utf-8');
    const root = parse(html);
    let head = root.querySelector('head');
    if (!head) {
      head = new HTMLElement('head', {}, '', root);
      root.appendChild(head);
      console.warn(`No <head> found in \`${fileUrl.pathname}\`. <head> will be created.`);
    }
    head.innerHTML = head.innerHTML + getData(locale);
    const inlined = root.toString();
    await fs.writeFile(fileUrl, inlined, 'utf-8');
  }
}
