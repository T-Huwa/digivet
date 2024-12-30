<?php

namespace App\Http\Controllers;

use App\Models\AnimalTeethClipping;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalTeethClippingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'integer',
            'date_of_teeth_clipping' => 'required|date',
            'animal_age' => 'required|integer',
            'age_unit' => 'required|in:Months,Years',
            'sex_of_animal' => 'required|in:Male,Female',
            'teeth_condition' => 'required|in:Healthy,Overgrown,Damaged,Infected,Other',
            'teeth_condition_notes' => 'nullable|string',
            'teeth_clipping_method' => 'required|in:Manual,Mechanical,Electric',
            'teeth_clipping_procedure' => 'required|in:Full Clip,Partial Clip,Grinding,Shaping',
            'veterinarian_id' => 'integer',
            'clipping_tools' => 'required|in:Scissors,Clippers,Grinder,Other',
            'other_clipping_tool' => 'required_if:clipping_tools,Other|nullable|string',
            'pain_management_applied' => 'required|boolean',
            'pain_management_type' => 'required_if:pain_management_applied,true|nullable|string',
            'clipping_outcome' => 'required|in:Successful,Partial,Failed',
            'outcome_notes' => 'nullable|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_action' => 'required_if:follow_up_required,true|nullable|string',
            'follow_up_date' => 'required_if:follow_up_required,true|nullable|date',
            'animal_health_condition' => 'required|in:Healthy,Sick,Injured,Other',
            'health_condition_details' => 'required_if:animal_health_condition,Other|nullable|string',
            'additional_notes' => 'nullable|string',
            'anesthetic_used' => 'required|boolean',
            'anesthetic_type' => 'required_if:anesthetic_used,true|nullable|string',
            'duration_of_procedure' => 'required|integer',
            'procedure_cost' => 'required|numeric',
            'responsible_staff' => 'required|integer',
        ]);

        $animalTeethClipping = AnimalTeethClipping::create($validated);

        $appointment = Appointment::find($request->appointment_id);
        if ($appointment) {
            $appointment->status = "Completed";
            $appointment->save();
        }

        return redirect()->route('appointments.get')->with('message', 'Animal teeth clipping record created successfully.');
    }
}

