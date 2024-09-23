<?php

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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

        Route::prefix('/categories')->group(function () {
            Route::get('', [ProductCategoryController::class, 'getAll'])->name('products.categories.all');
        });
    });
});

require __DIR__ . '/auth.php';
