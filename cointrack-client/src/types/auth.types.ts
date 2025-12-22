import { z } from 'zod';

export const loginReqestSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .email('Enter a valid email address')
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: 'Password is required' })
    .trim()
    .min(6, 'Password must contain at least 6 characters'),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email().trim().toLowerCase(),
    name: z.string(),
  }),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email().trim().toLowerCase(),
  name: z.string(),
  income: z.number(),
  amount: z.number(),
});

export const registerFormSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(3, 'Name must be at least 3 characters long')
    .max(46, 'Name is too long'),
  email: z
    .string({ error: 'Email is required' })
    .email('Enter a valid email address')
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: 'Password is required' })
    .trim()
    .min(6, 'Password must contain at least 6 characters'),
});

export const registerReqestSchema = registerFormSchema.extend({
  income: z.number().optional(),
  amount: z.number().optional(),
});

const registerResponseSchema = loginResponseSchema;

export type UserRes = z.infer<typeof userSchema>;
export type LoginRes = z.infer<typeof loginResponseSchema>;
export type LoginReq = z.infer<typeof loginReqestSchema>;
export type RegisterRes = z.infer<typeof registerResponseSchema>;
export type RegisterReq = z.infer<typeof registerReqestSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
