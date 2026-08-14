<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminTwoFactorIsConfirmed
{
    /**
     * Require every administrative account to confirm a Fortify TOTP device
     * before it can access Control Room functionality.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user instanceof User || ! $user->requiresTwoFactorAuthentication()) {
            abort(403);
        }

        if ($user->two_factor_confirmed_at !== null) {
            return $next($request);
        }

        return redirect()
            ->route('security.edit')
            ->with('status', 'Set up and confirm your authenticator app to access the Control Room.');
    }
}
