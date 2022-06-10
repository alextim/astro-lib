import { isObjectEmpty } from '@/at-utils';
import type { SitemapOptions } from './index';

const defaultOptions: Readonly<SitemapOptions> = {
  createLinkInHead: true,
  entryLimit: 45000,
};

// @internal
export const withOptions = (pluginOptions: SitemapOptions) => {
  if (isObjectEmpty(pluginOptions)) {
    return defaultOptions;
  }
  const options: SitemapOptions = {
    ...pluginOptions,
    createLinkInHead: pluginOptions?.createLinkInHead ?? defaultOptions.createLinkInHead,
    entryLimit: pluginOptions?.entryLimit || defaultOptions.entryLimit,
  };
  return options;
};
