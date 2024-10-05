import PrimaryButton from "@/Components/PrimaryButton";
import RedirectButton from "@/Components/RedirectButton";
import OrderLayout from "@/Layouts/OrderLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

const OrderInformationPage = ({ order, products }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showSummary, setShowSummary] = useState(false);
    console.log(order);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const order_time = formatDate(order.updated_at);
    const no_meja = localStorage.getItem("no_meja");

    return (
        <OrderLayout showbar={false} products={products}>
            <Head title={"Order Information"} />
            <div className="bg-white p-4 py-6 flex flex-col items-center min-h-screen">
                <h1 className="font-bold italic">
                    Cafe Taman Langit Baturaden
                </h1>
                <p className="text-xs w-1/2">
                    Dusun II, Kebumen, Baturaden, Banyumas, Jawa Tengah 53151
                </p>

                {!isLoading ? (
                    <div className="mt-12 relative w-full rounded-lg h-20 border border-yellow-950 shadow-inner flex items-center justify-center">
                        <MdOutlineDone className="text-safir text-4xl absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 bg-white rounded-full p-1 border-safir " />
                        <div className="text-center">
                            <p className="text-xs font-semibold text-safir px-20">
                                Your Order has been successfully. Come to the
                                cashier to confirm your order and payment.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-12 w-full rounded-lg h-20 border border-yellow-950 shadow-inner flex p-4 items-center">
                        <GiSandsOfTime className="text-yellow-950 text-4xl w-1/5" />
                        <div className="text-center w-4/5">
                            <p className="text-xs font-semibold text-gray-700/70 px-8">
                                Please wait... we are placing your order, don’t
                                close the page.
                            </p>
                        </div>
                    </div>
                )}

                <div className="h-auto border border-gray-500 w-full rounded-lg mt-12">
                    <div className="bg-slate-400/30 border text-black/80 border-black rounded-lg p-4 font-bold">
                        ORDER INFORMATION
                    </div>
                    <div className="p-5 flex flex-col items-center">
                        <h1 className="font-bold text-sm text-black/80">
                            Order ID
                        </h1>
                        <h1 className="font-bold text-3xl mt-2 text-black/80">
                            {order.order_id}
                        </h1>
                        <div className="border-b border-gray-500 h-2 w-full" />
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="text-xs font-bold text-black/60 py-2">
                                        Name
                                    </td>
                                    <td className="text-end text-xs font-bold text-black/60">
                                        {order.guest_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-xs font-bold text-black/60 py-2">
                                        Table
                                    </td>
                                    <td className="text-end text-xs font-bold text-black/60">
                                        {order.no_table}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-xs font-bold text-black/60 py-2">
                                        Order Number
                                    </td>
                                    <td className="text-end text-xs font-bold text-black/60">
                                        {!isLoading ? order.order_number : ""}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-xs font-bold text-black/60 py-2">
                                        Order Time
                                    </td>
                                    <td className="text-end text-xs font-bold text-black/60">
                                        {!isLoading ? order_time : "-"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h1
                            className="font-bold text-red-600 mt-4"
                            onClick={() => setShowSummary(!showSummary)}
                        >
                            Hide Information
                        </h1>
                    </div>
                </div>
                <div className="h-auto border border-gray-500 w-full rounded-lg mt-12">
                    <div
                        className="bg-slate-400/30 border text-red-600 border-black rounded-lg p-4 font-bold flex w-full justify-between cursor-pointer"
                        onClick={() => setShowSummary(!showSummary)}
                    >
                        <h1>ORDER SUMMARY</h1>
                        {showSummary ? (
                            <IoCaretUpOutline className="text-2xl" />
                        ) : (
                            <IoCaretDownOutline className="text-2xl" />
                        )}
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            showSummary ? "max-h-screen" : "max-h-0"
                        }`}
                    >
                        {showSummary && (
                            <div className="p-5 flex flex-col items-center">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <td className="text-xs font-bold text-center text-black/80">
                                                Qty
                                            </td>
                                            <td className="text-xs font-bold text-black/80">
                                                Item
                                            </td>
                                            <td className="text-xs font-bold text-center text-black/80">
                                                Price
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order &&
                                            order.order_details.length > 0 &&
                                            order.order_details.map(
                                                (item, i) => (
                                                    <tr key={i}>
                                                        <td className="text-xs font-medium text-center">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="text-xs font-medium">
                                                            {item.product.name}
                                                        </td>
                                                        <td className="text-xs font-medium text-center">
                                                            {item.product.price}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <RedirectButton
                    className="bg-primary mt-8"
                    href={`/?no_meja=${no_meja}`}
                >
                    CONTINUE BROWSING
                </RedirectButton>
            </div>
        </OrderLayout>
    );
};

export default OrderInformationPage;
