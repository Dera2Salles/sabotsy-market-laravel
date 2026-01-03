<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProducerDashboardController extends Controller
{
    /**
     * Display the producer dashboard.
     */
    public function index()
    {
        $user = Auth::user();

        // Get producer's products
        $products = Product::where('user_id', $user->id)->paginate(10);
        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            return $product;
        });

        // Get producer's statistics
        $totalProducts = Product::where('user_id', $user->id)->count();
        $totalOrders = Order::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        $totalRevenue = Order::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->sum('total_price');

        return Inertia::render('ProducerDashboard/index', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'activeProducts' => Product::where('user_id', $user->id)
                    ->where('unit_stock', '>', 0)
                    ->count(),
            ],
            'products' => $products,
        ]);
    }

    /**
     * Get producer's products for management.
     */
    public function products()
    {
        $user = Auth::user();
        $products = Product::where('user_id', $user->id)->latest()->paginate(15);

        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            return $product;
        });

        return Inertia::render('ProducerDashboard/ProductManagement', [
            'products' => $products,
        ]);
    }

    /**
     * Get producer's orders.
     */
    public function orders()
    {
        $user = Auth::user();
        $orders = Order::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('product')->latest()->paginate(15);

        return Inertia::render('ProducerDashboard/OrderManagement', [
            'orders' => $orders,
        ]);
    }
}
