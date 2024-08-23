<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\NotificationsController;
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

Route::middleware('auth', 'admin')->prefix('areas')->group(function(){
    Route::get('/', [AreaController::class, 'index'])->name('areas');
    Route::get('add', function () {
        return Inertia::render('Admin/AddArea');
    })->middleware(['auth'])->name('areas.add');

    Route::post('/add', [AreaController::class, 'store'])->name('areas.add');
    Route::delete('{id}/delete', [AreaController::class, 'destroy']);
});

Route::middleware('auth')->prefix('appointments')->group(function () {
    Route::post('book', [AppointmentController::class, 'store'])->name('appointments.create');
    Route::get('book', [AppointmentController::class, 'create'])->name('appointments.create');
    Route::post('update-status', [AppointmentController::class, 'updateStatus'])->name('appointments.update.status');
    Route::get('/', [AppointmentController::class, 'index'])->name('appointments.get');
});

Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationsController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/read', [NotificationsController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::post('/notifications/read-all', [NotificationsController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    Route::post('/notifications/delete', [NotificationsController::class, 'destroy'])->name('notifications.destroy');
});

Route::middleware('auth')->prefix('inventory')->group(function () {
    Route::get('/', [InventoryController::class, 'index'])->name('inventory');
    Route::post('createRecord', [InventoryController::class, 'store'])->name('inventory.create.record');
    Route::patch('updateRecord', [InventoryController::class, 'update'])->name('inventory.update.record');
});

require __DIR__.'/auth.php';
