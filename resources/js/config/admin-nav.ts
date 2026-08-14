import {
    BadgeCheck,
    Banknote,
    Bell,
    CircleDollarSign,
    Flag,
    KeyRound,
    LayoutDashboard,
    Megaphone,
    Newspaper,
    QrCode,
    Rocket,
    ScrollText,
    Settings2,
    Shield,
    Tags,
    TrendingUp,
    Undo2,
    UserCheck,
    Users,
    Wallet,
} from 'lucide-react';
import type { NavGroup } from '@/types';

export const adminNav: NavGroup[] = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: 'Users & Creators',
        items: [
            {
                title: 'All Users',
                href: '/users',
                icon: Users,
            },
            {
                title: 'Creators',
                href: '/creators',
                icon: BadgeCheck,
            },
            {
                title: 'Applications',
                href: '/creators/applications',
                icon: UserCheck,
            },
            {
                title: 'Admins',
                href: '/admins',
                icon: Shield,
            },
        ],
    },
    {
        title: 'Content',
        items: [
            {
                title: 'Posts',
                href: '/content/posts',
                icon: Newspaper,
            },
            {
                title: 'Reported',
                href: '/content/reports',
                icon: Flag,
            },
            {
                title: 'Categories',
                href: '/content/categories',
                icon: Tags,
            },
        ],
    },
    {
        title: 'Monetization',
        items: [
            {
                title: 'Subscriptions',
                href: '/monetization/subscriptions',
                icon: CircleDollarSign,
            },
            {
                title: 'Content Boost',
                href: '/monetization/boosts',
                icon: Rocket,
            },
            {
                title: 'Advertising',
                href: '/monetization/ads/campaigns',
                icon: Megaphone,
                items: [
                    {
                        title: 'Ad Campaigns',
                        href: '/monetization/ads/campaigns',
                    },
                    {
                        title: 'Advertisers',
                        href: '/monetization/ads/advertisers',
                    },
                    {
                        title: 'Ad Placements',
                        href: '/monetization/ads/placements',
                    },
                ],
            },
            {
                title: 'Payouts',
                href: '/monetization/payouts',
                icon: Wallet,
            },
        ],
    },
    {
        title: 'Payments',
        items: [
            {
                title: 'Transactions',
                href: '/payments/transactions',
                icon: Banknote,
            },
            {
                title: 'ABA PayWay',
                href: '/payments/payway',
                icon: QrCode,
            },
            {
                title: 'Refunds',
                href: '/payments/refunds',
                icon: Undo2,
            },
        ],
    },
    {
        title: 'Analytics',
        items: [
            {
                title: 'Platform',
                href: '/analytics/platform',
                icon: TrendingUp,
            },
            {
                title: 'Revenue',
                href: '/analytics/revenue',
                icon: CircleDollarSign,
            },
            {
                title: 'Content',
                href: '/analytics/content',
                icon: Newspaper,
            },
            {
                title: 'Growth',
                href: '/analytics/growth',
                icon: Users,
            },
        ],
    },
    {
        title: 'System',
        items: [
            {
                title: 'Settings',
                href: '/system/settings',
                icon: Settings2,
            },
            {
                title: 'Notifications',
                href: '/system/notifications',
                icon: Bell,
            },
            {
                title: 'Roles',
                href: '/system/roles',
                icon: KeyRound,
            },
            {
                title: 'Activity',
                href: '/system/logs',
                icon: ScrollText,
            },
        ],
    },
];
