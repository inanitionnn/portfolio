import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://PLACEHOLDER_SITE_URL',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
