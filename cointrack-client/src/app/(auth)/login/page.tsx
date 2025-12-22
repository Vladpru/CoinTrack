import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-dark-bg via-dark-surface to-dark-surface-hover flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-xl">
        <LoginForm />
      </div>
    </div>
  );
}
