<?php

namespace Tests\Feature\Support;

use App\Support\Api\ApiErrorMapper;
use App\Support\Api\ApiException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\Test;
use RuntimeException;
use Tests\TestCase;

final class ApiErrorMapperTest extends TestCase
{
    #[Test]
    public function maps_api_exception_with_its_own_code_and_details(): void
    {
        $exception = new ApiException('Invoice already paid.', 'CONFLICT', 409, ['invoice' => 'INV-1']);

        $mapped = ApiErrorMapper::map($exception);

        $this->assertNotNull($mapped);
        $this->assertSame('CONFLICT', $mapped['code']);
        $this->assertSame(409, $mapped['status']);
        $this->assertSame('Invoice already paid.', $mapped['message']);
        $this->assertSame(['invoice' => 'INV-1'], $mapped['details']);
    }

    #[Test]
    public function maps_validation_exception_to_validation_error_with_field_details(): void
    {
        $exception = ValidationException::withMessages([
            'name' => ['The name field is required.'],
        ]);

        $mapped = ApiErrorMapper::map($exception);

        $this->assertNotNull($mapped);
        $this->assertSame('VALIDATION_ERROR', $mapped['code']);
        $this->assertSame(422, $mapped['status']);
        $this->assertSame(['fields' => ['name' => ['The name field is required.']]], $mapped['details']);
    }

    #[Test]
    public function maps_authentication_authorization_and_not_found(): void
    {
        $authentication = ApiErrorMapper::map(new AuthenticationException);
        $authorization = ApiErrorMapper::map(new AuthorizationException);
        $notFound = ApiErrorMapper::map(new ModelNotFoundException);

        $this->assertNotNull($authentication);
        $this->assertNotNull($authorization);
        $this->assertNotNull($notFound);
        $this->assertSame('UNAUTHENTICATED', $authentication['code']);
        $this->assertSame(401, $authentication['status']);
        $this->assertSame('FORBIDDEN', $authorization['code']);
        $this->assertSame(403, $authorization['status']);
        $this->assertSame('NOT_FOUND', $notFound['code']);
        $this->assertSame(404, $notFound['status']);
    }

    #[Test]
    public function returns_null_for_unmapped_exceptions(): void
    {
        $this->assertNull(ApiErrorMapper::map(new RuntimeException('internal')));
    }
}
