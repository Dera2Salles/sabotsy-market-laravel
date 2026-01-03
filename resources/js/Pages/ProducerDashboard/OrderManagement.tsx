import { DataTable } from '@/components/common/DataTable';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { columns } from './components/OrderColumn';
import { ProducerHeader } from './components/ProducerHeader';
import { ProducerSidebar } from './components/ProducerSidebar';
import { ProducerDashboardProvider } from './context/ProducerDashboardProvider';

export const OrderManagement = ({ orders }: { orders: any }) => {
    return (
        <ProducerDashboardProvider>
            <SidebarProvider>
                <ProducerSidebar variant="inset" />
                <SidebarInset className="overflow-y-auto">
                    <ProducerHeader />
                    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">
                                    Order Management
                                </h1>
                            </div>
                            <DataTable columns={columns} data={orders} />
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ProducerDashboardProvider>
    );
};

export default OrderManagement;
