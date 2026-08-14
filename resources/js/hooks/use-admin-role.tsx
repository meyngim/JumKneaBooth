import { useSyncExternalStore } from 'react';
import { adminNav } from '@/config/admin-nav';
import {
    DEFAULT_ADMIN_ROLE_ID,
    canAccessPath,
    filterNavForRole,
    getAdminRole,
    isAdminRoleId,
} from '@/config/admin-roles';
import type { AdminRole, AdminRoleId } from '@/config/admin-roles';
import type { NavGroup } from '@/types';

export type UseAdminRoleReturn = {
    readonly role: AdminRole;
    readonly roleId: AdminRoleId;
    readonly nav: NavGroup[];
    readonly setRole: (id: AdminRoleId) => void;
    readonly canAccess: (pathname: string) => boolean;
};

const STORAGE_KEY = 'jumkneabooth-admin-role-preview';

const listeners = new Set<() => void>();
let currentRoleId: AdminRoleId = DEFAULT_ADMIN_ROLE_ID;

function getStoredRoleId(): AdminRoleId {
    if (typeof window === 'undefined') {
        return DEFAULT_ADMIN_ROLE_ID;
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    return isAdminRoleId(stored) ? stored : DEFAULT_ADMIN_ROLE_ID;
}

currentRoleId = getStoredRoleId();

function persistRole(id: AdminRoleId): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, id);
    }
}

function subscribe(callback: () => void): () => void {
    listeners.add(callback);

    return () => listeners.delete(callback);
}

function notify(): void {
    listeners.forEach((listener) => listener());
}

export function setAdminRole(id: AdminRoleId): void {
    currentRoleId = id;
    persistRole(id);
    notify();
}

export function useAdminRole(): UseAdminRoleReturn {
    const roleId = useSyncExternalStore(
        subscribe,
        () => currentRoleId,
        () => DEFAULT_ADMIN_ROLE_ID,
    );
    const role = getAdminRole(roleId);

    return {
        role,
        roleId,
        nav: filterNavForRole(adminNav, role),
        setRole: setAdminRole,
        canAccess: (pathname: string) => canAccessPath(pathname, role),
    } as const;
}
