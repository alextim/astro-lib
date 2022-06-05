import { isObjectEmpty } from '@/at-utils';
import type { WebmanifestOptions } from './index';

const defaultOptions: Readonly<WebmanifestOptions> = {
  name: '',
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

const cfg = defaultOptions.config;

// @internal
export const withOptions = (opts: WebmanifestOptions) => {
  if (isObjectEmpty(opts)) {
    return defaultOptions;
  }

  const options: WebmanifestOptions = {
    ...opts,
    name: opts?.name || defaultOptions.name,
    config: {
      iconPurpose: opts?.config?.iconPurpose,
      outfile: opts?.config?.outfile || cfg!.outfile,
      createFavicon: opts?.config?.createFavicon ?? cfg!.createFavicon,
      insertFaviconLinks: opts?.config?.insertFaviconLinks ?? cfg!.insertFaviconLinks,
      insertManifestLink: opts?.config?.insertManifestLink ?? cfg!.insertManifestLink,
      crossOrigin: opts?.config?.crossOrigin || cfg!.crossOrigin,
      insertThemeColorMeta: opts?.config?.insertThemeColorMeta ?? cfg!.insertThemeColorMeta,
      insertAppleTouchLinks: opts?.config?.insertAppleTouchLinks ?? cfg!.insertAppleTouchLinks,
      indent: opts?.config?.indent ?? cfg!.indent,
      eol: opts?.config?.eol ?? cfg!.eol,
    },
  };
  return options;
};
