import { z } from 'zod';

export const FormSchema = z.object({
  headline: z
    .string()
    .min(1, "Headline can't be empty")
    .max(100, "Headline can't be more than 100 characters"),
  announcement: z
    .string()
    .min(1, "Announcement can't be empty")
    .max(1000, "Announcement can't be more than 1000 characters"),
  categories: z
    .object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
    })
    .array(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
