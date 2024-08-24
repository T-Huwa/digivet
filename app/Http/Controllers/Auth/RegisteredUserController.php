<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    /**
     * Display The User List
     */
    public function index(){
        return Inertia::render('Users', [
            'users' => User::with(['area' => function ($query) {
                            Area::with(['district' => function ($query) {
                                    $query->select('id', 'district_name');
                                }]);
                        }])
                        ->get(['id', 'name', 'email', 'area_id', 'role'])
                        ->map(function($user) {
                            return [
                                'id' => $user->id,
                                'name' => $user->name,
                                'email' => $user->email,
                                'role' => $user->role,
                                'verified' => $user->email_verified_at,
                                'area_name' => $user->area->name ?? null,
                                'district_name' => $user->area->district->district_name ?? null,
                            ];
                        })
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
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'string',
            'district_id' => 'integer',
            'area_id' => 'integer',
            'phone' => 'string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'district_id' => $request->district_id,
            'area_id' => $request->area_id,
            'phone' => $request->phone,
        ]);

        event(new Registered($user));
        
        return Inertia::render('Auth/Register', [
            'areas' => Area::all(),
            'success' => true,
            'message' => 'User added successfully!',
            'user' => $user
        ]);
    }
}
