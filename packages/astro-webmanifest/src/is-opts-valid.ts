import isValidFilename from 'valid-filename';
import { isValidUrl, ILogger } from '@at-utils';
import type { WebmanifestOptions } from './index';
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

const isStringArray = (a: any, name: string) => {
  if (!isArray(a, name)) {
    return false;
  }
  if (a) {
    for (const el of a) {
      if (!isString(el, `Elements of ${name}`)) {
        return false;
      }
    }
  }
  return true;
};

const isValidSize = (x: any, name: string) => {
  if (!isString(x, name)) {
    return false;
  }
  if (x) {
    const a = x.split('x');
    if (a.length !== 2) {
      logger.warn(`\`${name}\` ${x} not valid size`);
      return false;
    }
    for (const el of a) {
      if (isNaN(el)) {
        logger.warn(`\`${name}\` ${x} not valid size`);
        return false;
      }
    }
  }
  return true;
};

const isValidIconPurpose = (purpose: any, prefix: string) => {
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

const isValidImageSet = (a: any, name: string) => {
  if (!isArray(a, name)) {
    return false;
  }
  if (a) {
    for (const { src, sizes, type, purpose } of a) {
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
    }
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

export const isOptsValid = (
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

    icons,
    shortcuts,

    iconOptions,
    outfile,
  }: WebmanifestOptions = { name: '' },
  _logger: ILogger,
): boolean => {
  logger = _logger;

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

  if (start_url && !isValidURL(start_url, 'start_url')) {
    return false;
  }

  /**
   * id
   * scope
   * theme_color
   * background_color
   *
   */
  if (
    !isString(id, 'id') ||
    !isString(scope, 'scope') ||
    !isString(theme_color, 'theme_color') ||
    !isString(background_color, 'background_color')
  ) {
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
      if (!isValidURL(url, 'protocol_handlers: url', true)) {
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
      if (!isRequiredString(appId, 'related_applications: appId')) {
        return false;
      }
      /**
       * google: url can be empty - https://developer.chrome.com/blog/app-install-banners-native/
       */
      if (url && !isValidURL(url, 'related_applications: url')) {
        return false;
      }
      if (isEmpty(platform, 'related_applications: platform')) {
        return false;
      }
      if (applicationPlatformValues.indexOf(platform) === -1) {
        logger.warn('`related_applications: platform` is not valid');
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
      if (!isValidURL(url, 'shortcuts: url', true)) {
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
  /**
   * iconOptions
   */
  if (iconOptions?.purpose && !isValidIconPurpose(iconOptions.purpose, 'iconOptions.')) {
    return false;
  }

  if (outfile && !isValidFilename(outfile)) {
    logger.warn('`outfile` is not valid');
    return false;
  }

  return true;
};
