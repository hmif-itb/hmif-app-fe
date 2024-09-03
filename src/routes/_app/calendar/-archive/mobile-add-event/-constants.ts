import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { isGreater } from '~/lib/date';

export const eventSchema = z
  .object({
    courseId: z.string().min(1, { message: 'Choose a valid course' }),
    title: z
      .string()
      .min(1, { message: "Headline can't be empty" })
      .max(50, { message: "Headline can't be longer than 50 characters" }),
    description: z.string().optional(),
    start: z.string(),
    end: z.string(),
  })
  .refine((data) => isGreater(data.end, data.start), {
    message: 'End date must be greater than the start date.',
    path: ['end'],
  });

export type ComponentProps = {
  form: UseFormReturn<EventSchema>;
};

export type EventSchema = z.infer<typeof eventSchema>;
