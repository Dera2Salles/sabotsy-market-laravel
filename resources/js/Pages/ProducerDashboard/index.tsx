import { ProducerMainDashboard } from './components/ProducerMainDashboard';
import { ProducerSidebar } from './components/ProducerSidebar';
import { ProducerDashboardProvider } from './context/ProducerDashboardProvider';

// Define interface for props
interface ProducerDashboardProps {
    stats: any;
    products: any;
}

export const ProducerDashboardPage = ({
    stats,
    products,
}: ProducerDashboardProps) => {
    return (
        <ProducerDashboardProvider>
            <div className="flex h-screen overflow-hidden">
                <ProducerSidebar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <ProducerMainDashboard stats={stats} products={products} />
                </div>
            </div>
        </ProducerDashboardProvider>
    );
};

export default ProducerDashboardPage;
