import RedirectButton from "@/Components/RedirectButton";
import { Head } from "@inertiajs/react";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaCartPlus, FaChevronRight } from "react-icons/fa6";

const Bill = ({ orders }) => {
    console.log(orders);
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

    const no_meja = localStorage.getItem("no_meja");

    console.log("bill", orders);
    const session_id = localStorage.getItem("session_id");
    const order_id = localStorage.getItem("order_id");

    const redirectLink = `/orders?no_meja=${no_meja}&order_id=${order_id}&session_id=${session_id}`;
    return (
        <div className="flex flex-col">
            <Head title={"Order Bill"} />
            <header className="w-full h-16 bg-white shadow-lg flex items-center p-8">
                <div className="w-1/3 flex items-center justify-start">
                    <a href={redirectLink}>
                        <BsArrowLeft className="text-xl text-primary" />
                    </a>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex justify-center items-center space-x-1">
                        <FaCartPlus className="text-primary" />
                        <h1 className="text-lg font-black">VIEW BILL</h1>
                    </div>
                    <p className="text-xs">Taman Langit Cafe Baturaden</p>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3"></div>
            </header>
            <div className="p-4">
                {orders.length > 0 ? (
                    orders.map((bill, i) => (
                        <div
                            key={i}
                            className="p-6 border border-primary rounded-lg mt-6"
                        >
                            <div className="flex justify-center">
                                <img src="/logohijau.webp" width={80} />
                            </div>
                            <table className="w-full mt-6">
                                <tbody>
                                    <tr>
                                        <td className="text-xs text-gray-500">
                                            {formatDate(bill.updated_at)}
                                        </td>
                                        <td className="text-xs text-gray-500 text-end">
                                            {formatTime(bill.updated_at)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs text-gray-500">
                                            ID Pesanan
                                        </td>
                                        <td className="text-xs text-gray-500 text-end">
                                            {bill.order_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs text-gray-500">
                                            Name
                                        </td>
                                        <td className="text-xs text-gray-500 text-end">
                                            {bill.guest_name}
                                        </td>
                                    </tr>
                                    <tr className="h-6"></tr>
                                    <tr className="border-t-2 border-dashed border-gray-400"></tr>
                                    <tr>
                                        <td className="text-xs text-gray-500 py-3">
                                            Your Order :
                                        </td>
                                    </tr>
                                    <tr className="border-t-2 border-dashed border-gray-400"></tr>
                                    <tr className="h-6"></tr>
                                    {bill.order_details.map((detail, j) => (
                                        <tr key={j}>
                                            <td className="text-xs text-gray-500">
                                                {detail.quantity}{" "}
                                                {detail.product.name}
                                            </td>
                                            <td className="text-xs text-gray-500 text-end">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(
                                                    detail.quantity *
                                                        parseFloat(
                                                            detail.product.price
                                                        )
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="h-6"></tr>
                                    <tr className="border-t-2 border-dashed border-gray-400"></tr>
                                    <tr>
                                        <td className="text-xs text-gray-500 py-3">
                                            Notes :
                                        </td>
                                    </tr>
                                    <tr className="border-t-2 border-dashed border-gray-400"></tr>
                                    <tr className="h-6"></tr>
                                    <tr>
                                        <td className="text-xs text-gray-500">
                                            Service Charge :
                                        </td>
                                        <td className="text-xs text-gray-500 text-end">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(
                                                parseFloat(bill.total_service)
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs text-gray-500">
                                            Tax :
                                        </td>
                                        <td className="text-xs text-gray-500 text-end">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(
                                                parseFloat(bill.total_pbi)
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-xs text-gray-500">
                                            Total :
                                        </td>
                                        <td className="text-xs text-gray-500 text-end">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(
                                                parseFloat(bill.total_price) +
                                                    parseFloat(
                                                        bill.total_service
                                                    ) +
                                                    parseFloat(bill.total_pbi)
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <div>No Order Found</div>
                )}
                <RedirectButton
                    className="bg-primary mt-8 w-full"
                    href={`/?no_meja=${no_meja}`}
                >
                    <div className="flex items-center justify-center w-full">
                        <div className="w-1/2"></div>
                        <div className="w-1/2 flex justify-between items-center">
                            <div>HOME</div> <FaChevronRight />
                        </div>
                    </div>
                </RedirectButton>
            </div>
        </div>
    );
};

export default Bill;
