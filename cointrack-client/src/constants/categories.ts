export const DEFAULT_CATEGORIES = [
  { name: 'Salary', description: 'Main income' },
  { name: 'Groceries', description: 'Food and drinks' },
  { name: 'Transport', description: 'Travel and fuel' },
  { name: 'Entertainment', description: 'Leisure and hobbies' },
  { name: 'Utilities', description: 'Utility bills' },
  { name: 'Health', description: 'Medical and medicine' },
];

export type RegisterStep = 'form' | 'income' | 'categories' | 'complete';

export const ADDITIONAL_CATEGORIES = [
  { name: 'Bars & Nightlife', emoji: '🍺', color: 'bg-yellow-500' },
  { name: 'Beauty', emoji: '💄', color: 'bg-red-500' },
  { name: 'Car', emoji: '🚗', color: 'bg-red-600' },
  { name: 'Children', emoji: '👶', color: 'bg-yellow-600' },
  { name: 'Clothing', emoji: '👕', color: 'bg-pink-500' },
  { name: 'Dance', emoji: '💃', color: 'bg-purple-500' },
  { name: 'Education', emoji: '📚', color: 'bg-blue-500' },
  { name: 'Entertainment', emoji: '🎮', color: 'bg-orange-500' },
  { name: 'Gym', emoji: '💪', color: 'bg-gray-600' },
  { name: 'Home', emoji: '🏠', color: 'bg-green-600' },
  { name: 'Insurance', emoji: '🌂', color: 'bg-purple-600' },
  { name: 'Personal Care', emoji: '💆', color: 'bg-pink-600' },
  { name: 'Pets', emoji: '🐾', color: 'bg-brown-600' },
  { name: 'Recreation', emoji: '🎨', color: 'bg-blue-400' },
  { name: 'Rent', emoji: '🔑', color: 'bg-yellow-700' },
  { name: 'Restaurants', emoji: '🍔', color: 'bg-orange-600' },
  { name: 'Senior Care', emoji: '👴', color: 'bg-gray-500' },
  { name: 'Sports', emoji: '⚽', color: 'bg-green-500' },
  { name: 'Subscriptions', emoji: '📺', color: 'bg-orange-400' },
  { name: 'Transportation', emoji: '🚌', color: 'bg-blue-600' },
  { name: 'Travel & Vacation', emoji: '🏖️', color: 'bg-cyan-500' },
  { name: 'Utilities', emoji: '💡', color: 'bg-yellow-500' },
  { name: 'Yoga & Pilates', emoji: '🧘', color: 'bg-green-400' },
] as const;
