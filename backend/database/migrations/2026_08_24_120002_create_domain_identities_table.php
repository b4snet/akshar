<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Domain identity registry (Phase 012 identity model).
     *
     * The canonical relationship layer between a Person and the platform's
     * domain concepts (staff/teacher/student/guardian). A person may hold
     * several identities; at most one of each type. Rich per-domain profile
     * tables are owned by their future modules and will reference people.
     */
    public function up(): void
    {
        Schema::create('domain_identities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('person_id')
                ->constrained()
                ->restrictOnDelete();
            $table->string('type');
            $table->string('status')->default('active');
            $table->timestamps();

            $table->unique(['person_id', 'type']);
            $table->index(['type', 'status']);
        });

        DB::statement(
            'ALTER TABLE domain_identities ADD CONSTRAINT domain_identities_type_check '.
            "CHECK (type IN ('staff','teacher','student','guardian'))"
        );

        DB::statement(
            'ALTER TABLE domain_identities ADD CONSTRAINT domain_identities_status_check '.
            "CHECK (status IN ('active','inactive','suspended','archived'))"
        );
    }

    public function down(): void
    {
        Schema::dropIfExists('domain_identities');
    }
};
