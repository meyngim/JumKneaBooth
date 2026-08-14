import { Head, Link } from '@inertiajs/react';
import {
    Camera,
    Clock3,
    Handshake,
    QrCode,
    ShieldCheck,
    Wallet,
} from 'lucide-react';
import { dashboard } from '@/routes';

const metrics = [
    {
        label: 'Sessions today',
        value: '—',
        hint: 'Completed four-shot booth sessions',
        href: '/booth/sessions',
        icon: Camera,
    },
    {
        label: 'QR downloads',
        value: '—',
        hint: 'Private photo links opened today',
        href: '/analytics/booths',
        icon: QrCode,
    },
    {
        label: 'Active sponsors',
        value: '—',
        hint: 'Yearly sponsorship plans delivering',
        href: '/sponsors/campaigns',
        icon: Handshake,
    },
    {
        label: 'Assets expiring',
        value: '—',
        hint: 'Photo assets due for 30-day deletion',
        href: '/privacy/retention',
        icon: Clock3,
    },
    {
        label: 'Digital tips',
        value: '—',
        hint: 'Optional developer-support activity',
        href: '/revenue/tips',
        icon: Wallet,
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Control Room" />
            <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
                <div>
                    <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
                        JumKneaBooth
                    </p>
                    <h1 className="mt-1 text-xl font-semibold tracking-tight">
                        Super Admin Control Room
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Monitor guest and member experiences, sponsor delivery,
                        private photo retention, and platform security.
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
                            <p className="mt-3 text-2xl font-semibold tracking-tight">
                                {metric.value}
                            </p>
                            <p className="mt-1 text-xs text-subtle">
                                {metric.hint}
                            </p>
                        </Link>
                    ))}
                </div>
                <div className="grid flex-1 gap-4 lg:grid-cols-2">
                    <section className="rounded-xl bg-surface p-5 ring-1 ring-border">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-brand" />
                            <h2 className="text-sm font-medium">
                                Photo Library, privacy & retention
                            </h2>
                        </div>
                        <p className="mt-2 text-sm text-muted">
                            Super Admin can temporarily review retained photo
                            strips to understand product use. Guest QR links and
                            member history remain private, and all photo assets
                            are automatically deleted from R2 after 30 days.
                        </p>
                    </section>
                    <section className="rounded-xl bg-surface p-5 ring-1 ring-border">
                        <div className="flex items-center gap-2">
                            <Handshake className="size-4 text-brand" />
                            <h2 className="text-sm font-medium">
                                Sponsor-supported platform
                            </h2>
                        </div>
                        <p className="mt-2 text-sm text-muted">
                            Yearly sponsors can receive approved brand
                            placements on frames, filters, and download or
                            share-page banners. Unsponsored photos retain the
                            JumKneaBooth watermark.
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
            title: 'Control Room',
            href: dashboard(),
        },
    ],
};
