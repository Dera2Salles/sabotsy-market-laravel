<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Get system-wide statistics
        $totalUsers = User::count();
        $totalProducers = User::where('role', User::ROLE_PRODUCER)->count();
        $totalCustomers = User::where('role', User::ROLE_CUSTOMER)->count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();

        // Get recent users
        $recentUsers = User::latest()->take(5)->get();

        // Get products with pagination
        $products = Product::with('user')->paginate(10);
        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            return $product;
        });

        return Inertia::render('AdminDashboard/index', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalProducers' => $totalProducers,
                'totalCustomers' => $totalCustomers,
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
            ],
            'recentUsers' => $recentUsers,
            'products' => $products,
        ]);
    }

    /**
     * Get users for management.
     */
    public function users()
    {
        $users = User::latest()->paginate(15);

        return Inertia::render('AdminDashboard/UserManagement', [
            'users' => $users,
        ]);
    }

    /**
     * Get producers for management.
     */
    public function producers()
    {
        $producers = User::where('role', User::ROLE_PRODUCER)
            ->withCount('products')
            ->latest()
            ->paginate(15);

        return Inertia::render('AdminDashboard/ProducerManagement', [
            'producers' => $producers,
        ]);
    }
}
