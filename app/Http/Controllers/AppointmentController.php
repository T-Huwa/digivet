<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Notifications\AppointmentNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $selctedCheck = $request->selectedAppointmentId;
        $selectedAppointment = null;

        if ($selctedCheck) {
            $selectedAppointment = Appointment::find($selctedCheck);
        }

        if ($user->role === 'Farmer') {
            // Farmers can only see their own appointments
            $appointments = Appointment::where('farmer_id', $user->id)->with('extensionWorker')->get(['id', 'appointment_date', 'description', 'extension_worker_id', 'status', 'feedback' ])
                ->map(function($appointment) {
                    return [
                        'id' => $appointment->id,
                        'appointment_date' => $appointment->appointment_date,
                        'description' => $appointment->description,
                        'status' => $appointment->status,
                        'feedback' => $appointment->feedback,
                        'extension_worker' => $appointment->extensionWorker->name ?? null,
                    ];
                });

                $selectedAppointment = null;
                // Set selectedAppointment from the retrieved appointments
            if ($request->selectedAppointmentId) {
                $selectedAppointment = $appointments->firstWhere('id', $request->selectedAppointmentId);
            }
            return Inertia::render('Farmer/Appointments', ['appointments' => $appointments ,'selectedAppointment'=>$selectedAppointment]);
        } elseif ($user->role === 'Extension Worker') {
            
            $appointments = Appointment::where('extension_worker_id', $user->id)->with('farmer')->get(['id', 'appointment_date', 'description', 'farmer_id', 'status', 'feedback' ])
                ->map(function($appointment) {
                    return [
                        'id' => $appointment->id,
                        'appointment_date' => $appointment->appointment_date,
                        'description' => $appointment->description,
                        'status' => $appointment->status,
                        'feedback' => $appointment->feedback,
                        'farmer' => $appointment->farmer->name ?? null,
                    ];
                });
                $selectedAppointment = null;
                // Set selectedAppointment from the retrieved appointments
            if ($request->selectedAppointmentId) {
                $selectedAppointment = $appointments->firstWhere('id', $request->selectedAppointmentId);
            }
            return Inertia::render('EO/Appointments', ['appointments' => $appointments, 'selectedAppointment'=>$selectedAppointment]);
        } elseif ($user->role === 'Admin') {

            // Admins can see all appointments
            $appointments = Appointment::all();
            return Inertia::render('Admin/Appointments', ['appointments' => $appointments, 'selectedAppointment'=>$selectedAppointment]);
        }

        abort(404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Farmer/CreateAppointment');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $farmerArea = $user->area_id;

        if (!$farmerArea) {
            return response()->json(['error' => 'Farmer is not assigned to an area.'], 400);
        }

        // Find the Extension worker for this area
        $extensionWorker = User::where('role', 'Extension Worker')
            ->where('area_id', $farmerArea)
            ->first();

        if (!$extensionWorker) {
            return Inertia::render('Farmer/Appointments',['error' => 'No Extension worker found for this area.'], 404);
        }

        $appointment = Appointment::create([
            'farmer_id' => $user->id,
            'extension_worker_id' => $extensionWorker->id,
            'area_id' => $farmerArea,
            'appointment_date' => $request->appointment_date,
            'animal_type' => $request->animal_type,
            'description' => $request->description,
            'status' => 'Requested',
        ]);

        // notification to EO
        $extensionWorker->notify(new AppointmentNotification($appointment, 'Requested'));

        return Inertia::render('Farmer/Appointments', ['appointments'=>Appointment::all(), 'success'=>'Appointment requested']);
    }


    /**
     * Display the specified resource.
     */
    public function show(appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(appointment $appointment)
    {
        //
    }

    public function updateStatus(Request $request)
    {
        // Validate the request to ensure 'id' and 'status' are present
        $request->validate([
            'id' => 'required|integer|exists:appointments,id',
            'status' => 'required|string',
        ]);

        // Find the appointment by ID from the request
        $appointment = Appointment::findOrFail($request->id);

        // Update the status from the request
        $appointment->status = $request->status;
        $appointment->save();

        $farmer = User::find($appointment->farmer_id);

        // Notify about the date change
        $farmer->notify(new AppointmentNotification($appointment), $request->status);

        // Return the updated appointment as JSON
        return response()->json($appointment);
    }


    public function updateDate(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:appointments,id',
            'date' => 'required',
        ]);

        // Find the appointment by ID from the request
        $appointment = Appointment::findOrFail($request->id);

        // Update the appointment date
        $appointment->status = "Pending";
        $appointment->appointment_date = $request->date;
        $appointment->save();

        // Find the Extension Worker
        $extensionWorker = User::find($appointment->extension_worker_id);
        $farmer = User::find($appointment->farmer_id);

        // Notify about the date change
        $extensionWorker->notify(new AppointmentNotification($appointment, 'date_changed'));
        $farmer->notify(new AppointmentNotification($appointment, 'date_changed'));

        return response()->json(['success' => 'Appointment date updated successfully.']);
    }

    public function completeAppointment(Request $request)
    {
        // Validate the request to ensure 'id' and 'status' are present
        $request->validate([
            'id' => 'required|integer|exists:appointments,id',
            'feedback' => 'required|string',
        ]);

        // Find the appointment by ID from the request
        $appointment = Appointment::findOrFail($request->id);

        // Update the status from the request
        $appointment->status = 'Completed';
        $appointment->feedback = $request->feedback;
        $appointment->save();

        $farmer = User::find($appointment->farmer_id);

        // Notify about the date change
        $farmer->notify(new AppointmentNotification($appointment), $request->status);

        return response()->json($appointment);
    }
}
