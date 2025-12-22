import Image from 'next/image';
import { MapPin, Sun, Waves, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-surface-hover">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-6">
            Take control of your
            <span className="text-dark-accent block">spending habits</span>
          </h1>
          <p className="text-xl text-dark-text-muted mb-8 max-w-2xl mx-auto">
            Track your expenses, manage budgets, and achieve your financial goals with CoinTrack
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-4 text-base font-semibold bg-dark-primary hover:bg-dark-primary-hover cursor-pointer"
              >
                Start exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-dark-surface/80 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow border border-dark-border">
            <div className="bg-dark-surface-hover w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-text">Expense tracking</h3>
            <p className="text-dark-text-muted">Track all your expenses by category and location</p>
          </div>

          <div className="bg-dark-surface/80 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow border border-dark-border">
            <div className="bg-dark-surface-hover w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sun className="h-6 w-6 text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-text">Budget management</h3>
            <p className="text-dark-text-muted">
              Set budgets and get real-time insights on your spending
            </p>
          </div>

          <div className="bg-dark-surface/80 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow border border-dark-border">
            <div className="bg-dark-surface-hover w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-text">Analytics & reports</h3>
            <p className="text-dark-text-muted">
              Visualize your spending patterns with detailed reports
            </p>
          </div>

          <div className="bg-dark-surface/80 backdrop-blur-sm p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow border border-dark-border">
            <div className="bg-dark-surface-hover w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-dark-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-text">Financial goals</h3>
            <p className="text-dark-text-muted">Set and track your savings and spending goals</p>
          </div>
        </div>

        <div className="bg-dark-surface/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-16 border border-dark-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-dark-accent mb-2">1M+</div>
              <p className="text-dark-text-muted">Transactions tracked</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-dark-accent mb-2">50K+</div>
              <p className="text-dark-text-muted">Active users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-dark-accent mb-2">$10M+</div>
              <p className="text-dark-text-muted">Money saved</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-text mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg text-dark-text-muted mb-8">
            Join thousands of users who are already achieving their financial goals
          </p>
          <Button
            size="lg"
            className="px-8 py-4 text-base font-semibold bg-gradient-to-r from-dark-primary to-dark-accent hover:from-dark-primary-hover hover:to-dark-primary"
          >
            Get started now
          </Button>
        </div>
      </main>

      <footer className="bg-dark-surface py-8 mt-16 border-t border-dark-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Waves className="h-6 w-6 text-dark-accent" />
            <span className="text-xl font-semibold text-dark-text">CoinTrack</span>
          </div>
          <p className="text-dark-text-muted">© 2025 CoinTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
