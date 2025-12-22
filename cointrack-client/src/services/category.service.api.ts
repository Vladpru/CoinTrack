import { appApi } from './app.service.api';
import { CategoryType } from '@/types/category.types';

export const createCategoryFn = async (categoryData: CategoryType) => {
  const response = await appApi.post<CategoryType>('category', categoryData);
  return response.data;
};

export const getCategoriesFn = async () => {
  const response = await appApi.get<{ categories: CategoryType[] }>('get-all');
  return response.data;
};

export const deleteCategoryFn = async (categoryId: string) => {
  const response = await appApi.delete<CategoryType>(`category/${categoryId}`);
  return response.data;
};
