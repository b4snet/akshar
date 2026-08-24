<?php

namespace App\Domain\Identity\Models;

use App\Domain\Identity\Concerns\GuardsLifecycle;
use App\Domain\Identity\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * Canonical human record (Phase 012 identity model).
 *
 * @property string $id
 * @property string $display_name
 * @property string|null $legal_name
 * @property string|null $name_ne
 * @property string|null $email
 * @property string|null $phone
 * @property Carbon|null $date_of_birth
 * @property RecordStatus $status
 * @property array<string, mixed>|null $metadata
 */
class Person extends Model
{
    use GuardsLifecycle;
    use HasUuids;

    protected $attributes = [
        'status' => RecordStatus::Active,
    ];

    protected $fillable = [
        'display_name',
        'legal_name',
        'name_ne',
        'email',
        'phone',
        'date_of_birth',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'metadata' => 'array',
            'status' => RecordStatus::class,
        ];
    }

    /**
     * @return HasOne<User, $this>
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    /**
     * @return HasMany<DomainIdentity, $this>
     */
    public function identities(): HasMany
    {
        return $this->hasMany(DomainIdentity::class);
    }
}
