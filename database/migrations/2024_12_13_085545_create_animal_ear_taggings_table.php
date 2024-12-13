<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animal_ear_taggings', function (Blueprint $table) {
            $table->id();
            $table->string('animal_id')->unique();
            $table->foreignId('appointment_id')->constrained('appointments');
            $table->date('date_of_ear_tagging');
            $table->string('ear_tag_number')->unique();
            $table->enum('tagging_method', ['Manual', 'Automatic']);
            $table->enum('ear_tag_type', ['Plastic', 'Metal', 'RFID', 'Barcode']);
            $table->enum('ear_tag_color', ['Red', 'Blue', 'Green', 'Yellow', 'Custom']);
            $table->string('custom_color')->nullable();
            $table->integer('animal_age');
            $table->enum('age_unit', ['Months', 'Years']);
            $table->enum('sex_of_animal', ['Male', 'Female']);
            $table->enum('ear_condition', ['Normal', 'Injured', 'Infected', 'Other']);
            $table->text('ear_condition_notes')->nullable();
            $table->enum('health_condition', ['Healthy', 'Sick', 'Injured']);
            $table->text('health_condition_details')->nullable();
            $table->foreignId('veterinarian_id')->constrained('users');
            $table->string('location');
            $table->enum('purpose_of_tagging', ['Identification', 'Tracking', 'Breeding', 'Other']);
            $table->text('purpose_notes')->nullable();
            $table->text('additional_notes')->nullable();
            $table->boolean('follow_up_required');
            $table->text('follow_up_action')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animal_ear_taggings');
    }
};

