import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ADDITIONAL_CATEGORIES } from '@/constants/categories';
import { X } from 'lucide-react';
import { CategoryType } from '@/types/category.types';

interface CategoriesStepProps {
  categories: CategoryType[];
  onFinish: (selectedCategories: CategoryType[]) => void;
  isLoading: boolean;
  isAnimating: boolean;
  onBack: () => void;
}

export default function CategoriesStep({
  categories,
  onFinish,
  isLoading,
  isAnimating,
  onBack,
}: CategoriesStepProps) {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(categories);

  const handleRemoveCategory = (categoryName: string) => {
    if (categoryName === 'Other') return;
    setSelectedCategories((categories) => categories.filter((cat) => cat.name !== categoryName));
  };

  const handleAddCategory = (category: CategoryType) => {
    const isSelected = selectedCategories.some((cat) => cat.name === category.name);

    if (isSelected) {
      setSelectedCategories((categories) => categories.filter((cat) => cat.name !== category.name));
    } else {
      setSelectedCategories((categories) => [
        ...categories,
        {
          id: category.id,
          name: category.name,
          emoji: category.emoji,
          color: category.color,
        },
      ]);
    }
  };

  const isCategorySelected = (categoryName: string) => {
    return selectedCategories.some((cat) => cat.name === categoryName);
  };

  return (
    <Card
      className={`pb-6 pt-0 transition-all duration-300 max-h-[80vh] overflow-y-auto ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
         [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-600`}
    >
      <div className="sticky top-0 bg-card z-10 border-b flex justify-between items-center p-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="cursor-pointer px-5 py-1"
        >
          Back
        </Button>
        <CardTitle className="text-primary text-xl">REVIEW CATEGORIES</CardTitle>
        <button
          onClick={() => onFinish(selectedCategories)}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md disabled:opacity-50 px-5 py-1 cursor-pointer"
        >
          Done
        </button>
      </div>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Selected categories</h3>
          <div className="flex flex-wrap gap-3">
            {selectedCategories.map((category) => {
              const isOther = category.name === 'Other';
              return (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors ${
                    isOther
                      ? 'bg-purple-500/10 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 cursor-pointer'
                  }`}
                  onClick={() => handleRemoveCategory(category.name)}
                  disabled={isOther}
                >
                  {category.name} <span>{category.emoji}</span>
                  {!isOther && <X className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Recommended categories</h3>
          <div className="flex flex-wrap gap-3">
            {ADDITIONAL_CATEGORIES.map((category, index) => (
              <button
                key={index}
                onClick={() => handleAddCategory({ id: category.name, ...category })}
                disabled={isCategorySelected(category.name)}
                className={`px-4 py-2 rounded-full text-base font-medium flex items-center gap-2 transition-colors ${
                  isCategorySelected(category.name)
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed font-normal'
                    : 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300'
                }`}
              >
                <span>{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
