<?php

namespace App\Support\Api;

use RuntimeException;

class ApiException extends RuntimeException
{
    /**
     * @param  array<string, mixed>  $details
     */
    public function __construct(
        string $message,
        private readonly string $errorCode = 'SERVER_ERROR',
        private readonly int $statusCode = 500,
        private readonly array $details = [],
    ) {
        parent::__construct($message);
    }

    public function errorCode(): string
    {
        return $this->errorCode;
    }

    public function statusCode(): int
    {
        return $this->statusCode;
    }

    /** @return array<string, mixed> */
    public function details(): array
    {
        return $this->details;
    }

    /**
     * @param  array<string, mixed>  $details
     */
    public static function badRequest(string $message = 'The request is invalid.', array $details = []): self
    {
        return new self($message, 'BAD_REQUEST', 400, $details);
    }

    /**
     * @param  array<string, mixed>  $details
     */
    public static function unauthenticated(string $message = 'Authentication is required.', array $details = []): self
    {
        return new self($message, 'UNAUTHENTICATED', 401, $details);
    }

    /**
     * @param  array<string, mixed>  $details
     */
    public static function forbidden(string $message = 'You are not allowed to perform this action.', array $details = []): self
    {
        return new self($message, 'FORBIDDEN', 403, $details);
    }

    /**
     * @param  array<string, mixed>  $details
     */
    public static function notFound(string $message = 'The requested resource was not found.', array $details = []): self
    {
        return new self($message, 'NOT_FOUND', 404, $details);
    }

    /**
     * @param  array<string, mixed>  $details
     */
    public static function conflict(string $message = 'The request conflicts with the current state.', array $details = []): self
    {
        return new self($message, 'CONFLICT', 409, $details);
    }

    /**
     * @param  array<string, mixed>  $details
     */
    public static function validationFailed(string $message = 'The submitted data is invalid.', array $details = []): self
    {
        return new self($message, 'VALIDATION_ERROR', 422, $details);
    }
}
