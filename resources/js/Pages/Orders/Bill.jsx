import { Head } from "@inertiajs/react";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";

const Bill = ({ orders }) => {
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
    function formatTime(isoDate) {
        const date = new Date(isoDate);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    let order_date = null;
    let order_time = null;

    if (orders.length > 0) {
        order_date = formatDate(orders[0]?.updated_at);
        order_time = formatTime(orders[0]?.updated_at);
    }

    console.log("bill", orders);
    return (
        <div className="flex flex-col">
            <Head title={"Order Bill"} />
            <header className="w-full h-16 bg-white shadow-lg flex items-center p-8">
                <div className="w-1/3 flex items-center justify-start">
                    <BsArrowLeft className="text-xl text-primary" />
                </div>
                <div>
                    <div className="flex justify-center items-center space-x-1">
                        <FaCartPlus className="text-primary" />
                        <h1 className="text-lg font-black">VIEW BILL</h1>
                    </div>
                    <p className="text-xs">Taman Langit Cafe Baturaden</p>
                </div>
            </header>
            <div className="p-4">
                {orders.length > 0 ? (
                    <div className="p-6 border border-primary rounded-lg">
                        <div className="flex justify-center">
                            <img src="/logohijau.webp" width={80} />
                        </div>
                        <table className="w-full mt-6">
                            <tbody>
                                <tr>
                                    <td className="text-xs text-gray-500">
                                        {order_date}
                                    </td>
                                    <td className="text-xs text-gray-500 text-end">
                                        {order_time}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-xs text-gray-500">
                                        ID Pesanan
                                    </td>
                                    <td className="text-xs text-gray-500 text-end">
                                        {o}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No Order Found</div>
                )}
            </div>
        </div>
    );
};

export default Bill;
