<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Area;
use App\Models\CaseStudy;
use App\Models\Inventory;
use App\Notifications\AppointmentNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(Request $request){
        $user = Auth::user();
        $area = Area::find($user->area_id);

        $inventoryRecords = Inventory::where('user_id', $user->id)->get();
        $appointments = Appointment::where('farmer_id', $user->id)->orWhere('extension_worker_id', $user->id)->count();
        $caseStudies = CaseStudy::where('extension_worker_id', $user->id)->count();
        
        return Inertia::render('Dashboard', [
            'inventoryRecords' => $inventoryRecords,
            'appointments' => $appointments,
            'caseStudies' => $caseStudies,
        ]);
    }
}
