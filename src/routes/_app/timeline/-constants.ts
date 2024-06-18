import { z } from 'zod';

export const FILTER_DATA = [
  {
    header: 'Sort',
    choices: ['Newest', 'Oldest'],
  },
  {
    header: 'Read',
    choices: ['Read', 'Unread'],
  },
];

export const FormSchema = z.object({
  read: z.string().optional(),
  sort: z.string().optional(),
  category: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
