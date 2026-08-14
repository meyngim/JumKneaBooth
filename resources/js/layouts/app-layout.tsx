import { usePage } from '@inertiajs/react';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const page = usePage();
    const fromPage = page.props.breadcrumbs as BreadcrumbItem[] | undefined;
    const crumbs = fromPage?.length ? fromPage : breadcrumbs;

    return (
        <AppLayoutTemplate breadcrumbs={crumbs}>{children}</AppLayoutTemplate>
    );
}
