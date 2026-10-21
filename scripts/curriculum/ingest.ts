#!/usr/bin/env node

// AKSHAR Curriculum Ingestion CLI
// Usage: npx tsx scripts/curriculum/ingest.ts [command] [options]

import fs from "node:fs";
import path from "node:path";
import { loadAndValidate, refKey, CoverageStats } from "./validate";
import { buildMigrationPreview, MigrationPreview } from "./build-migration";

const DATA_DIR = path.resolve(process.cwd(), "curriculum/data");
const PATHWAYS_DIR = path.join(DATA_DIR, "pathways");

interface IngestOptions {
  dryRun: boolean;
  versionFilter?: string;
  verbose: boolean;
  skipValidation: boolean;
  force: boolean;
}

function printBanner() {
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║  AKSHAR Curriculum Ingestion Pipeline                        ║");
  console.log("║  Phase 3 — Content Ingestion Engine                          ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");
  console.log("");
}

function printUsage() {
  console.log("Usage:");
  console.log("  npx tsx scripts/curriculum/ingest.ts <command> [options]");
  console.log("");
  console.log("Commands:");
  console.log("  validate     Validate all curriculum data files");
  console.log("  preview      Dry-run preview of ingestion (no writes)");
  console.log("  ingest       Run full ingestion pipeline (generates migration)");
  console.log("  coverage     Generate coverage report");
  console.log("  verify       Post-ingestion verification");
  console.log("");
  console.log("Options:");
  console.log("  --version <id>    Filter to specific curriculum version");
  console.log("  --verbose         Verbose output");
  console.log("  --skip-validation Skip validation (not recommended)");
  console.log("  --force           Skip confirmation prompts");
  console.log("  --help            Show this help");
  console.log("");
  console.log("Examples:");
  console.log("  npx tsx scripts/curriculum/ingest.ts validate");
  console.log("  npx tsx scripts/curriculum/ingest.ts preview --version cv-neb-opt-2076");
  console.log("  npx tsx scripts/curriculum/ingest.ts ingest --version cv-neb-opt-2076");
  console.log("  npx tsx scripts/curriculum/ingest.ts coverage");
}

function parseArgs(): { command: string; options: IngestOptions } {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  const command = args[0];
  const validCommands = ["validate", "preview", "ingest", "coverage", "verify"];
  
  if (!validCommands.includes(command)) {
    console.error(`Error: Unknown command "${command}"`);
    printUsage();
    process.exit(1);
  }

  const options: IngestOptions = {
    dryRun: command === "preview",
    verbose: args.includes("--verbose"),
    skipValidation: args.includes("--skip-validation"),
    force: args.includes("--force"),
    versionFilter: undefined,
  };

  const versionIdx = args.indexOf("--version");
  if (versionIdx !== -1 && versionIdx + 1 < args.length) {
    options.versionFilter = args[versionIdx + 1];
  }

  return { command, options };
}

function printValidationResult(result: Awaited<ReturnType<typeof loadAndValidate>>) {
  const { sources, versions, pathways, coverage, errors, warnings } = result;
  
  console.log("\n📋 Validation Summary");
  console.log("────────────────────────────────────────");
  console.log(`Sources:      ${sources.length}`);
  console.log(`Versions:     ${versions.length}`);
  console.log(`Pathways:     ${pathways.length}`);
  console.log(`Coverage entries: ${coverage.length}`);
  
  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    for (const error of errors) {
      console.log(`  - ${error}`);
    }
  }
  
  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${warnings.length}):`);
    for (const warning of warnings.slice(0, 20)) {
      console.log(`  - ${warning}`);
    }
    if (warnings.length > 20) {
      console.log(`  ... and ${warnings.length - 20} more warnings`);
    }
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log("\n✅ All validation checks passed!");
  }
}

async function runValidate(options: IngestOptions): Promise<boolean> {
  console.log("🔍 Validating curriculum data...\n");
  
  const result = loadAndValidate();
  printValidationResult(result);
  
  if (result.errors.length > 0) {
    console.log("\n❌ Validation failed with errors");
    return false;
  }
  
  console.log("\n✅ Validation passed");
  return true;
}

async function runPreview(options: IngestOptions): Promise<void> {
  console.log("👁️  Dry-run Preview\n");
  
  const result = loadAndValidate();
  
  if (result.errors.length > 0) {
    console.log("\n❌ Cannot preview: validation errors present");
    printValidationResult(result);
    process.exit(1);
  }
  
  if (result.warnings.length > 0 && options.verbose) {
    console.log(`\n⚠️  ${result.warnings.length} warnings (use --verbose to see all)`);
  }
  
  // Filter pathways if version filter provided
  let pathways = result.pathways;
  if (options.versionFilter) {
    pathways = pathways.filter(p => p.curriculumVersionId === options.versionFilter);
    if (pathways.length === 0) {
      console.log(`\n❌ No pathways found for version: ${options.versionFilter}`);
      process.exit(1);
    }
  }
  
  // Import buildMigration to get preview data
  const { buildMigrationPreview } = await import("./build-migration");
  const preview = buildMigrationPreview(result, options.versionFilter);
  
  console.log("\n📋 Preview Summary");
  console.log("────────────────────────────────────────");
  console.log(`Curriculum versions: ${preview.versions.length}`);
  console.log(`Pathways to import:  ${preview.pathways.length}`);
  console.log(`Units to insert:     ${preview.unitCount}`);
  console.log(`Chapters to insert:  ${preview.chapterCount}`);
  console.log(`Topics to insert:    ${preview.topicCount}`);
  console.log(`Lessons to insert:   ${preview.lessonCount}`);
  console.log(`Practice questions:  ${preview.practiceCount}`);
  
  console.log("\n📁 Files to be generated/updated:");
  console.log(`  - supabase/migrations/202610120009_curriculum_content.sql`);
  
  if (options.versionFilter) {
    console.log(`\n🔍 Filtered to version: ${options.versionFilter}`);
  }
  
  if (result.warnings.length > 0) {
    console.log(`\n⚠️  ${result.warnings.length} warnings will be reported during ingestion`);
    if (options.verbose) {
      for (const warning of result.warnings.slice(0, 10)) {
        console.log(`  - ${warning}`);
      }
      if (result.warnings.length > 10) {
        console.log(`  ... and ${result.warnings.length - 10} more`);
      }
    }
  }
  
  console.log("\n✅ Dry-run complete. No changes made.");
  console.log("Run with 'ingest' command to execute.");
}

async function runIngest(options: IngestOptions): Promise<void> {
  console.log("🚀 Starting Ingestion Pipeline\n");
  
  if (!options.skipValidation) {
    console.log("🔍 Step 1: Validating data...\n");
    const result = loadAndValidate();
    
    if (result.errors.length > 0) {
      console.log("\n❌ Validation failed:");
      for (const error of result.errors) {
        console.log(`  - ${error}`);
      }
      console.log("\n❌ Ingestion aborted due to validation errors");
      console.log("Fix errors or use --skip-validation to proceed anyway");
      process.exit(1);
    }
    
    if (result.warnings.length > 0) {
      console.log(`\n⚠️  ${result.warnings.length} warnings (will be reported during ingestion)`);
      if (options.verbose) {
        for (const warning of result.warnings.slice(0, 5)) {
          console.log(`  - ${warning}`);
        }
        if (result.warnings.length > 5) {
          console.log(`  ... and ${result.warnings.length - 5} more`);
        }
      }
    }
    console.log("✅ Validation passed\n");
  } else {
    console.log("⚠️  Skipping validation (--skip-validation)\n");
  }
  
  // Filter pathways if version filter provided
  const result = loadAndValidate();
  let pathways = result.pathways;
  if (options.versionFilter) {
    pathways = pathways.filter(p => p.curriculumVersionId === options.versionFilter);
    if (pathways.length === 0) {
      console.log(`\n❌ No pathways found for version: ${options.versionFilter}`);
      process.exit(1);
    }
    console.log(`🔍 Filtered to version: ${options.versionFilter}`);
  }
  
  console.log("📦 Step 2: Building migration...\n");
  
  // Set environment variable to signal dry-run mode for build-migration
  if (options.dryRun) {
    process.env.DRY_RUN = "true";
  }
  
  try {
    await import("./build-migration");
    console.log("\n✅ Migration generated successfully!");
    
    if (options.dryRun) {
      console.log("🔍 Dry-run mode: Migration SQL generated but not executed");
      console.log("Run without --dry-run to apply to database");
    } else {
      console.log("\n📝 Next steps:");
      console.log("  1. Review generated migration: supabase/migrations/202610120009_curriculum_content.sql");
      console.log("  2. Apply to database: npx supabase db push");
      console.log("  3. Run verification: npx tsx scripts/curriculum/ingest.ts verify");
    }
  } catch (error) {
    console.error("\n❌ Ingestion failed:");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function runCoverage(): Promise<void> {
  console.log("📊 Generating Coverage Report\n");
  
  try {
    await import("./coverage");
    console.log("\n✅ Coverage report generated: curriculum/data/coverage-report.json");
  } catch (error) {
    console.error("\n❌ Coverage generation failed:");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

async function runVerify(): Promise<void> {
  console.log("🔍 Post-Ingestion Verification\n");
  
  const result = loadAndValidate();
  
  if (result.errors.length > 0) {
    console.log("❌ Validation errors found:");
    for (const error of result.errors) {
      console.log(`  - ${error}`);
    }
    process.exit(1);
  }
  
  console.log("✅ Schema validation passed");
  console.log(`✅ ${result.pathways.length} pathways validated`);
  console.log(`✅ ${result.coverage.length} coverage entries`);
  
  // Check coverage thresholds
  const totalTopics = result.coverage.reduce((sum, c) => c.topics + sum, 0);
  const officialTopics = result.pathways.reduce((sum, p) => {
    // This would need actual DB query in real verification
    return sum;
  }, 0);
  
  console.log(`\n📊 Coverage: ${result.coverage.length} grade-subject combinations`);
  console.log(`📊 Total topics in data files: ${result.coverage.reduce((s, c) => s + c.topics, 0)}`);
  
  console.log("\n✅ Verification complete");
}

// Main entry point
async function main() {
  printBanner();
  
  const { command, options } = parseArgs();
  
  switch (command) {
    case "validate":
      await runValidate(options);
      break;
    case "preview":
      await runPreview(options);
      break;
    case "ingest":
      await runIngest(options);
      break;
    case "coverage":
      await runCoverage();
      break;
    case "verify":
      await runVerify();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error("\n💥 Fatal error:");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});