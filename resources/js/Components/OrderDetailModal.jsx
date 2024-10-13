import React from "react";
import Modal from "@/Components/Modal";

const OrderDetailModal = ({ show, onClose, order }) => {
    if (!order) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <div
                className="min-h-screen w-full flex justify-center items-center bg-black/30"
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
                    className="bg-white w-1/2 p-4 rounded-lg"
                >
                    <h2 className="text-lg font-bold mb-4">Detail Pesanan</h2>
                    <p>
                        <strong>ID Order:</strong> {order.order_id}
                    </p>
                    <p>
                        <strong>Nama:</strong> {order.guest_name}
                    </p>
                    <p>
                        <strong>Meja:</strong> {order.no_table}
                    </p>
                    <p>
                        <strong>Total:</strong>{" "}
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(
                            parseFloat(order.total_pbi) +
                                parseFloat(order.total_price) +
                                parseFloat(order.total_service)
                        )}
                    </p>
                    <p>
                        <strong>Status:</strong> {order.status}
                    </p>
                    <table className="w-full mt-4">
                        <thead>
                            <tr className="font-semibold border border-black">
                                <td className="px-2">Detail Item</td>
                            </tr>
                            <tr className="font-semibold border border-black">
                                <td className="px-2">No</td>
                                <td className="px-2">Name</td>
                                <td className="px-2">Qty</td>
                            </tr>
                        </thead>
                        <tbody>
                            {order.order_details.map((item, index) => (
                                <tr key={index} className="border border-black">
                                    <td className="px-2">{index + 1}</td>
                                    <td className="px-2">
                                        {item.product.name}
                                    </td>
                                    <td className="px-2">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailModal;
