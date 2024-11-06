<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\District;
use App\Models\Inventory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $user = User::findOrFail($userId);
        $userRole = $user->role;
        $areaId = $user->area_id;

        switch ($userRole) {
            case 'Admin':
                $report = $this->getOverallStats();
                return Inertia::render('Admin/Reports', ['report' => $report]);

            case 'Extension Worker':
                $officerInfo = [
                    'name' => $user->name,
                    'area' => $user->area->name ?? 'Unknown', 
                    'district' => $user->area->district->district_name ?? 'Unknown',
                    'registrationDate' => $user->created_at->format('Y-m-d'),
                    'totalFarmers' => $user->area->farmers()->count() ?? 0,
                    'totalAnimals' => $user->area->farmers()->withSum('inventory', 'animal_count')->get()->sum('inventory_sum_animal_count') ?? 0,
                ];

                $farmerSummary = User::where('role', 'Farmer')
                    ->with('animals')
                    ->get()
                    ->flatMap(function ($user) {
                        return $user->animals->map(function ($animal) use ($user) {
                            return [
                                'animal_type' => $animal->animal_type,
                                'farmer_id' => $user->id,
                            ];
                        });
                    })
                    ->groupBy('animal_type')
                    ->map(function ($animalGroup, $animalType) {
                        return [
                            'animalType' => ucfirst($animalType),
                            'farmerCount' => $animalGroup->pluck('farmer_id')->unique()->count(),
                        ];
                    })
                    ->values();

                $recentAppointments = $user->appointments()
                    ->where('appointment_date', '<=', now())
                    ->orWhere('status', 'Completed')
                    ->orderBy('appointment_date', 'desc')
                    ->take(3)
                    ->get()
                    ->map(function ($appointment) {
                        return [
                            'date' => $appointment->appointment_date,
                            'farmer' => $appointment->farmer->name ?? 'N/A',
                            'animalType' => $appointment->animal_type,
                            'issue' => $appointment->description,
                            'status' => ucfirst($appointment->status),
                        ];
                    })
                    ->toArray();

                $upcomingAppointments = $user->appointments()
                    ->where('appointment_date', '>=', now())
                    ->orderBy('appointment_date')
                    ->take(2)
                    ->get()
                    ->map(function ($appointment) {
                        return [
                            'date' => $appointment->appointment_date,
                            'farmer' => $appointment->farmer->name ?? 'N/A',
                            'purpose' => $appointment->description,
                        ];
                    })
                    ->toArray();              
                
                    // Animal Distribution

                $animalDistribution = $this->getAnimalDetails();
                
                $animalDistribution = Inventory::whereHas('user', function ($query) use ($areaId) {
                        $query->where('area_id', $areaId)
                            ->where('role', 'Farmer'); // Ensure we're only counting farmers
                    })
                    ->select(
                        'animal_type as name',
                        DB::raw('SUM(IFNULL(animal_count, 0)) + SUM(CASE WHEN animal_count IS NULL THEN 1 ELSE 0 END) as animal_count')
                    )
                    ->groupBy('animal_type')
                    ->get()
                    ->map(function ($animal) {
                        return [
                            'name' => ucfirst($animal->name),
                            'value' => $animal->animal_count,
                        ];
                    })
                    ->toArray();

                $reportData = [
                    'officerInfo' => $officerInfo,
                    'farmerSummary' => $farmerSummary,
                    'recentAppointments' => $recentAppointments,
                    'upcomingAppointments' => $upcomingAppointments,
                    'animalDistribution' => $animalDistribution,
                ];

                $jsonReportData = json_encode($reportData);

                $aiReport = $this->generateReport($jsonReportData)['candidates'][0]['content']['parts'][0]['text'];

                $reportData = [
                    'officerInfo' => $officerInfo,
                    'farmerSummary' => $farmerSummary,
                    'recentAppointments' => $recentAppointments,
                    'upcomingAppointments' => $upcomingAppointments,
                    'animalDistribution' => $animalDistribution,
                    'aiReport' => $aiReport,
                ];
                return Inertia::render('EO/EOReports', ['reportsData' => $reportData]);

            case 'Farmer':
                $farmerInfo = [
                    'name' => $user->name,
                    'area' => $user->area->name ?? 'Unknown', 
                    'district' => $user->area->district->district_name ?? 'Unknown',
                    'registrationDate' => $user->created_at->format('Y-m-d'),
                ];

                $animalSummary = Inventory::where('user_id', $user->id)
                    ->select(
                        'animal_type',
                        DB::raw('SUM(IFNULL(animal_count, 0)) + SUM(CASE WHEN animal_count IS NULL THEN 1 ELSE 0 END) as animal_count')
                    )
                    ->groupBy('animal_type')
                    ->get()
                    ->toArray();

                $recentAppointments = $user->farmerAppointments()
                    ->where('appointment_date', '<=', now())
                    ->orWhere('status', 'Completed')
                    ->orderBy('appointment_date', 'desc')
                    ->take(3)
                    ->get(['appointment_date', 'description as issue', 'feedback as notes'])
                    ->toArray();

                $upcomingAppointments = $user->farmerAppointments()
                    ->where('appointment_date', '>=', now())
                    ->orderBy('appointment_date')
                    ->take(2)
                    ->get(['appointment_date', 'description as purpose'])
                    ->toArray();


                return Inertia::render('Farmer/FarmerReports', [
                    'farmerInfo' => $farmerInfo,
                    'animalSummary' => $animalSummary,
                    'recentHealthRecords' => $recentAppointments,
                    'upcomingAppointments' => $upcomingAppointments,
                ]);

            default:
                abort(403);
        }
    }

    public function printReport(Request $request){
        $data = $request->data;
        return Inertia::render('PrintComponent', ['data' => $data]);
    }


    // Private functions
    
    private function getOverallStats()
    {        
        $animalData = $this->getAnimalDetails();
        $animalDistribution = $animalData['animalDistribution'];
        $totalAnimals = $animalData['totalAnimalCount'];

        $totalFarmers = User::where('role', 'Farmer')->count();
        $totalAreas = Area::count();
        $totalDistricts = District::count();

        $overallStats = [
            'totalFarmers' => $totalFarmers,
            'totalAnimals' => $totalAnimals,
            'totalAreas' => $totalAreas,
            'totalDistricts' => $totalDistricts,
        ];

        $farmerDistribution = Area::withCount(['farmers' => function ($query) {
            $query->where('role', 'Farmer');
        }])->get()->map(function ($area) {
            return [
                'name' => $area->name,
                'farmers' => $area->farmers_count,
            ];
        });

        $extensionOfficerCoverage = Area::withCount([
                'farmers as farmers_count' => function ($query) {
                    $query->where('role', 'Farmer');
                }
            ])
            ->with('extensionOfficer')
            ->get()                     
            ->map(function ($area) {
                $areaOfficer = User::where('role', 'Extension Worker')
                                    ->where('area_id', $area->id)
                                    ->first();
                return [
                    'name' => $area->name,
                    'farmers' => $area->farmers_count,
                    'officerName' => optional($areaOfficer)->name,
                ];
            });

        $reportData = [
            'overallStats' => $overallStats,
            'farmerDistribution' => $farmerDistribution,
            'animalDistribution' => $animalDistribution,
            'extensionOfficerCoverage' => $extensionOfficerCoverage,
        ];

        $jsonReportData = json_encode($reportData);

        $aiReport = $this->generateReport($jsonReportData)['candidates'][0]['content']['parts'][0]['text'];

        return (object) [
            'overallStats' => $overallStats,
            'farmerDistribution' => $farmerDistribution,
            'animalDistribution' => $animalDistribution,
            'extensionOfficerCoverage' => $extensionOfficerCoverage,
            'aiReport' => $aiReport,
        ];
        // ['candidates'][0]['content']['parts'][0]['text']
    }

    private function getAnimalDetails(){
        $user = $user ?? Auth::user();

        $isAdmin = $user->role === 'Admin';

        $farmersQuery = User::query();

        if (!$isAdmin) {
            $farmersQuery->where('area_id', $user->area->id ?? null)
                ->where('role', 'Farmer');
        } else {
            $farmersQuery->where('role', 'Farmer');
        }

        $farmers = $farmersQuery->get();
        $animalDistribution = [];
        $totalAnimalCount = 0;

        foreach ($farmers as $farmer) {
            $animalSummary = Inventory::where('user_id', $farmer->id)
                ->select(
                    'animal_type',
                    DB::raw('SUM(IFNULL(animal_count, 0)) + SUM(CASE WHEN animal_count IS NULL THEN 1 ELSE 0 END) as animal_count')
                )
                ->groupBy('animal_type')
                ->get();

            foreach ($animalSummary as $animal) {
                $animalType = ucfirst($animal->animal_type);
                $animalCount = $animal->animal_count;

                if (isset($animalDistribution[$animalType])) {
                    $animalDistribution[$animalType] += $animalCount;
                } else {
                    $animalDistribution[$animalType] = $animalCount;
                }

                $totalAnimalCount += $animalCount;
            }
        }

        $animalDistribution = array_map(function ($type, $count) {
            return [
                'name' => $type,
                'value' => $count,
            ];
        }, array_keys($animalDistribution), $animalDistribution);

        if ($isAdmin) {
            return [
                'animalDistribution' => $animalDistribution,
                'totalAnimalCount' => $totalAnimalCount,
            ];
        }

        return $animalDistribution;
    }


    private function generateReport($reportData) 
    {
        $apiKey = config('services.gemini.secret');

        $payload = [
            "contents" => [
                [
                    "role" => "user",
                    "parts" => [
                        [
                            "text" => json_encode($reportData, JSON_PRETTY_PRINT)
                        ]
                    ]
                ]
            ],
            "systemInstruction" => [
                "role" => "user",
                "parts" => [
                    [
                        "text" => "Respond with html styled with tailwind css. don't put the response in tripple backticks and no charts. Don't include the extensive details. Create a report with insights based on the provided information, showing key metrics and insights, as well as recommendations. Don't include the recent and upcoming appointments in the report. just use it to have deeper insights intot the data."
                    ]
                ]
            ],
            "generationConfig" => [
                "temperature" => 0.3,
                "topK" => 40,
                "topP" => 0.95,
                "maxOutputTokens" => 8192,
                "responseMimeType" => "text/plain"
            ]
        ];

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}", $payload);

            $json_response = $response->json();

            if ($response->successful()) {
                return $json_response;
            } else {
                return ['error' => 'Failed to generate report'];
            }
            
        } catch (\Throwable $th) {
            return ['message' => 'Failed to generate report', 'error' => $th];
        }
    }

}
