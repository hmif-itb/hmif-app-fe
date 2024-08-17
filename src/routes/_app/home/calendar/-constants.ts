import { z } from 'zod';

export const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  courseId: z.string(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
