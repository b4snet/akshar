<?php

namespace App\Domain\Identity\Models;

use App\Domain\Identity\Concerns\GuardsLifecycle;
use App\Domain\Identity\Enums\IdentityType;
use App\Domain\Identity\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * A role a person holds in a domain (staff/teacher/student/guardian).
 *
 * @property string $id
 * @property string $person_id
 * @property IdentityType $type
 * @property RecordStatus $status
 */
#[Fillable(['person_id', 'type', 'status'])]
class DomainIdentity extends Model
{
    use GuardsLifecycle;
    use HasUuids;

    protected $attributes = [
        'status' => RecordStatus::Active,
    ];

    protected function casts(): array
    {
        return [
            'type' => IdentityType::class,
            'status' => RecordStatus::class,
        ];
    }

    /**
     * @return BelongsTo<Person, $this>
     */
    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }
}
