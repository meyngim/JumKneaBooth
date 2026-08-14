import { useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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
        function onKeyDown(event: KeyboardEvent): void {
            if (!(event.metaKey || event.ctrlKey)) {
                return;
            }

            const index = Number(event.key) - 1;
            const nextRole = adminRoles[index];

            if (!nextRole) {
                return;
            }

            event.preventDefault();
            setRole(nextRole.id);
        }

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
                            aria-label="Preview a JumKneaBooth admin role"
                            tooltip="JumKneaBooth admin role preview"
                        >
                            <AppLogo subtitle={role.name} />
                            <ChevronsUpDown className="ml-auto size-4 text-muted" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-72 rounded-lg"
                        align="start"
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted">
                            Preview as
                        </DropdownMenuLabel>
                        {adminRoles.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = item.id === roleId;

                            return (
                                <DropdownMenuItem
                                    key={item.id}
                                    onClick={() => setRole(item.id)}
                                    className={cn(
                                        'gap-2 p-2',
                                        isSelected &&
                                            'bg-brand-soft text-brand',
                                    )}
                                >
                                    <div className="flex size-8 items-center justify-center rounded-md bg-surface-elevated ring-1 ring-border">
                                        <Icon className="size-4" />
                                    </div>
                                    <div className="grid flex-1 leading-tight">
                                        <span className="text-sm font-medium">
                                            {item.name}
                                        </span>
                                        <span className="text-xs text-muted">
                                            {item.description}
                                        </span>
                                    </div>
                                    {isSelected ? (
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
                            UI preview only. Server permissions will be enforced
                            in the authentication phase.
                        </p>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
