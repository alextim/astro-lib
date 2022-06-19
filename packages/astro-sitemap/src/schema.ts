import { z } from 'zod';
import { EnumChangefreq as ChangeFreq } from 'sitemap';
import { SITEMAP_CONFIG_DEFAULTS } from './config-defaults';

const localeKeySchema = z.string().min(1);

export const SitemapOptionsSchema = z
  .object({
    filter: z.function().args(z.string()).returns(z.boolean()).optional(),
    customPages: z.string().url().array().optional(),
    canonicalURL: z.string().url().optional(),

    i18n: z
      .object({
        defaultLocale: localeKeySchema,
        locales: z.record(
          localeKeySchema,
          z
            .string()
            .min(2)
            .regex(/^[a-zA-Z\-]+$/gm, {
              message: 'Only English alphabet symbols and hyphen allowed',
            }),
        ),
      })
      .refine((val) => !val || val.locales[val.defaultLocale], {
        message: '`defaultLocale` must exist in `locales` keys',
      })
      .optional(),

    entryLimit: z.number().nonnegative().optional().default(SITEMAP_CONFIG_DEFAULTS.entryLimit),
    serialize: z.function().args(z.any()).returns(z.any()).optional(),

    changefreq: z.nativeEnum(ChangeFreq).optional(),
    lastmod: z.date().optional(),
    priority: z.number().min(0).max(1).optional(),

    createLinkInHead: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.createLinkInHead),
  })
  .strict()
  .default(SITEMAP_CONFIG_DEFAULTS);
