<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [OrderController::class, 'landing'])->name('orders.landing');
Route::post('/', [OrderController::class, 'init'])->name('orders.init');
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/table', [TableController::class, 'getAll'])->name('tables.all');
    Route::get('/table/create', [TableController::class, 'create'])->name('tables.create');
    Route::post('/table/create', [TableController::class, 'store'])->name('tables.store');
    Route::get('/table/next-number', [TableController::class, 'getNextTableNumber'])->name('table.nextNumber');


    Route::prefix('/products')->group(function () {
        Route::get('', [ProductController::class, 'getAll'])->name('products.all');
        Route::get('/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/create', [ProductController::class, 'store'])->name('products.store');
        Route::get('/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
        Route::post('/edit/{id}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/{id}', [ProductController::class, 'destroy'])->name('products.delete');

        Route::prefix('/categories')->group(function () {
            Route::get('', [ProductCategoryController::class, 'getAll'])->name('categories.all');
            Route::get('/create', [ProductCategoryController::class, 'create'])->name('categories.create');
            Route::post('/create', [ProductCategoryController::class, 'store'])->name('categories.store');
            Route::get('/edit/{id}', [ProductCategoryController::class, 'edit'])->name('categories.edit');
            Route::post('/edit/{id}', [ProductCategoryController::class, 'update'])->name('categories.update');
            Route::delete('/{id}', [ProductCategoryController::class, 'destroy'])->name('categories.destroy');
        });
    });
});

require __DIR__ . '/auth.php';
