<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function landing(Request $request)
    {
        $noMeja = $request->query('no_meja');
        return Inertia::render('Orders/Landing', [
            'no_meja' => $noMeja,
        ]);
    }


    public function init(Request $request)
    {

        $request->validate([
            'no_meja' => 'required|integer',
            'guest_name' => 'required|string'
        ]);

        $noMeja = $request->no_meja;
        Log::info('nomeja' . $noMeja);
        $date = now()->format('dmy');
        $orderCount = Order::whereDate('created_at', now())->count() + 1;

        $orderId = $date . str_pad($orderCount, 3, '0', STR_PAD_LEFT);
        $table = Table::where('no', $noMeja)->firstOrFail();

        Order::create([
            'order_id' => $orderId,
            'order_number' => 'TL-' . $orderId,
            'guest_name' => $request->input('guest_name'),
            'total_price' => 0,
            'status' => 'pending',
            'no_table' => $noMeja,
        ]);

        $table->status = false;
        $table->save();

        return redirect()->route('orders.index', [
            'no_meja' => $noMeja,
            'order_id' => $orderId
        ]);
    }

    public function index()
    {
        $products = Product::with('category')->get();
        return Inertia::render('Orders/Index', ['products' => $products]);
    }

    public function addOrderDetails(Request $request, $orderId)
    {
        $order = Order::where('order_id', $orderId)->firstOrFail();
        $totalPrice = 0;

        foreach ($request->input('items') as $item) {
            $orderDetail = OrderDetail::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                ],
                [
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]
            );
            $totalPrice += $orderDetail->price * $orderDetail->quantity;
        }

        $order->total_price = $totalPrice;
        $order->save();

        return response()->json(['message' => 'Order updated successfully.']);
    }
}
