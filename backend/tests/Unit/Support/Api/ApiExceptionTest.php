<?php

namespace Tests\Unit\Support\Api;

use App\Support\Api\ApiException;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class ApiExceptionTest extends TestCase
{
    #[Test]
    public function named_constructors_carry_stable_client_facing_codes_and_statuses(): void
    {
        $cases = [
            [ApiException::badRequest(), 'BAD_REQUEST', 400],
            [ApiException::unauthenticated(), 'UNAUTHENTICATED', 401],
            [ApiException::forbidden(), 'FORBIDDEN', 403],
            [ApiException::notFound(), 'NOT_FOUND', 404],
            [ApiException::conflict(), 'CONFLICT', 409],
            [ApiException::validationFailed(), 'VALIDATION_ERROR', 422],
        ];

        foreach ($cases as [$exception, $expectedCode, $expectedStatus]) {
            $this->assertSame($expectedCode, $exception->errorCode());
            $this->assertSame($expectedStatus, $exception->statusCode());
            $this->assertNotSame('', $exception->getMessage());
        }
    }

    #[Test]
    public function defaults_represent_an_unclassified_server_error(): void
    {
        $exception = new ApiException('database exploded');

        $this->assertSame('SERVER_ERROR', $exception->errorCode());
        $this->assertSame(500, $exception->statusCode());
        $this->assertSame('database exploded', $exception->getMessage());
        $this->assertSame([], $exception->details());
    }

    #[Test]
    public function custom_details_are_preserved_for_the_error_envelope(): void
    {
        $exception = ApiException::conflict('Invoice already paid.', ['invoice' => 'INV-1']);

        $this->assertSame(['invoice' => 'INV-1'], $exception->details());
    }
}
