import z from 'zod';

export const CategorySchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(46, 'Name is too long'),
  description: z.string().trim().max(256, 'Description is too long').optional(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
