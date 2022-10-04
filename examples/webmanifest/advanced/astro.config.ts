import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  build: {
    // for demonstration purposes
    // by default the 'format' option is 'directory'
    format: 'file',
  },
  integrations: [webmanifest()],
});
