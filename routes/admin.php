<?php

use App\Http\Controllers\AdminPageController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin', 'admin.two-factor'])->group(function () {
    /*
     * Available to both administrative roles: day-to-day booth setup,
     * campaign execution, guest-flow controls, and non-sensitive operations.
     */
    Route::get('booth/frames', AdminPageController::class)->name('booth.frames');
    Route::get('booth/filters', AdminPageController::class)->name('booth.filters');
    Route::get('booth/watermarks', AdminPageController::class)->name('booth.watermarks');
    Route::get('booth/devices', AdminPageController::class)->name('booth.devices');
    Route::get('sponsors/campaigns', AdminPageController::class)->name('sponsors.campaigns');
    Route::get('sponsors/placements', AdminPageController::class)->name('sponsors.placements');
    Route::get('access/guests', AdminPageController::class)->name('access.guests');
    Route::get('analytics/booths', AdminPageController::class)->name('analytics.booths');

    Route::middleware('admin.role:super-admin')->group(function () {
        // Super Admin only: sensitive user photo, sponsorship, financial, and system controls.
        Route::get('booth/sessions', AdminPageController::class)->name('booth.sessions');
        Route::get('sponsors', AdminPageController::class)->name('sponsors.index');
        Route::get('members', AdminPageController::class)->name('members.index');
        Route::get('privacy/retention', AdminPageController::class)->name('privacy.retention');
        Route::get('revenue/tips', AdminPageController::class)->name('revenue.tips');
        Route::get('revenue/payway', AdminPageController::class)->name('revenue.payway');
        Route::get('analytics/sponsors', AdminPageController::class)->name('analytics.sponsors');
        Route::get('system/access', AdminPageController::class)->name('system.access');
        Route::get('system/storage', AdminPageController::class)->name('system.storage');
        Route::get('system/settings', AdminPageController::class)->name('system.settings');
        Route::get('system/logs', AdminPageController::class)->name('system.logs');
    });
});
