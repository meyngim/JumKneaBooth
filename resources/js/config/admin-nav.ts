import {
    Camera,
    CircleDollarSign,
    CreditCard,
    Frame,
    Handshake,
    HardDrive,
    Image,
    LayoutDashboard,
    Monitor,
    Palette,
    QrCode,
    ScrollText,
    Settings2,
    ShieldCheck,
    Sparkles,
    Trash2,
    Users,
    Wallet,
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
        title: 'Booth Experience',
        items: [
            {
                title: 'Photo Sessions',
                href: '/booth/sessions',
                icon: Camera,
            },
            {
                title: 'Frames & Themes',
                href: '/booth/frames',
                icon: Frame,
            },
            {
                title: 'Filters & Effects',
                href: '/booth/filters',
                icon: Sparkles,
            },
            {
                title: 'Watermark Rules',
                href: '/booth/watermarks',
                icon: Image,
            },
            {
                title: 'Booth Devices',
                href: '/booth/devices',
                icon: Monitor,
            },
        ],
    },
    {
        title: 'Sponsorship',
        items: [
            {
                title: 'Sponsors',
                href: '/sponsors',
                icon: Handshake,
            },
            {
                title: 'Annual Plans & Campaigns',
                href: '/sponsors/campaigns',
                icon: CircleDollarSign,
            },
            {
                title: 'Brand Placements',
                href: '/sponsors/placements',
                icon: Palette,
            },
        ],
    },
    {
        title: 'Audience & Privacy',
        items: [
            {
                title: 'Platform Members',
                href: '/members',
                icon: Users,
            },
            {
                title: 'Guest Experience',
                href: '/access/guests',
                icon: QrCode,
            },
            {
                title: 'Privacy & Retention',
                href: '/privacy/retention',
                icon: Trash2,
            },
        ],
    },
    {
        title: 'Revenue',
        items: [
            {
                title: 'Digital Tip Jar',
                href: '/revenue/tips',
                icon: Wallet,
            },
            {
                title: 'ABA PayWay',
                href: '/revenue/payway',
                icon: CreditCard,
            },
        ],
    },
    {
        title: 'Insights',
        items: [
            {
                title: 'Booth & Guest Activity',
                href: '/analytics/booths',
                icon: Camera,
            },
            {
                title: 'Sponsor & Revenue',
                href: '/analytics/sponsors',
                icon: CircleDollarSign,
            },
        ],
    },
    {
        title: 'System',
        items: [
            {
                title: 'Authentication & Access',
                href: '/system/access',
                icon: ShieldCheck,
            },
            {
                title: 'R2 Storage & Purge',
                href: '/system/storage',
                icon: HardDrive,
            },
            {
                title: 'Platform Settings',
                href: '/system/settings',
                icon: Settings2,
            },
            {
                title: 'Audit Log',
                href: '/system/logs',
                icon: ScrollText,
            },
        ],
    },
];
