// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cerrajeroentucuman.com',

  // Todas las URLs terminan en "/" (coincide con la regla del .htaccess y evita redirecciones 301 internas)
  trailingSlash: 'always',

  // Cada página se genera como carpeta/index.html (ej: /cerrajero-zona-yerba-buena/index.html)
  build: {
    format: 'directory'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});