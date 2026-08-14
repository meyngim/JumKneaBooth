import { Settings2, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { toUrl } from '@/lib/utils';
import type { NavGroup } from '@/types';

export type AdminRoleId = 'super-admin' | 'admin';

export type AdminRole = {
    id: AdminRoleId;
    name: string;
    description: string;
    icon: LucideIcon;
    allow: '*' | string[];
};

export const adminRoles: AdminRole[] = [
    {
        id: 'super-admin',
        name: 'Super Admin',
        description: 'Full platform access',
        icon: ShieldCheck,
        allow: '*',
    },
    {
        id: 'admin',
        name: 'Admin',
        description: 'Day-to-day booth and campaign operations',
        icon: Settings2,
        allow: [
            '/dashboard',
            '/booth/frames',
            '/booth/filters',
            '/booth/watermarks',
            '/booth/devices',
            '/sponsors/campaigns',
            '/sponsors/placements',
            '/access/guests',
            '/analytics/booths',
        ],
    },
];

export const DEFAULT_ADMIN_ROLE_ID: AdminRoleId = 'super-admin';

export function isAdminRoleId(value: string | null): value is AdminRoleId {
    return adminRoles.some((role) => role.id === value);
}

export function getAdminRole(id: AdminRoleId): AdminRole {
    return adminRoles.find((role) => role.id === id) ?? adminRoles[0];
}

function matchesPath(pathname: string, prefix: string): boolean {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function canAccessPath(pathname: string, role: AdminRole): boolean {
    if (role.allow === '*') {
        return true;
    }

    return role.allow.some((prefix) => matchesPath(pathname, prefix));
}

export function filterNavForRole(
    groups: NavGroup[],
    role: AdminRole,
): NavGroup[] {
    return groups
        .map((group) => ({
            ...group,
            items: group.items.flatMap((item) => {
                if (item.items?.length) {
                    const children = item.items.filter((subItem) =>
                        canAccessPath(toUrl(subItem.href), role),
                    );

                    if (children.length === 0) {
                        return [];
                    }

                    return [
                        {
                            ...item,
                            href: children[0].href,
                            items: children,
                        },
                    ];
                }

                return canAccessPath(toUrl(item.href), role) ? [item] : [];
            }),
        }))
        .filter((group) => group.items.length > 0);
}
