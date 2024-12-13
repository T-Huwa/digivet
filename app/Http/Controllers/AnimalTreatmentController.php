<?php

namespace App\Http\Controllers;

use App\Models\AnimalTreatment;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalTreatmentController extends Controller
{
    public function index()
    {
        $treatments = AnimalTreatment::with('appointment')->get();
        return Inertia::render('AnimalTreatments/Index', ['treatments' => $treatments]);
    }

    public function create()
    {
        return Inertia::render('AnimalTreatments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_treatment' => 'required|date',
            'disease_condition' => 'required|string',
            'symptoms_observed' => 'nullable|array',
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

        AnimalTreatment::create($validated);
        $appointment = Appointment::find($request->appointment_id);
        $appointment->status = "Completed";
        $appointment->save();

        return redirect()->back()->with('message', 'Animal treatment record created successfully');
    }

    public function show(AnimalTreatment $animalTreatment)
    {
        return Inertia::render('AnimalTreatments/Show', ['treatment' => $animalTreatment->load('appointment')]);
    }

    public function edit(AnimalTreatment $animalTreatment)
    {
        return Inertia::render('AnimalTreatments/Edit', ['treatment' => $animalTreatment]);
    }

    public function update(Request $request, AnimalTreatment $animalTreatment)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_treatment' => 'required|date',
            'disease_condition' => 'required|string',
            'symptoms_observed' => 'nullable|array',
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

        $animalTreatment->update($validated);

        return redirect()->route('animal-treatments.index')->with('message', 'Animal treatment record updated successfully');
    }

    public function destroy(AnimalTreatment $animalTreatment)
    {
        $animalTreatment->delete();

        return redirect()->route('animal-treatments.index')->with('message', 'Animal treatment record deleted successfully');
    }
}

