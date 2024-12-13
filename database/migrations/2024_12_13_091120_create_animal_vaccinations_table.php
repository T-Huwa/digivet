<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animal_vaccinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained('appointments');
            $table->string('animal_id');
            $table->date('date_of_vaccination');
            $table->integer('animal_age');
            $table->enum('age_unit', ['Months', 'Years']);
            $table->enum('sex_of_animal', ['Male', 'Female']);
            $table->enum('vaccination_type', ['Routine', 'Emergency', 'Booster']);
            $table->string('vaccine_used');
            $table->decimal('dose_administered', 8, 2);
            $table->enum('route_of_administration', ['Intramuscular', 'Subcutaneous', 'Oral', 'Nasal', 'Other']);
            $table->string('other_administration_route')->nullable();
            $table->string('vaccine_batch_number');
            $table->string('lot_number');
            $table->foreignId('vaccination_officer_id')->constrained('users');
            $table->boolean('adverse_reactions_observed');
            $table->text('reaction_description')->nullable();
            $table->boolean('follow_up_required');
            $table->text('follow_up_actions')->nullable();
            $table->date('next_due_date')->nullable();
            $table->enum('animal_health_status', ['Healthy', 'Mild Reaction', 'Severe Reaction', 'Other']);
            $table->text('health_status_details')->nullable();
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animal_vaccinations');
    }
};

