<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('members are guided to their private history when they open the Control Room', function () {
    $member = User::factory()->create([
        'role' => UserRole::Member,
    ]);

    $this->actingAs($member)
        ->get(route('dashboard'))
        ->assertRedirect(route('member.history'))
        ->assertSessionHas('status', 'The Control Room is available only to JumKneaBooth administrators.');
});

test('an admin must confirm TOTP before accessing the Control Room', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get(route('dashboard'))
        ->assertRedirect(route('security.edit'));
});

test('a confirmed admin can access operational areas but not Super Admin areas', function () {
    $admin = User::factory()->withTwoFactor()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get(route('booth.frames'))
        ->assertOk();

    $this->actingAs($admin)
        ->get(route('booth.sessions'))
        ->assertRedirect(route('dashboard'))
        ->assertSessionHas('status', 'This Control Room area is available only to the Super Admin.');
});

test('a confirmed Super Admin can access sensitive Control Room areas', function () {
    $superAdmin = User::factory()->withTwoFactor()->create([
        'role' => UserRole::SuperAdmin,
    ]);

    $this->actingAs($superAdmin)
        ->get(route('booth.sessions'))
        ->assertOk();
});
