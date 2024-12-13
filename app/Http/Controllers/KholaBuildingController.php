<?php

namespace App\Http\Controllers;

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

        $kholaBuilding = KholaBuilding::create($validated);

        return redirect()->route('khola-buildings.show', $kholaBuilding)
            ->with('success', 'Khola building record created successfully');
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

