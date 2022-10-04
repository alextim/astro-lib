import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  integrations: [
    webmanifest({
      icon: 'src/images/logomark-light.svg',

      name: 'Webmanifest test',
      short_name: 'Test',
      description: "It's a basic test of the `astro-webmanifest` integration",
      start_url: '/',
      theme_color: '#3367D6',
      background_color: '#3367D6',
      display: 'standalone',
    }),
  ],
});
