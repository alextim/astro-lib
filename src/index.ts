import fs from 'node:fs';
import type { AstroConfig, AstroIntegration } from 'astro';

/**
 * `package-name.ts` is generated during build from `name` property of `package.json`
 */
import { packageName } from './data/package-name';
import { getRobotsTxtContent } from './get-robots-txt-content';
import { Logger } from './utils/Logger';

export type PolicyItem = {
  userAgent: string;
  allow?: string | string[];
  disallow?: string | string[];
  cleanParam?: string | string[];
  crawlDelay?: number;
};

export type RobotsTxtOptions = {
  host?: string;
  sitemap?: string | string[] | boolean;
  policy?: PolicyItem[];
};

const logger = new Logger(packageName);

const defaultOptions: RobotsTxtOptions = {
  host: '',
  sitemap: true,
  policy: [
    {
      allow: '/',
      userAgent: '*',
    },
  ],
};

const createPlugin = (pluginOptions = defaultOptions): AstroIntegration => {
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
      'astro:config:done': async ({ config: _config }) => {
        config = _config;
      },
      'astro:build:done': async ({ dir }) => {
        const robotsTxtContent = getRobotsTxtContent(config.site, pluginOptions, logger);
        if (!robotsTxtContent) {
          return;
        }

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
