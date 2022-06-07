import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'zod';
import { Logger, loadConfig } from '@/at-utils';
import merge from 'deepmerge';
/**
 * `pkg-name.ts` is generated during build from `name` property of `package.json`
 */
import { packageName } from './data/pkg-name';
import onBuildDone from './on-build-done';
import { crossOriginValues, dirValues, displayValues, orientationValues, applicationPlatformValues, iconPurposeValues } from './constants';

export type CrossOrigin = typeof crossOriginValues[number];
export type IconPurpose = typeof iconPurposeValues[number];
export type ApplicationPlatform = typeof applicationPlatformValues[number];

export type RelatedApplication = {
  platform: ApplicationPlatform;
  url: string;
  id?: string;
};

export type Image = {
  src: string;
  sizes?: string;
  type?: string;
  platform?: ApplicationPlatform;
  label?: string;
};

export type Icon = Omit<Image, 'platform' | 'label'> & {
  purpose?: string;
};

export type Fingerprint = {
  name: string;
  type: string;
};

export type Shortcut = {
  name: string;
  short_name?: string;
  description?: string;
  url: string;
  min_version?: string;
  fingerprints?: Fingerprint[];
  icons?: Icon[];
};

export type Display = typeof displayValues[number];

export type Dir = typeof dirValues[number];

export type Orientation = typeof orientationValues[number];

export type ProtocolHandler = {
  protocol: string;
  url: string;
};

export type Webmanifest = {
  icon?: string;

  name: string;
  short_name?: string;
  description?: string;
  categories?: string[];
  lang?: string;
  dir?: Dir;
  iarc_rating_id?: string;

  id?: string;
  start_url?: string;
  scope?: string;

  theme_color?: string;
  background_color?: string;

  display?: Display;
  display_override?: Display[];

  orientation?: Orientation;

  protocol_handlers?: ProtocolHandler[];

  prefer_related_applications?: boolean;
  related_applications?: RelatedApplication[];

  screenshots?: Image[];

  icons?: Icon[];
  shortcuts?: Shortcut[];
};

export type Locales = Record<string, Webmanifest>;

export type WebmanifestOptions =
  | (Webmanifest & {
      locales?: Locales;
      config?: {
        iconPurpose?: IconPurpose[];

        createFavicon?: boolean;
        insertFaviconLinks?: boolean;
        insertManifestLink?: boolean;
        crossOrigin?: CrossOrigin;
        insertThemeColorMeta?: boolean;
        insertAppleTouchLinks?: boolean;
        indent?: string;
        eol?: string;

        outfile?: string;
      };
    })
  | undefined;

function formatConfigErrorMessage(err: ZodError) {
  const errorList = err.issues.map((issue) => ` ${issue.path.join('.')}  ${issue.message + '.'}`);
  return errorList.join('\n');
}

const createPlugin = (options?: WebmanifestOptions): AstroIntegration => {
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
        if (!external && !options) {
          throw new Error(
            `${packageName}: no configurations found. Provide external config "${namespace}.config.*" or options in "astro.config.*"`,
          );
        }
        const merged: WebmanifestOptions = merge(external || {}, options || {});
        const logger = new Logger(packageName);
        try {
          await onBuildDone(merged, config, dir, pages, logger);
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
