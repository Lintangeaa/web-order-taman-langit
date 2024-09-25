import { Head } from "@inertiajs/react";
import React from "react";

const CreateOrderPage = () => {
    return (
        <div className="bg-primary min-h-screen">
            <Head title="Orders" />
            <div className="h-2/5 shadow-2xl">
                <div className="h-20">aa</div>
                <div className="h-[500px] border-2 border-gold grid grid-cols-2 grid-rows-2">
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            width={220}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            width={220}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            width={220}
                        />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center border-2 border-gold">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img
                            src="/foryou.webp"
                            alt="Taman Langit"
                            width={220}
                        />
                    </div>
                </div>
            </div>
            <div className="h-full bg-cream">
                <div className="p-4 grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="w-44 flex flex-col justify-center items-center border-2 bg-primary rounded-lg mx-auto">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img src="/foryou.webp" alt="Taman Langit" />
                    </div>
                    <div className="w-44 flex flex-col justify-center items-center border-2 bg-primary rounded-lg mx-auto">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img src="/foryou.webp" alt="Taman Langit" />
                    </div>
                    <div className="w-44 flex flex-col justify-center items-center border-2 bg-primary rounded-lg mx-auto">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img src="/foryou.webp" alt="Taman Langit" />
                    </div>
                    <div className="w-44 flex flex-col justify-center items-center border-2 bg-primary rounded-lg mx-auto">
                        <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                            FOR YOU
                        </h1>
                        <img src="/foryou.webp" alt="Taman Langit" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrderPage;
