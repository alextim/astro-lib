import path from 'node:path';
import { fileURLToPath } from 'url';
import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import merge from 'deepmerge';
import { SitemapItemLoose as SitemapItemLooseBase, EnumChangefreq, LinkItem as LinkItemBase } from 'sitemap';

import { Logger, loadConfig, getErrorMessage } from '@/at-utils';
import { validateOptions } from './validate-options';
import { generateSitemap } from './generate-sitemap';
import { simpleSitemapAndIndexExtended } from './sitemap/sitemap-simple-extended';
import { processPages } from './process-pages';
import { excludeRoutes } from './helpers/exclude-routes';
/**
 * `pkg-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/pkg-name';

export type LinkItem = LinkItemBase;
export type ChangeFreq = EnumChangefreq;
export type SitemapItemLoose = SitemapItemLooseBase;
export type SitemapItem = Pick<SitemapItemLoose, 'url' | 'lastmod' | 'changefreq' | 'priority' | 'links'>;

export interface NSArgs {
  news: boolean;
  video: boolean;
  xhtml: boolean;
  image: boolean;
  custom?: string[];
}

export type SitemapOptions =
  | {
      canonicalURL?: string;
      customPages?: string[];

      filter?(page: string): boolean;
      exclude?: string[];

      i18n?: {
        defaultLocale: string;
        locales: Record<string, string>;
      };
      // number of entries per sitemap file
      entryLimit?: number;

      lastmodDateOnly?: boolean;
      xslUrl?: string;
      xmlns?: NSArgs;

      // sitemap specific
      changefreq?: ChangeFreq;
      lastmod?: Date;
      priority?: number;

      // called for each sitemap item just before to save them on a disk, sync or async
      serialize?(item: SitemapItem): SitemapItemLoose | undefined | Promise<SitemapItemLoose | undefined>;

      createLinkInHead?: boolean;
    }
  | undefined;

const logger = new Logger(packageName);

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => `${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

const createSitemapIntegration = (options: SitemapOptions = {}): AstroIntegration => {
  let config: AstroConfig;
  return {
    name: packageName,

    hooks: {
      'astro:config:done': async ({ config: cfg }) => {
        config = cfg;
      },

      'astro:build:done': async ({ dir, pages: srcPages }) => {
        const namespace = packageName.replace('astro-', '');
        const external = (await loadConfig(namespace, config.root)) || {};
        const merged: SitemapOptions = merge(external, options);

        try {
          const opts = validateOptions(config.site, merged);

          const { filter, exclude, customPages, canonicalURL, entryLimit, lastmodDateOnly, xslUrl, xmlns, serialize, createLinkInHead } =
            opts;

          let finalSiteUrl: URL;
          if (canonicalURL) {
            finalSiteUrl = new URL(canonicalURL);
            if (!finalSiteUrl.pathname.endsWith('/')) {
              finalSiteUrl.pathname += '/'; // normalizes the final url since it's provided by user
            }
          } else {
            /**
             * `validateOptions` forces to provide `canonicalURL` or `config.site` at least.
             * Thus, the step of checking for empty `canonicalURL` and `config.site` values is dropped.
             */
            finalSiteUrl = new URL(config.base, config.site);
          }

          let pages = srcPages.map(({ pathname }) => pathname);

          if (exclude?.length) {
            try {
              pages = excludeRoutes(exclude, pages);
            } catch (err) {
              logger.error('Page exclusion error', getErrorMessage(err));
              return;
            }
          }

          if (filter) {
            try {
              pages = pages.filter(filter);
            } catch (err) {
              logger.error('Page filtering error', getErrorMessage(err));
              return;
            }
          }

          let pageUrls = pages.map((pathname) => {
            const path = finalSiteUrl.pathname + pathname;
            return new URL(path, finalSiteUrl).href;
          });

          if (customPages) {
            pageUrls = [...pageUrls, ...customPages];
          }

          if (pageUrls.length === 0) {
            if (config.output !== 'static') {
              // offer suggestion for SSR users
              logger.warn(
                'No pages found!',
                'We can only detect sitemap routes for "static" projects. Since you are using an SSR adapter, we recommend manually listing your sitemap routes using the "customPages" integration option.',
                '',
                "Example: `sitemap({ customPages: ['https://example.com/route'] })`",
              );
            } else {
              logger.warn('No pages found!');
            }
            return;
          }

          let urlData: SitemapItemLoose[] = generateSitemap(pageUrls, finalSiteUrl.href, opts);

          if (serialize) {
            try {
              const serializedUrls: SitemapItemLoose[] = [];
              for (const item of urlData) {
                const serialized = await Promise.resolve(serialize(item));
                if (serialized) {
                  serializedUrls.push(serialized);
                }
              }
              if (serializedUrls.length === 0) {
                logger.warn('No pages found!');
                return;
              }
              urlData = serializedUrls;
            } catch (err) {
              logger.error('Page serialization error', getErrorMessage(err));
              return;
            }
          }

          const fileNames = await simpleSitemapAndIndexExtended({
            hostname: finalSiteUrl.href,
            destinationDir: fileURLToPath(dir),
            sourceData: urlData,
            limit: entryLimit,
            lastmodDateOnly,
            xslUrl,
            xmlns,
          });
          logger.success(`${fileNames.map((name) => `\`${name}\``).join(', ')} are created.`, `Total entries: ${urlData.length}.`);

          if (createLinkInHead) {
            const sitemapHref = path.posix.join(config.base, fileNames[0]);
            const headHTML = `<link rel="sitemap" type="application/xml" href="${sitemapHref}">`;
            await processPages(srcPages, dir, headHTML, config.build.format);
            logger.success('Sitemap links are inserted into <head> section of generated pages.');
          }
        } catch (err) {
          if (err instanceof ZodError) {
            logger.warn(formatConfigErrorMessage(err));
          } else {
            throw err;
          }
        }
      },
    },
  };
};

export default createSitemapIntegration;
