import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { DollarSign, Package, Plus, ShoppingCart, TrendingUp } from 'lucide-react';
import { ProducerStatCard } from './ProducerStatCard';
import { columns } from './ProductColumn';

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
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-10 bg-gray-50 dark:bg-zinc-950/50 min-h-screen">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[200px] w-[200px] rounded-full bg-teal-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Aperçu Producteur
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl">
                Gérez vos produits, suivez vos commandes et développez votre activité avec Sabotsy.
                </p>
            </div>
            <Link href={route('producer.products.create')}>
                <Button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all duration-300 rounded-xl h-12 px-8 text-base">
                    <Plus className="mr-2 h-5 w-5" />
                    Ajouter un Produit
                </Button>
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProducerStatCard
          title="Mes Produits"
          value={stats.totalProducts}
          icon={<Package className="h-6 w-6 text-emerald-500" />}
          description="+3 nouveaux ce mois-ci"
          trend="up"
          variant="green"
        />
        <ProducerStatCard
          title="Total des Commandes"
          value={stats.totalOrders}
          icon={<ShoppingCart className="h-6 w-6 text-blue-500" />}
          description="+12% depuis le mois dernier"
          trend="up"
          variant="blue"
        />
        <ProducerStatCard
          title="Revenu"
          value={`${stats.totalRevenue.toLocaleString()} MGA`}
          icon={<DollarSign className="h-6 w-6 text-purple-500" />}
          description="Gains totaux"
          trend="up"
          variant="purple"
        />
        <ProducerStatCard
          title="Produits Actifs"
          value={stats.activeProducts}
          icon={<TrendingUp className="h-6 w-6 text-orange-500" />}
          description="En stock et en vente"
          trend="up"
          variant="orange"
        />
      </div>

      {/* Recent Products Section */}
      <div className="grid gap-8 lg:grid-cols-1">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-8">
               <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Produits Récents</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Gérez vos derniers articles en inventaire</p>
               </div>
          </div>
          <DataTable columns={columns} data={products} />
        </div>
      </div>
    </main>
  );
};
