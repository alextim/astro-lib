import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-robots-txt' working with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [
    webmanifest({
      icon: 'src/images/logo-non-sq.png',
      includeFavicon: true,
      name: 'name',
      short_name: 'short name',
      description: 'description',
      categories: ['cat0', 'cat1'],
      lang: 'en-US',
      dir: 'auto',
      iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',

      id: 'id',
      start_url: 'https://example.com',
      scope: '/',

      theme_color: '#00000',
      background_color: '#00001',

      display: 'minimal-ui',
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

      locales: {
        fr: {
          name: 'nom',
          lang: 'fr-FR',

          icons: [
            {
              src: 'icon/lowres.webp',
              sizes: '48x48',
              type: 'image/webp',
            },
            {
              src: 'icon/lowres',
              sizes: '48x48',
            },
            {
              src: 'icon/hd_hi.ico',
              sizes: '72x72 96x96 128x128 256x256',
            },
            {
              src: 'icon/hd_hi.svg',
              sizes: 'any',
            },
          ],
        },
        de: {
          name: 'namen',
          lang: 'de-DE',
        },
      },
    }),
  ],
});
