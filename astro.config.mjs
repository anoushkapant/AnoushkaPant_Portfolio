import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL ?? 'https://yourusername.github.io',
  integrations: [sitemap()],
});
