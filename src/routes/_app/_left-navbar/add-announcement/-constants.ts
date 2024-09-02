import { z } from 'zod';
import {
  MAX_INFO_ANNOUNCEMENT_LENGTH,
  MAX_INFO_TITLE_LENGTH,
} from '~/lib/constants';

export const FormSchema = z.object({
  headline: z
    .string()
    .max(
      MAX_INFO_TITLE_LENGTH,
      `Headline can't be more than ${MAX_INFO_TITLE_LENGTH} characters`,
    ),
  announcement: z
    .string()
    .min(1, "Announcement can't be empty")
    .max(
      MAX_INFO_ANNOUNCEMENT_LENGTH,
      `Announcement can't be more than ${MAX_INFO_ANNOUNCEMENT_LENGTH} characters`,
    ),
  categories: z
    .object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
    })
    .array(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
