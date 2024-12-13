<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('p_tests', function (Blueprint $table) {
            $table->id();
            $table->string('animal_id');
            $table->foreignId('appointment_id')->constrained('appointments');
            $table->date('date_of_diagnosis');
            $table->float('weight')->nullable();
            $table->enum('body_condition_score', [1, 2, 3, 4, 5])->nullable();
            $table->enum('pregnancy_status', ['Pregnant', 'Not Pregnant', 'Unknown']);
            $table->enum('gestation_stage', ['1st Trimester', '2nd Trimester', '3rd Trimester', 'Not Applicable']);
            $table->boolean('palpation_results')->nullable();
            $table->text('palpation_notes')->nullable();
            $table->float('temperature')->nullable();
            $table->integer('heart_rate')->nullable();
            $table->integer('respiratory_rate')->nullable();
            $table->enum('feed_intake', ['Normal', 'Reduced', 'Increased'])->nullable();
            $table->enum('rumen_fill', ['Full', 'Moderate', 'Empty'])->nullable();
            $table->enum('skin_coat_condition', ['Healthy', 'Dull', 'Presence of Parasites'])->nullable();
            $table->boolean('mobility_status')->nullable();
            $table->text('mobility_notes')->nullable();
            $table->text('reproductive_health_history')->nullable();
            $table->boolean('vaccination_status')->nullable();
            $table->text('vaccination_notes')->nullable();
            $table->text('behavior_observations')->nullable();
            $table->enum('blood_test_results', ['Normal', 'Abnormal'])->nullable();
            $table->text('blood_test_notes')->nullable();
            $table->text('additional_notes')->nullable();
            $table->string('diagnosed_by');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('p_tests');
    }
};