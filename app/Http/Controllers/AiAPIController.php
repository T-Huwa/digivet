<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Tip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AiAPIController extends Controller
{
    public function getTip(Request $request){
        $response = Http::withToken(config('services.openai.secret'))
            ->post("https://api.openai.com/v1/chat/completions", 
                [
                "model"=> "gpt-4o-mini",
                "messages"=> [
                    [
                        "role"=> "system",
                        "content"=> "You are a helpful assistant. You use provided data on weather and the animals that a farmer has an animal husbandry tip that best suits the situation"
                    ],
                    [
                        "role"=> "user",
                        "content"=> "Generate a tip for a farmer who is rearing chickens in very hot weather."
                    ],
                ]
                ])->json();

        dd($response);
        return;
    }

    public function queryGemini(Request $request)
    {
        $userId = Auth::id();
        $animals = Inventory::where('user_id', $userId)->get(['animal_type']);
        $weatherData = $request->input('weatherData');

        // All tips for fallback selection based on weather threshold
        $tips = Tip::all();

        // Send the request to the Gemini API
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . config('services.gemini.secret'), [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => "Your role is that of an analyst. Based on the following weather data and user's animals, select the best tip for them from the provided list of tips. If you determine that there are no related tips or that you know a better tip, generate it. reply in json.\n\nWeather Data: " . json_encode($weatherData) .
                                    "\n\nUser's Animals: " . json_encode($animals) .
                                    "\n\nAvailable Tips: " . json_encode($tips),
                        ]
                    ]
                ]
            ]
        ]);

        $json_response = $response->json();

        $tipText = '';
        if (isset($json_response['candidates'][0]['content']['parts'][0]['text'])) {
            $tipText = json_decode(trim($json_response['candidates'][0]['content']['parts'][0]['text'], "```json\n"));
        }

        // If no relevant tip is found from the API, select a random tip based on weather_threshhold
        if (empty($tipText->tip)) {
            // Assuming weatherData contains a 'temperature' key
            $currentWeather = $weatherData['temperature'] ?? 0;

            // Filter tips based on weather_threshhold and select a random tip
            $filteredTips = $tips->filter(function ($tip) use ($currentWeather) {
                return $currentWeather >= $tip->weather_threshhold;
            });

            $randomTip = $filteredTips->isNotEmpty() ? $filteredTips->random() : null;
            $tipText = $randomTip ? (object) ['tip' => $randomTip->content] : (object) ['tip' => 'No suitable tip available.'];
        }

        return response()->json([
            'tip' => $tipText->tip,
            'raw_response' => $json_response // Include raw response for debugging if needed
        ]);
    }


}
