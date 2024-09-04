import { z } from 'zod';
import { isGreater } from '~/lib/date';

export const CompetitionSchema = z
  .object({
    title: z.string().min(1),
    organizer: z.string().min(1),
    registrationStart: z.string().datetime(),
    registrationDeadline: z.string().datetime(),
    price: z.coerce.number().optional(),
    registrationURL: z.string(),
    sourceURL: z.string(),
    categories: z
      .object({
        id: z.string().min(1),
        title: z.string().min(1),
      })
      .array(),
  })
  .refine(
    (data) => isGreater(data.registrationDeadline, data.registrationStart),
    {
      message: 'Deadline date must be greater than the start date.',
      path: ['registrationDeadline'],
    },
  );

export type CompetitionSchemaType = z.infer<typeof CompetitionSchema>;
