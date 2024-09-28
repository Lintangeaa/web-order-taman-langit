<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
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
        $products = Product::all();
        return Inertia::render('Orders/Checkout', ['recommended' => $recommended, 'products' => $products]);
    }

    public function getOrderDetail($orderId)
    {
        $order = Order::with(['orderDetails.product'])
            ->where('order_id', $orderId)
            ->first();

        return Inertia::render('Orders/OrderInformation', [
            'order' => $order,
        ]);
    }
}
