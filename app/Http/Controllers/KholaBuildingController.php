<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\KholaBuilding;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KholaBuildingController extends Controller
{
public function store(Request $request)
{
    $kholaBuilding = KholaBuilding::create($request->all());

    $appointment = Appointment::find($request->appointment_id);
    if ($appointment) {
        $appointment->status = "Completed";
        $appointment->save();
    }

    return redirect()->route('appointments.get')->with('message', 'Animal treatment record created successfully.');
}

}

