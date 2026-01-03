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
    <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Welcome Section */}
      <div className="animate-slide-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="h-5 w-5" />}
          description="Total products available"
          trend="up"
          gradient="purple"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart className="h-5 w-5" />}
          description="Total orders placed"
          trend="up"
          gradient="green"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-5 w-5" />}
          description={`${stats.totalCustomers} Customers, ${stats.totalProducers} Producers`}
          trend="up"
          gradient="orange"
        />
        <StatCard
          title="Total Revenue"
          value="$45,231" // Placeholder for now or pass from backend if available
          icon={<TrendingUp className="h-5 w-5" />}
          description="Calculated revenue"
          trend="up"
          gradient="blue"
        />
      </div>

      {/* Charts and Table Section */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 animate-scale-in">
          <DataTable columns={columns} data={products} />
        </div>
        <div className="grid auto-rows-max items-start gap-6 md:gap-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <BarChartGraph />
          <PieChartGraph />
        </div>
      </div>
    </main>
  );
};
