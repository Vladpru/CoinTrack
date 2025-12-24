'use client';

import { Plus, Search, Filter, RefreshCw, Grid3x3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchButton from '@/components/transactions/SearchButton';
import AddTransactionDialog from '@/components/transactions/AddTransactionDialog';
import { useGetExpense, useGetTransactions } from '@/hooks/useTransaction';
import { useGetCategories } from '@/hooks/useCategories';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';

export default function TransactionsPage() {
  const { transactions } = useGetTransactions();
  const { categories } = useGetCategories();
  const { expense = 0 } = useGetExpense();
  const transactionsCount = transactions.length;

  const groupedTransactions = useMemo(() => {
    const grouped: Record<string, typeof transactions> = {};

    transactions.forEach((transaction) => {
      const date = parseISO(transaction.date);
      const monthKey = format(date, 'MMMM yyyy');

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(transaction);
    });

    return grouped;
  }, [transactions]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-3 font-medium text-dark-text border-b border-dark-border bg-dark-surface">
        <h1 className="text-base font-medium text-dark-text">Transactions</h1>
        <div className="flex items-center gap-2">
          <AddTransactionDialog>
            <Button
              size="sm"
              className="bg-transparent hover:bg-dark-surface-hover text-dark-text-muted h-8 w-8 p-0"
            >
              <Plus size={18} />
            </Button>
          </AddTransactionDialog>
          <Button
            size="sm"
            className="bg-transparent hover:bg-dark-surface-hover text-dark-text-muted h-8 w-8 p-0"
          >
            <RefreshCw size={18} />
          </Button>
          <SearchButton />
          <Button
            size="sm"
            className="bg-transparent hover:bg-dark-surface-hover text-dark-text-muted h-8 w-8 p-0"
          >
            <Filter size={18} />
          </Button>
        </div>
      </div>
      <div className="px-8 py-4 border-b border-dark-border flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-surface-hover rounded-md">
          <span className="text-sm text-dark-text">Not excluded</span>
          <X size={14} className="text-dark-text-muted cursor-pointer hover:text-dark-text" />
        </div>
        <button className="flex items-center gap-1 text-sm text-dark-accent hover:text-dark-primary">
          <Plus size={14} />
          Add filter
        </button>
      </div>
      <div className="px-8 py-4 border-b border-dark-border flex items-center justify-between">
        <span className="text-sm text-dark-text-muted">
          {transactionsCount} {transactionsCount === 1 ? 'transaction' : 'transactions'}
        </span>
        <div className="flex items-center gap-6 text-sm">
          <span className="text-dark-text-muted">
            Total spent{' '}
            <span className="text-dark-text font-semibold">
              ${typeof expense === 'number' ? expense.toFixed(2) : '0.00'}
            </span>
          </span>
          <span className="text-dark-text-muted">
            Total income <span className="text-dark-text font-semibold">$0.00</span>
          </span>
          <span className="text-dark-text-muted">
            Net{' '}
            <span className="text-dark-text font-semibold">
              ${typeof expense === 'number' ? expense.toFixed(2) : '0.00'}
            </span>
          </span>
        </div>
      </div>
      <div className="px-8 py-6">
        {transactionsCount === 0 ? (
          <div className="text-center py-12 text-dark-text-muted">
            <p className="text-lg">No transactions yet</p>
            <p className="text-sm mt-2">Create your first transaction to get started</p>
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
            <div key={month} className="mb-8">
              <h2 className="text-lg font-semibold text-dark-text mb-4">{month}</h2>
              <div className="space-y-3">
                {monthTransactions.map((transaction) => {
                  const isExpense = transaction.type === 'EXPENSE';
                  const amountInDollars = (transaction.amount / 100).toFixed(2);
                  const category = categories.find((cat) => cat.id === transaction.categoryId);

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-dark-surface-hover rounded-lg border border-dark-border hover:border-dark-accent 
                      transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-dark-text">{transaction.name}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-sm text-dark-text-muted">
                            {format(parseISO(transaction.date), 'MMM dd, yyyy')}
                          </span>
                          {category && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full bg-${category.color}/30 text-gray-100 border border-${category.color}/50 flex items-center gap-1`}
                            >
                              <span>{category.emoji}</span>
                              <span>{category.name}</span>
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isExpense
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </div>
                        {transaction.description && (
                          <p className="text-sm text-dark-text-muted mt-1">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p
                          className={`text-lg font-semibold ${
                            isExpense ? 'text-red-400' : 'text-green-400'
                          }`}
                        >
                          {isExpense ? '-' : '+'}${amountInDollars}
                        </p>
                        <p className="text-xs text-dark-text-muted">{transaction.currency}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
