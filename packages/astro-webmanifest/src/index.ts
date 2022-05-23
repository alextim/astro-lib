import fs from 'node:fs';
import type { AstroConfig, AstroIntegration } from 'astro';

import { Logger } from '@at-utils';
/**
 * `package-name.ts` is generated during build from `name` property of `package.json`
 */
import { packageName } from './data/pkg-name';
import { withOptions } from './with-options';
import { getManifest } from './get-manifest';
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
  purpose?: IconPurpose[];
};

export type WebmanifestIcon = Image & {
  purpose?: string;
};

export type Fingerprint = {
  name: string;
  type: string;
};

export type ShortcutBase = {
  name: string;
  short_name?: string;
  description?: string;
  url: string;
  min_version?: string;
  fingerprints?: Fingerprint[];
};

export type Shortcut = ShortcutBase & {
  icons?: Icon[];
};

export type WebmanifestShortcut = ShortcutBase & {
  icons?: WebmanifestIcon[];
};

export type Display = typeof displayValues[number];

export type Dir = typeof dirValues[number];

export type Orientation = typeof orientationValues[number];

export type ProtocolHandler = {
  protocol: string;
  url: string;
};

export type WebmanifestBase = {
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
};

export type WebmanifestOptions =
  | (WebmanifestBase & {
      icons?: Icon[];
      shortcuts?: Shortcut[];

      icon?: string;
      iconOptions?: {
        purpose?: IconPurpose[];
      };
      outfile?: string;
    })
  | undefined;

export type Webmanifest = WebmanifestBase & {
  icons?: WebmanifestIcon[];
  shortcuts?: WebmanifestShortcut[];
};

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
        if (!isOptsValid(opts, logger)) {
          return;
        }
        const manifest = getManifest(opts);
        try {
          const { outfile = '' } = opts;
          const outfileUrl = new URL(outfile, dir);
          fs.writeFileSync(outfileUrl, JSON.stringify(manifest));
          logger.success(`\`${outfile}\` is created.`);
        } catch (err) {
          logger.error((err as any).toString());
        }
      },
    },
  };
};

export default createPlugin;
