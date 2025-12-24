'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CategoryType as CreateCategoryInput, CategorySchema } from '@/types/category.types';
import { useTransaction } from '@/hooks/useTransaction';
import { useCategories, useGetCategories } from '@/hooks/useCategories';

interface DialogProps {
  children?: React.ReactNode;
  onCategoryCreated?: (category: CreateCategoryInput) => void;
}

export default function AddCategoryDialog({ children, onCategoryCreated }: DialogProps) {
  const [open, setOpen] = useState(false);
  const { createCategory } = useCategories();

  const { categories } = useGetCategories();

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
      emoji: '',
      color: '',
    },
  });

  const onSubmit = async (data: CreateCategoryInput) => {
    try {
      await createCategory.mutateAsync(data);
      onCategoryCreated?.(data);
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
          <DialogTitle className="text-dark-text">Add Category</DialogTitle>
          <DialogDescription className="text-dark-text-muted">
            Create a new category. Fill in the details below.
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
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-text">Emoji</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="😀"
                        className="bg-dark-surface-hover border-dark-border text-dark-text text-2xl text-center"
                        maxLength={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-dark-text">Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          className="bg-dark-surface-hover border-dark-border h-10 w-20 cursor-pointer"
                          {...field}
                        />
                        <Input
                          type="text"
                          placeholder="#000000"
                          className="bg-dark-surface-hover border-dark-border text-dark-text flex-1"
                          maxLength={7}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                disabled={createCategory.isPending}
                className="bg-dark-accent hover:bg-dark-primary text-white"
              >
                {createCategory.isPending ? 'Creating...' : 'Create Category'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
