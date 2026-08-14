<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

uses(RefreshDatabase::class);

beforeEach(function () {
    config([
        'services.google.client_id' => 'test-google-client-id',
        'services.google.client_secret' => 'test-google-client-secret',
    ]);
});

test('a new Google identity creates and signs in a member', function () {
    Socialite::fake('google', SocialiteUser::fake([
        'id' => 'google-member-123',
        'name' => 'JumKnea Member',
        'email' => 'member@example.test',
        'avatar' => 'https://example.test/avatar.png',
    ]));

    $this->get(route('oauth.callback', ['provider' => 'google']))
        ->assertRedirect(route('member.history'));

    $user = User::query()->where('email', 'member@example.test')->firstOrFail();

    expect($user->role)->toBe(UserRole::Member)
        ->and($this->app['auth']->id())->toBe($user->id);

    $this->assertDatabaseHas('social_accounts', [
        'user_id' => $user->id,
        'provider' => 'google',
        'provider_user_id' => 'google-member-123',
        'provider_email' => 'member@example.test',
    ]);
});

test('a provider identity links to its existing member on a later sign-in', function () {
    $member = User::factory()->create([
        'email' => 'member@example.test',
        'role' => UserRole::Member,
    ]);

    Socialite::fake('google', SocialiteUser::fake([
        'id' => 'google-member-456',
        'name' => 'JumKnea Member',
        'email' => 'member@example.test',
    ]));

    $this->get(route('oauth.callback', ['provider' => 'google']))
        ->assertRedirect(route('member.history'));

    expect(User::query()->count())->toBe(1)
        ->and($this->app['auth']->id())->toBe($member->id);

    $this->assertDatabaseHas('social_accounts', [
        'user_id' => $member->id,
        'provider' => 'google',
        'provider_user_id' => 'google-member-456',
    ]);
});

test('an OAuth callback cannot link a provider identity to an administrative account', function () {
    $admin = User::factory()->create([
        'email' => 'admin@example.test',
        'role' => UserRole::SuperAdmin,
    ]);

    Socialite::fake('google', SocialiteUser::fake([
        'id' => 'google-admin-123',
        'name' => 'Administrator',
        'email' => $admin->email,
    ]));

    $this->get(route('oauth.callback', ['provider' => 'google']))
        ->assertRedirect(route('login'))
        ->assertSessionHas('oauth_error');

    $this->assertDatabaseMissing('social_accounts', [
        'provider' => 'google',
        'provider_user_id' => 'google-admin-123',
    ]);
});
