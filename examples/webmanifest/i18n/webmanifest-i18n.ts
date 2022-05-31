import type { WebmanifestOptions } from 'astro-webmanifest';
import i18n from './src/i18n';

const locales = { ...i18n.locales };
delete locales[i18n.defaultLocale];

const webmanifest: WebmanifestOptions = {
  config: {
    iconPurpose: ['maskable'], // default - undefined
    // createFavicon: true,
    // insertFaviconLinks: true,
    // insertManifestLink: true,
    // insertThemeColorMeta: true,
    insertAppleTouchLinks: true, // default - false
    // indent: '    ',
    // eol: '\n',
    outfile: 'site.webmanifest', // default - manifest.webmanifest
  },
  icon: 'src/images/logomark-light.svg',

  name: i18n.locales[i18n.defaultLocale].name,
  short_name: 'short name',
  description: 'description',
  categories: ['cat0', 'cat1'],
  lang: i18n.locales[i18n.defaultLocale].lang,
  dir: 'auto',
  iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',

  id: 'id',
  start_url: '/',
  scope: '/',

  theme_color: '#000000',
  background_color: '#000001',

  display: 'standalone',
  display_override: ['browser', 'fullscreen'],

  orientation: 'portrait-primary',

  protocol_handlers: [
    {
      protocol: 'web+jngl',
      url: '/lookup?type=%s',
    },
    {
      protocol: 'web+jnglstore',
      url: '/shop?for=%s',
    },
  ],

  prefer_related_applications: true,
  related_applications: [
    {
      platform: 'play',
      url: 'https://play.google.com/store/apps/details?id=com.example.app1',
      id: 'com.example.app1',
    },
    {
      platform: 'itunes',
      url: 'https://itunes.apple.com/app/example-app1/id123456789',
    },
  ],

  screenshots: [
    {
      src: 'screenshot1.webp',
      sizes: '1280x720',
      type: 'image/webp',
      platform: 'wide',
      label: 'Homescreen of Awesome App',
    },
    {
      src: 'screenshot2.webp',
      sizes: '1280x720',
      type: 'image/webp',
      platform: 'wide',
      label: 'List of Awesome Resources available in Awesome App',
    },
  ],

  shortcuts: [
    {
      name: "Today's agenda",
      url: '/today',
      description: 'List of events planned for today',
    },
    {
      name: 'New event',
      url: '/create/event',
    },
    {
      name: 'New reminder',
      url: '/create/reminder',
    },
  ],

  locales,
};

export default webmanifest;
