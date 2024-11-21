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
        Schema::dropIfExists('appointments');
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('extension_worker_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('area_id')->constrained('areas')->onDelete('cascade')->nullable();
            $table->dateTime('appointment_date');
            $table->text('description')->nullable();
            $table->text('service')->nullable();
            $table->text('feedback')->nullable();
            $table->text('animal_type')->nullable();
            $table->enum('status', ['Requested','Pending', 'Completed', 'Cancelled'])->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
