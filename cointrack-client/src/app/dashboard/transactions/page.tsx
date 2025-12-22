'use client';

import { Plus, Search, Filter, RefreshCw, Grid3x3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchButton from '@/components/transactions/SearchButton';
import AddTransactionDialog from '@/components/transactions/AddTransactionDialog';
import { useGetExpense, useGetTransactions } from '@/hooks/useTransaction';
import { formatCents, formatDollars } from '@/lib/calculate-money';

export default function TransactionsPage() {
  const { transactions = [] } = useGetTransactions();
  const { expense = 0 } = useGetExpense();
  const transactionsCount = transactions.length;

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

      {transactions.map((transaction) => (
        <div key={transaction.id} className="px-8 py-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-dark-text">December 2025</h2>
              <span className="text-xl font-semibold text-dark-text">
                ${transaction.amount.toFixed(2)}
              </span>
            </div>

            <div className="mb-3">
              <h3 className="text-sm text-dark-accent mb-3">Today</h3>

              <div className="flex items-center justify-between p-3 hover:bg-dark-surface-hover rounded-lg cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-dark-border opacity-0 group-hover:opacity-100 transition"
                  />
                  <div>
                    <div className="text-dark-text font-medium">New: b m</div>
                    <div className="text-sm text-dark-text-muted">Manual account</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-pink-900/30 rounded-full">
                    <span className="text-base">🛍️</span>
                    <span className="text-xs text-pink-200 font-medium">SHOPS</span>
                  </div>
                  <div className="text-lg font-semibold text-dark-text min-w-[100px] text-right">
                    $322.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
