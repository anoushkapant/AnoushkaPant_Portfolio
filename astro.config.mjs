import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://anoushkapant.github.io/AnoushkaPant_Portfolio',
  base: '/AnoushkaPant_Portfolio',
  integrations: [sitemap()],
});
