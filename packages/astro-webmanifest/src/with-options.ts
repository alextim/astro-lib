import { isObjectEmpty } from '@at-utils';

import type { WebmanifestOptions } from './index';

const defaultOptions: Readonly<WebmanifestOptions> = {
  name: '',
  outfile: 'manifest.webmanifest',
};

// @internal
export const withOptions = (pluginOptions: WebmanifestOptions) => {
  if (isObjectEmpty(pluginOptions)) {
    return defaultOptions;
  }
  const options: WebmanifestOptions = {
    name: pluginOptions?.name || defaultOptions.name,
    outfile: pluginOptions?.outfile || defaultOptions?.outfile,
  };
  return options;
};
