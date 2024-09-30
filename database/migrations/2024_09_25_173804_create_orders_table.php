<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->string('order_number')->unique();
            $table->string('guest_name');
            $table->string('session_id');
            $table->decimal('total_price', 10, 2)->default(0);
            $table->decimal('total_service', 10, 2)->default(0);
            $table->decimal('total_pbi', 10, 2)->default(0);
            $table->string('status')->default('Pending');
            $table->string(column: 'no_table');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
