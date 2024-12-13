<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'appointment_id',
        'date_of_diagnosis',
        'weight',
        'body_condition_score',
        'pregnancy_status',
        'gestation_stage',
        'palpation_results',
        'palpation_notes',
        'temperature',
        'heart_rate',
        'respiratory_rate',
        'feed_intake',
        'rumen_fill',
        'skin_coat_condition',
        'mobility_status',
        'mobility_notes',
        'reproductive_health_history',
        'vaccination_status',
        'vaccination_notes',
        'behavior_observations',
        'blood_test_results',
        'blood_test_notes',
        'additional_notes',
        'diagnosed_by'
    ];

    protected $casts = [
        'date_of_diagnosis' => 'date',
        'weight' => 'float',
        'temperature' => 'float',
        'heart_rate' => 'integer',
        'respiratory_rate' => 'integer',
    ];
}