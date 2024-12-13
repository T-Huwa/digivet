<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalVaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'animal_id',
        'date_of_vaccination',
        'animal_age',
        'age_unit',
        'sex_of_animal',
        'vaccination_type',
        'vaccine_used',
        'dose_administered',
        'route_of_administration',
        'other_administration_route',
        'vaccine_batch_number',
        'lot_number',
        'vaccination_officer_id',
        'adverse_reactions_observed',
        'reaction_description',
        'follow_up_required',
        'follow_up_actions',
        'next_due_date',
        'animal_health_status',
        'health_status_details',
        'additional_notes',
    ];

    protected $casts = [
        'date_of_vaccination' => 'date',
        'animal_age' => 'integer',
        'dose_administered' => 'decimal:2',
        'adverse_reactions_observed' => 'boolean',
        'follow_up_required' => 'boolean',
        'next_due_date' => 'date',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function vaccinationOfficer()
    {
        return $this->belongsTo(User::class, 'vaccination_officer_id');
    }
}

