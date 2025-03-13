import { z } from 'zod';

export const ReviewSchema = z.object({
  review: z.string().min(1),
  rating: z.coerce.number().optional(),
});

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;
