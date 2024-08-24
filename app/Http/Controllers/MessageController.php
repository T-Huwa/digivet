<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'Farmer') {

            $EOs = User::where('role', 'Extension Worker')->where('area_id', $user->area_id)->get();

            return Inertia::render('Farmer/ChatRoom', ['EOs'=> $EOs]);
        }
        if ($user->role === 'Extension Worker') {
            return Inertia::render('EO/ChatRoom');
        }

        abort(404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $recepientId = $request->recepientId;
        $message = $request->message;
        $user = $request->user();

        Message::create([
            'sender_id' => $user->id,
            'recepient_id' => $recepientId,
            'message' => $message,
        ]);

        if($user->role === 'Farmer') return Inertia::render('Farmer/ChatRoom');
        if($user->role === 'Extension Worker') return Inertia::render('EO/ChatRoom');

        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message, $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
