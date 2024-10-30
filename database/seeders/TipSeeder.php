<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tip;

class TipSeeder extends Seeder
{
    public function run()
    {
        $tips = [
            ['content' => 'Ensure animals have a balanced diet with the necessary nutrients.'],
            ['content' => 'Provide fresh and clean water daily for optimal health.'],
            ['content' => 'Vaccinate animals according to veterinary schedules to prevent diseases.'],
            ['content' => 'Regularly check and treat animals for internal and external parasites.'],
            ['content' => 'Provide proper shelter to protect animals from harsh weather conditions.'],
            ['content' => 'Allow animals sufficient space for exercise to promote physical and mental health.'],
            ['content' => 'Observe animals daily for signs of illness or distress.'],
            ['content' => 'Regularly clean animal pens to prevent disease spread.'],
            ['content' => 'Plan breeding to avoid overpopulation and ensure healthy offspring.'],
            ['content' => 'Regularly check and trim hooves to prevent infections.'],
            ['content' => 'Adjust care routines based on seasonal needs like extra bedding in winter.'],
            ['content' => 'Provide enough space to reduce stress and prevent injury.'],
            ['content' => 'Dispose of waste properly to maintain a clean environment.'],
            ['content' => 'Secure enclosures to prevent attacks from predators.'],
            ['content' => 'Check animals for any signs of abnormal behavior.'],
            ['content' => 'Wean young animals at the right time for health and growth.'],
            ['content' => 'Maintain records of all vaccinations for future reference.'],
            ['content' => 'Regularly inspect fences for security and repairs.'],
            ['content' => 'Provide shade and water to manage heat stress in hot seasons.'],
            ['content' => 'Have an emergency plan for disease outbreaks or natural disasters.'],
        ];

        foreach ($tips as $tip) {
            Tip::create($tip);
        }
    }
}
