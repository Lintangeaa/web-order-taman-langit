<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Setting;
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

    public function create()
    {
        $products = Product::where('stock', true)->get();
        $tables = Table::all();

        return Inertia::render('Admin/Orders/Create', [
            'products' => $products,
            'tables' => $tables,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'guest_name' => 'required|string',
            'no_meja' => 'required|integer',
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'total_service' => 'nullable|numeric',
            'total_pbi' => 'nullable|numeric',
        ]);

        $date = now()->format('dmy');
        $orderCount = Order::whereDate('created_at', now())->count() + 1;
        $orderId = $date . str_pad($orderCount, 3, '0', STR_PAD_LEFT);
        $noMeja = $request->input('no_meja');

        // Create the order
        $order = Order::create([
            'order_id' => $orderId,
            'order_number' => 'TL-' . $orderId,
            'session_id' => 'admin',
            'guest_name' => $request->input('guest_name'),
            'total_price' => 0,
            'status' => 'Pending',
            'no_table' => $noMeja,
            'total_service' => $request->input('total_service', 0),
            'total_pbi' => $request->input('total_pbi', 0),
        ]);

        // Add order details
        $totalPrice = 0;

        foreach ($request->input('items') as $item) {
            $orderDetail = OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => Product::find($item['product_id'])->price,
            ]);
            $totalPrice += $orderDetail->price * $orderDetail->quantity;
        }
        $setting = Setting::first();

        $total_pbi = ($setting->tax/100) * $totalPrice;

        // Update the order total price
        $order->total_price = $totalPrice + $total_pbi + $setting->service_charge;
        $order->save();

        return redirect()->route('orders.all')->with('success', 'Order created successfully.');
    }
}
