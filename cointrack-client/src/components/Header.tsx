'use server';
import Link from 'next/link';
import HeaderActions from './HeaderActions';
import { cookies } from 'next/headers';

export default async function Header() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('refresh_token');
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-surface/80 backdrop-blur supports-backdrop-filter:bg-dark-surface/60 px-20">
      <div className="container flex h-18 items-center justify-between">
        <Link href="/" className="relative z-10 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-dark-text">CoinTrack</span>
        </Link>

        <nav className="flex items-center gap-4">
          <HeaderActions isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </header>
  );
}
