<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function getAll()
    {
        $categories = ProductCategory::all();
        return Inertia::render('Products/Categories/Index', ['categories' => $categories]);
    }
}
