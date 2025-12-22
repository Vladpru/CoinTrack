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
            type="number"
            placeholder="0.00"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Current Savings</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={onSubmit}
            className="flex-1 bg-dark-primary text-dark-text hover:bg-dark-primary-hover"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
