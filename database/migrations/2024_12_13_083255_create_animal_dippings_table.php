<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('animal_dippings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->string('animal_id');
            $table->datetime('date_of_treatment');
            $table->enum('treatment_type', ['Dipping', 'Spraying']);
            $table->json('targeted_pests');
            $table->string('chemical_product');
            $table->decimal('chemical_concentration', 5, 2)->nullable();
            $table->decimal('solution_volume', 8, 2);
            $table->integer('animals_treated_count');
            $table->enum('pre_treatment_health', ['Healthy', 'Sick', 'Injured']);
            $table->json('skin_conditions')->nullable();
            $table->text('post_treatment_observations')->nullable();
            $table->enum('environmental_conditions', ['Sunny', 'Rainy', 'Overcast', 'Windy']);
            $table->datetime('follow_up_date');
            $table->foreignId('extension_officer_id')->constrained('users');
            $table->text('additional_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('animal_dippings');
    }
};