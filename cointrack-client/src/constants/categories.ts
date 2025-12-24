export const DEFAULT_CATEGORIES = [
  { name: 'Entertainment', emoji: '🎮', color: 'orange-500' },
  { name: 'Beauty', emoji: '💄', color: 'red-500' },
  { name: 'Personal Care', emoji: '💆', color: 'pink-600' },
  { name: 'Subscriptions', emoji: '📺', color: 'orange-400' },
  { name: 'Other', emoji: '📄', color: 'gray-400' },
];

export type RegisterStep = 'form' | 'income' | 'categories' | 'complete';

export const ADDITIONAL_CATEGORIES = [
  { name: 'Beauty', emoji: '💄', color: 'red-500' },
  { name: 'Car', emoji: '🚘', color: 'red-600' },
  { name: 'Children', emoji: '👶', color: 'yellow-600' },
  { name: 'Clothing', emoji: '👕', color: 'pink-500' },
  { name: 'Dance', emoji: '💃', color: 'purple-500' },
  { name: 'Education', emoji: '📚', color: 'blue-500' },
  { name: 'Entertainment', emoji: '🎮', color: 'orange-500' },
  { name: 'Gym', emoji: '💪', color: 'gray-600' },
  { name: 'Home', emoji: '🏠', color: 'green-600' },
  { name: 'Insurance', emoji: '🌂', color: 'purple-600' },
  { name: 'Personal Care', emoji: '💆', color: 'pink-600' },
  { name: 'Pets', emoji: '🐾', color: 'brown-600' },
  { name: 'Recreation', emoji: '🎨', color: 'blue-400' },
  { name: 'Rent', emoji: '🔑', color: 'yellow-700' },
  { name: 'Restaurants', emoji: '🍔', color: 'orange-600' },
  { name: 'Sports', emoji: '⚽', color: 'green-500' },
  { name: 'Subscriptions', emoji: '📺', color: 'orange-400' },
  { name: 'Transportation', emoji: '🚌', color: 'blue-600' },
  { name: 'Travel & Vacation', emoji: '🏖️', color: 'cyan-500' },
  { name: 'Utilities', emoji: '💡', color: 'yellow-500' },
  { name: 'Yoga & Pilates', emoji: '🧘', color: 'green-400' },
] as const;
