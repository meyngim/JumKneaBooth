<?php

use App\Http\Controllers\AdminPageController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('booth/sessions', AdminPageController::class)->name('booth.sessions');
    Route::get('booth/frames', AdminPageController::class)->name('booth.frames');
    Route::get('booth/filters', AdminPageController::class)->name('booth.filters');
    Route::get('booth/watermarks', AdminPageController::class)->name('booth.watermarks');
    Route::get('booth/devices', AdminPageController::class)->name('booth.devices');

    Route::get('sponsors', AdminPageController::class)->name('sponsors.index');
    Route::get('sponsors/campaigns', AdminPageController::class)->name('sponsors.campaigns');
    Route::get('sponsors/placements', AdminPageController::class)->name('sponsors.placements');

    Route::get('members', AdminPageController::class)->name('members.index');
    Route::get('access/guests', AdminPageController::class)->name('access.guests');
    Route::get('privacy/retention', AdminPageController::class)->name('privacy.retention');

    Route::get('revenue/tips', AdminPageController::class)->name('revenue.tips');
    Route::get('revenue/payway', AdminPageController::class)->name('revenue.payway');

    Route::get('analytics/booths', AdminPageController::class)->name('analytics.booths');
    Route::get('analytics/sponsors', AdminPageController::class)->name('analytics.sponsors');

    Route::get('system/access', AdminPageController::class)->name('system.access');
    Route::get('system/storage', AdminPageController::class)->name('system.storage');
    Route::get('system/settings', AdminPageController::class)->name('system.settings');
    Route::get('system/logs', AdminPageController::class)->name('system.logs');
});
