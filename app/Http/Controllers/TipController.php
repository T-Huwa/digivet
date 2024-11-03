<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['tips'=>Tip::all()]);
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
        Tip::create([
            'content' => $request->content,
        ]);

        return Inertia::render('Admin/Tips', [
            'tips'=>Tip::all(),
            'message' => "Tip created successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tip $tip)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tip $tip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tip $tip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tip $tip)
    {
        //
    }

    public function tipsPage()
    {
        return Inertia::render('Admin/Tips', ['tips'=>Tip::all()]);
    }

    public function intelligentTip(Request $request)
    {
        $tips = Tip::all();
        $temp = $request->temp;
        $season = $request->season;

        return;
    }
}
