'use client';

import {
  createTransactionFn,
  deleteTransactionFn,
  getMoneySpend,
  getTransactionsFn,
  updateTransactionFn,
} from '@/services/transaction.service.api';
import { transactionRes, ITransaction } from '@/types/transaction.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useTransaction = () => {
  const createTransaction = useMutation({
    mutationFn: createTransactionFn,
    onSuccess: (data) => {
      toast.success('Transaction created!');
    },
    onError: (err) => {
      console.error('Transaction creation error: ', err);
      toast.error('Error creating transaction');
    },
  });

  const updateTransaction = useMutation({
    mutationFn: ({ transactionId, transactionData }: transactionRes) =>
      updateTransactionFn(transactionId, transactionData),
    onSuccess: (data) => {
      toast.success('Transaction updated!');
    },
    onError: (err) => {
      console.error('Transaction update error: ', err);
      toast.error('Error updating transaction');
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionFn,
    onSuccess: (data) => {
      toast.success('Transaction updated!');
    },
    onError: (err) => {
      console.error('Transaction update error: ', err);
      toast.error('Error updating transaction');
    },
  });

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

export const useGetTransactions = () => {
  const {
    data: transactions = [],
    isLoading,
    isError,
  } = useQuery<{ transactions: ITransaction[] }, Error, ITransaction[]>({
    queryKey: ['transactions'],
    queryFn: () => getTransactionsFn(),
    select: (data) => (Array.isArray(data) ? data : []),
  });

  return {
    transactions,
    isLoading,
    isError,
  };
};

export const useGetExpense = () => {
  const {
    data: expense,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['expense'],
    queryFn: getMoneySpend,
    select: (data) => data?.money || 0,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    expense,
    isLoading,
    isError,
    error,
  };
};
