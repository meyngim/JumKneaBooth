import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { NavMain } from '@/components/nav-main';
import { RoleSwitcher } from '@/components/role-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { useAdminRole } from '@/hooks/use-admin-role';
import { useCurrentUrl } from '@/hooks/use-current-url';

const PUBLIC_PREFIXES = ['/settings', '/login', '/register'];

export function AppSidebar() {
    const { nav, roleId, canAccess } = useAdminRole();
    const { currentUrl } = useCurrentUrl();

    useEffect(() => {
        const isPublic = PUBLIC_PREFIXES.some(
            (prefix) =>
                currentUrl === prefix || currentUrl.startsWith(`${prefix}/`),
        );

        if (isPublic || currentUrl === '/' || canAccess(currentUrl)) {
            return;
        }

        router.visit('/dashboard');
    }, [canAccess, currentUrl, roleId]);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <RoleSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain groups={nav} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
