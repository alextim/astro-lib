import { z } from 'zod';
import { RobotsTxtOptionsSchema } from './schema';
import type { RobotsTxtOptions } from './index';

// @internal
export const validateOptions = (site: string | undefined, opts: RobotsTxtOptions) => {
  const siteSchema = z.string().min(1, {
    message: '`site` property is required in `astro.config.*`.',
  });
  siteSchema.parse(site);
  const result = RobotsTxtOptionsSchema.parse(opts);
  return result;
};
