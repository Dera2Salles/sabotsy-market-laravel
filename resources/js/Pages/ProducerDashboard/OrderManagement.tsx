import { DataTable } from '@/components/common/DataTable';
import { columns } from './components/OrderColumn';
import { ProducerSidebar } from './components/ProducerSidebar';
import { ProducerDashboardProvider } from './context/ProducerDashboardProvider';

export default function OrderManagement({ orders }: { orders: any }) {
    return (
        <ProducerDashboardProvider>
            <div className="flex h-screen overflow-hidden">
                <ProducerSidebar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="flex min-h-screen flex-1 flex-col gap-8 bg-gray-50/50 p-6 dark:bg-zinc-900/50 md:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Order Management
                                </h1>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Track and manage all your product orders
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                            <DataTable columns={columns} data={orders} />
                        </div>
                    </div>
                </div>
            </div>
        </ProducerDashboardProvider>
    );
}
