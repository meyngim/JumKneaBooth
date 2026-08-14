import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { adminNav } from '@/config/admin-nav';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="overflow-hidden px-2 py-1 group-data-[collapsible=icon]:px-0">
                    <AppLogo subtitle="Super Admin" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain groups={adminNav} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
