<?php

namespace App\Enums;

enum UserRole: string
{
    case Member = 'member';
    case Admin = 'admin';
    case SuperAdmin = 'super-admin';

    public function isAdmin(): bool
    {
        return $this === self::Admin || $this === self::SuperAdmin;
    }
}
