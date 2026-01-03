import { DataTable } from '@/components/common/DataTable';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/Pages/AdminDashboard/components/AppSidebar';
import { SiteHeader } from '@/Pages/AdminDashboard/components/SiteHeader';
import { columns } from './components/UserColumn';

export const UserManagement = ({ users }: { users: any }) => {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset className="overflow-y-auto">
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">User Management</h1>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6">
                            <DataTable columns={columns} data={users} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default UserManagement;
