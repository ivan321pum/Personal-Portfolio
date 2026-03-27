import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true, // El español no lleva /es/, el inglés sí lleva /en/
      redirectToDefaultLocale: true // Activa la detección de idioma
    }
  }
});