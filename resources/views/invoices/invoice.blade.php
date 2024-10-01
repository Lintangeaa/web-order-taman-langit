<!DOCTYPE html>
<html>
<head>
    <title>Invoice #{{ $order->order_id }}</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        .status { font-weight: bold; color: green; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Invoice #{{ $order->order_id }}</h1>
    <p>Customer: {{ $order->guest_name }}</p>

    <p>
        Total: Rp.
        {{ number_format($order->total_price + $order->total_service + $order->total_pbi, 2) }}
    </p>

    <div class="status">Status: Lunas</div>

    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($order->orderDetails as $detail)
                <tr>
                    <td>{{ $detail->product->name }}</td>
                    <td>{{ $detail->quantity }}</td>
                    <td>Rp. {{ number_format($detail->price, 2) }}</td>
                </tr>
            @endforeach
            <tr>
                <td><strong>Service</strong></td>
                <td></td>
                <td>Rp. {{ number_format($order->total_service, 2) }}</td>
            </tr>
            <tr>
                <td><strong>PBI</strong></td>
                <td></td>
                <td>Rp. {{ number_format($order->total_pbi, 2) }}</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td></td>
                <td><strong>Rp. {{ number_format($order->total_price + $order->total_service + $order->total_pbi, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>
</body>
</html>
