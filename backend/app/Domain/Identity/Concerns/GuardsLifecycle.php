<?php

namespace App\Domain\Identity\Concerns;

use App\Domain\Identity\Enums\RecordStatus;
use App\Support\Api\ApiException;

/**
 * Shared lifecycle guard for identity records whose `status` attribute is
 * cast to RecordStatus. Ordinary deactivation is a status change, never
 * deletion; ARCHIVED is terminal.
 */
trait GuardsLifecycle
{
    public function transitionLifecycleTo(RecordStatus $target): static
    {
        /** @var RecordStatus $current */
        $current = $this->status;

        if (! $current->canTransitionTo($target)) {
            throw ApiException::conflict(
                sprintf(
                    'Identity lifecycle cannot move from "%s" to "%s".',
                    $current->value,
                    $target->value,
                ),
                ['from' => $current->value, 'to' => $target->value],
            );
        }

        $this->status = $target;
        $this->save();

        return $this;
    }
}
