import { Head, Link } from '@inertiajs/react';
import {
    BadgeCheck,
    CircleDollarSign,
    Flag,
    Rocket,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes';

const metrics = [
    {
        label: 'Users',
        value: '—',
        hint: 'Readers and members',
        href: '/users',
        icon: Users,
    },
    {
        label: 'Creators',
        value: '—',
        hint: 'Verified writers',
        href: '/creators',
        icon: BadgeCheck,
        verified: true,
    },
    {
        label: 'Pro subscribers',
        value: '—',
        hint: 'Active paid plans',
        href: '/monetization/subscriptions',
        icon: CircleDollarSign,
    },
    {
        label: 'Boosts live',
        value: '—',
        hint: 'Paid promotions',
        href: '/monetization/boosts',
        icon: Rocket,
    },
    {
        label: 'Open reports',
        value: '—',
        hint: 'Awaiting review',
        href: '/content/reports',
        icon: Flag,
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                <div>
                    <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
                        Overview
                    </p>
                    <h1 className="mt-1 text-xl font-semibold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Platform health across readers, creators, and revenue.
                    </p>
                </div>

                <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {metrics.map((metric) => (
                        <Link
                            key={metric.label}
                            href={metric.href}
                            prefetch
                            className="flex flex-col justify-between rounded-xl bg-surface p-5 ring-1 ring-border transition-colors hover:bg-surface-elevated"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted">
                                    {metric.label}
                                </p>
                                <metric.icon className="size-4 text-muted" />
                            </div>
                            <p className="mt-3 flex items-center gap-1.5 text-2xl font-semibold tracking-tight">
                                {metric.value}
                                {metric.verified && (
                                    <BadgeCheck className="size-5 text-verified" />
                                )}
                            </p>
                            <p className="mt-1 text-xs text-subtle">
                                {metric.hint}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="grid flex-1 gap-4 lg:grid-cols-2">
                    <section className="rounded-xl bg-surface p-5 ring-1 ring-border">
                        <h2 className="text-sm font-medium">Needs attention</h2>
                        <p className="mt-1 text-sm text-muted">
                            Creator applications, reported posts, and refunds
                            will queue here.
                        </p>
                    </section>
                    <section className="rounded-xl bg-surface p-5 ring-1 ring-border">
                        <h2 className="text-sm font-medium">Revenue snapshot</h2>
                        <p className="mt-1 text-sm text-muted">
                            Subscriptions, content boost, and advertising
                            totals will appear here.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
