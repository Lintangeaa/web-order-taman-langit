<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        p {
            text-align: center;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        th {
            background-color: #f2f2f2;
        }

        .pending {
            background-color: #fce5cd; /* Light yellow */
        }

        .on-progress {
            background-color: #d9e1f2; /* Light blue */
        }

        .complete {
            background-color: #d9ead3; /* Light green */
        }
    </style>
</head>
<body>
    <h1>Order Report</h1>
    <p>From: {{ $startDate }} To: {{ $endDate }}</p>

    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Guest Name</th>
                <th>Status</th>
                <th>Total</th>
                <th>Tanggal Order</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
                <tr class="{{ strtolower(str_replace(' ', '-', $order->status)) }}">
                    <td>{{ $order->order_id }}</td>
                    <td>{{ $order->guest_name }}</td>
                    <td>{{ $order->status }}</td>
                    <td>{{ number_format($order->total, 2) }}</td>
                    <td>{{ $order->created_at->format('Y-m-d H:i') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
