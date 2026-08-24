<?php

namespace App\Support\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

final class ApiErrorMapper
{
    /**
     * Maps any throwable raised under the API surface to the canonical
     * Akshar error envelope fields, or null when the exception type has no
     * stable client-facing mapping and must fall through to the framework.
     *
     * @return array{code: string, status: int, message: string, details: array<string, mixed>}|null
     */
    public static function map(Throwable $exception): ?array
    {
        if ($exception instanceof ApiException) {
            return [
                'code' => $exception->errorCode(),
                'status' => $exception->statusCode(),
                'message' => $exception->getMessage(),
                'details' => $exception->details(),
            ];
        }

        if ($exception instanceof ValidationException) {
            return [
                'code' => 'VALIDATION_ERROR',
                'status' => 422,
                'message' => 'The submitted data is invalid.',
                'details' => ['fields' => $exception->errors()],
            ];
        }

        if ($exception instanceof AuthenticationException || $exception instanceof TokenMismatchException) {
            return [
                'code' => 'UNAUTHENTICATED',
                'status' => 401,
                'message' => 'Authentication is required.',
                'details' => [],
            ];
        }

        if ($exception instanceof AuthorizationException) {
            return [
                'code' => 'FORBIDDEN',
                'status' => 403,
                'message' => 'You are not allowed to perform this action.',
                'details' => [],
            ];
        }

        if ($exception instanceof ModelNotFoundException || $exception instanceof NotFoundHttpException) {
            return [
                'code' => 'NOT_FOUND',
                'status' => 404,
                'message' => 'The requested resource was not found.',
                'details' => [],
            ];
        }

        if ($exception instanceof ThrottleRequestsException) {
            return [
                'code' => 'RATE_LIMITED',
                'status' => 429,
                'message' => 'Too many requests. Please retry later.',
                'details' => [],
            ];
        }

        if ($exception instanceof HttpExceptionInterface && $exception->getStatusCode() === 405) {
            return [
                'code' => 'METHOD_NOT_ALLOWED',
                'status' => 405,
                'message' => 'The HTTP method is not supported by this endpoint.',
                'details' => [],
            ];
        }

        return null;
    }
}
