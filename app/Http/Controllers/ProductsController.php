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
        $products = Product::paginate(5);

        $products->getCollection()->transform(function ($product) {
            $product->image = '/storage/' . $product->image;

            return $product;
        });
        return Inertia::render('LandingPage', [
            'products' => $products,
        ]);
    }

    public function dash()
    {

        $products = Product::paginate(5);

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
            'name'        => 'required',
            'description' => 'required',
            'category'    => 'required',
            'unit_stock'  => 'required',
            'price'       => 'required',

        ]);
        $filePath = $request->file('image')->store('uploads', 'public');

        Product::create([
            'name'        => $request->name,
            'description' => $request->description,
            'category'    => $request->category,
            'unit_stock'  => $request->unit_stock,
            'image'       => $filePath,
            'price'       => $request->price,
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
