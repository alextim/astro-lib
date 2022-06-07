import fs from 'node:fs';
import { Readable } from 'node:stream';
import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import merge from 'deepmerge';
import { EnumChangefreq, SitemapStream, streamToPromise, SitemapStreamOptions } from 'sitemap';

import { Logger, loadConfig } from '@/at-utils';
import { withOptions } from './with-options';
import { validateOpts } from './validate-opts';
import { generateSitemap } from './generate-sitemap';

/**
 * `pkg-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/pkg-name';

export type SitemapOptions =
  | {
      // the same with official
      filter?(page: string): boolean;
      customPages?: string[];
      canonicalURL?: string;
      // added
      defaultLocale?: string;
      locales?: Record<string, string>;
      outfile?: string;
      // sitemap specific
      changefreq?: EnumChangefreq;
      lastmod?: Date;
      priority?: number;
    }
  | undefined;

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => ` ${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

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

          const { filter, customPages, canonicalURL, outfile } = opts;

          const finalSiteUrl = canonicalURL || config.site;

          let pageUrls = pages.map((p) => new URL(p.pathname, finalSiteUrl).href);
          if (filter) {
            pageUrls = pageUrls.filter((url) => filter(url));
          }
          if (customPages) {
            pageUrls = [...pageUrls, ...customPages];
          }

          const urlData = generateSitemap(pageUrls, opts);

          const generationOptions: SitemapStreamOptions = {
            hostname: finalSiteUrl,
            lastmodDateOnly: false,
            xmlns: {
              xhtml: true,
              news: false,
              image: false,
              video: false,
            },
          };

          const stream = new SitemapStream(generationOptions);
          const sitemapContent = await streamToPromise(Readable.from(urlData).pipe(stream));

          fs.writeFileSync(new URL(outfile!, dir), sitemapContent);
          logger.success(`\`${outfile}\` is created.`);
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
