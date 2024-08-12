<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $districts = [
            ['district_name' => 'Chitipa'],
            ['district_name' => 'Karonga'],
            ['district_name' => 'Rumphi'],
            ['district_name' => 'Mzimba'],
            ['district_name' => 'Nkhata Bay'],
            ['district_name' => 'Likoma'],
            ['district_name' => 'Kasungu'],
            ['district_name' => 'Nkhotakota'],
            ['district_name' => 'Ntchisi'],
            ['district_name' => 'Dowa'],
            ['district_name' => 'Mchinji'],
            ['district_name' => 'Lilongwe'],
            ['district_name' => 'Salima'],
            ['district_name' => 'Dedza'],
            ['district_name' => 'Ntcheu'],
            ['district_name' => 'Balaka'],
            ['district_name' => 'Mangochi'],
            ['district_name' => 'Machinga'],
            ['district_name' => 'Zomba'],
            ['district_name' => 'Chiradzulu'],
            ['district_name' => 'Blantyre'],
            ['district_name' => 'Mwanza'],
            ['district_name' => 'Thyolo'],
            ['district_name' => 'Mulanje'],
            ['district_name' => 'Phalombe'],
            ['district_name' => 'Chikwawa'],
            ['district_name' => 'Nsanje'],
            ['district_name' => 'Neno'],
        ];

        foreach ($districts as $district) {
            District::create($district);  // Eloquent will handle created_at and updated_at
        }
    }
}
