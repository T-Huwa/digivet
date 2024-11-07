<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Area;
use App\Models\CaseStudy;
use App\Models\District;
use App\Models\Inventory;
use App\Notifications\AppointmentNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(Request $request) {
        $user = Auth::user();

         $inventoryRecords = Inventory::where('user_id', $user->id)->get();

        if ($user->role === 'Farmer') {
            $animalRegistrationRates = Inventory::where('user_id', $user->id)
                ->selectRaw('animal_type, COUNT(*) as count')
                ->groupBy('animal_type')
                ->get();
        } elseif ($user->role === 'Extension Worker') {
            $animalRegistrationRates = Inventory::whereHas('user', function ($query) use ($user) {
                    $query->where('area_id', $user->area_id);
                })
                ->selectRaw('animal_type, COUNT(*) as count')
                ->groupBy('animal_type')
                ->get();
        } else {
            $animalRegistrationRates = Inventory::selectRaw('animal_type, COUNT(*) as count')
                ->groupBy('animal_type')
                ->get();
        }

        $appointments = Appointment::where(function ($query) use ($user) {
                $query->where('farmer_id', $user->id)
                    ->orWhere('extension_worker_id', $user->id);
            })
            ->count();

        $caseStudies = CaseStudy::where('extension_worker_id', $user->id)
            ->count();

        $district_id = $user->district_id;
        $district = District::findOrFail($district_id)->district_name;

        return Inertia::render('Dashboard', [
            'inventoryRecords' => $inventoryRecords,
            'animalRegistrationRates' => $animalRegistrationRates,
            'appointments' => $appointments,
            'caseStudies' => $caseStudies,
            'district' => $district,
        ]);
    }
}
