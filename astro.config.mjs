import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { ui } from './src/i18n/ui';

import sitemap from '@astrojs/sitemap';

const supportedLanguages = Object.keys(ui);

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon(), sitemap()],


  i18n: {
    defaultLocale: "es",
    locales: supportedLanguages,
    routing: {
      prefixDefaultLocale: true, 
      redirectToDefaultLocale: false // Apagamos la redirección forzada
    }
  },

  site: 'https://ivan321pum.github.io',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});