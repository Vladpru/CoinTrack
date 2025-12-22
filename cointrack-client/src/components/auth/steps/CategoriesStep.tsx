import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ADDITIONAL_CATEGORIES } from '@/constants/categories';
import { ArrowLeftIcon, X } from 'lucide-react';

interface Category {
  name: string;
  description: string;
}

interface CategoriesStepProps {
  categories: Category[];
  onFinish: (selectedCategories: Category[]) => void;
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
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(categories);
  const [additionalSelected, setAdditionalSelected] = useState<string[]>([]);

  const handleRemoveCategory = (categoryName: string) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat.name !== categoryName));
  };

  const handleAddCategory = (categoryName: string) => {
    if (additionalSelected.includes(categoryName)) {
      setAdditionalSelected((prev) => prev.filter((name) => name !== categoryName));
      setSelectedCategories((prev) => prev.filter((cat) => cat.name !== categoryName));
    } else {
      setAdditionalSelected((prev) => [...prev, categoryName]);
      setSelectedCategories((prev) => [...prev, { name: categoryName, description: '' }]);
    }
  };

  const isCategorySelected = (categoryName: string) => {
    return (
      selectedCategories.some((cat) => cat.name === categoryName) ||
      additionalSelected.includes(categoryName)
    );
  };

  return (
    <Card
      className={`pb-6 pt-0 transition-all duration-300 max-h-[80vh] overflow-y-auto ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >
      <div className="sticky top-0 bg-card z-10 border-b flex justify-between items-center p-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 px-5 py-1 cursor-pointer"
        >
          <ArrowLeftIcon className="h-3 w-3" />
          Back
        </Button>
        <CardTitle className="text-primary text-xl">REVIEW CATEGORIES</CardTitle>
        <button
          onClick={() => onFinish(selectedCategories)}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 px-5 py-1 cursor-pointer"
        >
          Done
        </button>
      </div>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Suggested categories</h3>
          <div className="flex flex-wrap gap-3">
            {selectedCategories.slice(0, 6).map((category) => (
              <button
                key={category.name}
                onClick={() => handleRemoveCategory(category.name)}
                className="px-4 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium flex items-center gap-2 transition-colors"
              >
                {category.name}
                <X className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Additional categories</h3>
          <div className="flex flex-wrap gap-3">
            {ADDITIONAL_CATEGORIES.map((category) => (
              <button
                key={category.name}
                onClick={() => handleAddCategory(category.name)}
                disabled={isCategorySelected(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors ${
                  isCategorySelected(category.name)
                    ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300'
                }`}
              >
                <span>{category.emoji}</span>
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-colors flex items-center justify-center gap-2">
          <span className="text-2xl">+</span>
          Add category
        </button>
      </CardContent>
    </Card>
  );
}
