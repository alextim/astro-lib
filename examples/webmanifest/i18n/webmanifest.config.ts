import type { WebmanifestOptions } from 'astro-webmanifest';
import i18n from './src/i18n';

const locales = { ...i18n.locales };
delete locales[i18n.defaultLocale]; // here we delete default language

// add language specific 'start_url'
Object.keys(locales).forEach((locale) => {
  locales[locale].start_url = `/${locale}`;
});

const webmanifest: WebmanifestOptions = {
  // common source to generate favicon and icons
  icon: 'src/images/logomark-light.svg',

  // language specific (default language)
  ...i18n.locales[i18n.defaultLocale], // name, short_name, description, lang
  start_url: '/',

  // shared
  theme_color: '#3367D6',
  background_color: '#3367D6',
  display: 'standalone',

  // other then default language
  locales,
};

export default webmanifest;
