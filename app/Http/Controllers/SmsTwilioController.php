<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

class SmsTwilioController extends Controller
{
    public function sendSms(Request $request)
    {
        // example url : http://your-domain.com/sendSms?to=+265912345678&message=Hello+there
        
        $receiverNumber = $request->query('to', '+265884496864');
        $message = $request->query('message', 'My name is Yona Huwa');

        $sid = env('TWILIO_SID');
        $token = env('TWILIO_TOKEN');
        $fromNumber = env('TWILIO_FROM');
        $messagingServiceSid = env('TWILIO_MESSAGING_SERVICE_SID');

        try {
            $client = new Client($sid, $token);
            $client->messages->create($receiverNumber, [
                "messagingServiceSid" => $messagingServiceSid,
                'body' => $message
            ]);

            return 'SMS Sent Successfully.';
        } catch (\Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
    }
}
