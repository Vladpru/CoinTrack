import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as z from 'zod';
import { registerFormSchema } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { DEFAULT_CATEGORIES, RegisterStep } from '@/constants/categories';

const ANIMATION_DURATION = 300;
const REDIRECT_DELAY = 1500;

type FormData = z.infer<typeof registerFormSchema>;

const validateIncome = (income: string): boolean => {
  const value = parseFloat(income);
  return !isNaN(value) && value > 0;
};

const validateAmount = (amount: string): boolean => {
  const value = parseFloat(amount);
  return !isNaN(value) && value >= 0;
};

export function useRegisterFlow() {
  const [currentStep, setCurrentStep] = useState<RegisterStep>('form');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [income, setIncome] = useState('');
  const [amount, setAmount] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { register } = useAuth();
  const { createCategory } = useCategories();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const transitionToStep = useCallback((step: RegisterStep) => {
    setIsAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setCurrentStep(step);
    }, ANIMATION_DURATION);
  }, []);

  const handleFormSubmit = useCallback(
    (values: FormData) => {
      setFormData(values);
      transitionToStep('income');
    },
    [transitionToStep]
  );

  const handleIncomeSubmit = useCallback(() => {
    if (!validateIncome(income)) {
      toast.error('Please enter a valid income amount');
      return;
    }
    if (!validateAmount(amount)) {
      toast.error('Please enter a valid savings amount');
      return;
    }
    transitionToStep('categories');
  }, [income, amount, transitionToStep]);

  const handleFinish = useCallback(
    async (selectedCategories: { name: string; description: string }[]) => {
      if (!formData) return;

      setIsLoading(true);
      try {
        await register.mutateAsync({
          ...formData,
          income: parseFloat(income),
          amount: parseFloat(amount),
        });

        await Promise.all(
          selectedCategories.map((category) => createCategory.mutateAsync(category))
        );

        transitionToStep('complete');

        timeoutRef.current = setTimeout(() => {
          router.push('/dashboard');
        }, REDIRECT_DELAY);
      } catch (error) {
        console.error('Error during setup:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error setting up profile';
        toast.error(errorMessage);
        setIsLoading(false);
      }
    },
    [formData, income, amount, register, createCategory, transitionToStep, router]
  );

  const goBack = useCallback(() => {
    switch (currentStep) {
      case 'income':
        transitionToStep('form');
        break;
      case 'categories':
        transitionToStep('income');
        break;
    }
  }, [currentStep, transitionToStep]);

  return useMemo(
    () => ({
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
    }),
    [
      currentStep,
      income,
      amount,
      isAnimating,
      isLoading,
      handleFormSubmit,
      handleIncomeSubmit,
      handleFinish,
      goBack,
    ]
  );
}
