<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display The User List
     */
    public function index()
    {
        return Inertia::render('Users', [
            'users' => User::with(['area.district' => function ($query) {
                $query->select('id', 'district_name');
            }])
            ->get(['id', 'name', 'email', 'area_id', 'role'])
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'verified' => $user->email_verified_at,
                    'area_name' => $user->area->name ?? null,
                    'district_name' => $user->area->district->district_name ?? null,
                ];
            }),
        ]);
    }

    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/Register', ['areas' => Area::all()]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'string|nullable',
            'district_id' => 'integer|nullable',
            'area_id' => 'integer|nullable',
            'phone' => 'string|nullable',
        ]);

        // Check if there is already an Extension Worker assigned to the area
        $areaEoExists = User::where('area_id', $request->area_id)
            ->where('role', 'Extension Worker')
            ->exists();

        // Prepare the message based on the existence of an EO
        $message = "User Added Successfully";
        $userArea = $request->area_id;

        if ($request->role === 'Extension Worker' && $areaEoExists) {
            $message = "User was registered, but failed to add to area because there is already an EO assigned to that area";
            $userArea = null; // Don't assign the area if an EO already exists
        }

        $randomNumber = rand(1, 24);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'district_id' => $request->district_id,
            'area_id' => $userArea,
            'phone' => $request->phone,
            'profile_photo_url' => url('/assets/images/avatars/avatar_' . $randomNumber . '.jpg'),
        ]);

        event(new Registered($user));

        return Inertia::render('Auth/Register', [
            'areas' => Area::all(),
            'success' => true,
            'eoExists' => $areaEoExists,
            'message' => $message,
            'user' => $user,
        ]);
    }
}
