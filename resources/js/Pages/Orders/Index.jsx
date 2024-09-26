import OrderLayout from "@/Layouts/OrderLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const CreateOrderPage = ({ products }) => {
    console.log(products);
    return (
        <OrderLayout>
            <Head title="Orders" />
            <div className="shadow-2xl">
                <div className="h-[500px] border-2 border-gold grid grid-cols-2 grid-rows-2">
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            className="w-44"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            className="w-44"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            className="w-44"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            className="w-44"
                        />
                    </div>
                </div>
            </div>
            <div className="h-full bg-cream">
                <div className="p-4 grid grid-cols-2 grid-rows-2 gap-4">
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
            </div>
        </OrderLayout>
    );
};

export default CreateOrderPage;
