<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('khola_buildings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained('appointments');
            $table->string('animal_id');
            $table->date('construction_start_date');
            $table->foreignId('construction_officer_id')->constrained('users');
            $table->enum('khola_type', ['Traditional', 'Modern', 'Semi-modern']);
            $table->enum('material_used', ['Wood', 'Mud', 'Thatch', 'Cement', 'Steel', 'Others']);
            $table->string('other_material')->nullable();
            $table->string('khola_size');
            $table->integer('number_of_compartments');
            $table->enum('ventilation_type', ['Natural', 'Artificial', 'Both']);
            $table->enum('flooring_type', ['Concrete', 'Soil', 'Wood', 'Other']);
            $table->string('other_flooring')->nullable();
            $table->enum('roof_type', ['Thatch', 'Corrugated Metal', 'Tile', 'Others']);
            $table->string('other_roof')->nullable();
            $table->boolean('drainage_system_installed');
            $table->boolean('animal_health_safety_features');
            $table->decimal('estimated_cost', 10, 2);
            $table->enum('construction_method', ['Manual', 'Mechanical']);
            $table->date('completion_date')->nullable();
            $table->enum('completion_status', ['Completed', 'In Progress', 'Pending']);
            $table->integer('animal_accommodation_capacity');
            $table->enum('post_construction_inspection', ['Passed', 'Failed', 'Pending']);
            $table->boolean('follow_up_action_required');
            $table->text('follow_up_action_details')->nullable();
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('khola_buildings');
    }
};

