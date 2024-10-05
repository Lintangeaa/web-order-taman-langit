<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting; // Impor model Setting

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Menambahkan pengaturan kosong
        Setting::create([
            'status_open' => 0,
            'tax' => 0,
            'service_charge' => 0,
        ]);
    }
}
