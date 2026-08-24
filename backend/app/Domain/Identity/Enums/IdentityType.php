<?php

namespace App\Domain\Identity\Enums;

enum IdentityType: string
{
    case Staff = 'staff';
    case Teacher = 'teacher';
    case Student = 'student';
    case Guardian = 'guardian';
}
