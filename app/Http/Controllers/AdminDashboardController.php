<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Get system-wide statistics
        $totalUsers     = User::count();
        $totalProducers = User::where('role', User::ROLE_PRODUCER)->count();
        $totalCustomers = User::where('role', User::ROLE_CUSTOMER)->count();
        $totalProducts  = Product::count();
        $totalOrders    = Order::count();

        // Get recent users
        $recentUsers = User::latest()->take(5)->get();

        // Get products with pagination
        $products = Product::with('user')->paginate(10);
        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            $product->created_at = $product->created_at->toIso8601String();
            return $product;
        });

        return Inertia::render('AdminDashboard/index', [
            'stats'       => [
                'totalUsers'     => $totalUsers,
                'totalProducers' => $totalProducers,
                'totalCustomers' => $totalCustomers,
                'totalProducts'  => $totalProducts,
                'totalOrders'    => $totalOrders,
            ],
            'recentUsers' => $recentUsers,
            'products'    => $products,
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

    /**
     * Toggle producer approval status.
     */
    public function toggleProducerApproval(Request $request, User $user)
    {
        // Ensure the user is a producer
        if (!$user->isProducer()) {
            abort(403, 'User is not a producer.');
        }

        $validated = $request->validate([
            'is_approved' => 'required|boolean',
        ]);

        $user->update([
            'is_approved' => $validated['is_approved'],
        ]);

        return redirect()->back()->with('success', 'Producer approval status updated successfully.');
    }
}
