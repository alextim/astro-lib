import isValidFilename from 'valid-filename';
import { isValidUrlEx, isValidUrl, isFileExistsSync, ILogger } from '@/at-utils';
import type { Webmanifest, WebmanifestOptions } from './index';
import { isIconSquare } from './helpers/is-icon-square';
import isValidSizeBase from './helpers/is-valid-size';
import { dirValues, displayValues, orientationValues, applicationPlatformValues, iconPurposeValues } from './constants';
let logger: ILogger;

const isEmpty = (x: any, name: string) => {
  if (!x) {
    logger.warn(`\`${name}\` is required`);
    return true;
  }
  return false;
};

const isString = (x: any, name: string) => {
  if (x && typeof x !== 'string') {
    logger.warn(`\`${name}\` must be a string`);
    return false;
  }
  return true;
};

const isRequiredString = (x: any, name: string) => !isEmpty(x, name) && isString(x, name);

const isArray = (x: any, name: string) => {
  if (x && !Array.isArray(x)) {
    logger.warn(`\`${name}\` must be an array`);
    return false;
  }
  return true;
};

const isStringArray = (arr: any, name: string) => {
  if (!isArray(arr, name)) {
    return false;
  }
  if (arr) {
    for (const el of arr) {
      if (!isString(el, `Elements of ${name}`)) {
        return false;
      }
    }
  }
  return true;
};

const isValidSize = (size: any, name: string) => {
  if (!isString(size, name)) {
    return false;
  }

  if (!isValidSizeBase(size)) {
    logger.warn(`\`${name}\` ${size} not valid size`);
    return false;
  }

  return true;
};

const isValidPlatform = (platform: any, prefix: string) => {
  if (platform) {
    if (applicationPlatformValues.indexOf(platform) === -1) {
      logger.warn(`\`${prefix}platform\` is not valid`);
      return false;
    }
  }
  return true;
};

const isValidIconPurposeArr = (purpose: any, prefix: string) => {
  if (purpose) {
    if (!isStringArray(purpose, `${prefix}purpose`)) {
      return false;
    }
    for (const p of purpose) {
      if (iconPurposeValues.indexOf(p) === -1) {
        logger.warn(`\`${prefix}purpose\` ${p} not valid`);
        return false;
      }
    }
  }
  return true;
};

const isValidIconPurpose = (purpose: any, prefix: string) => {
  if (purpose) {
    if (!isString(purpose, `${prefix}purpose`)) {
      return false;
    }
    const arr = purpose.split(' ');
    for (const p of arr) {
      if (iconPurposeValues.indexOf(p) === -1) {
        logger.warn(`\`${prefix}purpose\` ${p} not valid`);
        return false;
      }
    }
  }
  return true;
};

const isValidImageSet = (arr: any, name: string) => {
  if (!isArray(arr, name)) {
    return false;
  }
  if (arr) {
    for (const { src, sizes, type, purpose, platform } of arr) {
      if (!isRequiredString(src, `${name}: src`)) {
        return false;
      }
      if (!isValidSize(sizes, `${name}: sizes`)) {
        return false;
      }
      if (!isString(type, `${name}: type`)) {
        return false;
      }
      if (!isValidIconPurpose(purpose, `${name}: `)) {
        return false;
      }
      if (!isValidPlatform(platform, name)) {
        return false;
      }
    }
  }
  return true;
};

const isValidURLEx = (url: any, name: string, required = false) => {
  if (required && isEmpty(url, name)) {
    return false;
  }
  if (!isString(url, name)) {
    return false;
  }
  if (!isValidUrlEx(url)) {
    logger.warn(`\`${name}\` is not valid`);
    return false;
  }
  return true;
};

const isValidURL = (url: any, name: string, required = false) => {
  if (required && isEmpty(url, name)) {
    return false;
  }
  if (!isString(url, name)) {
    return false;
  }
  if (!isValidUrl(url)) {
    logger.warn(`\`${name}\` is not valid`);
    return false;
  }
  return true;
};

const isHeadingValid = (name: any, short_name: any, description: any, prefix: string = ''): boolean => {
  if (!isRequiredString(name, `${prefix}name`)) {
    return false;
  }

  if (!isString(short_name, `${prefix}short_name`) || !isString(description, `${prefix}description`)) {
    return false;
  }
  return true;
};

const isManifestValid = async (
  {
    name,
    short_name,
    description,
    categories,
    lang,
    dir,
    iarc_rating_id,
    id,
    start_url,
    scope,
    theme_color,
    background_color,

    display,
    display_override,

    orientation,
    protocol_handlers,

    related_applications,
    screenshots,

    icon,
    icons,
    shortcuts,
  }: Webmanifest = { name: '' },
) => {
  /**
   * name
   * short_name
   * description
   */
  if (!isHeadingValid(name, short_name, description)) {
    return false;
  }

  /**
   * categories
   */
  if (!isStringArray(categories, 'categories')) {
    return false;
  }

  /**
   * lang
   */
  if (!isString(lang, 'lang')) {
    return false;
  }

  /**
   * dir
   */
  if (dir && dirValues.indexOf(dir) === -1) {
    logger.warn('`dir` is not valid');
    return false;
  }

  /**
   * iarc_rating_id
   */
  if (!isString(iarc_rating_id, 'iarc_rating_id')) {
    return false;
  }

  // start_url
  if (start_url && !isValidURLEx(start_url, 'start_url')) {
    return false;
  }

  // scope
  if (scope && !isValidURLEx(scope, 'scope')) {
    return false;
  }

  /**
   * id
   * theme_color
   * background_color
   *
   */
  if (!isString(id, 'id') || !isString(theme_color, 'theme_color') || !isString(background_color, 'background_color')) {
    return false;
  }

  /**
   * display
   */
  if (display && displayValues.indexOf(display) === -1) {
    logger.warn('`display` is not valid');
    return false;
  }

  /**
   * display_override
   */
  if (!isArray(display_override, 'display_override')) {
    return false;
  }
  if (display_override && display_override.some((el) => displayValues.indexOf(el) === -1)) {
    logger.warn('`display_override` is not valid');
    return false;
  }

  /**
   * orientation
   */
  if (orientation && orientationValues.indexOf(orientation) === -1) {
    logger.warn('`orientation` is not valid');
    return false;
  }

  /**
   * protocol_handlers
   */
  if (!isArray(protocol_handlers, 'protocol_handlers')) {
    return false;
  }
  if (protocol_handlers) {
    for (const { protocol, url } of protocol_handlers) {
      if (!isRequiredString(protocol, 'protocol_handlers: protocol')) {
        return false;
      }
      if (!isValidURLEx(url, 'protocol_handlers: url', true)) {
        return false;
      }
    }
  }

  /**
   * related_applications
   */
  if (!isArray(related_applications, 'related_applications')) {
    return false;
  }
  if (related_applications) {
    for (const { id: appId, url, platform } of related_applications) {
      if (!isString(appId, 'related_applications: appId')) {
        return false;
      }
      if (!isValidURL(url, 'related_applications: url', true)) {
        return false;
      }
      if (isEmpty(platform, 'related_applications: platform')) {
        return false;
      }
      if (!isValidPlatform(platform, 'related_applications: ')) {
        return false;
      }
    }
  }

  /**
   * screenshots
   */
  if (!isValidImageSet(screenshots, 'screenshots')) {
    return false;
  }

  /**
   * icons
   */
  if (!isValidImageSet(icons, 'icons')) {
    return false;
  }

  /**
   * shortcuts
   */
  if (!isArray(shortcuts, 'shortcuts')) {
    return false;
  }
  if (shortcuts) {
    for (const {
      name: scName,
      short_name: scShort_name,
      description: scDescription,
      url,
      min_version,
      fingerprints,
      icons: scIcons,
    } of shortcuts) {
      if (!isHeadingValid(scName, scShort_name, scDescription, 'shortcuts: ')) {
        return false;
      }
      if (!isValidURLEx(url, 'shortcuts: url', true)) {
        return false;
      }
      if (!isString(min_version, 'shortcuts: min_version')) {
        return false;
      }
      if (!isArray(fingerprints, 'shortcuts: fingerprints')) {
        return false;
      }
      if (fingerprints) {
        for (const { name: fpName, type } of fingerprints) {
          if (!isRequiredString(fpName, 'shortcuts: fingerprint.name') || !isRequiredString(type, 'shortcuts: fingerprint.type')) {
            return false;
          }
        }
      }
      if (!isValidImageSet(scIcons, 'shortcuts: icons')) {
        return false;
      }
    }
  }

  if (icon) {
    if (!isFileExistsSync(icon)) {
      logger.warn(`icon (${icon}) does not exist`);
      return false;
    }
    if (!(await isIconSquare(icon))) {
      logger.info(`
        The icon(${icon}) provided is not square.
        The generated icons will be square and for the best results it's recommend to provide a square icon.
        `);
    }
  }

  return true;
};

export const isOptsValid = async (opts: WebmanifestOptions = { name: '' }, _logger: ILogger) => {
  logger = _logger;
  const { config = {}, locales } = opts;

  if (!(await isManifestValid(opts))) {
    return false;
  }

  const { outfile, iconPurpose } = config;

  /**
   * iconOptions
   */
  if (!isValidIconPurposeArr(iconPurpose, 'config.iconPurpose.')) {
    return false;
  }

  if (outfile && !isValidFilename(outfile)) {
    logger.warn('`config.outfile` is not valid');
    return false;
  }

  if (locales) {
    for (const [key, entry] of Object.entries(locales)) {
      if (!(await isManifestValid(entry))) {
        logger.warn(`\`locales[${key}]\` is not valid`);
        return false;
      }
    }
  }

  return true;
};
