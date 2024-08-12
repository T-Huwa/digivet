<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\District;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            DistrictSeeder::class,
            AreaSeeder::class
        ]);
              
        User::create([
            'name' => 'Test Admin User',
            'email' => 'test@test.com',
            'password' => Hash::make('test1234'),
            'role' => 'Admin',
            "district_id" => 5,
            "area_id" => 5,
        ]);  
        
        // DB::table('users')->insert([
        //     'name' => 'Test Admin User',
        //     'email' => 'test@test.com',
        //     'password' => Hash::make('test1234'),
        //     'role' => 'Admin',
        //     "district_id" => 5,
        //     "area_id" => 5,
        // ]);
    }
}
