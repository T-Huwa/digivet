<?php

namespace App\Http\Controllers;

use App\Models\AnimalTreatment;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalTreatmentController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_treatment' => 'required|date',
            'disease_condition' => 'required|string',
            'symptoms_observed' => 'nullable|string',
            'temperature' => 'nullable|numeric',
            'heart_rate' => 'nullable|integer',
            'respiratory_rate' => 'nullable|integer',
            'treatment_administered' => 'required|string',
            'drug_name' => 'required|string',
            'dosage' => 'required|string',
            'route_of_administration' => 'required|in:Oral,Intravenous,Intramuscular,Topical',
            'frequency_of_administration' => 'required|in:Once,Daily,Weekly,Other',
            'duration_of_treatment' => 'required|integer',
            'follow_up_date' => 'required|date',
            'side_effects_observed' => 'nullable|string',
            'treatment_outcome' => 'required|in:Resolved,Ongoing,Worsened,Unknown',
            'extension_officer_name' => 'required|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalTreatment = AnimalTreatment::create($validated);

        $appointment = Appointment::find($request->appointment_id);
        if ($appointment) {
            $appointment->status = "Completed";
            $appointment->save();
        }

        //return Inertia::render('EO/Appointments', ['message' => "Completed Successfully"]);

        //return Inertia::render('EO/Appointments', ['message' => "Completed Successfully"]);
        return redirect()->route('appointments.get')->with('message', 'Animal treatment record created successfully.');
    }
}