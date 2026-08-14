<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    /**
     * Provision the two administrative accounts defined outside source control.
     */
    public function run(): void
    {
        $this->seedAdmin(
            config('jumknea.admins.super_admin'),
            UserRole::SuperAdmin,
        );

        $this->seedAdmin(
            config('jumknea.admins.admin'),
            UserRole::Admin,
        );
    }

    /**
     * @param  array{name: string, email: string, password: string|null}  $account
     */
    private function seedAdmin(array $account, UserRole $role): void
    {
        $email = $account['email'];

        if (blank($email)) {
            throw new RuntimeException(sprintf(
                'Set the %s email environment variable before seeding administrative users.',
                $role === UserRole::SuperAdmin ? 'SUPER_ADMIN' : 'ADMIN',
            ));
        }

        $user = User::query()->firstOrNew(['email' => mb_strtolower($email)]);
        $isNewUser = ! $user->exists;

        $user->forceFill([
            'name' => $account['name'],
            'role' => $role,
            'email_verified_at' => $user->email_verified_at ?? now(),
        ]);

        if ($isNewUser) {
            $user->forceFill([
                'password' => $this->initialPassword($account['password'], $role),
            ]);
        }

        $user->save();
    }

    private function initialPassword(?string $configuredPassword, UserRole $role): string
    {
        if (filled($configuredPassword)) {
            return $configuredPassword;
        }

        $accountLabel = $role === UserRole::SuperAdmin ? 'Super Admin' : 'Admin';
        $password = $this->command?->secret(
            "Set a password for {$accountLabel} (input is hidden)",
        );

        if (blank($password)) {
            throw new RuntimeException("A password is required to create the {$accountLabel} account.");
        }

        $confirmation = $this->command?->secret('Confirm the password');

        if (! hash_equals($password, (string) $confirmation)) {
            throw new RuntimeException('The password confirmation does not match. Run the seeder again.');
        }

        return $password;
    }
}
