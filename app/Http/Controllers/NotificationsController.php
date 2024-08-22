<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class NotificationsController extends Controller
{
    // Display notifications for the authenticated user
    public function index()
    {
        $user = Auth::user();
        $notifications = $user->notifications;

        return response()->json(['notifications' => $notifications]);
    }

    // Mark a specific notification as read
    public function markAsRead(Request $request)
    {
        $notificationId = $request->input('id');
        $notification = $request->user()->notifications()->find($notificationId);

        if ($notification) {
            $notification->markAsRead();
        }

        return response()->json(['status' => 'success']);
    }

    // Mark all notifications as read
    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return response()->json(['status' => 'success']);
    }

    // Delete a specific notification
    public function destroy(Request $request)
    {
        $notificationId = $request->input('id');
        $notification = $request->user()->notifications()->find($notificationId);

        if ($notification) {
            $notification->delete();
        }

        return response()->json(['status' => 'success']);
    }
}
