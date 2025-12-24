'use client';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type HeaderActionsProps = {
  isAuthenticated: boolean;
};

export default function HeaderActions({ isAuthenticated: serverAuth }: HeaderActionsProps) {
  const router = useRouter();
  const { hangleLogout, isAuthenticated, user } = useAuth();

  const showLogout = serverAuth && isAuthenticated && user;

  if (showLogout) {
    return (
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          className="px-8 py-4 text-base font-semibold border-dark-danger text-dark-danger hover:bg-dark-danger/10 cursor-pointer"
          onClick={hangleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="space-x-4">
        <Button
          variant="outline"
          className="px-8 py-4 text-base font-semibold border-dark-primary text-dark-primary hover:bg-dark-surface-hover cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          variant="outline"
          className="px-8 py-4 text-base font-semibold bg-dark-primary text-dark-surface hover:bg-dark-primary-hover hover:text-dark-surface-hover cursor-pointer"
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
