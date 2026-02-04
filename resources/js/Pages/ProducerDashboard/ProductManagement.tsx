import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ProducerSidebar } from './components/ProducerSidebar';
import { columns } from './components/ProductColumn';
import { ProducerDashboardProvider } from './context/ProducerDashboardProvider';

export default function ProductManagement({ products }: { products: any }) {
    return (
        <ProducerDashboardProvider>
            <div className="flex h-screen overflow-hidden">
                <ProducerSidebar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="flex min-h-screen flex-1 flex-col gap-8 bg-gray-50/50 p-6 dark:bg-zinc-900/50 md:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Mes Produits
                                </h1>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Gérez votre inventaire de produits et vos annonces
                                </p>
                            </div>
                            <Link href={route('producer.products.create')}>
                                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter un Produit
                                </Button>
                            </Link>
                        </div>
                        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                            <DataTable columns={columns} data={products} />
                        </div>
                    </div>
                </div>
            </div>
        </ProducerDashboardProvider>
    );
}
