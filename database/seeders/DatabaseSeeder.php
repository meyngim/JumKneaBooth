<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $hasAdminConfiguration = collect(config('jumknea.admins'))
            ->contains(fn (array $account): bool => filled($account['email']));

        if ($hasAdminConfiguration) {
            $this->call(AdminUserSeeder::class);
        }
    }
}
