<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\KholaBuilding;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KholaBuildingController extends Controller
{
    public function index()
    {
        $kholaBuildings = KholaBuilding::with(['appointment', 'constructionOfficer'])->paginate(10);
        return Inertia::render('KholaBuilding/Index', ['kholaBuildings' => $kholaBuildings]);
    }

    public function create()
    {
        return Inertia::render('KholaBuilding/Create');
    }


public function store(Request $request)
{
    $validated = $request->validate([
        'appointment_id' => 'required|exists:appointments,id',
        'animal_id' => 'required|string',
        'construction_start_date' => 'required|date',
        'construction_officer_id' => 'required|exists:users,id',
        'khola_type' => ['required'],
        'material_used' => ['required'],
        'khola_size' => 'required|string',
        'number_of_compartments' => 'required|integer|min:1',
        'ventilation_type' => ['required'],
        'flooring_type' => ['required'],
        'roof_type' => ['required'],
        'drainage_system_installed' => 'required|boolean',
        'animal_health_safety_features' => 'required|boolean',
        'estimated_cost' => 'required|numeric|min:0',
        'construction_method' => ['required'],
        'completion_date' => 'nullable|date|after_or_equal:construction_start_date',
        'completion_status' => ['required'],
        'animal_accommodation_capacity' => 'required|integer|min:1',
        'post_construction_inspection' => ['required'],
        'follow_up_action_required' => 'required|boolean',
        'follow_up_action_details' => 'nullable|string',
        'additional_notes' => 'nullable|string',
    ]);

    $kholaBuilding = KholaBuilding::create([
        'appointment_id' => $validated['appointment_id'],
        'animal_id' => $validated['animal_id'],
        'construction_start_date' => $validated['construction_start_date'],
        'construction_officer_id' => $validated['construction_officer_id'],
        'khola_type' => $validated['khola_type'],
        'material_used' => $validated['material_used'],
        'other_material' => $validated['other_material'] ?? null,
        'khola_size' => $validated['khola_size'],
        'number_of_compartments' => $validated['number_of_compartments'],
        'ventilation_type' => $validated['ventilation_type'],
        'flooring_type' => $validated['flooring_type'],
        'other_flooring' => $validated['other_flooring'] ?? null,
        'roof_type' => $validated['roof_type'],
        'other_roof' => $validated['other_roof'] ?? null,
        'drainage_system_installed' => $validated['drainage_system_installed'],
        'animal_health_safety_features' => $validated['animal_health_safety_features'],
        'estimated_cost' => $validated['estimated_cost'],
        'construction_method' => $validated['construction_method'],
        'completion_date' => $validated['completion_date'] ?? null,
        'completion_status' => $validated['completion_status'],
        'animal_accommodation_capacity' => $validated['animal_accommodation_capacity'],
        'post_construction_inspection' => $validated['post_construction_inspection'],
        'follow_up_action_required' => $validated['follow_up_action_required'],
        'follow_up_action_details' => $validated['follow_up_action_details'] ?? null,
        'additional_notes' => $validated['additional_notes'] ?? null,
    ]);
        //$kholaBuilding = KholaBuilding::create($request->all());
        $appointment = Appointment::find($request->appointment_id);
        $appointment->status = "Completed";
        $appointment->save();

    return response()->json(['message' => 'KholaBuilding created successfully', 'data' => $kholaBuilding], 201);
}

    public function show(KholaBuilding $kholaBuilding)
    {
        $kholaBuilding->load(['appointment', 'constructionOfficer']);
        return Inertia::render('KholaBuilding/Show', ['kholaBuilding' => $kholaBuilding]);
    }

    public function edit(KholaBuilding $kholaBuilding)
    {
        return Inertia::render('KholaBuilding/Edit', ['kholaBuilding' => $kholaBuilding]);
    }

    public function update(Request $request, KholaBuilding $kholaBuilding)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'animal_id' => 'required|string',
            'construction_start_date' => 'required|date',
            'construction_officer_id' => 'required|exists:users,id',
            'khola_type' => ['required', Rule::in(['Traditional', 'Modern', 'Semi-modern'])],
            'material_used' => ['required', Rule::in(['Wood', 'Mud', 'Thatch', 'Cement', 'Steel', 'Others'])],
            'other_material' => 'nullable|required_if:material_used,Others|string',
            'khola_size' => 'required|string',
            'number_of_compartments' => 'required|integer|min:1',
            'ventilation_type' => ['required', Rule::in(['Natural', 'Artificial', 'Both'])],
            'flooring_type' => ['required', Rule::in(['Concrete', 'Soil', 'Wood', 'Other'])],
            'other_flooring' => 'nullable|required_if:flooring_type,Other|string',
            'roof_type' => ['required', Rule::in(['Thatch', 'Corrugated Metal', 'Tile', 'Others'])],
            'other_roof' => 'nullable|required_if:roof_type,Others|string',
            'drainage_system_installed' => 'required|boolean',
            'animal_health_safety_features' => 'required|boolean',
            'estimated_cost' => 'required|numeric|min:0',
            'construction_method' => ['required', Rule::in(['Manual', 'Mechanical'])],
            'completion_date' => 'nullable|date|after_or_equal:construction_start_date',
            'completion_status' => ['required', Rule::in(['Completed', 'In Progress', 'Pending'])],
            'animal_accommodation_capacity' => 'required|integer|min:1',
            'post_construction_inspection' => ['required', Rule::in(['Passed', 'Failed', 'Pending'])],
            'follow_up_action_required' => 'required|boolean',
            'follow_up_action_details' => 'nullable|required_if:follow_up_action_required,true|string',
            'additional_notes' => 'nullable|string',
        ]);

        $kholaBuilding->update($validated);

        return redirect()->route('khola-buildings.show', $kholaBuilding)
            ->with('success', 'Khola building record updated successfully');
    }

    public function destroy(KholaBuilding $kholaBuilding)
    {
        $kholaBuilding->delete();

        return redirect()->route('khola-buildings.index')
            ->with('success', 'Khola building record deleted successfully');
    }
}

