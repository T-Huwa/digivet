<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Twilio\Rest\Client;


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

        if ($user->role !== 'Extension Worker') {
            abort(404);
        }

        $messageContent = $request->message;

        $farmers = User::where('role', 'Farmer')
                    ->where('area_id', $user->area_id)
                    ->get();

        $sid = env('TWILIO_SID');
        $token = env('TWILIO_TOKEN');
        $messagingServiceSid = env('TWILIO_MESSAGING_SERVICE_SID');

        $client = new Client($sid, $token);
        $messages = [];

        foreach ($farmers as $farmer) {
            $newMessage = Message::create([
                'sender_id' => $user->id,
                'recipient_id' => $farmer->id,
                'message' => $messageContent,
            ]);

            try {
                $client->messages->create($farmer->phone, [
                    "messagingServiceSid" => $messagingServiceSid,
                    'body' => $messageContent,
                ]);
            } catch (\Exception $e) {
                Log::error("Failed to send SMS to {$farmer->phone}: {$e->getMessage()}");
            }

            $messages[] = $newMessage;
        }

        return response()->json([
            'success' => 'Messages sent to all farmers in the area',
            'messages' => $messages,
        ]);
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
