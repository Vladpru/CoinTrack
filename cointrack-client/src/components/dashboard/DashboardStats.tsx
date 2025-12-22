'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { centsToDollars, formatCents } from '@/lib/calculate-money';
import { useGetExpense } from '@/hooks/useTransaction';

export default function DashboardStats() {
  const { user } = useAuth();

  const budgetCents = user?.amount || 0;
  const incomeCents = user?.income || 0;
  const spentCents = 32200;

  const { expense } = useGetExpense();

  const budget = centsToDollars(budgetCents);
  const income = centsToDollars(incomeCents);
  const spent = Number.isNaN(expense) ? centsToDollars(expense || 0) : 0;
  const remaining = budget - spent;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-dark-surface border-dark-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-dark-text">Monthly spending</CardTitle>
          <Link href="/dashboard/transactions" className="text-dark-accent text-sm hover:underline">
            Transactions →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl font-bold text-dark-text mb-2">
              ${remaining.toFixed(2)} left
            </div>
            <div className="text-dark-accent text-sm">${budget.toFixed(2)} budgeted</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dark-surface border-dark-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-dark-text">Income & Budget</CardTitle>
          <Link href="/dashboard/accounts" className="text-dark-accent text-sm hover:underline">
            Details →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-dark-text-muted mb-1">• Income</div>
              <div className="text-2xl font-bold text-dark-text">${income.toFixed(2)}</div>
              <div className="text-xs text-dark-text-muted">Monthly</div>
            </div>
            <div>
              <div className="text-sm text-dark-text-muted mb-1">• Budget</div>
              <div className="text-2xl font-bold text-dark-text">${budget.toFixed(2)}</div>
              <div className="text-xs text-dark-text-muted">Available</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
