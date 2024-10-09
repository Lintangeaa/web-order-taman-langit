<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // You can add filters for date range, status, etc. here.
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        $orders = Order::with('orderDetails.product')
            ->when($startDate, function ($query, $startDate) {
                return $query->where('created_at', '>=', $startDate);
            })
            ->when($endDate, function ($query, $endDate) {
                return $query->where('created_at', '<=', $endDate);
            })
            ->orderBy('created_at', 'DESC')
            ->get();

        return Inertia::render('Admin/Reports/Index', ['orders' => $orders]);
    }

    public function downloadReport(Request $request)
    {
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        $orders = Order::with('orderDetails.product')
            ->when($startDate, function ($query, $startDate) {
                return $query->where('created_at', '>=', $startDate);
            })
            ->when($endDate, function ($query, $endDate) {
                return $query->where('created_at', '<=', $endDate);
            })
            ->orderBy('created_at', 'DESC')
            ->get();

        $pdf = PDF::loadView('reports.order_report', compact('orders', 'startDate', 'endDate'));

        return $pdf->download('report_' . date('YmdHis') . '.pdf');
    }
}
