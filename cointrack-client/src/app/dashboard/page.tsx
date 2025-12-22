import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardStats from '@/components/dashboard/DashboardStats';
import UserName from '@/components/dashboard/UserName';
export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-base px-3 py-4 font-medium text-dark-text border-b border-dark-border bg-dark-surface">
        Dashboard
      </h1>
      <div className="pt-5 p-8">
        <UserName />
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-dark-text">Top categories</CardTitle>
              <Link
                href="/dashboard/categories"
                className="text-dark-accent text-sm hover:underline"
              >
                View all →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { icon: '🛍️', name: 'Shops', amount: 322, limit: 100 },
                  { icon: '💛', name: 'Donations', amount: 0, limit: 100 },
                  { icon: '🥬', name: 'Groceries', amount: 0, limit: 100 },
                  { icon: '🩺', name: 'Healthcare', amount: 0, limit: 100 },
                  { icon: '💰', name: 'Loans', amount: 0, limit: 100 },
                ].map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-dark-text">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 w-24 h-2 bg-dark-surface-hover rounded-full overflow-hidden">
                        <div
                          className="h-full bg-dark-danger rounded-full"
                          style={{ width: `${(category.amount / category.limit) * 100}%` }}
                        />
                      </div>
                      <span className="text-dark-text font-semibold w-16 text-right">
                        ${category.amount}
                      </span>
                      <span className="text-dark-text-muted w-16 text-right">
                        ${category.limit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
