'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CreateTransactionSchema, CreateTransactionReq } from '@/types/transaction.types';
import { useTransaction } from '@/hooks/useTransaction';
import { useGetCategories } from '@/hooks/useCategories';
import { validateNumber } from '@/lib/validate-amount';
import { cn } from '@/lib/utils';

interface DialogProps {
  children?: React.ReactNode;
}

export default function AddTransactionDialog({ children }: DialogProps) {
  const [open, setOpen] = useState(false);
  const [displayAmount, setDisplayAmount] = useState('');
  const { createTransaction } = useTransaction();

  const { categories } = useGetCategories();

  const form = useForm<CreateTransactionReq>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      name: '',
      amount: 0,
      type: 'EXPENSE',
      description: '',
      currency: 'USD',
      categoryId: '',
      date: new Date(Date.now()).toISOString(),
    },
  });

  const onSubmit = async (data: CreateTransactionReq) => {
    try {
      await createTransaction.mutateAsync(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-dark-surface border-dark-border">
        <DialogHeader>
          <DialogTitle className="text-dark-text">Add Transaction</DialogTitle>
          <DialogDescription className="text-dark-text-muted">
            Create a new transaction. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark-text">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Transaction name"
                      className="bg-dark-surface-hover border-dark-border text-dark-text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-text">Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0.00"
                        className="bg-dark-surface-hover border-dark-border text-dark-text"
                        value={displayAmount}
                        onChange={(e) => {
                          validateNumber(e.target.value, field, setDisplayAmount);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-text">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-dark-surface-hover border-dark-border text-dark-text">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-surface border-dark-border">
                        <SelectItem value="EXPENSE" className="text-dark-text">
                          Expense
                        </SelectItem>
                        <SelectItem value="INCOME" className="text-dark-text">
                          Income
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-text">Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-dark-surface-hover border-dark-border text-dark-text">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-surface border-dark-border">
                        <SelectItem value="UAH" className="text-dark-text">
                          UAH - Ukrainian Hryvnia
                        </SelectItem>
                        <SelectItem value="USD" className="text-dark-text">
                          USD - US Dollar
                        </SelectItem>
                        <SelectItem value="EUR" className="text-dark-text">
                          EUR - Euro
                        </SelectItem>
                        <SelectItem value="GBP" className="text-dark-text">
                          GBP - British Pound
                        </SelectItem>
                        <SelectItem value="PLN" className="text-dark-text">
                          PLN - Polish Zloty
                        </SelectItem>
                        <SelectItem value="CZK" className="text-dark-text">
                          CZK - Czech Koruna
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-text">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-dark-surface-hover border-dark-border text-dark-text">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-dark-surface border-dark-border">
                        {Array.isArray(categories) && categories.length > 0 ? (
                          categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id} className="text-dark-text">
                              <span className="flex items-center gap-2">
                                <span>{cat.emoji}</span>
                                <span>{cat.name}</span>
                              </span>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem
                            value="no-categories"
                            disabled
                            className="text-dark-text-muted"
                          >
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-dark-text">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal bg-dark-surface-hover border-dark-border text-dark-text hover:bg-dark-surface-hover hover:text-dark-text',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-dark-surface border-dark-border"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString() || '')}
                        className="bg-dark-surface text-dark-text"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-dark-text">Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description..."
                      className="bg-dark-surface-hover border-dark-border text-dark-text resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-transparent border-dark-border text-dark-text hover:bg-dark-surface-hover"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createTransaction.isPending}
                className="bg-dark-accent hover:bg-dark-primary text-white"
              >
                {createTransaction.isPending ? 'Creating...' : 'Create Transaction'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
