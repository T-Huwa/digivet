<?php

namespace App\Http\Controllers;

use App\Models\AnimalEarTagging;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AnimalEarTaggingController extends Controller
{
    public function index()
    {
        $animalEarTaggings = AnimalEarTagging::with('veterinarian')->paginate(10);
        return Inertia::render('AnimalEarTagging/Index', ['animalEarTaggings' => $animalEarTaggings]);
    }

    public function create()
    {
        return Inertia::render('AnimalEarTagging/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'animal_id' => 'required|string|unique:animal_ear_taggings,animal_id',
            'date_of_ear_tagging' => 'required|date',
            'appointment_id' => 'required',
            'ear_tag_number' => 'required|string|unique:animal_ear_taggings,ear_tag_number',
            'tagging_method' => ['required', Rule::in(['Manual', 'Automatic'])],
            'ear_tag_type' => ['required', Rule::in(['Plastic', 'Metal', 'RFID', 'Barcode'])],
            'ear_tag_color' => ['required', Rule::in(['Red', 'Blue', 'Green', 'Yellow', 'Custom'])],
            'custom_color' => 'nullable|required_if:ear_tag_color,Custom|string',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'sex_of_animal' => ['required', Rule::in(['Male', 'Female'])],
            'ear_condition' => ['required', Rule::in(['Normal', 'Injured', 'Infected', 'Other'])],
            'ear_condition_notes' => 'nullable|required_if:ear_condition,Other|string',
            'health_condition' => ['required', Rule::in(['Healthy', 'Sick', 'Injured'])],
            'health_condition_details' => 'nullable|string',
            'veterinarian_id' => 'required|exists:users,id',
            'location' => 'required|string',
            'purpose_of_tagging' => ['required', Rule::in(['Identification', 'Tracking', 'Breeding', 'Other'])],
            'purpose_notes' => 'nullable|required_if:purpose_of_tagging,Other|string',
            'additional_notes' => 'nullable|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_action' => 'nullable|required_if:follow_up_required,true|string',
            'follow_up_date' => 'nullable|required_if:follow_up_required,true|date|after:date_of_ear_tagging',
        ]);

        $animalEarTagging = AnimalEarTagging::create($validated);

        return redirect()->route('animal-ear-taggings.show', $animalEarTagging)
            ->with('success', 'Animal ear tagging record created successfully');
    }

    public function show(AnimalEarTagging $animalEarTagging)
    {
        $animalEarTagging->load('veterinarian');
        return Inertia::render('AnimalEarTagging/Show', ['animalEarTagging' => $animalEarTagging]);
    }

    public function edit(AnimalEarTagging $animalEarTagging)
    {
        return Inertia::render('AnimalEarTagging/Edit', ['animalEarTagging' => $animalEarTagging]);
    }

    public function update(Request $request, AnimalEarTagging $animalEarTagging)
    {
        $validated = $request->validate([
            'appointment_id' => 'required',
            'animal_id' => ['required', 'string', Rule::unique('animal_ear_taggings')->ignore($animalEarTagging)],
            'date_of_ear_tagging' => 'required|date',
            'ear_tag_number' => ['required', 'string', Rule::unique('animal_ear_taggings')->ignore($animalEarTagging)],
            'tagging_method' => ['required', Rule::in(['Manual', 'Automatic'])],
            'ear_tag_type' => ['required', Rule::in(['Plastic', 'Metal', 'RFID', 'Barcode'])],
            'ear_tag_color' => ['required', Rule::in(['Red', 'Blue', 'Green', 'Yellow', 'Custom'])],
            'custom_color' => 'nullable|required_if:ear_tag_color,Custom|string',
            'animal_age' => 'required|integer|min:0',
            'age_unit' => ['required', Rule::in(['Months', 'Years'])],
            'sex_of_animal' => ['required', Rule::in(['Male', 'Female'])],
            'ear_condition' => ['required', Rule::in(['Normal', 'Injured', 'Infected', 'Other'])],
            'ear_condition_notes' => 'nullable|required_if:ear_condition,Other|string',
            'health_condition' => ['required', Rule::in(['Healthy', 'Sick', 'Injured'])],
            'health_condition_details' => 'nullable|string',
            'veterinarian_id' => 'required|exists:users,id',
            'location' => 'required|string',
            'purpose_of_tagging' => ['required', Rule::in(['Identification', 'Tracking', 'Breeding', 'Other'])],
            'purpose_notes' => 'nullable|required_if:purpose_of_tagging,Other|string',
            'additional_notes' => 'nullable|string',
            'follow_up_required' => 'required|boolean',
            'follow_up_action' => 'nullable|required_if:follow_up_required,true|string',
            'follow_up_date' => 'nullable|required_if:follow_up_required,true|date|after:date_of_ear_tagging',
        ]);

        $animalEarTagging->update($validated);

        return redirect()->route('animal-ear-taggings.show', $animalEarTagging)
            ->with('success', 'Animal ear tagging record updated successfully');
    }

    public function destroy(AnimalEarTagging $animalEarTagging)
    {
        $animalEarTagging->delete();

        return redirect()->route('animal-ear-taggings.index')
            ->with('success', 'Animal ear tagging record deleted successfully');
    }
}

