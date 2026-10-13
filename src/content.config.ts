import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const translationSchema = z.object({
	title: z.string(),
	description: z.string(),
	longDescription: z.string(),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		id: z.string(),
		order: z.number(),
		accent: z.enum(["primario", "secundario"]),
		image: z.string(),
		github: z.string().url(),
		showGithub: z.boolean(),
		tags: z.array(z.string()),
		translations: z.object({
			es: translationSchema,
			en: translationSchema,
			cat: translationSchema,
			nl: translationSchema,
		}),
	}),
});

export const collections = { projects };
