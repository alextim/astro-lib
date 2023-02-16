import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  build: {
    // By default the 'format' option is 'directory',
    //
    // 'file' is used for demonstration purposes.
    format: 'file',
  },
  integrations: [webmanifest()],
});
