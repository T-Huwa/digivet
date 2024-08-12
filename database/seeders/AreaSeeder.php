<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
            // District ID 1: Chitipa
            ['name' => 'Wenya', 'district_id' => 1],
            ['name' => 'Misuku', 'district_id' => 1],
            ['name' => 'Chitipa', 'district_id' => 1],

            // District ID 2: Karonga
            ['name' => 'Karonga Town', 'district_id' => 2],
            ['name' => 'Nkhatabay', 'district_id' => 2],
            ['name' => 'Chitipa', 'district_id' => 2],

            // District ID 3: Rumphi
            ['name' => 'Rumphi Town', 'district_id' => 3],
            ['name' => 'Mpherembe', 'district_id' => 3],
            ['name' => 'Lungwena', 'district_id' => 3],

            // District ID 4: Mzimba
            ['name' => 'Mzimba Town', 'district_id' => 4],
            ['name' => 'Chitipa', 'district_id' => 4],
            ['name' => 'Mpherembe', 'district_id' => 4],

            // District ID 5: Nkhata Bay
            ['name' => 'Nkhata Bay Town', 'district_id' => 5],
            ['name' => 'Mbewa', 'district_id' => 5],
            ['name' => 'Kalanda', 'district_id' => 5],
            ['name' => 'Not Found!', 'district_id' => 5]

        ];

        foreach ($areas as $area) {
            Area::create($area);  // Eloquent will handle created_at and updated_at
        }
    }
}
