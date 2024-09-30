import React from "react";

const Invoice = ({ order }) => {
    const downloadInvoice = async () => {
        const response = await fetch(`/api/download-invoice/${order.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
            },
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice_${order.order_id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error("Failed to download invoice");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Invoice</h1>
            <p className="text-center">Order ID: {order.order_id}</p>
            <p className="text-center">
                Date: {new Date(order.created_at).toLocaleDateString()}
            </p>
            <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Item
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Quantity
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {order.items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {item.name}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    {item.quantity}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    Rp.{" "}
                                    {item.price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 font-bold">
                Total: Rp.{" "}
                {order.total_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                })}
            </div>
            <button
                onClick={downloadInvoice}
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Download Invoice
            </button>
        </div>
    );
};

export default Invoice;
