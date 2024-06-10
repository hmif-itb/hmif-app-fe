import { z } from 'zod';

export const FormSchema = z.object({
  headline: z.string().min(1).max(50),
  announcement: z.string().min(1).max(500),
  categories: z
    .object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
    })
    .array(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
