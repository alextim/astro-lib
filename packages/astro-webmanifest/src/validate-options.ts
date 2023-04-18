import { z } from 'zod';
import isValidFilename from 'valid-filename';

import { isObjectEmpty } from '@/at-utils';
import type { WebmanifestOptions } from './index.js';
import { WEBMANIFEST_CONFIG_DEFAULTS } from './config-defaults.js';
import { crossOriginValues, iconPurposeValues } from './constants.js';
import { manifestSchema } from './manifest-schema.js';

export const validateOptions = (opts: WebmanifestOptions) => {
  const getLocalesValidator = () => {
    const result: Record<string, any> = {};
    if (opts?.locales && !isObjectEmpty(opts.locales)) {
      Object.keys(opts.locales).forEach((locale) => {
        result[locale] = z.object(manifestSchema);
      });
    }
    return result;
  };

  const schema = z
    .object({
      ...manifestSchema,

      config: z
        .object({
          iconPurpose: z.enum(iconPurposeValues).array().optional(),
          createFavicon: z.boolean().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.createFavicon),
          insertFaviconLinks: z.boolean().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.insertFaviconLinks),
          insertManifestLink: z.boolean().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.insertManifestLink),
          crossOrigin: z.enum(crossOriginValues).optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.crossOrigin),
          insertThemeColorMeta: z.boolean().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.insertThemeColorMeta),
          insertAppleTouchLinks: z.boolean().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.insertAppleTouchLinks),
          indent: z.string().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.indent),
          eol: z.string().optional().default(WEBMANIFEST_CONFIG_DEFAULTS.config.eol),

          outfile: z
            .string()
            .min(1)
            .optional()
            .refine((val) => !val || isValidFilename(val), { message: 'Not valid file name' })
            .default(WEBMANIFEST_CONFIG_DEFAULTS.config.outfile),
        })
        .default(WEBMANIFEST_CONFIG_DEFAULTS.config),

      locales: z.object(getLocalesValidator()).optional(),
    })
    .default(WEBMANIFEST_CONFIG_DEFAULTS);

  const result = schema.parse(opts);

  return result;
};
