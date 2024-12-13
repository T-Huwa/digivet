<?php

namespace App\Http\Controllers;

use App\Models\AnimalVaccination;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AnimalVaccinationController extends Controller
{
    public function index()
    {
        $animalVaccinations = AnimalVaccination::with(['appointment', 'vaccinationOfficer'])->paginate(10);
        return Inertia::render('AnimalVaccination/Index', ['animalVaccinations' => $animalVaccinations]);
    }

    public function create()
    {
        return Inertia::render('AnimalVaccination/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_vaccination' => 'required|date',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'sex_of_animal' => ['required', Rule::in(['Male', 'Female'])],
            'vaccination_type' => ['required', Rule::in(['Routine', 'Emergency', 'Booster'])],
            'vaccine_used' => 'required|string',
            'dose_administered' => 'required|numeric|min:0',
            'route_of_administration' => ['required', Rule::in(['Intramuscular', 'Subcutaneous', 'Oral', 'Nasal', 'Other'])],
            'other_administration_route' => 'nullable|required_if:route_of_administration,Other|string',
            'vaccine_batch_number' => 'required|string',
            'lot_number' => 'required|string',
            'vaccination_officer_id' => 'required|exists:users,id',
            'adverse_reactions_observed' => 'required|boolean',
            'reaction_description' => 'nullable|required_if:adverse_reactions_observed,true|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_actions' => 'nullable|required_if:follow_up_required,true|string',
            'next_due_date' => 'nullable|date|after:date_of_vaccination',
            'animal_health_status' => ['required', Rule::in(['Healthy', 'Mild Reaction', 'Severe Reaction', 'Other'])],
            'health_status_details' => 'nullable|required_if:animal_health_status,Other|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalVaccination = AnimalVaccination::create($validated);

        return redirect()->route('animal-vaccinations.show', $animalVaccination)
            ->with('success', 'Animal vaccination record created successfully');
    }

    public function show(AnimalVaccination $animalVaccination)
    {
        $animalVaccination->load(['appointment', 'vaccinationOfficer']);
        return Inertia::render('AnimalVaccination/Show', ['animalVaccination' => $animalVaccination]);
    }

    public function edit(AnimalVaccination $animalVaccination)
    {
        return Inertia::render('AnimalVaccination/Edit', ['animalVaccination' => $animalVaccination]);
    }

    public function update(Request $request, AnimalVaccination $animalVaccination)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_vaccination' => 'required|date',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'sex_of_animal' => ['required', Rule::in(['Male', 'Female'])],
            'vaccination_type' => ['required', Rule::in(['Routine', 'Emergency', 'Booster'])],
            'vaccine_used' => 'required|string',
            'dose_administered' => 'required|numeric|min:0',
            'route_of_administration' => ['required', Rule::in(['Intramuscular', 'Subcutaneous', 'Oral', 'Nasal', 'Other'])],
            'other_administration_route' => 'nullable|required_if:route_of_administration,Other|string',
            'vaccine_batch_number' => 'required|string',
            'lot_number' => 'required|string',
            'vaccination_officer_id' => 'required|exists:users,id',
            'adverse_reactions_observed' => 'required|boolean',
            'reaction_description' => 'nullable|required_if:adverse_reactions_observed,true|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_actions' => 'nullable|required_if:follow_up_required,true|string',
            'next_due_date' => 'nullable|date|after:date_of_vaccination',
            'animal_health_status' => ['required', Rule::in(['Healthy', 'Mild Reaction', 'Severe Reaction', 'Other'])],
            'health_status_details' => 'nullable|required_if:animal_health_status,Other|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalVaccination->update($validated);
        $appointment = Appointment::find($request->appointment_id);
        $appointment->status = "Completed";
        $appointment->save();

        return redirect()->back()
            ->with('success', 'Animal vaccination record updated successfully');
    }

    public function destroy(AnimalVaccination $animalVaccination)
    {
        $animalVaccination->delete();

        return redirect()->route('animal-vaccinations.index')
            ->with('success', 'Animal vaccination record deleted successfully');
    }
}

