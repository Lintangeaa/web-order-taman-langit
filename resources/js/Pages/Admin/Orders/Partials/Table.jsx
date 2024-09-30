import { router } from "@inertiajs/react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { FiDownload, FiEdit, FiTrash } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import { TbCashRegister } from "react-icons/tb";

const TableTakeOrders = ({ orders }) => {
    return (
        <div>
            <span className="bg-white text-xl rounded-t-xl p-2 px-4 text-red-600">
                Order Belum Diambil
            </span>
            <div className="overflow-x-scroll">
                <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                    <thead className="text-sm text-black uppercase bg-white">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6 text-center">ID Order</th>
                            <th className="py-3 px-6 text-center">Nama</th>
                            <th className="py-3 px-6 text-center">Meja</th>
                            <th className="py-3 px-6 text-center">Total</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && (
                            <tr className="bg-white/80">
                                <td
                                    colSpan={7}
                                    className="py-3 px-6 text-center text-black"
                                >
                                    Order sudah diambil semua..
                                </td>
                            </tr>
                        )}
                        {orders.map((item, index) => (
                            <tr
                                key={item.id}
                                className="bg-white/80 text-black rounded-md"
                            >
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6 text-center">
                                    {item.order_id}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {item.guest_name}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {item.no_table}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    Rp.{" "}
                                    {parseFloat(item.total_pbi) +
                                        parseFloat(item.total_price) +
                                        parseFloat(item.total_service)}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span
                                        className={
                                            item.status === "On Progress"
                                                ? "text-blue-500"
                                                : item.status === "Complete"
                                                ? "text-green-500"
                                                : item.status === "Pending"
                                                ? "text-yellow-500"
                                                : ""
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 flex justify-center items-center">
                                    <ActionTakeOrder item={item} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ActionTakeOrder = ({ item }) => {
    const handleTake = () => {
        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengambil pesanan ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, ambil!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post("/admin-orders/take/" + item.id);
            }
        });
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleTake}
                className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/30 transition-all duration-300"
            >
                <GiConfirmed size={20} />
            </button>
        </div>
    );
};

const TableOrders = ({ orders }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailModal, setDetailModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders.filter((order) =>
        order.order_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center">
                <span className="bg-white text-xl rounded-t-xl p-2 px-4 text-green-600">
                    List Order
                </span>
                <input
                    type="text"
                    placeholder="Order ID"
                    className="p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-scroll">
                <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                    <thead className="text-sm text-black uppercase bg-white">
                        <tr>
                            <th className="py-3 px-6">#</th>
                            <th className="py-3 px-6 text-center">ID Order</th>
                            <th className="py-3 px-6 text-center">Nama</th>
                            <th className="py-3 px-6 text-center">Meja</th>
                            <th className="py-3 px-6 text-center">Total</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 && (
                            <tr className="bg-white/80">
                                <td
                                    colSpan={7}
                                    className="py-3 px-6 text-center text-black"
                                >
                                    Belum ada orders..
                                </td>
                            </tr>
                        )}
                        {filteredOrders.map((item, index) => (
                            <tr
                                key={item.id}
                                className="bg-white/80 text-black rounded-md"
                            >
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6 text-center">
                                    {item.order_id}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {item.guest_name}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {item.no_table}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    Rp.{" "}
                                    {parseFloat(item.total_pbi) +
                                        parseFloat(item.total_price) +
                                        parseFloat(item.total_service)}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span
                                        className={
                                            item.status === "On Progress"
                                                ? "text-blue-500"
                                                : item.status === "Complete"
                                                ? "text-green-500"
                                                : item.status === "Pending"
                                                ? "text-yellow-500"
                                                : ""
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 flex justify-center items-center">
                                    <ActionTableOrders
                                        item={item}
                                        setDetailModal={setDetailModal}
                                        setSelectedItem={setSelectedItem}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {detailModal && (
                <Modal show={detailModal} onClose={() => setDetailModal(false)}>
                    <div className="h-screen w-full bg-black/50 flex justify-center items-center px-64 py-40">
                        <div className="w-full h-full bg-white rounded-lg p-4">
                            <p>{selectedItem.guest_name}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

const ActionTableOrders = ({ item, setDetailModal, setSelectedItem }) => {
    const handleBayar = () => {
        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin akan menyelesaikan order ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, bayar!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post("/admin-orders/bayar/" + item.id);
            }
        });
    };

    const handleDetail = () => {
        console.log("test");
        setDetailModal(true);
        setSelectedItem(item);
    };

    const handleDownloadInvoice = async () => {
        console.log(item.id);
        const response = await fetch(`/api/download-invoice/${item.id}`, {
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
            a.download = `invoice_${item.order_id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            Swal.fire("Error", "Gagal mengunduh invoice", "error");
        }
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleDetail}
                className="p-2 bg-yellow-500/10 text-yellow-500 rounded-md hover:bg-yellow-500/30 transition-all duration-300"
            >
                <IoEyeOutline size={20} />
            </button>
            <button
                onClick={handleBayar}
                className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/30 transition-all duration-300"
            >
                <TbCashRegister size={20} />
            </button>
            <button
                onClick={handleDownloadInvoice}
                className="p-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/30 transition-all duration-300"
            >
                <FiDownload size={20} />
            </button>
        </div>
    );
};

export { TableTakeOrders, TableOrders };
