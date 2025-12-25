import z from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(46, 'Name is too long'),
  emoji: z.string(),
  color: z.string(),
});

export const TopCategorySchema = CategorySchema.extend({
  amount: z.number(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
export type TopCategoryResponse = z.infer<typeof TopCategorySchema>;
