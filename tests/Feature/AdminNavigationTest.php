<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected from an admin workspace', function () {
    $this->get(route('users.index'))->assertRedirect(route('login'));
});

test('authenticated users can open admin workspace pages', function (string $route) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route($route))
        ->assertOk();
})->with([
    'users.index',
    'creators.applications',
    'ads.campaigns',
    'payments.payway',
    'analytics.platform',
    'system.settings',
]);
