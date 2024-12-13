<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animal_treatments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->string('animal_id');
            $table->date('date_of_treatment');
            $table->string('disease_condition');
            $table->json('symptoms_observed')->nullable();
            $table->float('temperature')->nullable();
            $table->integer('heart_rate')->nullable();
            $table->integer('respiratory_rate')->nullable();
            $table->string('treatment_administered');
            $table->string('drug_name');
            $table->string('dosage');
            $table->enum('route_of_administration', ['Oral', 'Intravenous', 'Intramuscular', 'Topical']);
            $table->enum('frequency_of_administration', ['Once', 'Daily', 'Weekly', 'Other']);
            $table->integer('duration_of_treatment');
            $table->date('follow_up_date');
            $table->text('side_effects_observed')->nullable();
            $table->enum('treatment_outcome', ['Resolved', 'Ongoing', 'Worsened', 'Unknown']);
            $table->string('extension_officer_name');
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animal_treatments');
    }
};

