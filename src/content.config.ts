import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['creative', 'technical']),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    images: z.array(z.string()).default([]),
    pdfs: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
  }),
});

export const collections = { projects };
