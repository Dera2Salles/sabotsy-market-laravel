<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->paginate(5);
        $categories = \App\Models\Category::all();

        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            return $product;
        });

        return Inertia::render('LandingPage', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function dash()
    {
        $products = Product::with('category')->paginate(5);

        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;
            return $product;
        });

        return Inertia::render('Dashboard', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_name'        => 'required|string|max:255',
            'product_description' => 'required|string',
            'category_id'         => 'required|exists:categories,id',
            'unit_stock'          => 'required|integer|min:0',
            'unit_price'          => 'required|numeric|min:0',
            'image'               => 'required|image|max:2048',
        ]);

        $filePath = $request->file('image')->store('products', 'public');

        Product::create([
            'product_name'        => $request->product_name,
            'product_description' => $request->product_description,
            'category_id'         => $request->category_id,
            'unit_stock'          => $request->unit_stock,
            'image'               => $filePath,
            'unit_price'          => $request->unit_price,
            'user_id'             => auth()->id(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(products $products)
    {
        //
    }
}
