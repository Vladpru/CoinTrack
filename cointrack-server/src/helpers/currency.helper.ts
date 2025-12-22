export class CurrencyHelper {
  static toMinorUnits(amount: number): number {
    return Math.round(amount * 100);
  }

  static toMajorUnits(minorUnits: number): number {
    return minorUnits / 100;
  }

  static formatAmount(minorUnits: number, currency: string = 'UAH'): string {
    const majorUnits = this.toMajorUnits(minorUnits);
    return `${majorUnits.toFixed(2)} ${currency}`;
  }

  static isValidCurrency(currency: string): boolean {
    const supportedCurrencies = [
      'UAH',
      'USD',
      'EUR',
      'GBP',
      'PLN',
      'CZK',
      'CAD',
      'AUD',
      'JPY',
      'CHF',
    ];
    return supportedCurrencies.includes(currency.toUpperCase());
  }

  static getCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
      UAH: '₴',
      USD: '$',
      EUR: '€',
      GBP: '£',
      PLN: 'zł',
      CZK: 'Kč',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      CHF: 'CHF',
    };
    return symbols[currency.toUpperCase()] || currency;
  }
}
