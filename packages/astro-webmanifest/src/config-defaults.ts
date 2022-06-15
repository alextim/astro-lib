import type { WebmanifestOptions, CrossOrigin } from './index';

export const WEBMANIFEST_CONFIG_DEFAULTS: WebmanifestOptions & any = {
  config: {
    outfile: 'manifest.webmanifest',
    createFavicon: true,
    insertFaviconLinks: true,
    insertManifestLink: true,
    crossOrigin: 'anonymous' as CrossOrigin,
    insertThemeColorMeta: true,
    insertAppleTouchLinks: false,
    indent: '    ',
    eol: '\n',
  },
};
