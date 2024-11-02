<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
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
            $users = User::where('area_id', $user->area_id)->get();
            return Inertia::render('EO/ChatRoom', ['users'=> $users]);
        }

        abort(404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createBroadcast()
    {
        return Inertia::render('EO/Broadcast');
    }

    public function sendBroadcast(Request $request)
    {
        $user = $request->user();

        if($user->role !== 'Extension Worker'){
            abort(404);
        }

        $message = $request->message;

        // Find all farmers in the same area as the EO
        $farmers = User::where('role', 'Farmer')
                        ->where('area_id', $user->area_id)
                        ->get();

        $messages = [];
        
        foreach ($farmers as $farmer) {
            // Create a message record for each farmer
            $newMessage = Message::create([
                'sender_id' => $user->id,
                'recipient_id' => $farmer->id,
                'message' => $message,
            ]);

            // Store each created message in an array for response purposes
            $messages[] = $newMessage;
        }

        return response()->json([
            'success' => 'Messages sent to all farmers in the area',
            'messages' => $messages,
        ]);

        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $recepientId = $request->recepientId;
        $message = $request->message;
        $user = $request->user();

        

        $newMessage = Message::create([
            'sender_id' => $user->id,
            'recipient_id' => $recepientId,
            'message' => $message,
        ]);
        
        return response()->json([
            'success'=> 'Message sent', 
            'message' => $newMessage,
        ]);

        abort(404);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $chatUserId = $id;
        $loggedInUserId = $request->user()->id;
        
        $messages = Message::where(function ($query) use ($loggedInUserId , $chatUserId){

            $query->where('sender_id', $loggedInUserId)->where('recipient_id', $chatUserId);

        })->orWhere(function ($query) use ($loggedInUserId , $chatUserId) {

            $query->where('sender_id', $chatUserId)->where('recipient_id', $loggedInUserId);

        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
        
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
