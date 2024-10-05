<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();

        return Inertia::render('Admin/Settings/Index', [
            'setting' => $setting
        ]);
    }


    public function update(Request $request)
    {
        $setting = Setting::first();

        $request->validate([
            'status_open' => 'nullable|boolean',
            'tax' => 'nullable|decimal:0,2',
            'service_charge' => 'nullable|decimal:0,2'
        ]);

        $setting->status_open = $request->input('status_open');
        $setting->tax = $request->input('tax');
        $setting->service_charge = $request->input('service_charge');

        $setting->save();

        return redirect()->route('setting.index')->with('success', 'Update setting successfully');
    }
}
