import { isObjectEmpty } from '@/at-utils';
import type { SitemapOptions } from './index';

const defaultOptions: Readonly<SitemapOptions> = {
  outfile: 'sitemap.xml',
};

// @internal
export const withOptions = (pluginOptions: SitemapOptions) => {
  if (isObjectEmpty(pluginOptions)) {
    return defaultOptions;
  }
  const options: SitemapOptions = {
    ...pluginOptions,
    outfile: pluginOptions?.outfile || defaultOptions.outfile,
  };
  return options;
};
