<?php

use App\Http\Controllers\Auth\AdminTwoFactorSetupController;
use App\Http\Controllers\Auth\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome', [
    'oauthProviders' => SocialAuthController::availableProviders(),
])->name('home');

// Preserve bookmarked starter-kit login URLs after Control Room sign-in moves under /admin.
Route::redirect('login', 'admin/login')->name('legacy.login');

Route::middleware(['guest', 'throttle:10,1'])->group(function () {
    Route::get('auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])
        ->whereIn('provider', ['google', 'facebook', 'telegram'])
        ->name('oauth.redirect');
    Route::get('auth/{provider}/callback', [SocialAuthController::class, 'callback'])
        ->whereIn('provider', ['google', 'facebook', 'telegram'])
        ->name('oauth.callback');
});

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('admin/two-factor/setup', AdminTwoFactorSetupController::class)
        ->name('admin.two-factor.setup');
});

Route::middleware(['auth', 'verified', 'admin', 'admin.two-factor'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::inertia('history', 'member/history')->name('member.history');
});

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
