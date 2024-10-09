<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    // Store newly created feedback
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|between:1,5',
        ]);

        Feedback::create($request->all());
        return redirect()->route('orders.index')->with('success', 'Berhasil melakukan feedback');
    }

    // Remove the specified feedback
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return redirect()->route('feedback.index')->with('success', 'Feedback deleted successfully!');
    }
}
