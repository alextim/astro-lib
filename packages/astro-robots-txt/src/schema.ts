import { z } from 'zod';
import isValidFilename from 'valid-filename';
import { isValidHostname, isValidHttpUrl } from '@/at-utils';
import { ROBOTS_TXT_CONFIG_DEFAULTS } from './config-defaults';

const schemaSitemapItem = z
  .string()
  .min(1)
  .refine((val) => !val || isValidHttpUrl(val), {
    message: 'Only valid URLs with `http` or `https` protocol allowed',
  });
const schemaCleanParam = z.string().max(500);

export const RobotsTxtOptionsSchema = z
  .object({
    host: z
      .string()
      .optional()
      .refine((val) => !val || isValidHostname(val), {
        message: 'Not valid host',
      }),

    sitemap: schemaSitemapItem.or(schemaSitemapItem.array()).or(z.boolean()).optional().default(ROBOTS_TXT_CONFIG_DEFAULTS.sitemap),

    policy: z
      .object({
        userAgent: z.string().min(1),
        allow: z.string().or(z.string().array()).optional(),
        disallow: z.string().or(z.string().array()).optional(),
        cleanParam: schemaCleanParam.or(schemaCleanParam.array()).optional(),
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

    sitemapBaseFileName: z
      .string()
      .min(1)
      .optional()
      .refine((val) => !val || isValidFilename(val), { message: 'Not valid file name' })
      .default(ROBOTS_TXT_CONFIG_DEFAULTS.sitemapBaseFileName),

    transform: z.function().args(z.string()).returns(z.any()).optional(),
  })
  .default(ROBOTS_TXT_CONFIG_DEFAULTS);
