// components/OrderComponent.js
import React from "react";
import Modal from "@/Components/Modal";
import { BsCart3, BsChevronRight } from "react-icons/bs";

const OrderComponent = ({
    isModal,
    setIsModal,
    selectedItem,
    setSelectedItem,
    quantity,
    setQuantity,
    dataOrder,
    setDataOrder,
    products,
    addToCart,
    handleQty,
}) => {
    const calculateTotal = () => {
        return dataOrder.reduce((total, orderItem) => {
            const product = products.find((p) => p.id === orderItem.productId);
            return total + (product ? product.price * orderItem.quantity : 0);
        }, 0);
    };

    const totalPrice = calculateTotal();
    console.log(dataOrder);

    return (
        <>
            <Modal show={isModal} onClose={() => setIsModal(false)}>
                <div
                    className="flex flex-col items-end justify-end w-full min-h-screen"
                    onClick={() => setIsModal(false)}
                >
                    <div
                        className="h-1/2 bg-cream w-full border-t border-primary shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedItem && (
                            <div className="p-4 flex flex-col justify-center">
                                <div className="mx-auto ">
                                    <img
                                        src={`/storage/${selectedItem.image}`}
                                        alt={selectedItem.name}
                                        className="max-w-xs rounded-lg"
                                    />
                                </div>
                                <div className="mt-2">
                                    <h1 className="text-black font-black">
                                        {selectedItem.name}
                                    </h1>
                                    <p className="text-xs mt-2">
                                        Rp. {selectedItem.price}
                                    </p>
                                    <p className="text-xs mt-2">
                                        {selectedItem.description}
                                    </p>
                                </div>
                                <div className="flex mt-4 w-full justify-between">
                                    <div className="flex justify-between items-center bg-primary px-1 rounded-lg text-white">
                                        <button
                                            onClick={() => handleQty(-1)}
                                            className="px-2"
                                        >
                                            -
                                        </button>
                                        <p className="px-2 bg-white text-black">
                                            {quantity}
                                        </p>
                                        <button
                                            onClick={() => handleQty(1)}
                                            className="px-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="bg-primary rounded-xl text-xs px-3 p-1 text-white hover:bg-primary/60"
                                        onClick={addToCart}
                                    >
                                        Tambahkan Keranjang
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            {dataOrder.length > 0 && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-20">
                    <a
                        href={route("orders.checkout")}
                        className="bg-primary shadow-2xl text-white px-6 py-2 rounded-lg flex items-center justify-between w-full"
                    >
                        <div className="relative">
                            <BsCart3 className="mr-2 text-2xl" />
                            <div className="absolute top-0 right-1 px-1.5 rounded-full bg-white">
                                <p className="text-xs text-black">
                                    {dataOrder.length}
                                </p>
                            </div>
                        </div>
                        <p>Rp. {totalPrice}</p>
                        <div className="flex items-center space-x-2">
                            CHECKOUT
                            <BsChevronRight className="font-black" />
                        </div>
                    </a>
                </div>
            )}
        </>
    );
};

export default OrderComponent;
