'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  TrendingUp,
  FolderTree,
  Repeat,
  HelpCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { hangleLogout } = useAuth();

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/transactions', icon: ArrowLeftRight, label: 'Transactions' },
    { href: '/dashboard/categories', icon: FolderTree, label: 'Categories' },
  ];

  return (
    <aside className="w-58 bg-dash-primary border-r border-gray-800 p-4 h-screen flex-shrink-0">
      <nav className="flex flex-col justify-between h-full pt-4">
        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-start gap-3 px-4 py-3 rounded-lg transition text-sm  ${
                  isActive
                    ? 'bg-[#5089D7] text-dash-primary font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a2942]'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          className="flex justify-start items-center gap-3 px-4 py-3 rounded-lg transition text-gray-400 hover:text-white hover:bg-[#1a2942] cursor-pointer"
          onClick={hangleLogout}
        >
          <LogOut size={15} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
