import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ProducerHeader } from './components/ProducerHeader';
import { ProducerMainDashboard } from './components/ProducerMainDashboard';
import { ProducerSidebar } from './components/ProducerSidebar';
import { ProducerDashboardProvider } from './context/ProducerDashboardProvider';

// Define interface for props
interface ProducerDashboardProps {
    stats: any;
    products: any;
}

export const ProducerDashboardPage = ({ stats, products }: ProducerDashboardProps) => {
    return (
        <ProducerDashboardProvider>
            <SidebarProvider>
                <ProducerSidebar />
                <SidebarInset className="overflow-y-auto">
                    <ProducerHeader />
                    <ProducerMainDashboard stats={stats} products={products} />
                </SidebarInset>
            </SidebarProvider>
        </ProducerDashboardProvider>
    );
};

export default ProducerDashboardPage;
