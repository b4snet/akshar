<?php

namespace Tests\Feature;

use Tests\TestCase;

final class HealthTest extends TestCase
{
    public function test_health_endpoint_returns_canonical_success_envelope(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => ['service', 'status', 'environment', 'framework', 'time'],
            'meta' => ['apiVersion'],
        ]);
        $this->assertSame('ok', $response->json('data.status'));
        $this->assertSame('v1', $response->json('meta.apiVersion'));
        $this->assertSame('Akshar', $response->json('data.service'));
    }

    public function test_unknown_api_route_returns_canonical_error_envelope(): void
    {
        $response = $this->getJson('/api/v1/does-not-exist');

        $response->assertNotFound();
        $response->assertExactJson([
            'error' => [
                'code' => 'NOT_FOUND',
                'message' => 'The requested resource was not found.',
                'details' => [],
            ],
        ]);
    }
}
