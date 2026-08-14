<?php

namespace App\Support;

final class AdminCatalog
{
    /**
     * Super Admin workspace pages keyed by route name.
     *
     * @return array<string, array{title: string, group: string, description: string, href: string}>
     */
    public static function pages(): array
    {
        return [
            'users.index' => [
                'title' => 'All Users',
                'group' => 'Users & Creators',
                'description' => 'Search, filter, and moderate every reader and member account.',
                'href' => '/users',
            ],
            'creators.index' => [
                'title' => 'Creators',
                'group' => 'Users & Creators',
                'description' => 'Verified writers, their status, and audience reach.',
                'href' => '/creators',
            ],
            'creators.applications' => [
                'title' => 'Creator Applications',
                'group' => 'Users & Creators',
                'description' => 'Review verification requests and approve or decline creators.',
                'href' => '/creators/applications',
            ],
            'admins.index' => [
                'title' => 'Admins',
                'group' => 'Users & Creators',
                'description' => 'Manage Super Admin and staff accounts.',
                'href' => '/admins',
            ],
            'content.posts' => [
                'title' => 'All Posts',
                'group' => 'Content',
                'description' => 'Articles and feed posts across the platform.',
                'href' => '/content/posts',
            ],
            'content.reports' => [
                'title' => 'Reported Content',
                'group' => 'Content',
                'description' => 'Flags, takedowns, and moderation queue.',
                'href' => '/content/reports',
            ],
            'content.categories' => [
                'title' => 'Categories',
                'group' => 'Content',
                'description' => 'Topics and sections used to organize publishing.',
                'href' => '/content/categories',
            ],
            'monetization.subscriptions' => [
                'title' => 'Subscriptions',
                'group' => 'Monetization',
                'description' => 'Pro plans, subscribers, and recurring revenue.',
                'href' => '/monetization/subscriptions',
            ],
            'monetization.boosts' => [
                'title' => 'Content Boost',
                'group' => 'Monetization',
                'description' => 'Paid promotions that lift posts in the feed.',
                'href' => '/monetization/boosts',
            ],
            'ads.campaigns' => [
                'title' => 'Ad Campaigns',
                'group' => 'Monetization',
                'description' => 'Banner and sponsored campaigns currently running or scheduled.',
                'href' => '/monetization/ads/campaigns',
            ],
            'ads.advertisers' => [
                'title' => 'Advertisers',
                'group' => 'Monetization',
                'description' => 'Brands and agencies buying inventory on BAYONESS.',
                'href' => '/monetization/ads/advertisers',
            ],
            'ads.placements' => [
                'title' => 'Ad Placements',
                'group' => 'Monetization',
                'description' => 'Slots for banners and sponsored units across the site.',
                'href' => '/monetization/ads/placements',
            ],
            'monetization.payouts' => [
                'title' => 'Creator Payouts',
                'group' => 'Monetization',
                'description' => 'Reward share of ad revenue and creator payouts.',
                'href' => '/monetization/payouts',
            ],
            'payments.transactions' => [
                'title' => 'Transactions',
                'group' => 'Payments',
                'description' => 'Every charge, subscription renewal, and boost payment.',
                'href' => '/payments/transactions',
            ],
            'payments.payway' => [
                'title' => 'ABA PayWay',
                'group' => 'Payments',
                'description' => 'KHQR and VISA settlement status through ABA PayWay.',
                'href' => '/payments/payway',
            ],
            'payments.refunds' => [
                'title' => 'Refunds',
                'group' => 'Payments',
                'description' => 'Refund requests, chargebacks, and reversals.',
                'href' => '/payments/refunds',
            ],
            'analytics.platform' => [
                'title' => 'Platform Overview',
                'group' => 'Analytics',
                'description' => 'High-level health: readers, creators, and engagement.',
                'href' => '/analytics/platform',
            ],
            'analytics.revenue' => [
                'title' => 'Revenue Analytics',
                'group' => 'Analytics',
                'description' => 'Subscriptions, boosts, ads, and payouts over time.',
                'href' => '/analytics/revenue',
            ],
            'analytics.content' => [
                'title' => 'Content Performance',
                'group' => 'Analytics',
                'description' => 'What stories travel, convert, and hold attention.',
                'href' => '/analytics/content',
            ],
            'analytics.growth' => [
                'title' => 'User Growth',
                'group' => 'Analytics',
                'description' => 'Sign-ups, retention, and creator conversion.',
                'href' => '/analytics/growth',
            ],
            'system.settings' => [
                'title' => 'Settings',
                'group' => 'System',
                'description' => 'Platform name, feature flags, and global defaults.',
                'href' => '/system/settings',
            ],
            'system.notifications' => [
                'title' => 'Notifications',
                'group' => 'System',
                'description' => 'Broadcasts and system alerts sent to users.',
                'href' => '/system/notifications',
            ],
            'system.roles' => [
                'title' => 'Roles & Permissions',
                'group' => 'System',
                'description' => 'What each admin role can see and change.',
                'href' => '/system/roles',
            ],
            'system.logs' => [
                'title' => 'Activity',
                'group' => 'System',
                'description' => 'Audit log of admin actions and system events.',
                'href' => '/system/logs',
            ],
        ];
    }
}
