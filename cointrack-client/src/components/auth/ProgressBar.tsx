import { RegisterStep } from '@/constants/categories';

interface ProgressBarProps {
  currentStep: RegisterStep;
}

const STEPS = [
  { key: 'form', label: 'Registration' },
  { key: 'income', label: 'Finance' },
  { key: 'categories', label: 'Categories' },
  { key: 'complete', label: 'Done' },
] as const;

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const currentIndex = STEPS.findIndex((step) => step.key === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={step.key}
              className={
                step.key === 'complete' ? 'flex ml-5 items-start' : 'flex flex-1 items-center'
              }
            >
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                >
                  {step.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
