'use client';

import RegisterFormStep from './steps/RegisterFormStep';
import IncomeStep from './steps/IncomeStep';
import CategoriesStep from './steps/CategoriesStep';
import CompleteStep from './steps/CompleteStep';
import ProgressBar from './ProgressBar';
import { useRegisterFlow } from '@/hooks/useRegisterFlow';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

export type RegisterStep = 'form' | 'income' | 'categories' | 'complete';

export default function RegisterForm() {
  const {
    currentStep,
    income,
    setIncome,
    amount,
    setAmount,
    isAnimating,
    isLoading,
    handleFormSubmit,
    handleIncomeSubmit,
    handleFinish,
    goBack,
  } = useRegisterFlow();

  const renderStep = () => {
    switch (currentStep) {
      case 'form':
        return <RegisterFormStep onSubmit={handleFormSubmit} isAnimating={isAnimating} />;

      case 'income':
        return (
          <IncomeStep
            income={income}
            setIncome={setIncome}
            amount={amount}
            setAmount={setAmount}
            onSubmit={handleIncomeSubmit}
            onBack={goBack}
            isAnimating={isAnimating}
          />
        );

      case 'categories':
        return (
          <CategoriesStep
            categories={DEFAULT_CATEGORIES}
            onFinish={handleFinish}
            isLoading={isLoading}
            isAnimating={isAnimating}
            onBack={goBack}
          />
        );

      case 'complete':
        return <CompleteStep isAnimating={isAnimating} />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {currentStep !== 'complete' && <ProgressBar currentStep={currentStep} />}
      {renderStep()}
    </div>
  );
}
