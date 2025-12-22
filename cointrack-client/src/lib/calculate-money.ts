export const centsToDollars = (cents: number): number => {
  return cents / 100;
};

export const dollarsToCents = (dollars: number): number => {
  return Math.round(dollars * 100);
};

export const formatMoney = (amount: number): string => {
  return amount.toFixed(2);
};

export const formatCents = (cents: number): string => {
  return `$${centsToDollars(cents).toFixed(2)}`;
};

export const formatDollars = (dollars: number): string => {
  return `$${dollars.toFixed(2)}`;
};
