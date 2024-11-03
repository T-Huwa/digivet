<?php

use App\Http\Controllers\AiAPIController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CaseStudyController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipController;
use App\Models\Tip;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [AnalyticsController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', [RegisteredUserController::class, 'index'])->middleware(['auth', 'admin'])->name('users');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/avatar/', [ProfileController::class, 'updateAvatar'])->name('profile.update.avatar');
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
    Route::post('update-date', [AppointmentController::class, 'updateDate'])->name('appointments.update.date');
    Route::post('complete', [AppointmentController::class, 'completeAppointment'])->name('appointments.complete');
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

Route::middleware('auth')->prefix('caseStudies')->group(function () {
    Route::get('/create', [CaseStudyController::class, 'create'])->name('caseStudies.create');
    Route::post('/create', [CaseStudyController::class, 'store'])->name('caseStudies.store');
    Route::get('/', [CaseStudyController::class, 'index'])->name('caseStudies');
    Route::get('/{id}', [CaseStudyController::class, 'show'])->name('caseStudies.show');
});

Route::middleware('auth')->prefix('analytics')->group(function (){
    Route::get('/getAll', [AnalyticsController::class, 'index'])->name('analytics.getAll');
});

Route::middleware('auth')->prefix('chatroom')->group(function (){
    Route::get('/', [MessageController::class, 'index'])->name('chatroom');
    Route::get('/broadcast', [MessageController::class, 'createBroadcast'])->name('chatroom.broadcast');
    Route::post('/sendMessage', [MessageController::class, 'store'])->name('chatroom.send.message');
    Route::post('/broadcast/sendMessage', [MessageController::class, 'sendBroadcast'])->name('chatroom.send.broadcast');
    Route::get('/{id}', [MessageController::class, 'show'])->name('chatroom.get.chat.messages');
});

Route::prefix('tips')->group(function (){
    Route::get('/get-all', [TipController::class, 'index'])->name('tips.getAll');
    Route::get('/', [TipController::class, 'tipsPage'])->name('tips');
    Route::middleware('admin')->post('/', [TipController::class, 'store'])->name('tips.new');
    Route::get('/ai/getOne', [AiAPIController::class, 'getTip'])->name('tips.ai.getOne');
    Route::get('/ai/gemini/getOne', [AiAPIController::class, 'queryGemini'])->name('tips.gemini.ai.getOne');
});

require __DIR__.'/auth.php';
