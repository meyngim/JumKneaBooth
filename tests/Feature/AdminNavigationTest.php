<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected from an administrative workspace', function () {
    $this->get(route('booth.frames'))->assertRedirect(route('login'));
});

test('a confirmed Admin can open day-to-day workspaces', function (string $route) {
    $admin = User::factory()->withTwoFactor()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get(route($route))
        ->assertOk();
})->with([
    'booth.frames',
    'booth.filters',
    'booth.devices',
    'sponsors.campaigns',
    'sponsors.placements',
    'access.guests',
    'analytics.booths',
]);

test('a confirmed Admin is redirected from Super Admin workspaces', function (string $route) {
    $admin = User::factory()->withTwoFactor()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get(route($route))
        ->assertRedirect(route('dashboard'))
        ->assertSessionHas('status', 'This Control Room area is available only to the Super Admin.');
})->with([
    'booth.sessions',
    'members.index',
    'privacy.retention',
    'revenue.tips',
    'system.settings',
]);
