import { useSyncExternalStore } from 'react';
import {
    type AdminRole,
    type AdminRoleId,
    DEFAULT_ADMIN_ROLE_ID,
    canAccessPath,
    filterNavForRole,
    getAdminRole,
    isAdminRoleId,
} from '@/config/admin-roles';
import { adminNav } from '@/config/admin-nav';
import type { NavGroup } from '@/types';

export type UseAdminRoleReturn = {
    readonly role: AdminRole;
    readonly roleId: AdminRoleId;
    readonly nav: NavGroup[];
    readonly setRole: (id: AdminRoleId) => void;
    readonly canAccess: (pathname: string) => boolean;
};

const STORAGE_KEY = 'bayoness-admin-role';

const listeners = new Set<() => void>();
let currentRoleId: AdminRoleId = DEFAULT_ADMIN_ROLE_ID;

const getStoredRoleId = (): AdminRoleId => {
    if (typeof window === 'undefined') {
        return DEFAULT_ADMIN_ROLE_ID;
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    return isAdminRoleId(stored) ? stored : DEFAULT_ADMIN_ROLE_ID;
};

currentRoleId = getStoredRoleId();

const persist = (id: AdminRoleId): void => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(STORAGE_KEY, id);
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function setAdminRole(id: AdminRoleId): void {
    currentRoleId = id;
    persist(id);
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
