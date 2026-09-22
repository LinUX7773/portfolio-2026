import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    year: z.string().optional(),
    client: z.string().optional(),
    team: z.string().optional(),
    topics: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroCaption: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
