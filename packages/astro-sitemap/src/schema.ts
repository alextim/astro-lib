import { z } from 'zod';
import { EnumChangefreq as ChangeFreq } from 'sitemap';

import { SITEMAP_CONFIG_DEFAULTS } from './config-defaults.js';

const localeKeySchema = z.string().min(1);

const changefreqSchema = z.nativeEnum(ChangeFreq).optional();
const lastmodSchema = z.date().optional();
const prioritySchema = z.number().min(0).max(1).optional();

export const SitemapOptionsSchema = z
  .object({
    canonicalURL: z.string().url().optional(),

    filter: z.function().args(z.string()).returns(z.boolean()).optional(),

    exclude: z.string().min(1).array().optional(),

    customPages: z.string().url().array().optional(),

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

    lastmodDateOnly: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.lastmodDateOnly),

    xslUrl: z.string().url().optional(),

    xmlns: z
      .object({
        xhtml: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.xhtml),
        news: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.news),
        image: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.image),
        video: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.xmlns.video),
        custom: z.string().min(1).array().nonempty().optional(),
      })
      .optional()
      .default(SITEMAP_CONFIG_DEFAULTS.xmlns),

    serialize: z.function().args(z.any()).returns(z.any()).optional(),

    changefreq: changefreqSchema,
    lastmod: lastmodSchema,
    priority: prioritySchema,

    createLinkInHead: z.boolean().optional().default(SITEMAP_CONFIG_DEFAULTS.createLinkInHead),
  })
  .strict()
  .default(SITEMAP_CONFIG_DEFAULTS);
