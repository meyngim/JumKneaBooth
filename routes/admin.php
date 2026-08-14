<?php

use App\Http\Controllers\AdminPageController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('users', AdminPageController::class)->name('users.index');
    Route::get('creators', AdminPageController::class)->name('creators.index');
    Route::get('creators/applications', AdminPageController::class)->name('creators.applications');
    Route::get('admins', AdminPageController::class)->name('admins.index');

    Route::get('content/posts', AdminPageController::class)->name('content.posts');
    Route::get('content/reports', AdminPageController::class)->name('content.reports');
    Route::get('content/categories', AdminPageController::class)->name('content.categories');

    Route::get('monetization/subscriptions', AdminPageController::class)->name('monetization.subscriptions');
    Route::get('monetization/boosts', AdminPageController::class)->name('monetization.boosts');
    Route::get('monetization/ads/campaigns', AdminPageController::class)->name('ads.campaigns');
    Route::get('monetization/ads/advertisers', AdminPageController::class)->name('ads.advertisers');
    Route::get('monetization/ads/placements', AdminPageController::class)->name('ads.placements');
    Route::get('monetization/payouts', AdminPageController::class)->name('monetization.payouts');

    Route::get('payments/transactions', AdminPageController::class)->name('payments.transactions');
    Route::get('payments/payway', AdminPageController::class)->name('payments.payway');
    Route::get('payments/refunds', AdminPageController::class)->name('payments.refunds');

    Route::get('analytics/platform', AdminPageController::class)->name('analytics.platform');
    Route::get('analytics/revenue', AdminPageController::class)->name('analytics.revenue');
    Route::get('analytics/content', AdminPageController::class)->name('analytics.content');
    Route::get('analytics/growth', AdminPageController::class)->name('analytics.growth');

    Route::get('system/settings', AdminPageController::class)->name('system.settings');
    Route::get('system/notifications', AdminPageController::class)->name('system.notifications');
    Route::get('system/roles', AdminPageController::class)->name('system.roles');
    Route::get('system/logs', AdminPageController::class)->name('system.logs');
});
