<?php

declare(strict_types=1);

namespace Akshar\Backend\Tests;

use Akshar\Backend\Version;
use PHPUnit\Framework\Attributes\CoversNothing;
use PHPUnit\Framework\TestCase;

/**
 * Phase 004 toolchain smoke test.
 *
 * Proves the PHP toolchain (PHPUnit + autoloading) executes end-to-end.
 * Domain behavior tests arrive with their phases; nothing is faked here.
 */
#[CoversNothing]
final class ToolchainSmokeTest extends TestCase
{
    public function test_php_runtime_satisfies_the_platform_contract(): void
    {
        $this->assertGreaterThanOrEqual('8.4.0', PHP_VERSION);
    }

    public function test_strict_types_and_autoloading_are_operational(): void
    {
        $this->assertTrue(
            class_exists(Version::class),
            'Autoloader must resolve Akshar\\Backend classes.',
        );
        $this->assertSame('0.1.0', Version::STRING);
    }
}
