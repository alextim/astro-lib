import type { RobotsTxtOptions } from './index';
import { isObjectEmpty } from './utils/isObjectEmpty';

const defaultOptions: Readonly<RobotsTxtOptions> = {
  host: '',
  sitemap: true,
  policy: [
    {
      allow: '/',
      userAgent: '*',
    },
  ],
};

export const withOptions = (pluginOptions: RobotsTxtOptions | undefined) => {
  if (isObjectEmpty(pluginOptions)) {
    return defaultOptions;
  }
  const options: RobotsTxtOptions = {
    host: pluginOptions?.host || '',
    sitemap: typeof pluginOptions?.sitemap === 'undefined' ? true : pluginOptions.sitemap,
    policy: pluginOptions?.policy || defaultOptions.policy,
  };
  return options;
};
