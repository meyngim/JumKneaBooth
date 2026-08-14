import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect } from 'react';
import AppLogo from '@/components/app-logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { adminRoles } from '@/config/admin-roles';
import { useAdminRole } from '@/hooks/use-admin-role';
import { cn } from '@/lib/utils';

export function RoleSwitcher() {
    const { isMobile } = useSidebar();
    const { role, roleId, setRole } = useAdminRole();

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (!(event.metaKey || event.ctrlKey)) {
                return;
            }

            const index = Number(event.key) - 1;
            const next = adminRoles[index];

            if (!next) {
                return;
            }

            event.preventDefault();
            setRole(next.id);
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [setRole]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-brand-soft data-[state=open]:text-brand"
                            aria-label="Switch admin role"
                        >
                            <AppLogo subtitle={role.name} />
                            <ChevronsUpDown className="ml-auto size-4 text-muted" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-60 rounded-lg"
                        align="start"
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted">
                            Preview as
                        </DropdownMenuLabel>
                        {adminRoles.map((item, index) => {
                            const Icon = item.icon;
                            const selected = item.id === roleId;

                            return (
                                <DropdownMenuItem
                                    key={item.id}
                                    onClick={() => setRole(item.id)}
                                    className={cn(
                                        'gap-2 p-2',
                                        selected && 'bg-brand-soft text-brand',
                                    )}
                                >
                                    <div className="flex size-7 items-center justify-center rounded-md bg-surface-elevated ring-1 ring-border">
                                        <Icon className="size-3.5" />
                                    </div>
                                    <div className="grid flex-1 leading-tight">
                                        <span className="text-sm font-medium">
                                            {item.name}
                                        </span>
                                        <span className="text-xs text-muted">
                                            {item.description}
                                        </span>
                                    </div>
                                    {selected ? (
                                        <Check className="size-4 text-brand" />
                                    ) : (
                                        <DropdownMenuShortcut>
                                            ⌘{index + 1}
                                        </DropdownMenuShortcut>
                                    )}
                                </DropdownMenuItem>
                            );
                        })}
                        <p className="px-2 pt-1 pb-1.5 text-[11px] text-subtle">
                            Mock roles for UI review. Not saved to the server.
                        </p>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
