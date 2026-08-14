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
            'booth.sessions' => [
                'title' => 'Photo Sessions',
                'group' => 'Booth Operations',
                'description' => 'Review active and completed four-shot sessions, download activity, and delivery status.',
                'href' => '/booth/sessions',
            ],
            'booth.frames' => [
                'title' => 'Frames & Filters',
                'group' => 'Booth Operations',
                'description' => 'Manage the frame library, visual filters, watermark rules, and sponsor-branded templates.',
                'href' => '/booth/frames',
            ],
            'booth.devices' => [
                'title' => 'Booth Devices',
                'group' => 'Booth Operations',
                'description' => 'Monitor connected booths, device health, camera readiness, and assigned campaigns.',
                'href' => '/booth/devices',
            ],
            'sponsors.index' => [
                'title' => 'Sponsors',
                'group' => 'Sponsors & Campaigns',
                'description' => 'Manage sponsor organisations, contacts, annual agreements, and campaign eligibility.',
                'href' => '/sponsors',
            ],
            'sponsors.campaigns' => [
                'title' => 'Campaigns',
                'group' => 'Sponsors & Campaigns',
                'description' => 'Configure campaign dates, branded frames, filters, booth assignments, and placement rules.',
                'href' => '/sponsors/campaigns',
            ],
            'sponsors.placements' => [
                'title' => 'Brand Placements',
                'group' => 'Sponsors & Campaigns',
                'description' => 'Control sponsor logos, download-page banners, and other non-intrusive brand placements.',
                'href' => '/sponsors/placements',
            ],
            'members.index' => [
                'title' => 'Members',
                'group' => 'Members & Privacy',
                'description' => 'Review registered members and their photo-session history within the 30-day retention window.',
                'href' => '/members',
            ],
            'privacy.retention' => [
                'title' => 'Retention & Privacy',
                'group' => 'Members & Privacy',
                'description' => 'Monitor scheduled deletion, privacy requests, expiring photo assets, and purge-worker health.',
                'href' => '/privacy/retention',
            ],
            'analytics.booths' => [
                'title' => 'Booth Performance',
                'group' => 'Insights',
                'description' => 'Track sessions, completion rates, QR scans, downloads, and device-level throughput.',
                'href' => '/analytics/booths',
            ],
            'analytics.sponsors' => [
                'title' => 'Sponsor Performance',
                'group' => 'Insights',
                'description' => 'Measure campaign delivery, branded-frame usage, sponsor impressions, and annual revenue.',
                'href' => '/analytics/sponsors',
            ],
            'system.settings' => [
                'title' => 'Platform Settings',
                'group' => 'System',
                'description' => 'Configure platform defaults, storage settings, feature controls, and user-facing policies.',
                'href' => '/system/settings',
            ],
            'system.admins' => [
                'title' => 'Super Admins',
                'group' => 'System',
                'description' => 'Manage the seeded Super Admin account and future privileged administrators protected by TOTP.',
                'href' => '/system/admins',
            ],
            'system.logs' => [
                'title' => 'Audit Log',
                'group' => 'System',
                'description' => 'Review sensitive administrative actions, campaign changes, deletion events, and security activity.',
                'href' => '/system/logs',
            ],
        ];
    }
}
