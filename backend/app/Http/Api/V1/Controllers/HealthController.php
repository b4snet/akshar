<?php

namespace App\Http\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Support\Api\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class HealthController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return ApiResponse::success(
            data: [
                'service' => config('app.name'),
                'status' => 'ok',
                'environment' => app()->environment(),
                'framework' => app()->version(),
                'time' => now()->toIso8601String(),
            ],
            meta: [
                'apiVersion' => 'v1',
            ],
        );
    }
}
