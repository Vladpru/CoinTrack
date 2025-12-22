import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(46, 'Name is too long'),
  amount: z
    .number({ error: 'Amount must be a valid number' })
    .positive('Amount must be a positive number'),
  type: z.enum(['INCOME', 'EXPENSE'], { error: 'Type must be either income or expense' }),
  description: z.string().trim().max(256, 'Description is too long').optional(),
  currency: z
    .string({ error: 'Currency is required' })
    .trim()
    .length(3, 'Currency must be a 3-letter ISO code'),
  category: z.string().trim().optional(),
});

export const UpdateTransactionSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(46, 'Name is too long')
    .optional(),
  amount: z
    .number({ error: 'Amount must be a valid number' })
    .positive('Amount must be a positive number')
    .optional(),
  type: z
    .enum(['INCOME', 'EXPENSE'], { error: 'Type must be either income or expense' })
    .optional(),
  description: z.string().trim().max(256, 'Description is too long').optional(),
  currency: z
    .string({ error: 'Currency is required' })
    .trim()
    .length(3, 'Currency must be a 3-letter ISO code')
    .optional(),
  category: z.string().trim().optional(),
});

export interface transactionRes {
  transactionId: string;
  transactionData: any;
}

export interface ITransaction {
  id: string;
  name: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description: string;
  currency: string;
  category: string;
}

export type CreateTransactionReq = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionReq = z.infer<typeof UpdateTransactionSchema>;
