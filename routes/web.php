<?php

use App\Http\Controllers\AiAPIController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AnimalCastrationController;
use App\Http\Controllers\AnimalDippingController;
use App\Http\Controllers\AnimalTeethClippingController;
use App\Http\Controllers\AnimalTreatmentController;
use App\Http\Controllers\AnimalVaccinationController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CaseStudyController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\KholaBuildingController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PTestController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SmsTwilioController;
use App\Http\Controllers\TipController;
use App\Models\AnimalCastration;
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

Route::post('/mail/signup', [MailController::class, 'notifyAdmin'])->name('mail.notifyAdmin');

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
    Route::get('/printReport', [ReportsController::class, 'printReport'])->name('report.print');
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

Route::get('/reports', [ReportsController::class, 'index'])->name('reports');

Route::get('sms/send', [SmsTwilioController::class, 'sendSms']);

Route::middleware('auth')->group(function () {
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
});

Route::middleware('auth')->group(function () {
    Route::post('/ptests', [PTestController::class, 'store'])->name('ptests.store');

    Route::post('/khola', [KholaBuildingController::class, 'store'])->name('khola.store');
});

Route::post('/animal-dippings', [AnimalDippingController::class, 'store']);
Route::post('/animal-treatments', [AnimalTreatmentController::class, 'store'])->name('animal-treatments.store');
Route::post('/animal-teeth-clipping', [AnimalTeethClippingController::class, 'store'])->name('animal-teeth-clippings.store');

Route::post('/animal-castrations', [AnimalCastrationController::class, 'store'])->name('animal-castrations.store');

Route::post('/animal-vaccinations', [AnimalVaccinationController::class, 'store'])->name('animal-vaccinations.store');

Route::post('/animal-tagging', [AnimalVaccinationController::class, 'store'])->name('animal-ear-taggings.store');

require __DIR__.'/auth.php';
