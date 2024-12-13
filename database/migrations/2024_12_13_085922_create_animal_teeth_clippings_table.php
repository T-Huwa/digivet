<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animal_teeth_clippings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained('appointments');
            $table->string('animal_id');
            $table->date('date_of_teeth_clipping');
            $table->integer('animal_age');
            $table->enum('age_unit', ['Months', 'Years']);
            $table->enum('sex_of_animal', ['Male', 'Female']);
            $table->enum('teeth_condition', ['Healthy', 'Overgrown', 'Damaged', 'Infected', 'Other']);
            $table->text('teeth_condition_notes')->nullable();
            $table->enum('teeth_clipping_method', ['Manual', 'Mechanical', 'Electric']);
            $table->enum('teeth_clipping_procedure', ['Full Clip', 'Partial Clip', 'Grinding', 'Shaping']);
            $table->foreignId('veterinarian_id')->constrained('users');
            $table->enum('clipping_tools', ['Scissors', 'Clippers', 'Grinder', 'Other']);
            $table->string('other_clipping_tool')->nullable();
            $table->boolean('pain_management_applied');
            $table->string('pain_management_type')->nullable();
            $table->enum('clipping_outcome', ['Successful', 'Partial', 'Failed']);
            $table->text('outcome_notes')->nullable();
            $table->boolean('follow_up_required');
            $table->text('follow_up_action')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->enum('animal_health_condition', ['Healthy', 'Sick', 'Injured', 'Other']);
            $table->text('health_condition_details')->nullable();
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animal_teeth_clippings');
    }
};

