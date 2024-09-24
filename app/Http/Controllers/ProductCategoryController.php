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

    public function create()
    {
        return Inertia::render('Products/Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        ProductCategory::create($request->all());
        return redirect()->route('categories.all')->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
        $category = ProductCategory::findOrFail($id);
        return Inertia::render('Products/Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, $id)
    {
        $category = ProductCategory::findOrFail($id);
        $request->validate(['name' => 'required|string|max:255']);
        $category->update($request->all());
        return redirect()->route('categories.all')->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = ProductCategory::findOrFail($id);
        $category->delete();
        return redirect()->route('categories.all')->with('success', 'Category deleted successfully.');
    }
}
