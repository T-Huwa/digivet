<?php

namespace App\Http\Controllers;

use App\Models\AnimalCastration;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalCastrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_castration' => 'required|date',
            'animal_age' => 'required|integer',
            'age_unit' => 'required|in:Months,Years',
            'castration_method' => 'required|in:Surgical,Banding,Burdizzo,Chemical',
            'method_details' => 'nullable|string',
            'anesthesia_used' => 'required|in:Local Anesthesia,General Anesthesia,None',
            'anesthesia_details' => 'nullable|string',
            'duration_of_procedure' => 'required|integer',
            'castration_officer_id' => 'required|exists:users,id',
            'equipment_used' => 'required|string',
            'complications_observed' => 'required|boolean',
            'complication_details' => 'nullable|string',
            'follow_up_treatment_required' => 'required|boolean',
            'follow_up_treatment_details' => 'nullable|string',
            'post_procedure_monitoring' => 'required|boolean',
            'post_procedure_health_status' => 'required|in:Healthy,Mild Complication,Severe Complication,Other',
            'health_status_details' => 'nullable|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalCastration = AnimalCastration::create($validated);

        $appointment = Appointment::find($request->appointment_id);
        if ($appointment) {
            $appointment->status = "Completed";
            $appointment->save();
        }

        return redirect()->route('appointments.get')->with('message', 'Animal castration record created successfully.');
    }
}

