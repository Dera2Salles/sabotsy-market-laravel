<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Admin User
        User::firstOrCreate(
            ['email' => 'admin@sabotsymarket.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => User::ROLE_ADMIN,
                'email_verified_at' => now(),
            ]
        );

        // Producer User
        User::firstOrCreate(
            ['email' => 'producer@sabotsymarket.com'],
            [
                'name' => 'Producer User',
                'password' => bcrypt('password'),
                'role' => User::ROLE_PRODUCER,
                'email_verified_at' => now(),
            ]
        );

        // Customer User
        User::firstOrCreate(
            ['email' => 'customer@sabotsymarket.com'],
            [
                'name' => 'Customer User',
                'password' => bcrypt('password'),
                'role' => User::ROLE_CUSTOMER,
                'email_verified_at' => now(),
            ]
        );

        // Existing Test User fallback
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'role' => User::ROLE_CUSTOMER,
                'email_verified_at' => now(),
            ]
        );
    }
}
