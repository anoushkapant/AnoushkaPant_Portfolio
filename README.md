# scrapbook-portfolio

A portfolio website with a scrapbook aesthetic — tilted polaroid project cards,
clean case-study pages, embedded PDFs, and a shared visitor sticker wall.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321/portfolio/
```

## Add a project (your daily workflow)

```bash
npm run new-project  # asks for title, date, type, tags…
```

Then:
1. Drop photos into `public/uploads/<slug>/` (or reference any file in `public/uploads/`)
2. Put PDFs in `public/uploads/pdfs/`
3. Open the created file in `src/content/projects/` and write the case study
4. `npm run build && git push` — the site updates

`featured: true` on one project puts it at the top of the homepage.

## Sticker wall setup (one time, ~5 min)

1. Sign up at [supabase.com](https://supabase.com) and create a project.
2. Open **SQL Editor** → **New query**, paste the contents of `supabase/schema.sql`, run it.
3. In **Project Settings → API**: copy the Project URL and anon key.
4. Copy `.env.example` to `.env.local` and fill in:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
   - `PUBLIC_STICKER_ADMIN_TOKEN` — a long random string for the private removal page
5. Rebuild and deploy.

The wall works without Supabase too — it falls back to local-only stickers in
your browser so you can preview the feature before connecting.

### Removing stickers

Visit `<your-site>/admin/stickers?token=YOUR_TOKEN` and click any sticker to
remove it. This link is never shown on the site itself. (Note: on a static
host, the token is embedded in the page — it's a courtesy lock, not real
security. Keep the wall fun and the rate-limit/caps handle the rest.)

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Source**: select **GitHub Actions**.
3. Add a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          PUBLIC_SITE_URL: ${{ vars.PUBLIC_SITE_URL }}
          PUBLIC_SUPABASE_URL: ${{ secrets.PUBLIC_SUPABASE_URL }}
          PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}
          PUBLIC_STICKER_ADMIN_TOKEN: ${{ secrets.PUBLIC_STICKER_ADMIN_TOKEN }}
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. Add your env values under **Settings → Secrets and variables → Actions**
   (variables: `PUBLIC_SITE_URL`; secrets: the three `PUBLIC_*` values).

## Structure

```
public/uploads/              # drop your images/PDFs here
src/content/projects/        # one .md per project
src/lib/entries.ts           # sorts projects for the grid
src/lib/stickers.ts          # supabase client + guards
src/pages/                   # index, about, contact, fun, projects/[slug], admin
src/components/              # Polaroid, Tape, PdfEmbed, PdfStamp, FilterBar, StickerWall
supabase/schema.sql          # sticker wall table + RLS
```

## Site name

`anoushka.` in the header/nav is a placeholder — search for `anoushka` across
`src/` to rename it to you. The base path is hardcoded to `/portfolio` in
`astro.config.mjs` (matching this repo's GitHub Pages URL); change it if you
deploy elsewhere.
