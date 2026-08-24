<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Canonical Person (Phase 012 identity model, DATABASE.md "People").
     *
     * One row per real human. Deliberately free of domain-specific fields:
     * staff/teacher/student/guardian attributes belong to their owning
     * modules. No national identifiers are invented here.
     */
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('display_name');
            $table->string('legal_name')->nullable();
            $table->string('name_ne')->nullable();
            $table->string('email')->nullable()->index();
            $table->string('phone', 32)->nullable()->index();
            $table->date('date_of_birth')->nullable();
            $table->string('status')->default('active');
            $table->jsonb('metadata')->nullable();
            $table->timestamps();

            $table->index('status');
        });

        DB::statement(
            'ALTER TABLE people ADD CONSTRAINT people_status_check '.
            "CHECK (status IN ('active','inactive','suspended','archived'))"
        );

        // Link accounts to canonical people now that the target table exists
        // (the framework users migration runs first and cannot self-constrain).
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('person_id')
                ->references('id')
                ->on('people')
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['person_id']);
        });
        Schema::dropIfExists('people');
    }
};
