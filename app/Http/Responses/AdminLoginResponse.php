<?php

namespace App\Http\Responses;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Fortify;
use Symfony\Component\HttpFoundation\Response;

class AdminLoginResponse implements LoginResponseContract
{
    /**
     * Set Fortify's password-confirmation timestamp only after a successful
     * administrative password login. This allows first-time TOTP enrollment
     * without asking the administrator to immediately re-enter the password.
     */
    public function toResponse($request): Response
    {
        if ($request instanceof Request) {
            $user = $request->user();

            if ($user instanceof User && $user->isAdmin()) {
                $request->session()->put('auth.password_confirmed_at', now()->unix());
            }
        }

        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : redirect()->intended(Fortify::redirects('login'));
    }
}
