<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        // Fetch all orders and group by status
        $orders = Order::with('orderDetails.product')
            ->whereIn('status', ['Pending', 'On Progress', 'Complete'])
            ->get()
            ->groupBy('status');

        // Count the orders for each status
        $pendingOrders = $orders->get('Pending', collect())->count();
        $onProgressOrders = $orders->get('On Progress', collect())->count();
        $completeOrders = $orders->get('Complete', collect())->count();

        // Fetch all feedbacks
        $feedbacks = Feedback::all();

        // Calculate total rating
        $totalRating = $feedbacks->sum('rating');
        $averageRating = $feedbacks->isNotEmpty() ? $totalRating / $feedbacks->count() : 0;

        return Inertia::render('Dashboard', [
            'pendingOrders' => $pendingOrders,
            'onProgressOrders' => $onProgressOrders,
            'completeOrders' => $completeOrders,
            'feedbacks' => $feedbacks,
            'averageRating' => round($averageRating, 1),
        ]);
    }
}
