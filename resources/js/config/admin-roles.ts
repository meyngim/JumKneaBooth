import {
    CircleDollarSign,
    Flag,
    Settings2,
    Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { toUrl } from '@/lib/utils';
import type { NavGroup } from '@/types';

export type AdminRoleId = 'super-admin' | 'admin' | 'moderator' | 'finance';

export type AdminRole = {
    id: AdminRoleId;
    name: string;
    description: string;
    icon: LucideIcon;
    allow?: '*' | string[];
    deny?: string[];
};

export const adminRoles: AdminRole[] = [
    {
        id: 'super-admin',
        name: 'Super Admin',
        description: 'Full platform access',
        icon: Shield,
        allow: '*',
    },
    {
        id: 'admin',
        name: 'Admin',
        description: 'Day-to-day operations',
        icon: Settings2,
        allow: '*',
        deny: ['/admins', '/system/roles'],
    },
    {
        id: 'moderator',
        name: 'Moderator',
        description: 'Users and content safety',
        icon: Flag,
        allow: ['/dashboard', '/users', '/creators', '/content'],
    },
    {
        id: 'finance',
        name: 'Finance',
        description: 'Billing and payouts',
        icon: CircleDollarSign,
        allow: [
            '/dashboard',
            '/monetization/subscriptions',
            '/monetization/boosts',
            '/monetization/payouts',
            '/payments',
            '/analytics/revenue',
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
    if (role.deny?.some((prefix) => matchesPath(pathname, prefix))) {
        return false;
    }

    if (role.allow === '*' || role.allow === undefined) {
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
                    const children = item.items.filter((sub) =>
                        canAccessPath(toUrl(sub.href), role),
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
