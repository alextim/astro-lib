import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import { Logger, loadConfig } from '@/at-utils';
import merge from 'deepmerge';
/**
 * `pkg-name.ts` is generated during build from the `name` property of a `package.json`
 */
import { packageName } from './data/pkg-name';
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

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => ` ${issue.path.join('.')}  ${issue.message + '.'}`);
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
          onBuildDone(merged, config, dir);
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
