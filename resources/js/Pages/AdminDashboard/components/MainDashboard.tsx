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
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-10 bg-gray-50 dark:bg-zinc-950/50 min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[200px] w-[200px] rounded-full bg-teal-500/10 blur-3xl"></div>
        
        <div className="relative z-10 space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Aperçu du Tableau de Bord
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
              Bon retour ! Voici le résumé quotidien des performances de votre boutique et les indicateurs clés.
            </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total des Produits"
          value={stats.totalProducts}
          icon={<Package className="h-6 w-6 text-emerald-500" />}
          description="Articles actifs en boutique"
          trend="up"
          variant="emerald"
        />
        <StatCard
          title="Total des Commandes"
          value={stats.totalOrders}
          icon={<ShoppingCart className="h-6 w-6 text-amber-500" />}
          description="Commandes ce mois-ci"
          trend="up"
          variant="amber"
        />
        <StatCard
          title="Total des Utilisateurs"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6 text-teal-500" />}
          description={`${stats.totalCustomers} Clients, ${stats.totalProducers} Producteurs`}
          trend="up"
          variant="teal"
        />
        <StatCard
          title="Revenu Total"
          value="$45,231" // Placeholder
          icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
          description="+12% depuis le mois dernier"
          trend="up"
          variant="blue"
        />
      </div>

      {/* Charts and Table Section */}
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
             <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Produits Récents</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Derniers ajouts à votre catalogue</p>
                </div>
             </div>
             <DataTable columns={columns} data={products} />
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xl shadow-zinc-200/50 dark:bg-zinc-900/50 dark:border-zinc-800 dark:shadow-none">
              <h4 className="mb-6 text-lg font-bold text-zinc-900 dark:text-zinc-100">Aperçu des Ventes</h4>
              <BarChartGraph />
          </div>
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xl shadow-zinc-200/50 dark:bg-zinc-900/50 dark:border-zinc-800 dark:shadow-none">
              <h4 className="mb-6 text-lg font-bold text-zinc-900 dark:text-zinc-100">Distribution par Catégorie</h4>
              <PieChartGraph />
          </div>
        </div>
      </div>
    </main>
  );
};
