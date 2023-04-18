import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

const webmanifestConfig = {
  config: {
    iconPurpose: ['maskable'], // default - undefined
    createFavicon: true, // default - true
    insertFaviconLinks: true, // default - true
    insertManifestLink: true, // default - true
    crossOrigin: 'use-credentials', // default - 'anonymus'
    insertThemeColorMeta: true, // default - true
    insertAppleTouchLinks: true, // default - false
    indent: '    ', // default - '    '
    eol: '\n', // default - '\n'
    outfile: 'site.webmanifest', // default - 'manifest.webmanifest'
  },
  icon: 'src/images/logomark-light.svg',

  name: 'Webmanifest test',
  short_name: 'Test',
  description: "It's a basic test of the `astro-webmanifest` integration",
  categories: ['category first', 'category second'],
  lang: 'en-GB',
  dir: 'auto',
  iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',

  id: 'id',
  start_url: '/',
  scope: '/',

  theme_color: '#3367D6',
  background_color: '#3367D6',

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
};

// https://astro.build/config
export default defineConfig({
  build: {
    // By default the 'format' option is 'directory',
    //
    // 'file' is used for demonstration purposes.
    format: 'file',
  },
  integrations: [webmanifest(webmanifestConfig)],
});
