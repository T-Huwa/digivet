<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Area;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', function () {
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
})->middleware(['auth', 'verified'])->name('users');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{id}/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/areas', [AreaController::class, 'index'])->name('areas');

Route::get('/areas/add', function () {
    return Inertia::render('Admin/AddArea');
})->middleware(['auth', 'verified'])->name('areas.add');

Route::post('/areas', [AreaController::class, 'store']);

require __DIR__.'/auth.php';
