import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

import config from './webmanifest.config';

// https://astro.build/config
export default defineConfig({
  build: {
    // for demonstration purposes
    // by default the 'format' option is 'directory'
    format: 'file',
  },
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-robots-txt' working with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [webmanifest(config)],
});
