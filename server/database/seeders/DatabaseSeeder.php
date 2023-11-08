<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table("statuses")->insert(([
            "name"=>"in_Process",
        ]));
        DB::table("statuses")->insert(([
            "name"=>"completed",
        ]));
        DB::table("statuses")->insert(([
            "name"=>"canceled",
        ]));

        DB::table("users")->insert(([
            'name'=>"moe",
            'email'=>"moe@gmail.com",
            'password'=>Hash::make('1234567'),
            'address'=>"Beirut, Lebanon"
        ]));

        DB::table("shipments")->insert(([
            'waybill' => '2023309US5500366',
            'name'=>"shipment 1",
            'phone_number'=>"+1 854 258 963",
            'address' => json_encode(['latitude' => '33.729759', 'longitude' => '-111.431221']),
            'status_id' => 1,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ]));
        DB::table("shipments")->insert(([
            'waybill' => '2023309US1769845',
            'name'=>"shipment 2",
            'phone_number'=>"+1 854 258 999",
            'address' => json_encode(['latitude' => '34.969704', 'longitude' => '-92.373123']),
            'status_id' => 1,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ]));
        DB::table("shipments")->insert(([
            'waybill' => '2023309US7852845',
            'name'=>"shipment 3",
            'phone_number'=>"+1 854 258 999",
            'address' => json_encode(['latitude' => '34.8669725', 'longitude' => '34.8669725']),
            'status_id' => 2,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ]));
        DB::table("shipments")->insert(([
            'waybill' => '2023309US1125945',
            'name'=>"shipment 4",
            'phone_number'=>"+1 854 258 999",
            'address' => json_encode(['latitude' => '36.116203', 'longitude' => '-119.681564']),
            'status_id' => 3,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now(),
        ]));
    }
}
