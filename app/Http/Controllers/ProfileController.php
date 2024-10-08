<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update The Avatar
     */
    public function updateAvatar(Request $request, $avatarId){
        $user = $request->user();
        if ($avatarId) {
            $user->profile_photo_url = url('/assets/images/avatars/avatar_' . $avatarId . '.jpg');
            $user->save();
            return response()->json(['success' => 'Profile Photo Updated']);
        }

        abort(404);
    }

    /**
     * Delete the user's account.
     */
    public function destroy($id)
    {

        $user = User::findOrFail($id);

        if (!Auth::user()->role==='Admin') {
            return Redirect::back()->withErrors(['Unauthorized action']);
        }

        $user->delete();

        return redirect()->back();
    }
}
