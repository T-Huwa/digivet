<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalEarTagging extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'appointment_id',
        'date_of_ear_tagging',
        'ear_tag_number',
        'tagging_method',
        'ear_tag_type',
        'ear_tag_color',
        'custom_color',
        'animal_age',
        'age_unit',
        'sex_of_animal',
        'ear_condition',
        'ear_condition_notes',
        'health_condition',
        'health_condition_details',
        'veterinarian_id',
        'location',
        'purpose_of_tagging',
        'purpose_notes',
        'additional_notes',
        'follow_up_required',
        'follow_up_action',
        'follow_up_date',
    ];

    protected $casts = [
        'date_of_ear_tagging' => 'date',
        'animal_age' => 'integer',
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

