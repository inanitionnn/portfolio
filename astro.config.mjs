import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tarasiuk.site/',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
