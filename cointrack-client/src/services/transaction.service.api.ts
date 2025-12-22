import { CreateTransactionReq, UpdateTransactionReq } from '@/types/transaction.types';
import { appApi } from './app.service.api';

export const createTransactionFn = async (transactionData: CreateTransactionReq) => {
  const response = await appApi.post('/transactions', transactionData);
  return response.data;
};

export const updateTransactionFn = async (
  transactionId: string,
  transactionData: UpdateTransactionReq
) => {
  const response = await appApi.post(`/transactions/${transactionId}`, transactionData);
  return response.data;
};

export const deleteTransactionFn = async (transactionId: string) => {
  const response = await appApi.delete(`/transactions/${transactionId}`);
  return response.data;
};

export const getTransactionsFn = async () => {
  const response = await appApi.get('/transactions');
  return response.data;
};

export const getTransactionByIdFn = async (transactionId: string) => {
  const response = await appApi.get(`/transactions/${transactionId}`);
  return response.data;
};

export const getTransactionByCategoryFn = async (categoryId: string) => {
  const response = await appApi.get(`/transactions/by-category/${categoryId}`);
  return response.data;
};

type TMoney = {
  money: number;
};

export const getMoneySpend = async () => {
  const response = await appApi.get<TMoney>('/transactions/money-spend');
  return response.data;
};
