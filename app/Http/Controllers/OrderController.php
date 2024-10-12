<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use App\Models\Setting;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function landing(Request $request)
    {
        $noMeja = $request->query('no_meja');
        $setting = Setting::first();
        return Inertia::render('Orders/Landing', [
            'no_meja' => $noMeja, 'setting' => $setting
        ]);
    }


    public function init(Request $request)
    {
        $request->validate([
            'no_meja' => 'required|integer',
            'guest_name' => 'required|string',
            'session_id' => 'nullable|string',
        ]);

        $noMeja = $request->no_meja;

        // Check for existing orders with the same guest_name and session_id
        $existingOrder = Order::where('guest_name', $request->guest_name)
            ->where('session_id', $request->input('session_id'))
            ->where('total_price', 0)
            ->where('status', 'Pending')
            ->first();

        if ($existingOrder) {
            // If an existing order is found, use it instead of creating a new one
            return redirect()->route('orders.index', [
                'no_meja' => $noMeja,
                'order_id' => $existingOrder->order_id,
                'session_id' => $existingOrder->session_id
            ]);
        }

        // Create new order if no existing order is found
        $date = now()->format('dmy');
        $orderCount = Order::whereDate('created_at', now())->count() + 1;
        $orderId = $date . str_pad($orderCount, 3, '0', STR_PAD_LEFT);
        $table = Table::where('no', $noMeja)->firstOrFail();

        $session_id = $request->input('session_id') ?: (string) Str::uuid();

        Order::create([
            'order_id' => $orderId,
            'order_number' => 'TL-' . $orderId,
            'session_id' => $session_id,
            'guest_name' => $request->input('guest_name'),
            'total_price' => 0,
            'status' => 'Pending',
            'no_table' => $noMeja,
        ]);

        $table->status = false;
        $table->save();

        return redirect()->route('orders.index', [
            'no_meja' => $noMeja,
            'order_id' => $orderId,
            'session_id' => $session_id
        ]);
    }

    public function index(Request $request)
    {
        $products = Product::with('category')->get();
        $groups = ProductGroup::all();

        return Inertia::render('Orders/Index', [
            'products' => $products,
            'groups' => $groups,
            'query' => $request->query()
        ]);
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
        $order->total_service = $request->total_service;
        $order->total_pbi = $request->total_pbi;
        $order->save();

        return response()->json(['message' => 'Order updated successfully.']);
    }

    public function redirectToMenuByGroup(Request $request, $groupId)
    {
        return redirect()->route('menus.group', ['groupId' => $groupId])
            ->with([
                'no_meja' => $request->query('no_meja'),
                'order_id' => $request->query('order_id'),
            ]);
    }


    public function productByGroup(Request $request, $groupId)
    {
        $noMeja = $request->query('no_meja');
        $orderId = $request->query('order_id');

        $products = Product::with('category')
            ->where('group_id', $groupId)
            ->get();
        $categories = ProductCategory::all();
        $group = ProductGroup::findOrFail($groupId);
        return Inertia::render('Orders/ProductByGroup', [
            'products' => $products,
            'categories' => $categories,
            'group' => $group,
            'no_meja' => $noMeja,
            'order_id' => $orderId
        ]);
    }

    public function getCheckout()
    {
        $recommended = Product::all();
        $products = Product::with('category')
        ->where('stock', true)
        ->get();
        $setting = Setting::first();

        return Inertia::render('Orders/Checkout', ['recommended' => $recommended, 'products' => $products, 'setting'=>$setting]);
    }

    public function getOrderDetail($orderId)
    {
        $order = Order::with(['orderDetails.product'])
            ->where('order_id', $orderId)
            ->first();
            $products = Product::with('category')
            ->where('stock', true)
            ->get();

        return Inertia::render('Orders/OrderInformation', [
            'order' => $order,'products' => $products
        ]);
    }

    public function getBill($sessionId)
    {
        $orders = Order::with(['orderDetails.product'])
            ->where('session_id', $sessionId)
            ->get()
            ->filter(function ($order) {
                return $order->orderDetails->isNotEmpty();
            });

        return Inertia::render('Orders/Bill', [
            'orders' => $orders
        ]);
    }

    public function checkCompleteOrder($sessionId)
    {
        $exists = Order::where('session_id', $sessionId)
            ->where('status', 'Complete')
            ->exists();

        return response()->json(['isFeedback' => $exists]);
    }
}
