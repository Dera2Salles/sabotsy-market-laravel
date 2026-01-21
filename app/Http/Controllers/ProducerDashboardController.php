<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
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
        $totalOrders   = Order::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        $totalRevenue = Order::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->sum('total_price');

        return Inertia::render('ProducerDashboard/index', [
            'stats'      => [
                'totalProducts'  => $totalProducts,
                'totalOrders'    => $totalOrders,
                'totalRevenue'   => $totalRevenue,
                'activeProducts' => Product::where('user_id', $user->id)
                    ->where('unit_stock', '>', 0)
                    ->count(),
            ],
            'products'   => $products,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Get producer's products for management.
     */
    public function products()
    {
        $user     = Auth::user();
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
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('ProducerDashboard/CreateProduct', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name'        => 'required|string|max:255',
            'product_description' => 'required|string',
            'unit_price'          => 'required|numeric|min:0',
            'unit_stock'          => 'required|integer|min:0',
            'category_id'         => 'required|exists:categories,id',
            'image'               => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = $request->file('image')->store('products', 'public');

        Auth::user()->products()->create([
            'product_name'        => $validated['product_name'],
            'product_description' => $validated['product_description'],
            'unit_price'          => $validated['unit_price'],
            'unit_stock'          => $validated['unit_stock'],
            'category_id'         => $validated['category_id'],
            'image'               => $imagePath,
        ]);

        return redirect()->route('producer.dashboard')->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        if ($product->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('ProducerDashboard/EditProduct', [
            'product'    => [
                'id'                  => $product->id,
                'product_name'        => $product->product_name,
                'product_description' => $product->product_description,
                'unit_price'          => $product->unit_price,
                'unit_stock'          => $product->unit_stock,
                'category_id'         => $product->category_id,
                'image'               => '/storage/' . $product->image,
            ],
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'product_name'        => 'required|string|max:255',
            'product_description' => 'required|string',
            'unit_price'          => 'required|numeric|min:0',
            'unit_stock'          => 'required|integer|min:0',
            'category_id'         => 'required|exists:categories,id',
            'image'               => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath      = $request->file('image')->store('products', 'public');
            $product->image = $imagePath;
        }

        $product->update([
            'product_name'        => $validated['product_name'],
            'product_description' => $validated['product_description'],
            'unit_price'          => $validated['unit_price'],
            'unit_stock'          => $validated['unit_stock'],
            'category_id'         => $validated['category_id'],
        ]);

        return redirect()->route('producer.products')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->user_id !== Auth::id()) {
            abort(403);
        }

        $product->delete();

        return redirect()->route('producer.products')->with('success', 'Product deleted successfully.');
    }

    /**
     * Get producer's orders.
     */
    public function orders()
    {
        $user   = Auth::user();
        $orders = Order::whereHas('product', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('product')->latest()->paginate(15);

        return Inertia::render('ProducerDashboard/OrderManagement', [
            'orders' => $orders,
        ]);
    }

    public function show()
    {
        $user     = Auth::user();
        $products = Product::where('user_id', $user->id)->paginate(10);
        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            return $product;
        });

        return Inertia::render('ProducerDashboard/ProductManagement', [
            'products' => $products,
        ]);

    }
}
