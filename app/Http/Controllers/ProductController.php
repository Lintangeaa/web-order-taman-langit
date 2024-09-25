<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function getAll()
    {
        $products = Product::with('category')->get();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        $categories = ProductCategory::all();
        return Inertia::render('Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:product_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = new Product($request->all());

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $product->image = $path;
        }

        $product->save();
        return redirect()->route('products.all')->with('success', 'Product created successfully.');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = ProductCategory::all();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }


    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'nullable|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'category_id' => 'nullable|exists:product_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update product fields
        $product->fill($request->except('image'));

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            // Store the new image
            $path = $request->file('image')->store('images', 'public');
            $product->image = $path;
        }

        $product->save();
        return redirect()->route('products.all')->with('success', 'Produk Berhasil diupdate');
    }


    public function destroy(string $id)
    {
        $table = Product::findOrFail($id);
        $table->delete();

        return redirect()->route('tables.all')->with('success', 'Produk Berhasil dihapus');
    }
}
