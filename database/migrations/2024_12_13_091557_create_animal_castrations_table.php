<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animal_castrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained('appointments');
            $table->string('animal_id');
            $table->date('date_of_castration');
            $table->integer('animal_age');
            $table->enum('age_unit', ['Months', 'Years']);
            $table->enum('castration_method', ['Surgical', 'Banding', 'Burdizzo', 'Chemical']);
            $table->text('method_details')->nullable();
            $table->enum('anesthesia_used', ['Local Anesthesia', 'General Anesthesia', 'None']);
            $table->string('anesthesia_details')->nullable();
            $table->integer('duration_of_procedure');
            $table->foreignId('castration_officer_id')->constrained('users');
            $table->string('equipment_used');
            $table->boolean('complications_observed');
            $table->text('complication_details')->nullable();
            $table->boolean('follow_up_treatment_required');
            $table->text('follow_up_treatment_details')->nullable();
            $table->boolean('post_procedure_monitoring');
            $table->enum('post_procedure_health_status', ['Healthy', 'Mild Complication', 'Severe Complication', 'Other']);
            $table->text('health_status_details')->nullable();
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animal_castrations');
    }
};

