<?php

use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/orders/{order_id}/details', [OrderController::class, 'addOrderDetails'])->name('api.orders.detail');
Route::get('/download-invoice/{id}', [AdminOrderController::class, 'downloadInvoice'])->name('api.download.invoice');

Route::get('/orders/check-complete/{sessionId}', [OrderController::class, 'checkCompleteOrder']);
Route::post("/feedback", [FeedbackController::class, 'store'])->name('feedback.store');

Route::post('/download-report', [ReportController::class, 'downloadReport'])->name('reports.download');



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
