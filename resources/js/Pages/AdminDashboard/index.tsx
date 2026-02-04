import { AppSidebar } from './components/AppSidebar';
import { MainDashboard } from './components/MainDashboard';
import { SiteHeader } from './components/SiteHeader';
import { DashboardProvider } from './context/useDashboardProvider';

// Define interface for props
interface AdminDashboardProps {
    stats: any;
    recentUsers: any[];
    products: any;
}

export const AdminDashboardIndex = ({ stats, recentUsers, products }: AdminDashboardProps) => {
    return (
        <DashboardProvider>
            <div className="flex h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <SiteHeader />
                    <MainDashboard stats={stats} products={products} recentUsers={recentUsers} />
                </div>
            </div>
        </DashboardProvider>
    );
};

export default AdminDashboardIndex;
