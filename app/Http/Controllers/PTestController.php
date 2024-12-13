<?php

namespace App\Http\Controllers;

use App\Models\PTest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PTestController extends Controller
{
    public function index()
    {
        $pTests = PTest::all();
        return Inertia::render('PTests/Index', ['pTests' => $pTests]);
    }

    public function create()
    {
        return Inertia::render('PTests/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'animal_id' => 'required|string',
            'date_of_diagnosis' => 'required|date',
            'weight' => 'nullable|numeric',
            'body_condition_score' => 'nullable|integer|between:1,5',
            'pregnancy_status' => 'required|in:Pregnant,Not Pregnant,Unknown',
            'gestation_stage' => 'required|in:1st Trimester,2nd Trimester,3rd Trimester,Not Applicable',
            'palpation_results' => 'nullable|boolean',
            'palpation_notes' => 'nullable|string',
            'temperature' => 'nullable|numeric',
            'heart_rate' => 'nullable|integer',
            'respiratory_rate' => 'nullable|integer',
            'feed_intake' => 'nullable|in:Normal,Reduced,Increased',
            'rumen_fill' => 'nullable|in:Full,Moderate,Empty',
            'skin_coat_condition' => 'nullable|in:Healthy,Dull,Presence of Parasites',
            'mobility_status' => 'nullable|boolean',
            'mobility_notes' => 'nullable|string',
            'reproductive_health_history' => 'nullable|string',
            'vaccination_status' => 'nullable|boolean',
            'vaccination_notes' => 'nullable|string',
            'behavior_observations' => 'nullable|string',
            'blood_test_results' => 'nullable|in:Normal,Abnormal',
            'blood_test_notes' => 'nullable|string',
            'additional_notes' => 'nullable|string',
            'diagnosed_by' => 'required|string',
        ]);

        PTest::create($validated);

        return redirect()->route('ptests.index')->with('message', 'Pregnancy test created successfully');
    }

}