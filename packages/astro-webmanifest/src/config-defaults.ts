import type { WebmanifestOptions } from './index';

export const WEBMANIFEST_CONFIG_DEFAULTS: WebmanifestOptions & any = {
  config: {
    outfile: 'manifest.webmanifest',
    createFavicon: true,
    insertFaviconLinks: true,
    insertManifestLink: true,
    crossOrigin: 'anonymus',
    insertThemeColorMeta: true,
    insertAppleTouchLinks: false,
    indent: '    ',
    eol: '\n',
  },
};
