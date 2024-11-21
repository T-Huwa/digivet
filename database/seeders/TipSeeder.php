<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tip;

class TipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tips = [
            [
                'content' => 'Provide plenty of water and shade to keep animals cool.',
                'animal_type' => 'Cattle',
                'season' => 'Summer',
                'weather_threshhold' => 30, // Temperature in Celsius
            ],
            [
                'content' => 'Increase feed to help animals maintain energy in colder months.',
                'animal_type' => 'Sheep',
                'season' => 'Winter',
                'weather_threshhold' => -5,
            ],
            [
                'content' => 'Ensure vaccinations are up-to-date before the rainy season.',
                'animal_type' => 'Goat',
                'season' => 'Spring',
                'weather_threshhold' => 15,
            ],
            [
                'content' => 'Provide shelter during heavy rainfall to prevent disease.',
                'animal_type' => 'Poultry',
                'season' => 'Rainy',
                'weather_threshhold' => 20,
            ],
            [
                'content' => 'Inspect animals daily for ticks during humid conditions.',
                'animal_type' => 'Cattle',
                'season' => 'Autumn',
                'weather_threshhold' => 25,
            ],
        ];

        foreach ($tips as $tip) {
            Tip::create($tip);
        }
    }
}
