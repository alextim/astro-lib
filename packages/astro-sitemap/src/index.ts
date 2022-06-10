import { fileURLToPath } from 'url';
import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import merge from 'deepmerge';
import { LinkItem as LinkItemBase, SitemapItemLoose, simpleSitemapAndIndex } from 'sitemap';

import { Logger, loadConfig } from '@/at-utils';
import { withOptions } from './with-options';
import { validateOpts } from './validate-opts';
import { generateSitemap } from './generate-sitemap';
import { changefreqValues } from './constants';
import { processPages } from './process-pages';

/**
 * `pkg-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/pkg-name';

export type ChangeFreq = typeof changefreqValues[number];
export type SitemapItem = Pick<SitemapItemLoose, 'url' | 'lastmod' | 'changefreq' | 'priority' | 'links'>;
export type LinkItem = LinkItemBase;

export type SitemapOptions =
  | {
      // the same with official
      filter?(page: string): boolean;
      customPages?: string[];
      canonicalURL?: string;
      // added
      i18n?: {
        defaultLocale: string;
        locales: Record<string, string>;
      };
      entryLimit?: number;

      createLinkInHead?: boolean;
      serialize?(item: SitemapItemLoose): SitemapItemLoose;
      // sitemap specific
      changefreq?: ChangeFreq;
      lastmod?: Date;
      priority?: number;
    }
  | undefined;

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => ` ${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

const OUTFILE = 'sitemap-index.xml';

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
        const logger = new Logger(packageName);

        const namespace = packageName.replace('astro-', '');
        const external = await loadConfig(namespace, config.root);
        const merged: SitemapOptions = merge(external || {}, options || {});
        const opts = withOptions(merged);

        try {
          validateOpts(config.site, opts);

          const { filter, customPages, canonicalURL, serialize, createLinkInHead, entryLimit } = opts;

          const finalSiteUrl = canonicalURL || config.site || '';

          let pageUrls = pages.map((p) => new URL(p.pathname, finalSiteUrl).href);

          try {
            if (filter) {
              pageUrls = pageUrls.filter((url) => filter(url));
            }
          } catch (err) {
            logger.error(`Error filtering pages\n${(err as any).toString()}`);
            return;
          }

          if (customPages) {
            pageUrls = [...pageUrls, ...customPages];
          }

          if (pageUrls.length === 0) {
            logger.warn(`No data for sitemap.\n\`${OUTFILE}\` is not created.`);
            return;
          }

          let urlData = generateSitemap(pageUrls, finalSiteUrl, opts);

          let serializedUrls: SitemapItemLoose[];

          if (serialize) {
            serializedUrls = [];
            try {
              for (const item of urlData) {
                const serialized = await Promise.resolve(serialize(item));
                serializedUrls.push(serialized);
              }
              urlData = serializedUrls;
            } catch (err) {
              logger.error(`Error serializing pages\n${(err as any).toString()}`);
              return;
            }
          }

          await simpleSitemapAndIndex({
            hostname: finalSiteUrl,
            destinationDir: fileURLToPath(dir),
            sourceData: urlData,
            limit: entryLimit,
            gzip: false,
          });
          logger.success(`\`${OUTFILE}\` is created.`);

          if (createLinkInHead) {
            const headHTML = `<link rel="sitemap" type="application/xml" href="/${OUTFILE}">`;
            await processPages(pages, dir, headHTML, config.build.format);
            logger.success('Links are created in <head> section of generated pages.');
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
