<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visit_ai_outputs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visit_id')->constrained('visits')->cascadeOnDelete();
            $table->enum('risk_level', ['low', 'medium', 'high']);
            $table->json('reasons');
            $table->json('red_flags');
            $table->json('recommended_next_step');
            $table->json('plan_7_days')->nullable();
            $table->longText('report_text')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_ai_outputs');
    }
};
