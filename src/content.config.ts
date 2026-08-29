import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/pages",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heading: z.string(),
    intro: z.string(),
    updatedLabel: z.string().optional(),
    updated: z.string().optional(),
    requirementsHeading: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    nativeHeading: z.string().optional(),
    nativeLead: z.string().optional(),
    nativePerks: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .optional(),
    nativeNote: z.string().optional(),
    githubReleaseLabel: z.string().optional(),
    githubReleaseNote: z.string().optional(),
  }),
});

export const collections = { pages };
