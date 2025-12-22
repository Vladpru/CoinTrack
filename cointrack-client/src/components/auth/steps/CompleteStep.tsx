import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CompleteStepProps {
  isAnimating: boolean;
}

export default function CompleteStep({ isAnimating }: CompleteStepProps) {
  return (
    <Card
      className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >
      <CardHeader>
        <CardTitle className="text-primary text-2xl text-center">All Done!</CardTitle>
        <CardDescription className="text-center">
          Your profile is set up. Redirecting to dashboard...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </CardContent>
    </Card>
  );
}
