<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    public function getAll()
    {
        $tables = Table::all();

        return Inertia::render('Admin/Tables/Index', [
            'tables' => $tables,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tables/Create');
    }

    public function getNextTableNumber()
    {
        $highestNumber = Table::max('no');
        $nextNumber = $highestNumber ? $highestNumber + 1 : 1;

        return response()->json(['nextNumber' => $nextNumber]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no' => 'required|integer|unique:tables,no',
            'status' => 'boolean',
        ], [
            'no.unique' => 'Nomor sudah digunakan.'
        ]);

        Table::create([
            'no' => $request->no,
            'status' => $request->status ?? true,
        ]);

        return redirect()->route('tables.all')->with('success', 'Table created successfully.');
    }


    public function show(string $id)
    {
        $table = Table::findOrFail($id);

        return Inertia::render('Admin/Tables/Show', [
            'table' => $table,
        ]);
    }

    public function edit(string $id)
    {
        $table = Table::findOrFail($id);

        return Inertia::render('Admin/Tables/Edit', [
            'table' => $table,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'no' => 'required|integer|unique:tables,no,' . $id,
            'status' => 'boolean',
        ]);

        $table = Table::findOrFail($id);
        $table->update([
            'no' => $request->no,
            'status' => $request->status ?? true,
        ]);

        return redirect()->route('tables.index')->with('success', 'Table updated successfully.');
    }

    public function destroy(string $id)
    {
        $table = Table::findOrFail($id);
        $table->delete();

        return redirect()->route('tables.all')->with('success', 'Table deleted successfully.');
    }
}
