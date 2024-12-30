<?php

namespace App\Http\Controllers;

use App\Models\AnimalDipping;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class AnimalDippingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'date_of_treatment' => 'required|date',
            'animal_id' => 'required|integer',
            'treatment_type' => ['required'],
            'targeted_pests' => 'required|array',
            'chemical_product' => 'required|string',
            'chemical_concentration' => 'nullable',
            'solution_volume' => 'required',
            'animals_treated_count' => 'required',
            'pre_treatment_health' => ['required'],
            'skin_conditions' => 'nullable|array',
            'post_treatment_observations' => 'nullable|string',
            'environmental_conditions' => ['required'],
            'follow_up_date' => 'required|date|after:date_of_treatment',
            'extension_officer_id' => 'required|exists:users,id',
            'additional_notes' => 'nullable|string'
        ]);

        $dipping = AnimalDipping::create($validated);
        $appointment = Appointment::find($request->appointment_id);
        $appointment->status = "Completed";
        $appointment->save();

        return Inertia::render('EO/Appointments', ['message' => "Completed Successfully"]);
    }
}