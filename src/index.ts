import fs from 'node:fs';
import type { AstroConfig, AstroIntegration } from 'astro';

/**
 * `package-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/package-name';

import { withOptions } from './with-options';
import { Logger } from './utils/logger';
import { isOptsValid } from './is-opts-valid';
import { getRobotsTxtContent } from './get-robots-txt-content';

const logger = new Logger(packageName);

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
    }
  | undefined;

const createPlugin = (pluginOptions: RobotsTxtOptions = {}): AstroIntegration => {
  let config: AstroConfig;
  return {
    /**
     * Only official "@astrojs/*" integrations are currently supported.
     * To enable 3rd-party integrations, use the "--experimental-integrations" flag.
     * Breaking changes may occur in this API before Astro v1.0 is released.
     *
     * We've been using the 'name' property from 'package.json', ie 'astro-robots-txt'
     *
     * Official name should be '@astrojs/robotstxt' :)
     */
    name: packageName,

    hooks: {
      'astro:config:done': async ({ config: cfg }) => {
        config = cfg;
      },

      'astro:build:done': async ({ dir }) => {
        const opts = withOptions(pluginOptions);

        if (!isOptsValid(config.site, opts, logger)) {
          return;
        }

        const robotsTxtContent = getRobotsTxtContent(config.site!, opts);

        try {
          const url = new URL('robots.txt', dir);
          fs.writeFileSync(url, robotsTxtContent);
          logger.success('`robots.txt` is created.');
        } catch (err) {
          logger.error((err as any).toString());
        }
      },
    },
  };
};

export default createPlugin;
