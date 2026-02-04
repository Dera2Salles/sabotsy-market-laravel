import { DataTable } from '@/components/common/DataTable';
import { AppSidebar } from '@/Pages/AdminDashboard/components/AppSidebar';
import { SiteHeader } from '@/Pages/AdminDashboard/components/SiteHeader';
import { columns } from './components/ProducerColumn';

export default function ProducerManagement({ producers }: { producers: any }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <SiteHeader />
                <div className="flex min-h-screen flex-1 flex-col gap-8 bg-gray-50/50 p-6 dark:bg-zinc-900/50 md:p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Producer Management
                            </h1>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Manage and monitor all registered producers
                            </p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                        <DataTable columns={columns} data={producers} />
                    </div>
                </div>
            </div>
        </div>
    );
}
