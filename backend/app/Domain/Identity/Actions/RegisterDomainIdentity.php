<?php

namespace App\Domain\Identity\Actions;

use App\Domain\Identity\Enums\IdentityType;
use App\Domain\Identity\Models\DomainIdentity;
use App\Domain\Identity\Models\Person;
use App\Support\Api\ApiException;
use Illuminate\Database\QueryException;

class RegisterDomainIdentity
{
    /**
     * Attach a domain identity (staff/teacher/student/guardian) to a person.
     * Uniqueness of (person, type) is enforced by the database and translated
     * into the canonical CONFLICT envelope for callers.
     */
    public function execute(Person $person, IdentityType $type): DomainIdentity
    {
        try {
            /** @var DomainIdentity $identity */
            $identity = $person->identities()->create([
                'type' => $type->value,
                'status' => 'active',
            ]);

            return $identity;
        } catch (QueryException $e) {
            if ($this->isUniqueViolation($e)) {
                throw ApiException::conflict(
                    sprintf(
                        'Person already holds the "%s" identity.',
                        $type->value,
                    ),
                    ['identity_type' => $type->value],
                );
            }

            throw $e;
        }
    }

    private function isUniqueViolation(QueryException $e): bool
    {
        return ($e->errorInfo[0] ?? '') === '23505'
            || str_contains($e->getMessage(), 'domain_identities_person_id_type_unique');
    }
}
