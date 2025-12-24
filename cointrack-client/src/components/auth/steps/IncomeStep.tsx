import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IncomeStepProps {
  income: string;
  setIncome: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isAnimating: boolean;
}

export default function IncomeStep({
  income,
  setIncome,
  amount,
  setAmount,
  onSubmit,
  onBack,
  isAnimating,
}: IncomeStepProps) {
  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) || value === '') {
      setter(value);
    }
  };

  const isValidNumber = (value: string) => {
    return value !== '' && !isNaN(parseFloat(value)) && parseFloat(value) >= 0;
  };

  const canContinue = isValidNumber(income) && isValidNumber(amount);

  return (
    <Card
      className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >
      <CardHeader>
        <CardTitle className="text-primary text-2xl">Financial Setup</CardTitle>
        <CardDescription>
          Set your monthly income and current savings for better budget tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="income">Monthly Income</Label>
          <Input
            id="income"
            type="text"
            placeholder="0.00"
            value={income}
            onChange={(e) => handleNumberInput(e.target.value, setIncome)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Current Savings</Label>
          <Input
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => handleNumberInput(e.target.value, setAmount)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 cursor-pointer"
          >
            Back
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!canContinue}
            className="flex-1 bg-dark-primary text-dark-text hover:bg-dark-primary-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
