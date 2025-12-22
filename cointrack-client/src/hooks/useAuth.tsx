'use client';

import { loginFn, logoutFn, profileFn, registerFn } from '@/services/auth.service.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();

  const loginRequest = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log('user logged in successfull');
      toast.success('Logged in successfully!');
    },
    onError: (error) => {
      console.error('Login error:', error);

      const err = error as any;
      const status = err?.response?.status ?? err?.status;
      const res_msg = (() => {
        const msg = err?.response?.data?.message ?? err?.message ?? '';
        return msg ? ` ${String(msg)}` : '';
      })();

      let userMessage = 'Login failed. Please check your credentials and try again.';

      if (status === 401) {
        userMessage = 'Incorrect password. Please try again.';
      } else if (status === 404) {
        userMessage = 'User not found. Please register first.';
      } else if (status && status >= 500) {
        userMessage = 'Server error. Please try again later.';
      }

      toast.error(userMessage);
    },
  });

  const registerRequest = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      console.log('user registered in successfull');
      toast.success('Registered in successfully!');
    },
    onError: (error) => {
      console.error('Registration error:', error);
      const err = error as any;
      const status = err?.response?.status ?? err?.status;
      const res_msg = (() => {
        const msg = err?.response?.data?.message ?? err?.message ?? '';
        return msg ? ` ${String(msg)}` : '';
      })();
      let userMessage = 'Registration failed. Please check your details and try again.' + res_msg;

      if (status === 400) {
        userMessage = 'Invalid registration details. Please review and try again.' + res_msg;
      } else if (status === 409) {
        userMessage = 'Email already in use. Please use a different email.' + res_msg;
      } else if (status && status >= 500) {
        userMessage = 'Server error. Please try again later.' + res_msg;
      }
      toast.error(userMessage);
    },
  });

  const hangleLogout = async () => {
    try {
      await logoutFn();
      router.push('/');
      router.refresh();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Log out error!');
    }
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: profileFn,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
  });

  return {
    login: loginRequest,
    register: registerRequest,
    hangleLogout,
    user,
    isLoading,
  };
};
