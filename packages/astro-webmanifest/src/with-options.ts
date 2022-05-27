import { isObjectEmpty } from '@at-utils';
import type { WebmanifestOptions } from './index';

const defaultOptions: Readonly<WebmanifestOptions> = {
  name: '',
  outfile: 'manifest.webmanifest',
  includeFavicon: true,
};

// @internal
export const withOptions = (pluginOptions: WebmanifestOptions) => {
  if (isObjectEmpty(pluginOptions)) {
    return defaultOptions;
  }
  const options: WebmanifestOptions = {
    name: pluginOptions?.name || defaultOptions.name,
    outfile: pluginOptions?.outfile || defaultOptions?.outfile,
    includeFavicon: pluginOptions?.includeFavicon ?? defaultOptions.includeFavicon,
  };
  return options;
};
