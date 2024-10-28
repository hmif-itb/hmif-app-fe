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
  excludeCategories: z.array(z.string()).optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
