<?php

namespace App\Http\Controllers;

use App\Models\AnimalCastration;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AnimalCastrationController extends Controller
{
    public function index()
    {
        $animalCastrations = AnimalCastration::with(['appointment', 'castrationOfficer'])->paginate(10);
        return Inertia::render('AnimalCastration/Index', ['animalCastrations' => $animalCastrations]);
    }

    public function create()
    {
        return Inertia::render('AnimalCastration/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_castration' => 'required|date',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'castration_method' => ['required', Rule::in(['Surgical', 'Banding', 'Burdizzo', 'Chemical'])],
            'method_details' => 'nullable|string',
            'anesthesia_used' => ['required', Rule::in(['Local Anesthesia', 'General Anesthesia', 'None'])],
            'anesthesia_details' => 'nullable|required_unless:anesthesia_used,None|string',
            'duration_of_procedure' => 'required|integer|min:1',
            'castration_officer_id' => 'required|exists:users,id',
            'equipment_used' => 'required|string',
            'complications_observed' => 'required|boolean',
            'complication_details' => 'nullable|required_if:complications_observed,true|string',
            'follow_up_treatment_required' => 'required|boolean',
            'follow_up_treatment_details' => 'nullable|required_if:follow_up_treatment_required,true|string',
            'post_procedure_monitoring' => 'required|boolean',
            'post_procedure_health_status' => ['required', Rule::in(['Healthy', 'Mild Complication', 'Severe Complication', 'Other'])],
            'health_status_details' => 'nullable|required_if:post_procedure_health_status,Other|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalCastration = AnimalCastration::create($validated);
        $appointment = Appointment::find($request->appointment_id);
        $appointment->status = "Completed";
        $appointment->save();

        return redirect()->back()
            ->with('success', 'Animal castration record created successfully');
    }

    public function show(AnimalCastration $animalCastration)
    {
        $animalCastration->load(['appointment', 'castrationOfficer']);
        return Inertia::render('AnimalCastration/Show', ['animalCastration' => $animalCastration]);
    }

    public function edit(AnimalCastration $animalCastration)
    {
        return Inertia::render('AnimalCastration/Edit', ['animalCastration' => $animalCastration]);
    }

    public function update(Request $request, AnimalCastration $animalCastration)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_castration' => 'required|date',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'castration_method' => ['required', Rule::in(['Surgical', 'Banding', 'Burdizzo', 'Chemical'])],
            'method_details' => 'nullable|string',
            'anesthesia_used' => ['required', Rule::in(['Local Anesthesia', 'General Anesthesia', 'None'])],
            'anesthesia_details' => 'nullable|required_unless:anesthesia_used,None|string',
            'duration_of_procedure' => 'required|integer|min:1',
            'castration_officer_id' => 'required|exists:users,id',
            'equipment_used' => 'required|string',
            'complications_observed' => 'required|boolean',
            'complication_details' => 'nullable|required_if:complications_observed,true|string',
            'follow_up_treatment_required' => 'required|boolean',
            'follow_up_treatment_details' => 'nullable|required_if:follow_up_treatment_required,true|string',
            'post_procedure_monitoring' => 'required|boolean',
            'post_procedure_health_status' => ['required', Rule::in(['Healthy', 'Mild Complication', 'Severe Complication', 'Other'])],
            'health_status_details' => 'nullable|required_if:post_procedure_health_status,Other|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalCastration->update($validated);

        return redirect()->route('animal-castrations.show', $animalCastration)
            ->with('success', 'Animal castration record updated successfully');
    }

    public function destroy(AnimalCastration $animalCastration)
    {
        $animalCastration->delete();

        return redirect()->route('animal-castrations.index')
            ->with('success', 'Animal castration record deleted successfully');
    }
}

