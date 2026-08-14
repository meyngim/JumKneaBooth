import {
    Camera,
    Handshake,
    ShieldCheck,
    Wallet,
    type LucideIcon,
} from 'lucide-react';
import { toUrl } from '@/lib/utils';
import type { NavGroup } from '@/types';

export type AdminRoleId =
    | 'super-admin'
    | 'booth-admin'
    | 'sponsorship-admin'
    | 'privacy-support'
    | 'revenue-admin';

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
        id: 'booth-admin',
        name: 'Booth Admin',
        description: 'Booth operations and themes',
        icon: Camera,
        allow: ['/dashboard', '/booth', '/analytics/booths'],
    },
    {
        id: 'sponsorship-admin',
        name: 'Sponsorship Admin',
        description: 'Plans, campaigns, and placements',
        icon: Handshake,
        allow: ['/dashboard', '/sponsors', '/analytics/sponsors'],
    },
    {
        id: 'privacy-support',
        name: 'Privacy & Support',
        description: 'Members, photo review, and retention',
        icon: ShieldCheck,
        allow: [
            '/dashboard',
            '/booth/sessions',
            '/members',
            '/access/guests',
            '/privacy',
            '/analytics/booths',
        ],
    },
    {
        id: 'revenue-admin',
        name: 'Revenue Admin',
        description: 'Tips, payments, and revenue insight',
        icon: Wallet,
        allow: ['/dashboard', '/revenue', '/analytics/sponsors'],
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
