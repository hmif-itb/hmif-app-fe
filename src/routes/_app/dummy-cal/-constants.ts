import { z } from 'zod';

export const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  category: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
