<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Seeded administrative accounts
    |--------------------------------------------------------------------------
    |
    | Administrative accounts are never self-registered. Set these values only
    | in an uncommitted environment file, then run AdminUserSeeder. Passwords
    | are used only for the initial Fortify login and are immediately hashed.
    |
    */
    'admins' => [
        'super_admin' => [
            'name' => env('SUPER_ADMIN_NAME', 'JumKneaBooth Super Admin'),
            'email' => env('SUPER_ADMIN_EMAIL', 'meyngim22@gmail.com'),
            'password' => env('SUPER_ADMIN_PASSWORD'),
        ],
        'admin' => [
            'name' => env('ADMIN_NAME', 'JumKneaBooth Admin'),
            'email' => env('ADMIN_EMAIL', 'solodev.me@gmail.com'),
            'password' => env('ADMIN_PASSWORD'),
        ],
    ],
];
