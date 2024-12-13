<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalTeethClipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'animal_id',
        'date_of_teeth_clipping',
        'animal_age',
        'age_unit',
        'sex_of_animal',
        'teeth_condition',
        'teeth_condition_notes',
        'teeth_clipping_method',
        'teeth_clipping_procedure',
        'veterinarian_id',
        'clipping_tools',
        'other_clipping_tool',
        'pain_management_applied',
        'pain_management_type',
        'clipping_outcome',
        'outcome_notes',
        'follow_up_required',
        'follow_up_action',
        'follow_up_date',
        'animal_health_condition',
        'health_condition_details',
        'additional_notes',
    ];

    protected $casts = [
        'date_of_teeth_clipping' => 'date',
        'animal_age' => 'integer',
        'pain_management_applied' => 'boolean',
        'follow_up_required' => 'boolean',
        'follow_up_date' => 'date',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function veterinarian()
    {
        return $this->belongsTo(User::class, 'veterinarian_id');
    }
}

