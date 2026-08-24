<?php

namespace Tests\Feature\Identity;

use App\Domain\Identity\Actions\RegisterDomainIdentity;
use App\Domain\Identity\Enums\IdentityType;
use App\Domain\Identity\Enums\RecordStatus;
use App\Domain\Identity\Models\Person;
use App\Domain\Identity\Models\User;
use App\Support\Api\ApiException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class IdentityModelTest extends TestCase
{
    use RefreshDatabase;

    private function personFixture(string $name = 'Sita Sharma'): Person
    {
        return Person::create([
            'display_name' => $name,
            'name_ne' => 'सीता शर्मा',
            'email' => 'sita@example.test',
        ]);
    }

    #[Test]
    public function a_person_holds_an_account_and_multiple_distinct_domain_identities(): void
    {
        $person = $this->personFixture();

        $user = User::create([
            'person_id' => $person->id,
            'email' => 'sita.login@example.test',
            'password' => null,
        ]);

        $action = new RegisterDomainIdentity;
        $staff = $action->execute($person, IdentityType::Staff);
        $teacher = $action->execute($person, IdentityType::Teacher);

        $this->assertSame($person->id, $user->person->id);
        $this->assertCount(2, $person->identities()->get());
        $this->assertTrue($staff->type === IdentityType::Staff && $teacher->type === IdentityType::Teacher);
        $this->assertSame(RecordStatus::Active, $teacher->status);

        // A guardian identity on the same real person is legitimate.
        $action->execute($person, IdentityType::Guardian);
        $this->assertCount(3, $person->identities()->get());
    }

    #[Test]
    public function duplicate_account_email_is_rejected(): void
    {
        $person = $this->personFixture();
        User::create(['person_id' => $person->id, 'email' => 'login@example.test']);

        $other = $this->personFixture('Hari Karki');

        $this->expectException(QueryException::class);
        User::create(['person_id' => $other->id, 'email' => 'login@example.test']);
    }

    #[Test]
    public function one_person_cannot_hold_two_accounts(): void
    {
        $person = $this->personFixture();
        User::create(['person_id' => $person->id, 'email' => 'first@example.test']);

        $this->expectException(QueryException::class);
        User::create(['person_id' => $person->id, 'email' => 'second@example.test']);
    }

    #[Test]
    public function duplicate_domain_identity_for_same_person_is_rejected_as_conflict(): void
    {
        $person = $this->personFixture();
        $action = new RegisterDomainIdentity;
        $action->execute($person, IdentityType::Teacher);

        try {
            $action->execute($person, IdentityType::Teacher);
            $this->fail('Expected duplicate identity to be rejected.');
        } catch (ApiException $e) {
            $this->assertSame('CONFLICT', $e->errorCode());
            $this->assertSame(409, $e->statusCode());
        }
    }

    #[Test]
    public function invalid_identity_type_is_rejected_by_the_schema(): void
    {
        $person = $this->personFixture();

        $this->expectException(QueryException::class);
        DB::table('domain_identities')->insert([
            'id' => (string) str()->uuid(),
            'person_id' => $person->id,
            'type' => 'principal',
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    #[Test]
    public function archived_is_a_terminal_lifecycle_state(): void
    {
        $person = $this->personFixture();
        $identity = (new RegisterDomainIdentity)->execute($person, IdentityType::Student);
        $identity->transitionLifecycleTo(RecordStatus::Archived);

        try {
            $identity->transitionLifecycleTo(RecordStatus::Active);
            $this->fail('Expected archived identity to be terminal.');
        } catch (ApiException $e) {
            $this->assertSame('CONFLICT', $e->errorCode());
            $this->assertSame(['from' => 'archived', 'to' => 'active'], $e->details());
        }

        $this->assertSame(RecordStatus::Archived, $identity->fresh()->status);
    }

    #[Test]
    public function suspended_person_reactivates_but_archived_does_not(): void
    {
        $person = $this->personFixture();
        $person->transitionLifecycleTo(RecordStatus::Suspended);
        $person->transitionLifecycleTo(RecordStatus::Active);
        $this->assertSame(RecordStatus::Active, $person->fresh()->status);

        $person->transitionLifecycleTo(RecordStatus::Archived);
        $this->expectException(ApiException::class);
        $person->transitionLifecycleTo(RecordStatus::Inactive);
    }

    #[Test]
    public function deleting_a_person_with_linked_records_is_restricted(): void
    {
        $person = $this->personFixture();
        User::create(['person_id' => $person->id, 'email' => 'bound@example.test']);
        (new RegisterDomainIdentity)->execute($person, IdentityType::Staff);

        $this->expectException(QueryException::class);
        $person->delete();
    }

    #[Test]
    public function deactivation_is_explicit_not_deletion(): void
    {
        $person = $this->personFixture();
        $identity = (new RegisterDomainIdentity)->execute($person, IdentityType::Guardian);

        $identity->transitionLifecycleTo(RecordStatus::Inactive);

        $this->assertDatabaseHas('domain_identities', [
            'id' => $identity->id,
            'status' => 'inactive',
        ]);
    }

    #[Test]
    public function sensitive_account_fields_never_serialize(): void
    {
        $person = $this->personFixture();
        $user = User::create([
            'person_id' => $person->id,
            'email' => 'secretless@example.test',
            'password' => 'plaintext-never-stored',
        ]);

        $serialized = $user->toArray();
        $json = json_encode($user);

        $this->assertArrayNotHasKey('password', $serialized);
        $this->assertArrayNotHasKey('remember_token', $serialized);
        $this->assertStringNotContainsString('plaintext-never-stored', (string) $json);

        // The hash is stored hashed, never as submitted plaintext.
        $stored = DB::table('users')->where('id', $user->id)->value('password');
        $this->assertNotNull($stored);
        $this->assertNotSame('plaintext-never-stored', $stored);
    }

    #[Test]
    public function no_identity_api_surface_is_exposed_before_authentication_exists(): void
    {
        foreach (['/api/v1/people', '/api/v1/users', '/api/v1/domain-identities'] as $path) {
            $response = $this->getJson($path);
            $response->assertNotFound();
            $response->assertJsonStructure(['error' => ['code', 'message']]);
            $this->assertSame('NOT_FOUND', $response->json('error.code'));
        }
    }
}
