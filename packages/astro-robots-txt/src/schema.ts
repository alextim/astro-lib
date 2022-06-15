import { z } from 'zod';
import { isValidHostname, isValidHttpUrl } from '@/at-utils';
import { ROBOTS_TXT_CONFIG_DEFAULTS } from './config-defaults';

const validateSitemapItem = () =>
  z
    .string()
    .min(1)
    .refine((val) => !val || isValidHttpUrl(val), {
      message: 'Only valid URLs with `http` or `https` protocol allowed',
    });
const validateCleanParam = () => z.string().max(500);

export const RobotsTxtOptionsSchema = z
  .object({
    host: z
      .string()
      .optional()
      .refine((val) => !val || isValidHostname(val), {
        message: 'Not valid host',
      }),

    sitemap: validateSitemapItem().or(validateSitemapItem().array()).or(z.boolean()).optional().default(ROBOTS_TXT_CONFIG_DEFAULTS.sitemap),

    policy: z
      .object({
        userAgent: z.string().min(1),
        allow: z.string().or(z.string().array()).optional(),
        disallow: z.string().or(z.string().array()).optional(),
        cleanParam: validateCleanParam().or(validateCleanParam().array()).optional(),
        crawlDelay: z
          .number()
          .nonnegative()
          .optional()
          .refine((val) => typeof val === 'undefined' || Number.isFinite(val), { message: 'Must be finite number' }),
      })
      .array()
      .nonempty()
      .optional()
      .default(ROBOTS_TXT_CONFIG_DEFAULTS.policy),
  })
  .default(ROBOTS_TXT_CONFIG_DEFAULTS);
