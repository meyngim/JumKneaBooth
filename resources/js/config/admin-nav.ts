import {
    Camera,
    CircleDollarSign,
    Frame,
    Handshake,
    LayoutDashboard,
    Megaphone,
    Monitor,
    Palette,
    ScrollText,
    Settings2,
    ShieldCheck,
    TrendingUp,
    Users,
} from 'lucide-react';
import type { NavGroup } from '@/types';

export const adminNav: NavGroup[] = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Control Room',
                href: '/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: 'Booth Operations',
        items: [
            {
                title: 'Photo Sessions',
                href: '/booth/sessions',
                icon: Camera,
            },
            {
                title: 'Frames & Filters',
                href: '/booth/frames',
                icon: Palette,
            },
            {
                title: 'Booth Devices',
                href: '/booth/devices',
                icon: Monitor,
            },
        ],
    },
    {
        title: 'Sponsors & Campaigns',
        items: [
            {
                title: 'Sponsors',
                href: '/sponsors',
                icon: Handshake,
            },
            {
                title: 'Campaigns',
                href: '/sponsors/campaigns',
                icon: Megaphone,
            },
            {
                title: 'Brand Placements',
                href: '/sponsors/placements',
                icon: Frame,
            },
        ],
    },
    {
        title: 'Members & Privacy',
        items: [
            {
                title: 'Members',
                href: '/members',
                icon: Users,
            },
            {
                title: 'Retention & Privacy',
                href: '/privacy/retention',
                icon: ShieldCheck,
            },
        ],
    },
    {
        title: 'Insights',
        items: [
            {
                title: 'Booth Performance',
                href: '/analytics/booths',
                icon: TrendingUp,
            },
            {
                title: 'Sponsor Performance',
                href: '/analytics/sponsors',
                icon: CircleDollarSign,
            },
        ],
    },
    {
        title: 'System',
        items: [
            {
                title: 'Platform Settings',
                href: '/system/settings',
                icon: Settings2,
            },
            {
                title: 'Super Admins',
                href: '/system/admins',
                icon: ShieldCheck,
            },
            {
                title: 'Audit Log',
                href: '/system/logs',
                icon: ScrollText,
            },
        ],
    },
];
