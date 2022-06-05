import { z } from 'zod';
import { isValidHostname, isValidUrl, isValidHttpUrl } from '@/at-utils';

const validateSitemapItem = () =>
  z
    .string()
    .min(1)
    .refine((val) => !val || isValidUrl(val), {
      message: 'Not valid url',
    })
    .refine((val) => !val || isValidHttpUrl(val), {
      message: 'Only `http` or `https` protocol allowed',
    });

const validateCleanParam = () => z.string().max(500);

export const RobotsTxtOptionsSchema = z.object({
  host: z
    .string()
    .optional()
    .refine((val) => !val || isValidHostname(val), {
      message: 'Not valid host',
    }),
  sitemap: validateSitemapItem().or(validateSitemapItem().array()).or(z.boolean()).optional().default(true),
  policy: z
    .object({
      userAgent: z.string().min(1),
      allow: z.string().or(z.string().array()).optional(),
      disallow: z.string().or(z.string().array()).optional(),
      cleanParam: validateCleanParam().or(validateCleanParam().array()).optional(),
      crawlDelay: z
        .number()
        .nonnegative()
        .refine((val) => typeof val === 'undefined' || Number.isFinite(val), { message: 'Must be finite number' })
        .optional(),
    })
    .array()
    .nonempty()
    .optional(),
});
