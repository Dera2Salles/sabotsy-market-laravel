import { DataTable } from '@/components/common/DataTable';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { BarChartGraph } from './BarChart';
import { columns } from './DataTableColumn';
import { PieChartGraph } from './PieChart';
import { StatCard } from './StatCard';

interface MainDashboardProps {
    stats: {
        totalUsers: number;
        totalProducers: number;
        totalCustomers: number;
        totalProducts: number;
        totalOrders: number;
    };
    products: any;
    recentUsers: any[];
}

export const MainDashboard = ({ stats, products, recentUsers }: MainDashboardProps) => {
  return (
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-8 bg-gray-50/50 dark:bg-zinc-900/50 min-h-screen">
      {/* Welcome Section */}
      <div className="animate-slide-up space-y-1">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Welcome back! Here's your daily store performance summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="h-5 w-5" />}
          description="Active items in store"
          trend="up"
          variant="emerald"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart className="h-5 w-5" />}
          description="Orders this month"
          trend="up"
          variant="amber"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-5 w-5" />}
          description={`${stats.totalCustomers} Customers, ${stats.totalProducers} Producers`}
          trend="up"
          variant="teal"
        />
        <StatCard
          title="Total Revenue"
          value="$45,231" // Placeholder
          icon={<TrendingUp className="h-5 w-5" />}
          description="+12% from last month"
          trend="up"
          variant="blue"
        />
      </div>

      {/* Charts and Table Section */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-8 animate-scale-in">
          <div className="rounded-2xl border bg-white/50 dark:bg-zinc-900/50 p-6 shadow-sm backdrop-blur-sm">
             <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Products</h3>
             </div>
             <DataTable columns={columns} data={products} />
          </div>
        </div>
        
        <div className="space-y-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <BarChartGraph />
          <PieChartGraph />
        </div>
      </div>
    </main>
  );
};
