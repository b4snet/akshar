<?php

namespace App\Domain\Identity\Enums;

enum RecordStatus: string
{
    case Active = 'active';
    case Inactive = 'inactive';
    case Suspended = 'suspended';
    case Archived = 'archived';

    /**
     * Lifecycle rules shared by people and domain identities. Ordinary
     * deactivation is a status change, never a deletion; ARCHIVED is
     * terminal so historical identity integrity is preserved.
     */
    public function canTransitionTo(self $target): bool
    {
        return in_array($target, $this->allowedTargets(), true);
    }

    /** @return list<self> */
    public function allowedTargets(): array
    {
        return match ($this) {
            self::Active => [self::Inactive, self::Suspended, self::Archived],
            self::Inactive => [self::Active, self::Suspended, self::Archived],
            self::Suspended => [self::Active, self::Inactive, self::Archived],
            self::Archived => [],
        };
    }
}
