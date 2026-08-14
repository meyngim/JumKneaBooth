<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
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
     * @param  array{name: string, email: string|null, password: string|null}  $account
     */
    private function seedAdmin(array $account, UserRole $role): void
    {
        $email = $account['email'];
        $password = $account['password'];

        if (blank($email) || blank($password)) {
            throw new RuntimeException(sprintf(
                'Set the %s email and password environment variables before seeding administrative users.',
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
                'password' => Hash::make($password),
            ]);
        }

        $user->save();
    }
}
