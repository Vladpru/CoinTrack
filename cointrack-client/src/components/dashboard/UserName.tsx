'use client';
import { useAuth } from '@/hooks/useAuth';

export default function UserName() {
  const { user } = useAuth();

  if (user && user.name) {
    return <h3 className="text-2xl font-medium mb-3">Hello, {user.name}!</h3>;
  } else {
    return <h3 className="text-2xl font-medium mb-3">Hello!</h3>;
  }
}
