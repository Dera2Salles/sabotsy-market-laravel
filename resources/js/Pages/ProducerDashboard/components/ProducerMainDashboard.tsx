import { Button } from '@/components/ui/button';
import { DollarSign, Package, Plus, ShoppingCart, TrendingUp } from 'lucide-react';
import { ProducerStatCard } from './ProducerStatCard';

interface ProducerMainDashboardProps {
    stats: {
        totalProducts: number;
        totalOrders: number;
        totalRevenue: number;
        activeProducts: number;
    };
    products: any;
}

export const ProducerMainDashboard = ({ stats, products }: ProducerMainDashboardProps) => {
  return (
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-8 bg-gray-50/50 dark:bg-zinc-900/50 min-h-screen">
      {/* Welcome Section */}
      <div className="animate-slide-up flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Producer Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Manage your products, track orders, and grow your business.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 rounded-xl h-11 px-6">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProducerStatCard
          title="My Products"
          value={stats.totalProducts}
          icon={<Package className="h-5 w-5" />}
          description="+3 new this month"
          trend="up"
          variant="green"
        />
        <ProducerStatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart className="h-5 w-5" />}
          description="+12% from last month"
          trend="up"
          variant="blue"
        />
        <ProducerStatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          description="Total earnings"
          trend="up"
          variant="purple"
        />
        <ProducerStatCard
          title="Active Products"
          value={stats.activeProducts}
          icon={<TrendingUp className="h-5 w-5" />}
          description="In stock and selling"
          trend="up"
          variant="orange"
        />
      </div>

      {/* Products Table Section - Placeholder for now, later enhance with DataTable */}
      <div className="grid gap-8 lg:grid-cols-1">
        <div className="animate-scale-in bg-white/50 dark:bg-zinc-900/50 rounded-2xl p-6 shadow-sm backdrop-blur-sm border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Products</h3>
          </div>
          <div className="p-12 text-center text-gray-500 bg-gray-50/50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-gray-200 dark:border-zinc-800">
               <Package className="h-10 w-10 mx-auto mb-3 text-gray-400 opacity-50" />
               <p>Product list visualization coming soon</p>
               <p className="text-sm mt-1">Total count: {products?.data?.length || 0}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
