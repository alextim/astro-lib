import type { AstroConfig, AstroIntegration } from 'astro';

import { Logger } from '@/at-utils';

/**
 * `package-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/package-name';
import onBuildDone from './on-build-done';

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

const createPlugin = (pluginOptions: RobotsTxtOptions): AstroIntegration => {
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

      'astro:build:done': async ({ dir }) => onBuildDone(pluginOptions, config, dir, new Logger(packageName)),
    },
  };
};

export default createPlugin;
