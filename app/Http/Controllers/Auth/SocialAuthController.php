<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use RuntimeException;
use Throwable;

class SocialAuthController extends Controller
{
    /**
     * @var array<string, string>
     */
    private const PROVIDERS = [
        'google' => 'Google',
        'facebook' => 'Facebook',
        'telegram' => 'Telegram',
    ];

    /**
     * @return array<string, string>
     */
    public static function availableProviders(): array
    {
        return collect(self::PROVIDERS)
            ->filter(fn (string $name, string $provider): bool => self::isProviderConfigured($provider))
            ->all();
    }

    public function redirect(string $provider): RedirectResponse
    {
        $this->ensureProviderIsConfigured($provider);

        $driver = Socialite::driver($provider);

        if ($provider === 'google') {
            $driver->scopes(['openid', 'profile', 'email']);
        }

        if ($provider === 'facebook') {
            $driver->scopes(['email']);
        }

        return $driver->redirect();
    }

    public function callback(Request $request, string $provider): RedirectResponse
    {
        $this->ensureProviderIsConfigured($provider);

        try {
            $socialUser = Socialite::driver($provider)->user();
            $user = $this->resolveMember($provider, $socialUser);
        } catch (Throwable $exception) {
            report($exception);

            return to_route('login')->with(
                'oauth_error',
                'We could not complete sign-in with '.self::PROVIDERS[$provider].'. Please try again.',
            );
        }

        Auth::login($user, remember: true);
        $request->session()->regenerate();

        $user->forceFill(['last_login_at' => now()])->save();

        return redirect()->intended(route('member.history'));
    }

    private function ensureProviderIsConfigured(string $provider): void
    {
        abort_unless(array_key_exists($provider, self::PROVIDERS), 404);

        abort_unless(self::isProviderConfigured($provider), 503);
    }

    private static function isProviderConfigured(string $provider): bool
    {
        return match ($provider) {
            'google', 'facebook' => filled(config("services.{$provider}.client_id"))
                && filled(config("services.{$provider}.client_secret")),
            'telegram' => filled(config('services.telegram.bot'))
                && filled(config('services.telegram.client_secret')),
            default => false,
        };
    }

    private function resolveMember(string $provider, SocialiteUser $socialUser): User
    {
        $providerUserId = (string) $socialUser->getId();

        if (blank($providerUserId)) {
            throw new RuntimeException('The OAuth provider did not return a user identifier.');
        }

        $account = SocialAccount::query()
            ->with('user')
            ->where('provider', $provider)
            ->where('provider_user_id', $providerUserId)
            ->first();

        if ($account !== null) {
            $this->ensureIsNotAdministrativeAccount($account->user);
            $this->updateAccountProfile($account, $socialUser);

            return $account->user;
        }

        $email = $this->normalizedEmail($socialUser->getEmail());
        $user = $email === null ? null : User::query()->where('email', $email)->first();

        if ($user !== null) {
            $this->ensureIsNotAdministrativeAccount($user);
        } else {
            $user = User::query()->create([
                'name' => $this->displayName($socialUser),
                'email' => $email ?? $this->providerPlaceholderEmail($provider, $providerUserId),
                'email_verified_at' => $email === null ? null : now(),
                'password' => Hash::make(Str::password(64)),
                'role' => UserRole::Member,
            ]);
        }

        $account = $user->socialAccounts()->create([
            'provider' => $provider,
            'provider_user_id' => $providerUserId,
            'provider_email' => $email,
            'avatar_url' => $socialUser->getAvatar(),
        ]);

        $this->updateAccountProfile($account, $socialUser);

        return $user;
    }

    private function ensureIsNotAdministrativeAccount(User $user): void
    {
        if ($user->isAdmin()) {
            throw new RuntimeException('Administrative accounts cannot be linked to member OAuth providers.');
        }
    }

    private function updateAccountProfile(SocialAccount $account, SocialiteUser $socialUser): void
    {
        $account->forceFill([
            'provider_email' => $this->normalizedEmail($socialUser->getEmail()),
            'avatar_url' => $socialUser->getAvatar(),
        ])->save();
    }

    private function normalizedEmail(?string $email): ?string
    {
        return filled($email) ? Str::lower($email) : null;
    }

    private function displayName(SocialiteUser $socialUser): string
    {
        return Str::limit(
            $socialUser->getName() ?: $socialUser->getNickname() ?: 'JumKneaBooth Member',
            120,
            '',
        );
    }

    private function providerPlaceholderEmail(string $provider, string $providerUserId): string
    {
        return sprintf('%s-%s@users.jumkneabooth.invalid', $provider, $providerUserId);
    }
}
