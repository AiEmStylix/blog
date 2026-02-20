import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
const blog = defineCollection({
  // Đọc tất cả file .mdoc trong thư mục src/blogs
  loader: glob({ pattern: "**/*.mdoc", base: "./src/blogs" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { blog };
