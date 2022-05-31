import type { AstroConfig, AstroIntegration } from 'astro';

import { Logger } from '@/at-utils';
/**
 * `package-name.ts` is generated during build from `name` property of `package.json`
 */
import { packageName } from './data/pkg-name';
import onBuildDone from './on-build-done';
import { dirValues, displayValues, orientationValues, applicationPlatformValues, iconPurposeValues } from './constants';

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
        insertThemeColorMeta?: boolean;
        insertAppleTouchLinks?: boolean;
        indent?: string;
        eol?: string;

        outfile?: string;
      };
    })
  | undefined;

const createPlugin = (pluginOptions: WebmanifestOptions): AstroIntegration => {
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
        await onBuildDone(pluginOptions, config, dir, pages, new Logger(packageName));
      },
    },
  };
};

export default createPlugin;
