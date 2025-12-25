'use client';
import { CardContent } from '../ui/card';
import { useGetTopCategories } from '@/hooks/useCategories';

const colorMap: Record<string, string> = {
  'orange-500': '#f97316',
  'red-500': '#ef4444',
  'pink-600': '#db2777',
  'orange-400': '#fb923c',
  'gray-400': '#9ca3af',
  'red-600': '#dc2626',
  'yellow-600': '#ca8a04',
  'pink-500': '#ec4899',
  'purple-500': '#a855f7',
  'blue-500': '#3b82f6',
  'gray-600': '#4b5563',
  'green-600': '#16a34a',
  'purple-600': '#9333ea',
  'brown-600': '#d97706',
  'blue-400': '#60a5fa',
  'yellow-700': '#a16207',
  'orange-600': '#ea580c',
  'green-500': '#22c55e',
  'blue-600': '#2563eb',
  'cyan-500': '#06b6d4',
};

export default function TopCategories() {
  const { categories } = useGetTopCategories();

  if (categories.length === 0 || !categories.some((c) => c.amount > 0)) {
    return (
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-3 opacity-50">📊</div>
          <p className="text-dark-text/60 text-sm">No transactions yet</p>
          <p className="text-dark-text/40 text-xs mt-1">Start tracking your expenses</p>
        </div>
      </CardContent>
    );
  }

  // Знаходимо максимальну суму для розрахунку відсотків
  const maxAmount = Math.max(...categories.map((c) => c.amount));

  return (
    <CardContent className="py-4">
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = maxAmount > 0 ? (category.amount / maxAmount) * 100 : 0;

          return (
            <div
              key={category.name}
              className="group relative p-3 rounded-lg hover:bg-dark-surface-hover/50 transition-all duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl flex-shrink-0">{category.emoji}</span>
                  <span className="text-dark-text font-medium truncate">{category.name}</span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="relative w-32 h-2.5 bg-dark-surface-hover rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colorMap[category.color] || '#9ca3af',
                        boxShadow: `0 0 8px ${colorMap[category.color] || '#9ca3af'}40`,
                      }}
                    />
                  </div>

                  <span className="text-dark-text font-bold text-xl tabular-nums w-20 text-right">
                    ${(category.amount / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );
}
