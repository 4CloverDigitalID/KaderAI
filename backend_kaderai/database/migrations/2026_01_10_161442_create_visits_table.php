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
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->dateTime('visited_at');
            $table->string('city');
            $table->string('district');
            $table->string('street');
            $table->string('rt_rw');
            $table->text('description')->nullable();
            $table->string('child_name')->nullable();
            $table->unsignedInteger('child_age_months');
            $table->decimal('weight_kg', 5, 2);
            $table->decimal('height_cm', 5, 2);
            $table->text('symptoms')->nullable();
            $table->text('eating_pattern')->nullable();
            $table->enum('immunization_status', ['lengkap', 'belum_lengkap', 'tidak_tahu'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
