<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Table;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminOrderController extends Controller
{
    public function index()
    {
        $takeOrders = Order::with('orderDetails.product')
            ->where('status', 'Pending')
            ->has('orderDetails')
            ->orderBy('updated_at', 'DESC')
            ->get();

        $orders = Order::with('orderDetails.product')
            ->where('status', '<>', 'Pending')
            ->orderByRaw("CASE WHEN status = 'Complete' THEN 1 ELSE 0 END")
            ->orderBy('updated_at', 'DESC')
            ->get();

        return Inertia::render('Admin/Orders/Index', ['orders' => $orders, 'takeOrders' => $takeOrders]);
    }

    public function takeOrder($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->status = 'On Progress';
        $order->save();

        return redirect()->route('orders.all')->with('success', 'Order berhasil diambil');
    }

    public function paidOrder($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $table = Table::where('no', $order->no_table)->first();

        if (!$table) {
            return response()->json(['message' => 'Table not found'], 404);
        }
        $table->status = true;
        $table->save();

        $order->status = 'Complete';
        $order->save();

        return redirect()->route('orders.all')->with('success', 'Order berhasil dibayar');
    }

    public function downloadInvoice($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }


        $pdf = PDF::loadView('invoices.invoice', compact('order'));

        return $pdf->download('invoice_' . $order->id . '.pdf');
    }
}
