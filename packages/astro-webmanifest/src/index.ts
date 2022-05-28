import type { AstroConfig, AstroIntegration } from 'astro';

import { Logger, isObjectEmpty } from '@/at-utils';
/**
 * `package-name.ts` is generated during build from `name` property of `package.json`
 */
import { packageName } from './data/pkg-name';
import { withOptions } from './with-options';
import { createManifest } from './create-manifest';
import { createFavicon } from './create-favicon';
import { isOptsValid } from './is-opts-valid';
import { dirValues, displayValues, orientationValues, applicationPlatformValues, iconPurposeValues } from './constants';

export type IconPurpose = typeof iconPurposeValues[number];

export type ApplicationPlatform = typeof applicationPlatformValues[number];

export type RelatedApplication = {
  platform: ApplicationPlatform;
  url?: string;
  id: string;
};

export type Image = {
  src: string;
  sizes?: string;
  type?: string;
};

export type Icon = Image & {
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

export type Locales = Record<string, Omit<Webmanifest, 'icons'>>;

export type WebmanifestOptions =
  | (Webmanifest & {
      icon?: string;
      iconOptions?: {
        purpose?: IconPurpose[];
      };
      locales?: Locales;
      includeFavicon?: boolean;
      outfile?: string;
    })
  | undefined;

const logger = new Logger(packageName);

const createPlugin = (pluginOptions: WebmanifestOptions = { name: '' }): AstroIntegration => {
  return {
    /**
     * Only official "@astrojs/*" integrations are currently supported.
     * To enable 3rd-party integrations, use the "--experimental-integrations" flag.
     * Breaking changes may occur in this API before Astro v1.0 is released.
     *
     * We've been using the 'name' property from 'package.json', ie 'astro-webmanifest'
     *
     * Official name should be '@astrojs/webmanifest', but this integration is not official  :).
     */

    name: packageName,
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const opts = withOptions(pluginOptions);
        if (!(await isOptsValid(opts, logger))) {
          return;
        }

        const { outfile = '', icon = '', includeFavicon } = opts;
        if (icon && includeFavicon) {
          await createFavicon(icon, dir);
        }

        if (!(await createManifest(opts, outfile, dir, logger))) {
          return;
        }

        if (!isObjectEmpty(opts.locales) && opts.locales) {
          const a = Object.entries(opts.locales);
          for (let i = 0; i < a.length; i++) {
            const locale = a[i][0];
            const entry = a[i][1];
            await createManifest({ ...opts, ...entry }, outfile, dir, logger, locale);
          }
        }
      },
    },
  };
};

export default createPlugin;
