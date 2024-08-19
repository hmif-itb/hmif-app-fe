import { z } from 'zod';

export const FILTER_DATA = [
  {
    header: 'Sort',
    name: 'sort',
    choices: ['Newest', 'Oldest'],
  },
  {
    header: 'Read',
    name: 'unread',
    choices: ['All', 'Unread'],
  },
];

export const FormSchema = z.object({
  unread: z.string().optional(),
  sort: z.string().optional(),
  category: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
