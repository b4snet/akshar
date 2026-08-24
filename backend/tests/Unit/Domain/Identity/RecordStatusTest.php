<?php

namespace Tests\Unit\Domain\Identity;

use App\Domain\Identity\Enums\RecordStatus;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class RecordStatusTest extends TestCase
{
    #[Test]
    public function active_can_move_to_any_non_terminal_state(): void
    {
        $this->assertTrue(RecordStatus::Active->canTransitionTo(RecordStatus::Inactive));
        $this->assertTrue(RecordStatus::Active->canTransitionTo(RecordStatus::Suspended));
        $this->assertTrue(RecordStatus::Active->canTransitionTo(RecordStatus::Archived));
    }

    #[Test]
    public function inactive_and_suspended_can_return_to_active(): void
    {
        $this->assertTrue(RecordStatus::Inactive->canTransitionTo(RecordStatus::Active));
        $this->assertTrue(RecordStatus::Suspended->canTransitionTo(RecordStatus::Active));
        // Recovery between the two non-terminal dormant states is permitted;
        // only ARCHIVED closes the record.
        $this->assertTrue(RecordStatus::Suspended->canTransitionTo(RecordStatus::Inactive));
    }

    #[Test]
    public function archived_is_terminal_including_self_transitions(): void
    {
        foreach (RecordStatus::cases() as $target) {
            $this->assertFalse(
                RecordStatus::Archived->canTransitionTo($target),
                "archived must not transition to {$target->value}",
            );
        }
    }

    #[Test]
    public function no_state_is_its_own_allowed_target(): void
    {
        foreach (RecordStatus::cases() as $state) {
            $this->assertNotContains($state, $state->allowedTargets());
        }
    }
}
