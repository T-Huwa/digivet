<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $inventoryRecords = Inventory::where('user_id', $request->user()->id)->get();

        return Inertia::render('Farmer/Inventory', ['inventoryRecords' => $inventoryRecords]);
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

        $userID = $request->user()->id;

        Inventory::create([
            'user_id' => $userID, 
            'animal_type' => $request->animal_type,
            'animal_count' => $request->animal_count,
            'tag_number' => $request->tag_number,
        ]);

        $inventoryRecords = Inventory::where('user_id', $request->user()->id)->get();

        return Inertia::render('Farmer/Inventory', [
            'inventoryRecords' => $inventoryRecords, 
            'success' => "Record Addded successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $inventoryRecords = Inventory::where('user_id', $id)->get();
        
        return response()->json(['inventoryRecords' => $inventoryRecords]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $record = Inventory::findOrFail($request->id);

        $record->animal_count = $request->newCount;
        $record->save();

        $inventoryRecords = Inventory::where('user_id', $request->user()->id)->get();

        return Inertia::render('Farmer/Inventory', [
            'inventoryRecords' => $inventoryRecords, 
            'success' => "Record Updated successfully",
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        //
    }
}
