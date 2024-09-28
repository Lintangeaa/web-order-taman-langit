<?php

namespace App\Http\Controllers;

use App\Models\ProductGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductGroupController extends Controller
{
    public function getAll()
    {
        $groups = ProductGroup::all();
        return Inertia::render('Products/Groups/Index', ['groups' => $groups]);
    }

    public function create()
    {
        return Inertia::render('Products/Groups/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $productGroup = new ProductGroup($request->all());

        if ($request->hasFile('image')) {
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('images/groups', $filename, 'public');
            $productGroup->image = $path;
        }

        $productGroup->save();
        return redirect()->route('groups.all')->with('success', 'Group created successfully.');
    }

    public function edit($id)
    {
        $group = ProductGroup::findOrFail($id);
        return Inertia::render('Products/Groups/Edit', ['group' => $group]);
    }

    public function update(Request $request, $id)
    {
        $group = ProductGroup::findOrFail($id);

        $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $group->name = $request->input('name', $group->name);

        if ($request->hasFile('image')) {
            if ($group->image) {
                Storage::disk('public')->delete($group->image);
            }
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('images/groups', $filename, 'public');
            $group->image = $path;
        }

        $group->save();

        return redirect()->route('groups.all')->with('success', 'Group updated successfully.');
    }

    public function destroy($id)
    {
        $group = ProductGroup::findOrFail($id);
        $group->delete();
        return redirect()->route('groups.all')->with('success', 'Group deleted successfully.');
    }
}
