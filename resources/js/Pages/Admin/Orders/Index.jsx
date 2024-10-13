import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import Swal from "sweetalert2"; // Import SweetAlert
import { TableOrders, TableTakeOrders } from "./Partials/Table";

export default function GetAllOrders({ auth, orders, takeOrders }) {
    console.log(orders);

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleClearOrders = () => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Tindakan ini akan menghapus semua pesanan secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, bersihkan semua pesanan!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("/api/orders/clear", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            Swal.fire(
                                "Dihapus!",
                                "Semua pesanan telah dibersihkan.",
                                "success"
                            );
                            window.location.reload();
                        } else {
                            Swal.fire(
                                "Error!",
                                "Ada masalah saat menghapus pesanan.",
                                "error"
                            );
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error!",
                            "Ada masalah saat menghapus pesanan.",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto flex justify-end sm:px-6 lg:px-8 mb-4">
                    <Link
                        className="p-2 rounded-full bg-white text-black text-sm"
                        href="/admin-orders/create"
                    >
                        <FiPlus size={20} />
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="flex justify-end">
                        <button
                            onClick={handleRefresh}
                            className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/70 transition duration-200"
                        >
                            <FiRefreshCcw className="mr-2" />
                            Refresh
                        </button>
                    </div>
                    <TableTakeOrders orders={takeOrders} />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3 mt-10">
                    <TableOrders orders={orders} />
                </div>
                <div className="flex justify-start max-w-7xl mx-auto px-8 mt-16">
                    <button
                        onClick={handleClearOrders}
                        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                    >
                        Bersihkan Data Order
                    </button>
                </div>
            </div>
        </Authenticated>
    );
}
