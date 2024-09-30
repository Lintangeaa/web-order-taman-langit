import Modal from "@/Components/Modal";
import OrderComponent from "@/Components/OrderComponent";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

const CheckoutPage = ({ recommended, products }) => {
    const [dataOrder, setDataOrder] = useState(() => {
        const savedOrder = localStorage.getItem("dataOrder");
        return savedOrder ? JSON.parse(savedOrder) : [];
    });
    const [isModal, setIsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const calculateTotal = () => {
        return dataOrder.reduce((total, orderItem) => {
            const product = products.find((p) => p.id === orderItem.productId);
            return total + (product ? product.price * orderItem.quantity : 0);
        }, 0);
    };

    const totalPrice = calculateTotal();
    const total_service = 20000;
    const total_pbi = totalPrice * 0.1;
    const totalPayment = totalPrice + total_service + total_pbi;

    const updateQuantity = (productId, increment) => {
        setDataOrder((prev) => {
            const itemIndex = prev.findIndex(
                (item) => item.productId === productId
            );
            if (itemIndex > -1) {
                const updatedOrder = [...prev];
                const currentItem = updatedOrder[itemIndex];
                const newQuantity = Math.max(
                    0,
                    currentItem.quantity + increment
                );

                if (newQuantity === 0) {
                    return updatedOrder.filter(
                        (_, index) => index !== itemIndex
                    );
                } else {
                    updatedOrder[itemIndex].quantity = newQuantity;
                    return updatedOrder;
                }
            }
            return prev;
        });
    };

    const handleModal = (item) => {
        setSelectedItem(item);
        const existingOrder = dataOrder.find(
            (orderItem) => orderItem.productId === item.id
        );
        setQuantity(existingOrder ? existingOrder.quantity : 1);
        setIsModal(true);
    };

    const handleQty = (val) => {
        setQuantity((prev) => Math.max(1, prev + val));
    };

    const addToCart = () => {
        if (selectedItem) {
            setDataOrder((prev) => {
                const existingItemIndex = prev.findIndex(
                    (orderItem) => orderItem.productId === selectedItem.id
                );

                const newItem = {
                    productId: selectedItem.id,
                    quantity: quantity,
                    name: selectedItem.name,
                    price: selectedItem.price,
                    image: selectedItem.image,
                };

                if (existingItemIndex > -1) {
                    const updatedOrder = [...prev];
                    updatedOrder[existingItemIndex].quantity = quantity;
                    return updatedOrder;
                } else {
                    return [...prev, newItem];
                }
            });
            setIsModal(false);
        }
    };

    const order_id = localStorage.getItem("order_id");

    const confirmOrder = async () => {
        try {
            const items = dataOrder.map((item) => ({
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));

            const response = await fetch(`/api/orders/${order_id}/details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items, total_service, total_pbi }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Network response was not ok"
                );
            }

            const result = await response.json();
            console.log(result.message);
            localStorage.removeItem("dataOrder");
            setConfirmModal(false);
            window.location.href = `/order-informations/${order_id}`;
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Error confirming order:", error);
        }
    };

    return (
        <div className="bg-cream min-h-screen pb-10">
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
                <h1 className="text-primary font-bold text-sm mt-4">
                    WE ALSO RECOMMEND THESE
                </h1>
                <div className="flex space-x-3 overflow-x-auto mt-4">
                    {recommended.length > 0 &&
                        recommended.map((item, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 flex w-80 space-x-2 h-20 bg-roxy rounded-2xl p-2 items-center"
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    className="w-1/3 h-16 rounded-lg"
                                />

                                <div className="flex flex-col justify-between h-full py-1 w-full">
                                    <h1 className="text-xs font-black">
                                        {item.name}
                                    </h1>
                                    <div className="flex justify-between w-full">
                                        <h1 className="text-xs font-black">
                                            Rp. {item.price}
                                        </h1>
                                        <button
                                            className="bg-white text-black text-[10px] font-bold rounded-xl px-4"
                                            onClick={() => handleModal(item)}
                                        >
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <h1 className="uppercase font-black p-4">ORDER ITEMS(S)</h1>
            <div className="mt-4 bg-white px-4">
                {dataOrder.length > 0 &&
                    dataOrder.map((dataorder, i) => (
                        <div
                            key={i}
                            className="flex py-4 w-full justify-between text-primary border-b border-primary drop-shadow-xl items-center"
                        >
                            <h1 className="text-xs font-semibold text-black w-1/3">
                                {dataorder.name}
                            </h1>
                            <div className="w-1/3">
                                <div className="flex justify-between items-center bg-primary px-1 rounded-lg text-white w-min">
                                    <button
                                        className="px-2"
                                        onClick={() =>
                                            updateQuantity(
                                                dataorder.productId,
                                                -1
                                            )
                                        }
                                    >
                                        -
                                    </button>
                                    <p className="px-2 bg-white text-black">
                                        {dataorder.quantity}
                                    </p>
                                    <button
                                        className="px-2"
                                        onClick={() =>
                                            updateQuantity(
                                                dataorder.productId,
                                                1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-xs font-semibold text-black">
                                Rp. {dataorder.price}
                            </h1>
                        </div>
                    ))}
                <div className="flex justify-between items-center py-4 shadow-lg">
                    <h1 className="uppercase font-bold text-xs">
                        PAYMENT SUMMARY
                    </h1>
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        <h1 className="font-bold text-xs">View Details</h1>
                        {showDetails ? (
                            <IoCaretUpOutline className="text-md text-primary" />
                        ) : (
                            <IoCaretDownOutline className="text-md text-primary" />
                        )}
                    </div>
                </div>
                {showDetails && (
                    <div className="flex flex-col text-xs font-semibold">
                        <div className="flex justify-between items-center py-1">
                            <h1 className="uppercase">Subtotal</h1>
                            <h1>RP. {totalPrice},00</h1>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h1 className="uppercase">Service Charge</h1>
                            <h1>RP. {total_service},00</h1>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h1 className="uppercase">PBI (10%)</h1>
                            <h1>RP. {total_pbi},00</h1>
                        </div>
                    </div>
                )}
                <div className="flex justify-between items-center py-4 border-t border-gray-300">
                    <h1 className="uppercase font-bold">Total Payment</h1>
                    <h1 className="font-bold">RP. {totalPayment},00</h1>
                </div>
            </div>
            <div className="p-6 flex justify-center">
                <PrimaryButton
                    className="px-10 shadow-xl"
                    onClick={() => setConfirmModal(true)}
                >
                    CONFIRM ORDER
                </PrimaryButton>
            </div>
            <OrderComponent
                isModal={isModal}
                setIsModal={setIsModal}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                quantity={quantity}
                setQuantity={setQuantity}
                dataOrder={dataOrder}
                setDataOrder={setDataOrder}
                products={products}
                addToCart={addToCart}
                handleQty={handleQty}
            />
            <Modal show={confirmModal} onClose={() => setConfirmModal(false)}>
                <div
                    className="bg-black/50 h-screen flex justify-center items-center"
                    onClick={() => setConfirmModal(false)}
                >
                    <div className="w-3/4 bg-white h-40 rounded-lg p-4">
                        <h1 className="font-semibold text-primary">
                            Periksa kembali pesanan Anda. Apakah semuanya sudah
                            sesuai sebelum melanjutkan?
                        </h1>
                        {errorMessage && (
                            <p className="text-red-500">{errorMessage}</p>
                        )}
                        <div className="flex w-full justify-center space-x-4 mt-5">
                            <PrimaryButton
                                className="bg-red-600"
                                onClick={() => setConfirmModal(false)}
                            >
                                Cek Kembali
                            </PrimaryButton>
                            <PrimaryButton onClick={confirmOrder}>
                                Order
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CheckoutPage;
