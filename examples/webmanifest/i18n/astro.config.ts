import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';
import config from './webmanifest.config';

// https://astro.build/config
export default defineConfig({
  integrations: [webmanifest(config)],
});
