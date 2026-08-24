<?php

namespace App\Domain\Identity\Models;

use App\Domain\Identity\Enums\RecordStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * Login account for exactly one canonical Person (Phase 012 identity model).
 *
 * @property string $id
 * @property string $person_id
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string|null $password
 * @property RecordStatus $status
 * @property Carbon|null $last_login_at
 */
#[Fillable(['person_id', 'email', 'password', 'email_verified_at', 'last_login_at'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    use HasUuids;
    use Notifiable;

    protected $table = 'users';

    protected $attributes = [
        'status' => RecordStatus::Active,
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
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
