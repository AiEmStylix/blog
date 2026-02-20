// @ts-check
import { defineConfig } from 'astro/config';

import markdoc from '@astrojs/markdoc';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});