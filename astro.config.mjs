import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],


  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
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