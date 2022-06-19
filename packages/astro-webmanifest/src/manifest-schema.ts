import { string, z } from 'zod';
import { isFileExistsSync, isValidUrlEx } from '@/at-utils';
import { dirValues, displayValues, orientationValues, applicationPlatformValues, iconPurposeValues } from './constants';
import isValidSize from './helpers/is-valid-size';

const schemaRelativeUrl = z.string().refine((val) => !val || isValidUrlEx(val), { message: 'Not valid URL' });
const schemaRelativeUrlRequired = z
  .string()
  .min(1)
  .refine((val) => isValidUrlEx(val), { message: 'Not valid URL' });

const isValidIconPurpose = (purpose: any) => {
  const arr = purpose.split(' ');
  for (const p of arr) {
    if (iconPurposeValues.indexOf(p) === -1) {
      return false;
    }
  }
  return true;
};

const schemaIcon = {
  src: z.string().min(1),
  sizes: z
    .string()
    .refine((val) => !val || isValidSize(val), { message: 'Not valid sizes' })
    .optional(),
  type: z.string().optional(),
  purpose: z
    .string()
    .refine((val) => !val || isValidIconPurpose(val), { message: 'Not valid purpose' })
    .optional(),
};

export const manifestSchema = {
  name: z.string().min(1),
  short_name: z.string().optional(),
  description: z.string().optional(),
  categories: z.string().array().optional(),
  lang: z.string().optional(),
  dir: z.enum(dirValues).optional(),
  iarc_rating_id: z.string().optional(),
  id: z.string().optional(),
  start_url: schemaRelativeUrl.optional(),
  scope: schemaRelativeUrl.optional(),
  theme_color: z.string().optional(),
  background_color: z.string().optional(),

  display: z.enum(displayValues).optional(),
  display_override: z.enum(displayValues).array().optional(),

  orientation: z.enum(orientationValues).optional(),

  protocol_handlers: z
    .object({
      protocol: z.string().min(1),
      url: schemaRelativeUrlRequired,
    })
    .array()
    .optional(),

  prefer_related_applications: z.boolean().optional(),

  related_applications: z
    .object({
      id: z.string().optional(),
      platform: z.enum(applicationPlatformValues),
      url: z.string().url(),
    })
    .array()
    .optional(),

  screenshots: z
    .object({
      ...schemaIcon,
      platform: z.enum(applicationPlatformValues).optional(),
      label: z.string().optional(),
    })
    .array()
    .optional(),

  icons: z.object(schemaIcon).array().optional(),

  shortcuts: z
    .object({
      name: z.string().min(1),
      short_name: z.string().optional(),
      description: z.string().optional(),
      url: schemaRelativeUrlRequired,
      min_version: z.string().optional(),
      fingerprints: z
        .object({
          name: z.string().min(1),
          type: z.string().min(1),
        })
        .array()
        .optional(),
      icons: z.object(schemaIcon).array().optional(),
    })
    .array()
    .optional(),

  icon: string()
    .refine((val) => !val || isFileExistsSync(val), { message: "File doesn't exist" })
    .optional(),
};
