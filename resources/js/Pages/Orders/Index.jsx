import OrderLayout from "@/Layouts/OrderLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import OrderComponent from "@/Components/OrderComponent";

const CreateOrderPage = ({ products, groups, query }) => {
    const noMeja = query.no_meja || "";
    const orderId = query.order_id || "";

    const [isModal, setIsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [dataOrder, setDataOrder] = useState(() => {
        const savedOrder = localStorage.getItem("dataOrder");
        return savedOrder ? JSON.parse(savedOrder) : [];
    });

    useEffect(() => {
        localStorage.setItem("dataOrder", JSON.stringify(dataOrder));
    }, [dataOrder]);

    useEffect(() => {
        localStorage.setItem("no_meja", noMeja);
        localStorage.setItem("order_id", orderId);
    }, [noMeja, orderId]);

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
                if (existingItemIndex > -1) {
                    const updatedOrder = [...prev];
                    updatedOrder[existingItemIndex].quantity = quantity;
                    return updatedOrder;
                } else {
                    return [
                        ...prev,
                        { productId: selectedItem.id, quantity: quantity },
                    ];
                }
            });
            setIsModal(false);
        }
    };

    return (
        <OrderLayout>
            <Head title="Orders" />
            <div className="relative">
                <div className="shadow-2xl">
                    <div className="h-[500px] border-2 border-gold grid grid-cols-2 grid-rows-2">
                        {groups.map((group, index) => (
                            <Link
                                key={index}
                                href={`/menus-by-group/${group.id}?no_meja=${noMeja}&order_id=${orderId}`}
                                className="w-full flex flex-col justify-center items-center border-2 border-gold cursor-pointer"
                            >
                                <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                                    {group.name}
                                </h1>
                                <img
                                    src={`/storage/${group.image}`}
                                    alt={group.name}
                                    className="w-44"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="h-full bg-cream">
                    <div className="p-4 grid grid-cols-2 gap-4 pb-20">
                        {products.length === 0 && <div>Tidak ada menu</div>}
                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="w-44 lg:w-80 p-3 flex flex-col justify-between items-center border-2 bg-primary rounded-xl mx-auto"
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    className="w-32 h-32 lg:w-64 lg:h-64 rounded-3xl"
                                    alt={item.name}
                                />
                                <h1 className="text-white text-xs md:text-base mt-4">
                                    {item.name}
                                </h1>
                                <div className="mt-6 flex justify-between items-center text-xs text-white md:text-base w-full">
                                    <p>Rp {item.price}</p>
                                    <button
                                        className="bg-white text-black rounded-lg px-2"
                                        onClick={() => handleModal(item)}
                                    >
                                        add +
                                    </button>
                                </div>
                            </div>
                        ))}
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
                </div>
            </div>
        </OrderLayout>
    );
};

export default CreateOrderPage;
