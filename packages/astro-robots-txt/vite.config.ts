/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@/at-utils': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'utils', 'src', 'index.ts'),
    },
  },
});
