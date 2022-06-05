import { z } from 'zod';
import isValidFilename from 'valid-filename';
import { isObjectEmpty } from '@/at-utils';
import type { WebmanifestOptions } from './index';

import { crossOriginValues, iconPurposeValues } from './constants';
import { manifestSchema } from './manifest-schema';

export const validateOpts = (opts: WebmanifestOptions = { name: '' }) => {
  const { locales } = opts;

  const getLocalesValidator = () => {
    const result: Record<string, any> = {};
    if (locales && !isObjectEmpty(locales)) {
      Object.keys(locales).forEach((locale) => {
        result[locale] = z.object({
          ...manifestSchema,
        });
      });
    }
    return result;
  };

  const schema = z.object({
    ...manifestSchema,

    config: z
      .object({
        iconPurpose: z.enum(iconPurposeValues).array().optional(),
        createFavicon: z.boolean().optional(),
        insertFaviconLinks: z.boolean().optional(),
        insertManifestLink: z.boolean().optional(),
        crossOrigin: z.enum(crossOriginValues).optional(),
        insertThemeColorMeta: z.boolean().optional(),
        insertAppleTouchLinks: z.boolean().optional(),
        indent: z.string().optional(),
        eol: z.string().optional(),
        outfile: z
          .string()
          .refine((val) => !val || isValidFilename(val), { message: 'Not valid file name' })
          .optional(),
      })
      .optional(),

    locales: z.object(getLocalesValidator()).optional(),
  });

  schema.parse(opts);
};
