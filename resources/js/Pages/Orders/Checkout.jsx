import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";

const CheckoutPage = () => {
    const [dataOrder, setDataOrder] = useState(() => {
        const savedOrder = localStorage.getItem("dataOrder");
        return savedOrder ? JSON.parse(savedOrder) : [];
    });

    console.log(dataOrder);

    return (
        <div className="bg-cream min-h-screen">
            <Head title={"Checkout"} />
            <header className="w-full h-16 bg-white shadow-lg flex items-center p-8">
                <div className="w-1/3 flex items-center justify-start">
                    <BsArrowLeft className="text-xl text-primary" />
                </div>
                <div>
                    <div className="flex justify-center items-center space-x-1">
                        <FaCartPlus className="text-primary" />
                        <h1 className="text-lg font-black">ORDER CART</h1>
                    </div>
                    <p className="text-xs">Taman Langit Cafe Baturaden</p>
                </div>
            </header>
            <div className="p-4 shadow-lg w-full overflow-x-auto">
                <h1 className="text-primary font-bold text-sm mt-6">
                    WE ALSO RECOMMEND THESE
                </h1>
                <div className="flex space-x-3 overflow-x-auto">
                    <div className="flex-shrink-0 w-64 h-20 bg-roxy rounded-xl"></div>
                    <div className="flex-shrink-0 w-64 h-20 bg-roxy"></div>
                    <div className="flex-shrink-0 w-64 h-20 bg-roxy"></div>
                    <div className="flex-shrink-0 w-64 h-20 bg-roxy"></div>
                    <div className="flex-shrink-0 w-64 h-20 bg-roxy"></div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
