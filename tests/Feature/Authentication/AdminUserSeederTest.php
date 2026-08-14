<?php

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

test('the administrative user seeder creates the confirmed Super Admin and Admin accounts', function () {
    config([
        'jumknea.admins.super_admin.password' => 'super-admin-test-password',
        'jumknea.admins.admin.password' => 'admin-test-password',
    ]);

    app(AdminUserSeeder::class)->run();

    $superAdmin = User::query()->where('email', 'meyngim22@gmail.com')->firstOrFail();
    $admin = User::query()->where('email', 'solodev.me@gmail.com')->firstOrFail();

    expect($superAdmin->role)->toBe(UserRole::SuperAdmin)
        ->and(Hash::check('super-admin-test-password', $superAdmin->password))->toBeTrue()
        ->and($admin->role)->toBe(UserRole::Admin)
        ->and(Hash::check('admin-test-password', $admin->password))->toBeTrue();
});

test('the administrative user seeder does not overwrite an existing administrative password', function () {
    config([
        'jumknea.admins.super_admin.password' => 'first-super-admin-password',
        'jumknea.admins.admin.password' => 'first-admin-password',
    ]);

    app(AdminUserSeeder::class)->run();

    config([
        'jumknea.admins.super_admin.password' => 'replacement-super-admin-password',
        'jumknea.admins.admin.password' => 'replacement-admin-password',
    ]);

    app(AdminUserSeeder::class)->run();

    $superAdmin = User::query()->where('email', 'meyngim22@gmail.com')->firstOrFail();

    expect(Hash::check('first-super-admin-password', $superAdmin->password))->toBeTrue()
        ->and(Hash::check('replacement-super-admin-password', $superAdmin->password))->toBeFalse();
});
