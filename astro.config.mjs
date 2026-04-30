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
      prefixDefaultLocale: true, // El español no lleva /es/, el inglés sí lleva /en/
      redirectToDefaultLocale: true // Activa la detección de idioma
    }
  },

  site: 'https://ivan321pum.github.io',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});