<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function getAll()
    {
        $products = Product::with(['category', 'group'])->get();
        return Inertia::render('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        $categories = ProductCategory::all();
        $groups = ProductGroup::all();
        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'groups' => $groups
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
            'group_id' => 'required|exists:product_groups,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = new Product($request->all());

        if ($request->hasFile('image')) {
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('images/product', $filename, 'public');
            $product->image = $path;
        }

        $product->save();
        return redirect()->route('products.all')->with('success', 'Product created successfully.');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $categories = ProductCategory::all();
        $groups = ProductGroup::all();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'groups' => $groups
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
            'group_id' => 'nullable|exists:product_groups,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->update($request->except('image'));

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('images/product', $filename, 'public');
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
