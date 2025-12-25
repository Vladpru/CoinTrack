import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardStats from '@/components/dashboard/DashboardStats';
import UserName from '@/components/dashboard/UserName';
import TopCategories from '@/components/dashboard/TopCategories';
export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-base px-3 py-4 font-medium text-dark-text border-b border-dark-border bg-dark-surface">
        Dashboard
      </h1>
      <div className="pt-5 p-8">
        <UserName />
        <DashboardStats />
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-dark-surface border-dark-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-dark-text">Top categories by expences</CardTitle>
              <Link
                href="/dashboard/categories"
                className="text-dark-accent text-sm hover:underline"
              >
                View all →
              </Link>
            </CardHeader>
            <TopCategories />
          </Card>
        </div> */}
      </div>
    </div>
  );
}
