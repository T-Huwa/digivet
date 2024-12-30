<?php

namespace App\Http\Controllers;

use App\Models\AnimalEarTagging;
use App\Models\AnimalVaccination;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalVaccinationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'animal_id' => 'required|string',
            'date_of_ear_tagging' => 'required|date',
            'appointment_id' => 'required|exists:appointments,id',
            'ear_tag_number' => 'required|string|unique:animal_ear_taggings,ear_tag_number',
            'tagging_method' => 'required|in:Manual,Automatic',
            'ear_tag_type' => 'required|in:Plastic,Metal,RFID,Barcode',
            'ear_tag_color' => 'required|string',
            'custom_color' => 'nullable|required_if:ear_tag_color,Custom|string',
            'animal_age' => 'required|integer',
            'age_unit' => 'required|in:Months,Years',
            'sex_of_animal' => 'required|in:Male,Female',
            'ear_condition' => 'required|string',
            'ear_condition_notes' => 'nullable|string',
            'health_condition' => 'required|string',
            'health_condition_details' => 'nullable|string',
            'veterinarian_id' => 'required|exists:users,id',
            'location' => 'required|string',
            'purpose_of_tagging' => 'required|string',
            'purpose_notes' => 'nullable|string',
            'additional_notes' => 'nullable|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_action' => 'nullable|required_if:follow_up_required,true|string',
            'follow_up_date' => 'nullable|required_if:follow_up_required,true|date|after:date_of_ear_tagging',
        ]);

        $animalEarTagging = AnimalEarTagging::create($validated);

        $appointment = Appointment::find($request->appointment_id);
        if ($appointment) {
            $appointment->status = 'Completed';
            $appointment->save();
        }

        return redirect()->route('appointments.get')
            ->with('message', 'Animal ear tagging record created successfully.');
    }
}

