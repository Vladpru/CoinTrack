'use client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetCategories } from '@/hooks/useCategories';

export default function CategoriesPage() {
  const { categories } = useGetCategories();

  const excludedCategories = [{ icon: '💼', name: 'Work Expenses', spent: 0, budget: 0 }];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark-text">Categories</h1>
        <Button className="bg-dark-primary hover:bg-dark-primary-hover text-white">
          <Plus size={20} className="mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="bg-dark-surface border-dark-border mb-8">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-4xl font-bold text-dark-text mb-2">$322</div>
              <div className="text-dark-accent text-sm">spent in Dec</div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#1a2332" strokeWidth="12" fill="none" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#ef4444"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(322 / 500) * 351.86} 351.86`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-dark-text font-semibold">64%</span>
                </div>
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-4xl font-bold text-dark-text mb-2">$500</div>
              <div className="text-dark-accent text-sm">total budget</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dark-text-muted">Regular categories</h2>
          <div className="flex items-center gap-8 text-sm text-dark-text-muted">
            <span>SPENT</span>
            <span className="mr-20">BUDGET</span>
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg border border-dark-border overflow-hidden">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`flex items-center justify-between p-4 hover:bg-dark-surface-hover transition cursor-pointer ${
                index !== categories.length - 1 ? 'border-b border-dark-border' : ''
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-dark-text font-medium">{category.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-dark-text font-semibold w-16 text-right">
                  ${category.spent}
                </span>
                <div className="w-64 h-2 bg-dark-surface-hover rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      category.spent > category.budget ? 'bg-dark-danger' : 'bg-dark-success'
                    }`}
                    style={{
                      width:
                        category.budget > 0 ? `${(category.spent / category.budget) * 100}%` : '0%',
                    }}
                  />
                </div>
                <span className="text-dark-text-muted w-16 text-right">${category.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dark-text-muted">Excluded categories</h2>
        </div>

        <div className="bg-dark-surface rounded-lg border border-dark-border overflow-hidden">
          {excludedCategories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between p-4 hover:bg-dark-surface-hover transition cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-dark-text font-medium">{category.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-dark-text font-semibold w-16 text-right">
                  ${category.spent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
