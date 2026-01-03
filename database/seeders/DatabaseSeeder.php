<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Categories
        $categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Beverages'];
        foreach ($categories as $cat) {
            Category::firstOrCreate(
                ['name' => $cat],
                ['slug' => Str::slug($cat)]
            );
        }

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
