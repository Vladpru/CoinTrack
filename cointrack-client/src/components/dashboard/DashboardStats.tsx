'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { centsToDollars } from '@/lib/calculate-money';
import { useGetExpense, useGetTransactions } from '@/hooks/useTransaction';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function DashboardStats() {
  const { user } = useAuth();
  const { transactions } = useGetTransactions();

  const budgetCents = user?.amount || 0;
  const incomeCents = user?.income || 0;

  const { expense } = useGetExpense();

  const budget = centsToDollars(budgetCents);
  const income = centsToDollars(incomeCents);
  const spent = Number.isNaN(expense) ? centsToDollars(expense || 0) : 0;
  const remaining = budget - spent;

  const monthlyExpenses = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce(
      (acc, t) => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });

        if (!acc[monthKey]) {
          acc[monthKey] = { month: monthName, year: date.getFullYear(), amount: 0, key: monthKey };
        }
        acc[monthKey].amount += t.amount;
        return acc;
      },
      {} as Record<string, { month: string; year: number; amount: number; key: string }>
    );

  const chartData = Object.values(monthlyExpenses)
    .sort((a, b) => a.key.localeCompare(b.key))
    .slice(-6)
    .map((d) => ({
      month: d.month,
      amount: centsToDollars(d.amount),
    }));

  const chartConfig = {
    amount: {
      label: 'Spent',
      color: 'hsl(var(--dark-accent))',
    },
  } satisfies ChartConfig;

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
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-dark-text mb-1">
              ${remaining.toFixed(2)} left
            </div>
            {/* <div className="text-dark-accent text-sm mb-4">${budget.toFixed(2)} budgeted</div> */}
          </div>

          {chartData.length > 0 && (
            <div className="mt-2">
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                    bottom: 12,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-dark-text-muted"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        formatter={(value) => `$${Number(value).toFixed(2)}`}
                      />
                    }
                  />
                  <defs>
                    <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--dark-accent)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--dark-accent)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="amount"
                    type="linear"
                    fill="url(#fillAmount)"
                    fillOpacity={0.4}
                    stroke="var(--dark-accent)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          )}
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
