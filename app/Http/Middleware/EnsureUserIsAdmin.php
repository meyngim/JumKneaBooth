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

        abort_unless($user instanceof User && $user->isAdmin(), 403);

        if ($roles === []) {
            return $next($request);
        }

        $allowedRoles = collect($roles)
            ->map(fn (string $role): ?UserRole => UserRole::tryFrom($role))
            ->filter();

        abort_unless($allowedRoles->contains($user->role), 403);

        return $next($request);
    }
}
