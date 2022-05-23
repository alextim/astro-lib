import { isObjectEmpty } from '@at-utils';

import type { RobotsTxtOptions } from './index';

const defaultOptions: Readonly<RobotsTxtOptions> = {
  sitemap: true,
  policy: [
    {
      allow: '/',
      userAgent: '*',
    },
  ],
};

// @internal
export const withOptions = (pluginOptions: RobotsTxtOptions) => {
  if (isObjectEmpty(pluginOptions)) {
    return defaultOptions;
  }
  const options: RobotsTxtOptions = {
    host: pluginOptions?.host,
    sitemap: typeof pluginOptions?.sitemap === 'undefined' ? true : pluginOptions.sitemap,
    policy: pluginOptions?.policy || defaultOptions.policy,
  };
  return options;
};
