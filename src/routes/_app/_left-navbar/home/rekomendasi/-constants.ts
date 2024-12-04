import { z } from "zod";

export const CategorySchema = z.object({
    category: z.array(z.string()).optional(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
