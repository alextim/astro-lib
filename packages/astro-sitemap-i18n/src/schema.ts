import { z } from 'zod';
import isValidFilename from 'valid-filename';
import { isValidUrl } from '@/at-utils';
import { changefreqValues } from './constants';

const urlSchema = () =>
  z
    .string()
    .min(1)
    .refine((val) => !val || isValidUrl(val), 'Not valid url');

const localeKeySchema = () => z.string().min(1);

const isFunction = (fn: any) => fn instanceof Function;

export const SitemapOptionsSchema = z.object({
  filter: z
    .any()
    .refine((val) => !val || isFunction(val), { message: 'Not a function' })
    .optional(),

  customPages: urlSchema().array().optional(),

  canonicalURL: urlSchema().optional(),

  defaultLocale: localeKeySchema().optional(),
  locales: z
    .record(
      z.string().min(1),
      z
        .string()
        .min(2)
        .regex(/^[a-zA-Z\-]+$/gm, { message: 'Only English alphabet symbols and hyphen allowed' }),
    )
    .optional(),

  outfile: z
    .string()
    .refine((val) => !val || isValidFilename(val), { message: 'Not valid file name' })
    .optional(),

  changefreq: z.enum(changefreqValues).optional(),
  lastmod: z.date().optional(),
  priority: z.number().min(0).max(1).optional(),
});
