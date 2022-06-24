import fs from 'node:fs';
import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import merge from 'deepmerge';

import { Logger, loadConfig, getErrorMessage } from '@/at-utils';
import { validateOptions } from './validate-options';
import { getRobotsTxtContent } from './get-robots-txt-content';
/**
 * `pkg-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/pkg-name';

export type PolicyItem = {
  userAgent: string;
  allow?: string | string[];
  disallow?: string | string[];
  cleanParam?: string | string[];
  crawlDelay?: number;
};

export type RobotsTxtOptions =
  | {
      host?: string;
      sitemap?: string | string[] | boolean;
      policy?: PolicyItem[];
      sitemapBaseFileName?: string;
      transform?(content: string): string | Promise<string>;
    }
  | undefined;

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => `${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

const createPlugin = (options?: RobotsTxtOptions): AstroIntegration => {
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

      'astro:build:done': async ({ dir }) => {
        const namespace = packageName.replace('astro-', '');
        const external = await loadConfig(namespace, config.root);
        const merged: RobotsTxtOptions = merge(external || {}, options || {});
        const logger = new Logger(packageName);
        try {
          const opts = validateOptions(config.site, merged);

          const finalSiteHref = new URL(config.base, config.site).href;
          let robotsTxtContent = getRobotsTxtContent(finalSiteHref, opts);

          if (opts.transform) {
            try {
              robotsTxtContent = await Promise.resolve(opts.transform(robotsTxtContent));
              if (!robotsTxtContent) {
                logger.warn('No content after transform.');
                return;
              }
            } catch (err) {
              logger.error(['Error transforming content', getErrorMessage(err)]);
              return;
            }
          }

          fs.writeFileSync(new URL('robots.txt', dir), robotsTxtContent);

          logger.success('`robots.txt` is created.');
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
