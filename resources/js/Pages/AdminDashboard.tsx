import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AdminDashboard/components/AppSidebar';
import { MainDashboard } from './AdminDashboard/components/MainDashboard';
import { SiteHeader } from './AdminDashboard/components/SiteHeader';
import { DashboardProvider } from './AdminDashboard/context/useDashboardProvider';

export const AdminDashboardPage = () => {
    return (
        <DashboardProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="overflow-y-auto">
                    <SiteHeader />
                    <MainDashboard />
                </SidebarInset>
            </SidebarProvider>
        </DashboardProvider>
    );
};

export default AdminDashboardPage;
