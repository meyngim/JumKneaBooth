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
                'group' => 'Booth Experience',
                'description' => 'Review completed four-shot sessions, private delivery status, QR activity, and obfuscated share links.',
                'href' => '/booth/sessions',
            ],
            'booth.frames' => [
                'title' => 'Frames & Themes',
                'group' => 'Booth Experience',
                'description' => 'Manage JumKneaBooth themes and sponsor-branded frame overlays, including approved logo placement.',
                'href' => '/booth/frames',
            ],
            'booth.filters' => [
                'title' => 'Filters & Effects',
                'group' => 'Booth Experience',
                'description' => 'Manage built-in filter presets and the approved effects assigned to sponsor campaigns.',
                'href' => '/booth/filters',
            ],
            'booth.watermarks' => [
                'title' => 'Watermark Rules',
                'group' => 'Booth Experience',
                'description' => 'Set the default JumKneaBooth watermark and define when an approved sponsor logo replaces it.',
                'href' => '/booth/watermarks',
            ],
            'booth.devices' => [
                'title' => 'Booth Devices',
                'group' => 'Booth Experience',
                'description' => 'Monitor connected booth devices, camera readiness, and the campaign assets assigned to each booth.',
                'href' => '/booth/devices',
            ],
            'sponsors.index' => [
                'title' => 'Sponsors',
                'group' => 'Sponsorship',
                'description' => 'Manage sponsor organisations, contacts, brand assets, annual agreements, and approval status.',
                'href' => '/sponsors',
            ],
            'sponsors.campaigns' => [
                'title' => 'Annual Plans & Campaigns',
                'group' => 'Sponsorship',
                'description' => 'Configure yearly sponsorship plans, active dates, booth assignments, and campaign delivery rules.',
                'href' => '/sponsors/campaigns',
            ],
            'sponsors.placements' => [
                'title' => 'Brand Placements',
                'group' => 'Sponsorship',
                'description' => 'Approve brand logos on frames and filters, plus non-intrusive banner placements on download and share pages.',
                'href' => '/sponsors/placements',
            ],
            'members.index' => [
                'title' => 'Platform Members',
                'group' => 'Audience & Privacy',
                'description' => 'Review OAuth members and their photo-session history during the 30-day asset-retention window.',
                'href' => '/members',
            ],
            'access.guests' => [
                'title' => 'Guest Experience',
                'group' => 'Audience & Privacy',
                'description' => 'Configure the frictionless guest flow, feature limits, and private QR-based delivery without account registration.',
                'href' => '/access/guests',
            ],
            'privacy.retention' => [
                'title' => 'Privacy & Retention',
                'group' => 'Audience & Privacy',
                'description' => 'Monitor 30-day R2 asset expiry, automatic purge activity, privacy requests, and failed deletion jobs.',
                'href' => '/privacy/retention',
            ],
            'revenue.tips' => [
                'title' => 'Digital Tip Jar',
                'group' => 'Revenue',
                'description' => 'Configure the optional Support the Developer link for members and review tip activity when payment collection is enabled.',
                'href' => '/revenue/tips',
            ],
            'revenue.payway' => [
                'title' => 'ABA PayWay',
                'group' => 'Revenue',
                'description' => 'Prepare KHQR and Visa payment settings for tip collection; live activation requires a verified production domain.',
                'href' => '/revenue/payway',
            ],
            'analytics.booths' => [
                'title' => 'Booth & Guest Activity',
                'group' => 'Insights',
                'description' => 'Track completed sessions, QR scans, downloads, guest-to-member conversion, and device throughput.',
                'href' => '/analytics/booths',
            ],
            'analytics.sponsors' => [
                'title' => 'Sponsor & Revenue',
                'group' => 'Insights',
                'description' => 'Measure campaign delivery, branded-frame usage, banner impressions, yearly sponsorship revenue, and tips.',
                'href' => '/analytics/sponsors',
            ],
            'system.access' => [
                'title' => 'Authentication & Access',
                'group' => 'System',
                'description' => 'Configure supported OAuth providers for platform members and protect the seeded Super Admin account with TOTP.',
                'href' => '/system/access',
            ],
            'system.storage' => [
                'title' => 'R2 Storage & Purge',
                'group' => 'System',
                'description' => 'Configure Cloudflare R2 storage, inspect media usage, and monitor the scheduled 30-day purge worker.',
                'href' => '/system/storage',
            ],
            'system.settings' => [
                'title' => 'Platform Settings',
                'group' => 'System',
                'description' => 'Configure global booth defaults, feature controls, public policies, and the developer-support destination.',
                'href' => '/system/settings',
            ],
            'system.logs' => [
                'title' => 'Audit Log',
                'group' => 'System',
                'description' => 'Review sensitive Super Admin actions, sponsor approvals, campaign changes, deletion events, and security activity.',
                'href' => '/system/logs',
            ],
        ];
    }
}
