<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('an unconfirmed administrator can open the dedicated TOTP enrollment page', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.two-factor.setup'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/admin-two-factor-setup')
            ->where('canManageTwoFactor', true)
            ->where('requiresConfirmation', true)
            ->where('twoFactorEnabled', false),
        );
});

test('a confirmed administrator is returned to the Control Room from the TOTP enrollment page', function () {
    $admin = User::factory()->withTwoFactor()->create([
        'role' => UserRole::Admin,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.two-factor.setup'))
        ->assertRedirect(route('dashboard'));
});

test('a member is guided to photo history instead of the TOTP enrollment page', function () {
    $member = User::factory()->create([
        'role' => UserRole::Member,
    ]);

    $this->actingAs($member)
        ->get(route('admin.two-factor.setup'))
        ->assertRedirect(route('member.history'));
});

test('the homepage exposes the member OAuth entry area', function () {
    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('oauthProviders'),
        );
});

test('a fresh administrative password login can proceed directly to TOTP enrollment', function () {
    $admin = User::factory()->create([
        'email' => 'admin@example.test',
        'role' => UserRole::Admin,
    ]);

    $this->post(route('login.store'), [
        'email' => $admin->email,
        'password' => 'password',
    ])
        ->assertRedirect(route('dashboard'))
        ->assertSessionHas('auth.password_confirmed_at');

    $this->get(route('dashboard'))
        ->assertRedirect(route('admin.two-factor.setup'));

    $this->get(route('admin.two-factor.setup'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/admin-two-factor-setup')
            ->where('canManageTwoFactor', true),
        );
});
