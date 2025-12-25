'use client';

import {
  createCategoryFn,
  getCategoriesFn,
  getCategoryById,
  getTopCategories,
} from '@/services/category.service.api';
import {
  createTransactionFn,
  deleteTransactionFn,
  getMoneySpend,
  getTransactionsFn,
  updateTransactionFn,
} from '@/services/transaction.service.api';
import { CategoryType, TopCategoryResponse } from '@/types/category.types';
import { transactionRes, ITransaction } from '@/types/transaction.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCategories = () => {
  const createCategory = useMutation({
    mutationFn: createCategoryFn,
    mutationKey: ['createCategory'],
    onSuccess: (data) => {
      console.log('category created', data);
    },
    onError: (err) => {
      console.error('Category create error:', err);
      toast.error('Error creating category');
    },
  });

  return {
    createCategory,
  };
};

export const useGetCategories = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<{ categories: CategoryType[] }, Error, CategoryType[]>({
    queryKey: ['categories'],
    queryFn: () => getCategoriesFn(),
    select: (data) => data?.categories || [],
  });
  return {
    categories,
    isLoading,
    isError,
  };
};

export const useGetTopCategories = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<{ categories: TopCategoryResponse[] }, Error, TopCategoryResponse[]>({
    queryKey: ['categories'],
    queryFn: () => getTopCategories(),
    select: (data) => data?.categories || [],
  });
  return {
    categories,
    isLoading,
    isError,
  };
};
