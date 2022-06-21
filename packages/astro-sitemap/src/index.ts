import path from 'node:path';
import { fileURLToPath } from 'url';
import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import merge from 'deepmerge';
import { SitemapItemLoose, EnumChangefreq as ChangeFreq } from 'sitemap';

import { Logger, loadConfig } from '@/at-utils';
import { validateOptions } from './validate-options';
import { generateSitemap } from './generate-sitemap';
import { simpleSitemapAndIndexExtended } from './sitemap/sitemap-simple-extended';
import { processPages } from './process-pages';
import { SITEMAP_INDEX_FILE_NAME } from './output-files';
/**
 * `pkg-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/pkg-name';

export { SitemapItemLoose, LinkItem, EnumChangefreq as ChangeFreq } from 'sitemap';
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
      // the same with official
      filter?(page: string): boolean;
      customPages?: string[];
      canonicalURL?: string;
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

      // called for each sitemap item just before to save them on disk, sync or async
      serialize?(item: SitemapItem): SitemapItemLoose | undefined | Promise<SitemapItemLoose | undefined>;

      // added
      createLinkInHead?: boolean;
    }
  | undefined;

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => `${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

const logger = new Logger(packageName);

const isEmptyData = (n: number) => {
  if (n === 0) {
    logger.warn(`No data for sitemap.\n\`${SITEMAP_INDEX_FILE_NAME}\` is not created.`);
    return true;
  }
  return false;
};

const createPlugin = (options?: SitemapOptions): AstroIntegration => {
  let config: AstroConfig;
  return {
    /**
     * Only official "@astrojs/*" integrations are currently supported.
     * To enable 3rd-party integrations, use the "--experimental-integrations" flag.
     * Breaking changes may occur in this API before Astro v1.0 is released.
     *
     * We've been using the 'name' property from 'package.json', ie 'astro-robots-txt'
     *
     * Official name should be '@astrojs/robotstxt', but this integration is not official  :).
     */
    name: packageName,

    hooks: {
      'astro:config:done': async ({ config: cfg }) => {
        config = cfg;
      },

      'astro:build:done': async ({ dir, pages }) => {
        const namespace = packageName.replace('astro-', '');
        const external = await loadConfig(namespace, config.root);
        const merged: SitemapOptions = merge(external || {}, options || {});

        try {
          const opts = validateOptions(config.site, merged);

          const { filter, customPages, canonicalURL, serialize, createLinkInHead, entryLimit, lastmodDateOnly, xslUrl, xmlns } = opts;

          let finalSiteUrl: URL;
          if (canonicalURL) {
            finalSiteUrl = new URL(canonicalURL);
            if (!finalSiteUrl.pathname.endsWith('/')) {
              finalSiteUrl.pathname += '/'; // normalizes the final url since it's provided by user
            }
          } else {
            // `validateOptions` forces to provide `canonicalURL` or `config.site` at least.
            // So step to check on empty values of `canonicalURL` and `config.site` is dropped.
            finalSiteUrl = new URL(config.base, config.site);
          }

          let pageUrls = pages.map((p) => {
            const path = finalSiteUrl.pathname + p.pathname;
            return new URL(path, finalSiteUrl).href;
          });

          try {
            if (filter) {
              pageUrls = pageUrls.filter(filter);
            }
          } catch (err) {
            logger.error(`Error filtering pages\n${(err as any).toString()}`);
            return;
          }

          if (customPages) {
            pageUrls = [...pageUrls, ...customPages];
          }

          if (isEmptyData(pageUrls.length)) {
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
              if (isEmptyData(serializedUrls.length)) {
                return;
              }
              urlData = serializedUrls;
            } catch (err) {
              logger.error(`Error serializing pages\n${(err as any).toString()}`);
              return;
            }
          }

          await simpleSitemapAndIndexExtended({
            hostname: finalSiteUrl.href,
            destinationDir: fileURLToPath(dir),
            sourceData: urlData,
            limit: entryLimit,
            lastmodDateOnly,
            xslUrl,
            xmlns,
          });
          logger.success(`\`${SITEMAP_INDEX_FILE_NAME}\` is created.`);

          if (createLinkInHead) {
            const sitemapHref = path.posix.join(config.base, SITEMAP_INDEX_FILE_NAME);
            const headHTML = `<link rel="sitemap" type="application/xml" href="${sitemapHref}">`;
            await processPages(pages, dir, headHTML, config.build.format);
            logger.success('Sitemap links are created in <head> section of generated pages.');
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

export default createPlugin;
