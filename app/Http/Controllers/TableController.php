<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TableController extends Controller
{
    public function getNextTableNumber()
    {
        $highestNumber = Table::max('no');

        $nextNumber = $highestNumber ? $highestNumber + 1 : 1;

        return response()->json(['nextNumber' => $nextNumber]);
    }
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'no' => 'required|integer|unique:tables,no',
            'status' => 'boolean'
        ]);

        // Buat meja baru
        $table = Table::create([
            'no' => $request->no,
            'status' => $request->status ?? true,
        ]);

        return response()->json($table, 201);
    }

}
