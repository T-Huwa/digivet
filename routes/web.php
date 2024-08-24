<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CaseStudyController;
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
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', [RegisteredUserController::class, 'index'])->middleware(['auth', 'admin'])->name('users');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{id}/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth', 'admin')->prefix('areas')->group(function(){
    Route::get('/', [AreaController::class, 'index'])->name('areas');
    Route::post('/add', [AreaController::class, 'store'])->name('areas.add');
    Route::delete('{id}/delete', [AreaController::class, 'destroy']);
});

Route::middleware('auth')->prefix('appointments')->group(function () {
    Route::post('book', [AppointmentController::class, 'store'])->name('appointments.create');
    Route::get('book', [AppointmentController::class, 'create'])->name('appointments.create');
    Route::post('update-status', [AppointmentController::class, 'updateStatus'])->name('appointments.update.status');
    Route::get('/', [AppointmentController::class, 'index'])->name('appointments.get');
});

Route::middleware('auth')->prefix('notifications')->group(function () {
    Route::get('/', [NotificationsController::class, 'index'])->name('notifications.index');
    Route::post('read', [NotificationsController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::post('read-all', [NotificationsController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    Route::post('delete', [NotificationsController::class, 'destroy'])->name('notifications.destroy');
});

Route::middleware('auth')->prefix('inventory')->group(function () {
    Route::get('/', [InventoryController::class, 'index'])->name('inventory');
    Route::get('/{id}', [InventoryController::class, 'show'])->name('inventory.show');
    Route::post('createRecord', [InventoryController::class, 'store'])->name('inventory.create.record');
    Route::patch('updateRecord', [InventoryController::class, 'update'])->name('inventory.update.record');
});

Route::get('areas/myArea', [AreaController::class, 'show'])->middleware('auth')->name('areas.view');

Route::get('/caseStudies', [CaseStudyController::class, 'index'])->name('caseStudies');

Route::middleware('auth')->prefix('caseStudies')->group(function () {
    Route::get('/', [CaseStudyController::class, 'create'])->name('caseStudies');
});


require __DIR__.'/auth.php';
