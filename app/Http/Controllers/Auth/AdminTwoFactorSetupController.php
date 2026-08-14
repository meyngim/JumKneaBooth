<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Settings\TwoFactorAuthenticationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class AdminTwoFactorSetupController extends Controller
{
    /**
     * Show the required authenticator-app enrollment flow for an
     * administrative account before Control Room access is granted.
     */
    public function __invoke(TwoFactorAuthenticationRequest $request): Response|RedirectResponse
    {
        $request->ensureStateIsValid();

        $user = $request->user();

        abort_unless($user instanceof User && $user->isAdmin(), 403);

        if ($user->two_factor_confirmed_at !== null) {
            return to_route('dashboard');
        }

        return Inertia::render('auth/admin-two-factor-setup', [
            'canManageTwoFactor' => Features::canManageTwoFactorAuthentication(),
            'requiresConfirmation' => Features::optionEnabled(
                Features::twoFactorAuthentication(),
                'confirm',
            ),
            'twoFactorEnabled' => $user->hasEnabledTwoFactorAuthentication(),
        ]);
    }
}
