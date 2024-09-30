import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import { TableOrders, TableTakeOrders } from "./Partials/Table";

export default function GetAllOrders({ auth, orders, takeOrders }) {
    console.log(orders);
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <TableTakeOrders orders={takeOrders} />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3 mt-10">
                    <TableOrders orders={orders} />
                </div>
            </div>
        </Authenticated>
    );
}
