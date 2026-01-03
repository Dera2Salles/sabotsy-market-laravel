import { Button } from '@/components/ui/button';
import { DollarSign, Package, Plus, ShoppingCart, TrendingUp } from 'lucide-react';
import { ProducerStatCard } from './ProducerStatCard';
// Reuse Product columns or define simple ones. 
// For now, let's just display stats properly. 
// If products list is passed, we can show it.

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
    <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Welcome Section */}
      <div className="animate-slide-up flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Producer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products, track orders, and grow your business.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <ProducerStatCard
          title="My Products"
          value={stats.totalProducts}
          icon={<Package className="h-5 w-5" />}
          description="+3 new this month"
          trend="up"
          gradient="green"
        />
        <ProducerStatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart className="h-5 w-5" />}
          description="+12% from last month"
          trend="up"
          gradient="blue"
        />
        <ProducerStatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          description="+8.2% from last month"
          trend="up"
          gradient="purple"
        />
        <ProducerStatCard
          title="Active Products"
          value={stats.activeProducts}
          icon={<TrendingUp className="h-5 w-5" />}
          description="In stock and selling"
          trend="up"
          gradient="orange"
        />
      </div>

      {/* Products Table Section using Generic DataTable if columns available, else list */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-1">
        <div className="animate-scale-in bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            My Products - Recent
          </h3>
          {/* We can use DataTable here if we import columns. Retaining manual list logic for now or rendering simple count */}
           <p>Total products visible here: {products.data.length}</p>
        </div>
      </div>
    </main>
  );
};
