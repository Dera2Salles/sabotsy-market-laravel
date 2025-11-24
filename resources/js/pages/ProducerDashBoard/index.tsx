import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { SiteHeader } from './components/SiteHeader';
import { MainDashboard } from './components/MainDashboard';
import { DashboardProvider } from './context/useDashboardProvider';

export const ProducerDashboardPage = () => {
    return (
        <DashboardProvider>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset className="overflow-y-auto">
                    <SiteHeader />
                    <MainDashboard />
                </SidebarInset>
            </SidebarProvider>
        </DashboardProvider>
    );
};
