// @ts-check
import { defineConfig } from 'astro/config';

import markdoc from '@astrojs/markdoc';

import tailwindcss from '@tailwindcss/vite';


import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  integrations: [markdoc(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'static',
  site: 'https://stylix.xyz',
  trailingSlash: 'never'
});