<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
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
        $admin = User::firstOrCreate(
            ['email' => 'admin@sabotsymarket.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => User::ROLE_ADMIN,
                'email_verified_at' => now(),
                'is_approved' => true,
            ]
        );

        // Producer User (Approved)
        $producer = User::firstOrCreate(
            ['email' => 'producer@sabotsymarket.com'],
            [
                'name' => 'Producer User',
                'password' => bcrypt('password'),
                'role' => User::ROLE_PRODUCER,
                'email_verified_at' => now(),
                'is_approved' => true,
            ]
        );

        // Pending Producer (Not Approved)
        $pendingProducer = User::firstOrCreate(
            ['email' => 'pending@sabotsymarket.com'],
            [
                'name' => 'Pending Producer',
                'password' => bcrypt('password'),
                'role' => User::ROLE_PRODUCER,
                'email_verified_at' => now(),
                'is_approved' => false,
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
                'is_approved' => true,
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
                'is_approved' => true,
            ]
        );

        // Sample Products for the approved producer
        $fruitCategory = Category::where('name', 'Fruits')->first();
        $vegetableCategory = Category::where('name', 'Vegetables')->first();
        $dairyCategory = Category::where('name', 'Dairy')->first();
        $meatCategory = Category::where('name', 'Meat')->first();
        $bakeryCategory = Category::where('name', 'Bakery')->first();

        $products = [
            [
                'product_name' => 'Fresh Apples',
                'product_description' => 'Crisp and sweet red apples, perfect for snacking or baking.',
                'unit_price' => 2500,
                'unit_stock' => 100,
                'category_id' => $fruitCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Organic Bananas',
                'product_description' => 'Naturally ripened organic bananas, rich in potassium.',
                'unit_price' => 1800,
                'unit_stock' => 150,
                'category_id' => $fruitCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Fresh Tomatoes',
                'product_description' => 'Juicy vine-ripened tomatoes, perfect for salads and cooking.',
                'unit_price' => 1500,
                'unit_stock' => 80,
                'category_id' => $vegetableCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Green Lettuce',
                'product_description' => 'Crisp and fresh lettuce heads, ideal for salads.',
                'unit_price' => 1200,
                'unit_stock' => 60,
                'category_id' => $vegetableCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Fresh Milk',
                'product_description' => 'Pure farm-fresh milk, rich in calcium and vitamins.',
                'unit_price' => 3000,
                'unit_stock' => 50,
                'category_id' => $dairyCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Cheddar Cheese',
                'product_description' => 'Aged cheddar cheese with a rich, sharp flavor.',
                'unit_price' => 4500,
                'unit_stock' => 40,
                'category_id' => $dairyCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Chicken Breast',
                'product_description' => 'Fresh, lean chicken breast, perfect for grilling.',
                'unit_price' => 5500,
                'unit_stock' => 30,
                'category_id' => $meatCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Artisan Bread',
                'product_description' => 'Freshly baked artisan bread, soft and delicious.',
                'unit_price' => 2000,
                'unit_stock' => 70,
                'category_id' => $bakeryCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Organic Carrots',
                'product_description' => 'Sweet and crunchy organic carrots, harvested daily.',
                'unit_price' => 1200,
                'unit_stock' => 120,
                'category_id' => $vegetableCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Strawberries',
                'product_description' => 'Ripe and juicy strawberries, perfect for desserts.',
                'unit_price' => 3500,
                'unit_stock' => 45,
                'category_id' => $fruitCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Farm Eggs',
                'product_description' => 'Free-range farm eggs, rich in protein.',
                'unit_price' => 1000,
                'unit_stock' => 200,
                'category_id' => $dairyCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
            [
                'product_name' => 'Fresh Salmon',
                'product_description' => 'Wild-caught fresh salmon fillet.',
                'unit_price' => 8500,
                'unit_stock' => 15,
                'category_id' => $meatCategory->id,
                'image' => 'products/placeholder.jpg',
            ],
        ];

        foreach ($products as $productData) {
            Product::firstOrCreate(
                [
                    'product_name' => $productData['product_name'],
                    'user_id' => $producer->id,
                ],
                $productData + ['user_id' => $producer->id]
            );
        }
    }
}
