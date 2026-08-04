import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://anoushkapant.github.io/portfolio',
  base: '/portfolio',
  integrations: [sitemap()],
});
