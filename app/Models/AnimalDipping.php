<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnimalDipping extends Model
{
    protected $fillable = [
        'appointment_id',
        'animal_id',
        'date_of_treatment',
        'treatment_type',
        'targeted_pests',
        'chemical_product',
        'chemical_concentration',
        'solution_volume',
        'animals_treated_count',
        'pre_treatment_health',
        'skin_conditions',
        'post_treatment_observations',
        'environmental_conditions',
        'follow_up_date',
        'extension_officer_id',
        'additional_notes'
    ];

    protected $casts = [
        'date_of_treatment' => 'datetime',
        'follow_up_date' => 'datetime',
        'targeted_pests' => 'array',
        'skin_conditions' => 'array',
        'solution_volume' => 'decimal:2',
        'chemical_concentration' => 'decimal:2',
    ];

    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }

    public function extensionOfficer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'extension_officer_id');
    }
}