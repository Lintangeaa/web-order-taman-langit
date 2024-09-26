import OrderLayout from "@/Layouts/OrderLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const ProductByGroup = ({ products, categories, group, no_meja, order_id }) => {
    return (
        <OrderLayout path={group.name}>
            <Head title="Orders" />

            <div className="h-full bg-cream min-h-screen">
                {group.name === "FOR YOU" || group.name === "NEW MENU" ? (
                    <div className={`p-4 grid grid-cols-1 gap-4`}>
                        {products.length === 0 && <div>Tidak ada menu</div>}
                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="w-full lg:w-80 p-3 flex flex-col justify-between items-center border-2 bg-primary rounded-xl mx-auto"
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    className="w-full lg:w-64 lg:h-64 rounded-3xl"
                                    alt="Taman Langit"
                                />
                                <h1 className="text-white text-lg font-black mt-8">
                                    {item.name}
                                </h1>
                                <div className="mt-8 flex justify-between items-center text-lg text-white md:text-base w-full">
                                    <p>Rp {item.price}</p>
                                    <button className="bg-white text-black rounded-lg px-4">
                                        add +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`p-4 grid grid-cols-2 gap-4`}>
                        {products.length === 0 && <div>Tidak ada menu</div>}
                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="w-44 lg:w-80 p-3 flex flex-col justify-between items-center border-2 bg-primary rounded-xl mx-auto"
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    className="w-32 h-32 lg:w-64 lg:h-64 rounded-3xl"
                                    alt="Taman Langit"
                                />
                                <h1 className="text-white text-xs md:text-base mt-4">
                                    {item.name}
                                </h1>
                                <div className="mt-6 flex justify-between items-center text-xs text-white md:text-base w-full">
                                    <p>Rp {item.price}</p>
                                    <button className="bg-white text-black rounded-lg px-2">
                                        add +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </OrderLayout>
    );
};

export default ProductByGroup;
