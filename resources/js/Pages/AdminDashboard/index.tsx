import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
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
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset className="overflow-y-auto">
                    <SiteHeader />
                    <MainDashboard stats={stats} products={products} recentUsers={recentUsers} />
                </SidebarInset>
            </SidebarProvider>
        </DashboardProvider>
    );
};

export default AdminDashboardIndex;
