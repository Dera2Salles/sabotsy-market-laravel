import { DataTable } from '@/components/common/DataTable';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ProducerHeader } from './components/ProducerHeader';
import { ProducerSidebar } from './components/ProducerSidebar';
import { columns } from './components/ProductColumn';
import { ProducerDashboardProvider } from './context/ProducerDashboardProvider';

export const ProductManagement = ({ products }: { products: any }) => {
    return (
        <ProducerDashboardProvider>
            <SidebarProvider>
                <ProducerSidebar />
                <SidebarInset className="overflow-y-auto">
                    <ProducerHeader />
                    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg font-semibold md:text-2xl">
                                    Product Management
                                </h1>
                                <a
                                    href={route('producer.products.create')}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    Add Product
                                </a>
                            </div>
                            <DataTable columns={columns} data={products} />
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ProducerDashboardProvider>
    );
};

export default ProductManagement;
