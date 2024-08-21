<?php

namespace App\Http\Controllers;

use App\Models\area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $areas = Area::with('district:id,district_name')->get();

        return Inertia::render('Admin/Areas', [
            'areas' => $areas->map(function ($area) {
                return [
                    'id' => $area->id,
                    'name' => $area->name,
                    'district_name' => $area->district->district_name,
                ];
            }),
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Handling post request
        $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:districts,id',
        ]);

        $area = Area::create([
            'name' => $request->name,
            'district_id' => $request->district_id,
        ]);

         return Inertia::render('AddArea', [
             'success' => true,
             'message' => 'Area added successfully!',
             'area' => $area
         ]);

        // return Response()->json([
        //     'success' => true,
        //     'message' => 'Area added successfully!',
        //     'area' => $area
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(area $area)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(area $area)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, area $area)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(area $area)
    {
        //
    }
}
