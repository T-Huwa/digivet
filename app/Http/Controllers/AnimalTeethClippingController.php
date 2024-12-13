<?php

namespace App\Http\Controllers;

use App\Models\AnimalTeethClipping;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AnimalTeethClippingController extends Controller
{
    public function index()
    {
        $animalTeethClippings = AnimalTeethClipping::with(['appointment', 'veterinarian'])->paginate(10);
        return Inertia::render('AnimalTeethClipping/Index', ['animalTeethClippings' => $animalTeethClippings]);
    }

    public function create()
    {
        return Inertia::render('AnimalTeethClipping/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_teeth_clipping' => 'required|date',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'sex_of_animal' => ['required', Rule::in(['Male', 'Female'])],
            'teeth_condition' => ['required', Rule::in(['Healthy', 'Overgrown', 'Damaged', 'Infected', 'Other'])],
            'teeth_condition_notes' => 'nullable|required_if:teeth_condition,Other|string',
            'teeth_clipping_method' => ['required', Rule::in(['Manual', 'Mechanical', 'Electric'])],
            'teeth_clipping_procedure' => ['required', Rule::in(['Full Clip', 'Partial Clip', 'Grinding', 'Shaping'])],
            'veterinarian_id' => 'required|exists:users,id',
            'clipping_tools' => ['required', Rule::in(['Scissors', 'Clippers', 'Grinder', 'Other'])],
            'other_clipping_tool' => 'nullable|required_if:clipping_tools,Other|string',
            'pain_management_applied' => 'required|boolean',
            'pain_management_type' => 'nullable|required_if:pain_management_applied,true|string',
            'clipping_outcome' => ['required', Rule::in(['Successful', 'Partial', 'Failed'])],
            'outcome_notes' => 'nullable|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_action' => 'nullable|required_if:follow_up_required,true|string',
            'follow_up_date' => 'nullable|required_if:follow_up_required,true|date|after:date_of_teeth_clipping',
            'animal_health_condition' => ['required', Rule::in(['Healthy', 'Sick', 'Injured', 'Other'])],
            'health_condition_details' => 'nullable|required_if:animal_health_condition,Other|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalTeethClipping = AnimalTeethClipping::create($validated);

        return redirect()->route('animal-teeth-clippings.show', $animalTeethClipping)
            ->with('success', 'Animal teeth clipping record created successfully');
    }

    public function show(AnimalTeethClipping $animalTeethClipping)
    {
        $animalTeethClipping->load(['appointment', 'veterinarian']);
        return Inertia::render('AnimalTeethClipping/Show', ['animalTeethClipping' => $animalTeethClipping]);
    }

    public function edit(AnimalTeethClipping $animalTeethClipping)
    {
        return Inertia::render('AnimalTeethClipping/Edit', ['animalTeethClipping' => $animalTeethClipping]);
    }

    public function update(Request $request, AnimalTeethClipping $animalTeethClipping)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_teeth_clipping' => 'required|date',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'sex_of_animal' => ['required', Rule::in(['Male', 'Female'])],
            'teeth_condition' => ['required', Rule::in(['Healthy', 'Overgrown', 'Damaged', 'Infected', 'Other'])],
            'teeth_condition_notes' => 'nullable|required_if:teeth_condition,Other|string',
            'teeth_clipping_method' => ['required', Rule::in(['Manual', 'Mechanical', 'Electric'])],
            'teeth_clipping_procedure' => ['required', Rule::in(['Full Clip', 'Partial Clip', 'Grinding', 'Shaping'])],
            'veterinarian_id' => 'required|exists:users,id',
            'clipping_tools' => ['required', Rule::in(['Scissors', 'Clippers', 'Grinder', 'Other'])],
            'other_clipping_tool' => 'nullable|required_if:clipping_tools,Other|string',
            'pain_management_applied' => 'required|boolean',
            'pain_management_type' => 'nullable|required_if:pain_management_applied,true|string',
            'clipping_outcome' => ['required', Rule::in(['Successful', 'Partial', 'Failed'])],
            'outcome_notes' => 'nullable|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_action' => 'nullable|required_if:follow_up_required,true|string',
            'follow_up_date' => 'nullable|required_if:follow_up_required,true|date|after:date_of_teeth_clipping',
            'animal_health_condition' => ['required', Rule::in(['Healthy', 'Sick', 'Injured', 'Other'])],
            'health_condition_details' => 'nullable|required_if:animal_health_condition,Other|string',
            'additional_notes' => 'nullable|string',
        ]);

        $animalTeethClipping->update($validated);

        return redirect()->route('animal-teeth-clippings.show', $animalTeethClipping)
            ->with('success', 'Animal teeth clipping record updated successfully');
    }

    public function destroy(AnimalTeethClipping $animalTeethClipping)
    {
        $animalTeethClipping->delete();

        return redirect()->route('animal-teeth-clippings.index')
            ->with('success', 'Animal teeth clipping record deleted successfully');
    }
}

