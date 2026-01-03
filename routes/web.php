<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ProducerDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProductsController::class, 'index']);
Route::post('/product', [ProductsController::class, 'store']);

// Dashboard route with role-based redirection
Route::get('/dashboard', function () {
    $user = auth()->user();
    
    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    } elseif ($user->isProducer()) {
        return redirect()->route('producer.dashboard');
    }
    
    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('users');
    Route::get('/producers', [AdminDashboardController::class, 'producers'])->name('producers');
});

// Producer routes
Route::middleware(['auth', 'verified', 'producer'])->prefix('producer')->name('producer.')->group(function () {
    Route::get('/dashboard', [ProducerDashboardController::class, 'index'])->name('dashboard');
    Route::get('/products', [ProducerDashboardController::class, 'products'])->name('products');
    Route::get('/products/create', [ProducerDashboardController::class, 'create'])->name('products.create');
    Route::post('/products', [ProducerDashboardController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProducerDashboardController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProducerDashboardController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProducerDashboardController::class, 'destroy'])->name('products.destroy');
    Route::get('/orders', [ProducerDashboardController::class, 'orders'])->name('orders');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
