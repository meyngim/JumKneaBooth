<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Ensure the authenticated user has an administrative role. Optional role
     * parameters restrict a route further, for example: admin.role:super-admin.
     *
     * @param  list<string>  $roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        abort_unless($user instanceof User, 403);

        if (! $user->isAdmin()) {
            return to_route('member.history')->with(
                'status',
                'The Control Room is available only to JumKneaBooth administrators.',
            );
        }

        if ($roles === []) {
            return $next($request);
        }

        $allowedRoles = collect($roles)
            ->map(fn (string $role): ?UserRole => UserRole::tryFrom($role))
            ->filter();

        if (! $allowedRoles->contains($user->role)) {
            return to_route('dashboard')->with(
                'status',
                'This Control Room area is available only to the Super Admin.',
            );
        }

        return $next($request);
    }
}
