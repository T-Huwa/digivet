<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalCastration extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'animal_id',
        'date_of_castration',
        'animal_age',
        'age_unit',
        'castration_method',
        'method_details',
        'anesthesia_used',
        'anesthesia_details',
        'duration_of_procedure',
        'castration_officer_id',
        'equipment_used',
        'complications_observed',
        'complication_details',
        'follow_up_treatment_required',
        'follow_up_treatment_details',
        'post_procedure_monitoring',
        'post_procedure_health_status',
        'health_status_details',
        'additional_notes',
    ];

    protected $casts = [
        'date_of_castration' => 'date',
        'animal_age' => 'integer',
        'duration_of_procedure' => 'integer',
        'complications_observed' => 'boolean',
        'follow_up_treatment_required' => 'boolean',
        'post_procedure_monitoring' => 'boolean',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function castrationOfficer()
    {
        return $this->belongsTo(User::class, 'castration_officer_id');
    }
}

