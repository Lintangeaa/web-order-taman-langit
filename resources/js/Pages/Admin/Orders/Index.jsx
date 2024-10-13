import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FiPlus, FiRefreshCcw } from "react-icons/fi"; // Import refresh icon
import { TableOrders, TableTakeOrders } from "./Partials/Table";

export default function GetAllOrders({ auth, orders, takeOrders }) {
    console.log(orders);

    const handleRefresh = () => {
        window.location.reload();
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
            <Head title="Order" />

            <div className="py-12">
                <div className="w-full flex justify-end sm:px-6 lg:px-8 mb-4">
                    <Link
                        className="p-2 rounded-full bg-white text-black text-sm "
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
            </div>
        </Authenticated>
    );
}
