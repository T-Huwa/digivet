<?php

namespace App\Http\Controllers;

use App\Mail\UserSignUpRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function notifyAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:farmer,vet',
        ]);

        // Email the admin
        $adminEmail = config('mail.admin_email', 'sabrinaramzay@gmail.com');
        Mail::to($adminEmail)->send(new UserSignUpRequest(
            $validated['name'],
            $validated['email'],
            $validated['role']
        ));

        return response()->json(['message' => 'Your request has been submitted. An admin will review it shortly.'], 201);
    }
}
