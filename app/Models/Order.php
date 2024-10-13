<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'order_number',
        'session_id',
        'guest_name',
        'total_price',
        'status',
        'active',
        'no_table'
    ];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
