<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KholaBuilding extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'animal_id',
        'construction_start_date',
        'construction_officer_id',
        'khola_type',
        'material_used',
        'other_material',
        'khola_size',
        'number_of_compartments',
        'ventilation_type',
        'flooring_type',
        'other_flooring',
        'roof_type',
        'other_roof',
        'drainage_system_installed',
        'animal_health_safety_features',
        'estimated_cost',
        'construction_method',
        'completion_date',
        'completion_status',
        'animal_accommodation_capacity',
        'post_construction_inspection',
        'follow_up_action_required',
        'follow_up_action_details',
        'additional_notes',
    ];

    protected $casts = [
        'construction_start_date' => 'date',
        'completion_date' => 'date',
        'number_of_compartments' => 'integer',
        'drainage_system_installed' => 'boolean',
        'animal_health_safety_features' => 'boolean',
        'estimated_cost' => 'decimal:2',
        'animal_accommodation_capacity' => 'integer',
        'follow_up_action_required' => 'boolean',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function constructionOfficer()
    {
        return $this->belongsTo(User::class, 'construction_officer_id');
    }
}

