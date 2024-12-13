<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalTreatment extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'animal_id',
        'date_of_treatment',
        'disease_condition',
        'symptoms_observed',
        'temperature',
        'heart_rate',
        'respiratory_rate',
        'treatment_administered',
        'drug_name',
        'dosage',
        'route_of_administration',
        'frequency_of_administration',
        'duration_of_treatment',
        'follow_up_date',
        'side_effects_observed',
        'treatment_outcome',
        'extension_officer_name',
        'additional_notes',
    ];

    protected $casts = [
        'date_of_treatment' => 'date',
        'symptoms_observed' => 'array',
        'follow_up_date' => 'date',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}

