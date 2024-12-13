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
    public function index()
    {
        $dippings = AnimalDipping::with('extensionOfficer')
            ->latest()
            ->paginate(10);

        return Inertia::render('AnimalDipping/Index', [
            'dippings' => $dippings
        ]);
    }

    public function create()
    {
        $extensionOfficers = User::where('role', 'extension_officer')->get();
        
        return Inertia::render('AnimalDipping/Create', [
            'extensionOfficers' => $extensionOfficers,
            'pestOptions' => ['Ticks', 'Mites', 'Fleas', 'Lice'],
            'chemicalOptions' => ['Acaricide', 'Insecticide', 'Triatix', 'Cooperzone 30', 'Dieldrin']
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_treatment' => 'required|date',
            'treatment_type' => ['required', Rule::in(['Dipping', 'Spraying'])],
            'targeted_pests' => 'required|array',
            'chemical_product' => 'required|string',
            'chemical_concentration' => 'nullable|numeric|between:0,100',
            'solution_volume' => 'required|numeric|min:0',
            'animals_treated_count' => 'required|integer|min:1',
            'pre_treatment_health' => ['required', Rule::in(['Healthy', 'Sick', 'Injured'])],
            'skin_conditions' => 'nullable|array',
            'post_treatment_observations' => 'nullable|string',
            'environmental_conditions' => ['required', Rule::in(['Sunny', 'Rainy', 'Overcast', 'Windy'])],
            'follow_up_date' => 'required|date|after:date_of_treatment',
            'extension_officer_id' => 'required|exists:users,id',
            'additional_notes' => 'nullable|string'
        ]);

        $dipping = AnimalDipping::create($validated);
        $appointment = Appointment::find($request->appointment_id);
        $appointment->status = "Completed";
        $appointment->save();

        return redirect()->back()
            ->with('success', 'Treatment record created successfully');
    }

    public function show(AnimalDipping $animalDipping)
    {
        return Inertia::render('AnimalDipping/Show', [
            'dipping' => $animalDipping->load('extensionOfficer')
        ]);
    }

    public function edit(AnimalDipping $animalDipping)
    {
        $extensionOfficers = User::where('role', 'extension_officer')->get();

        return Inertia::render('AnimalDipping/Edit', [
            'dipping' => $animalDipping,
            'extensionOfficers' => $extensionOfficers,
            'pestOptions' => ['Ticks', 'Mites', 'Fleas', 'Lice'],
            'chemicalOptions' => ['Acaricide', 'Insecticide', 'Triatix', 'Cooperzone 30', 'Dieldrin']
        ]);
    }

    public function update(Request $request, AnimalDipping $animalDipping)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'date_of_treatment' => 'required|date',
            'treatment_type' => ['required', Rule::in(['Dipping', 'Spraying'])],
            'targeted_pests' => 'required|array',
            'chemical_product' => 'required|string',
            'chemical_concentration' => 'nullable|numeric|between:0,100',
            'solution_volume' => 'required|numeric|min:0',
            'animals_treated_count' => 'required|integer|min:1',
            'pre_treatment_health' => ['required', Rule::in(['Healthy', 'Sick', 'Injured'])],
            'skin_conditions' => 'nullable|array',
            'post_treatment_observations' => 'nullable|string',
            'environmental_conditions' => ['required', Rule::in(['Sunny', 'Rainy', 'Overcast', 'Windy'])],
            'follow_up_date' => 'required|date|after:date_of_treatment',
            'extension_officer_id' => 'required|exists:users,id',
            'additional_notes' => 'nullable|string'
        ]);

        $animalDipping->update($validated);

        return redirect()->route('animal-dippings.show', $animalDipping)
            ->with('success', 'Treatment record updated successfully');
    }

    public function destroy(AnimalDipping $animalDipping)
    {
        $animalDipping->delete();

        return redirect()->route('animal-dippings.index')
            ->with('success', 'Treatment record deleted successfully');
    }
}