import OrderLayout from "@/Layouts/OrderLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import OrderComponent from "@/Components/OrderComponent";
import Swal from "sweetalert2";
import axios from "axios"; // Import axios for making requests
import Modal from "@/Components/Modal";
import FeedbackModal from "@/Components/FeedbackModal";

const CreateOrderPage = ({ products, groups, query }) => {
    const noMeja = query.no_meja || "";
    const orderId = query.order_id || "";
    const sessionId = query.session_id || "";

    const [isModal, setIsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [dataOrder, setDataOrder] = useState(() => {
        const savedOrder = localStorage.getItem("dataOrder");
        return savedOrder ? JSON.parse(savedOrder) : [];
    });
    const [activeCategory, setActiveCategory] = useState(null);
    const [isFeedback, setIsFeedback] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Declare searchQuery state

    const handleActiveCategory = (category) => {
        setActiveCategory(category);
    };

    useEffect(() => {
        localStorage.setItem("dataOrder", JSON.stringify(dataOrder));
    }, [dataOrder]);

    useEffect(() => {
        localStorage.setItem("no_meja", noMeja);
        localStorage.setItem("order_id", orderId);
        localStorage.setItem("session_id", sessionId);
    }, [noMeja, orderId, sessionId]);

    useEffect(() => {
        const feedbackSubmitted = localStorage.getItem("feedbackSubmitted");
        if (feedbackSubmitted) {
            setIsFeedback(false);
        } else {
            checkFeedbackStatus();
        }
    }, []);

    const checkFeedbackStatus = async () => {
        if (sessionId) {
            try {
                const response = await axios.get(
                    `/api/orders/check-complete/${sessionId}`
                );
                setIsFeedback(response.data.isFeedback);
            } catch (error) {
                console.error("Error checking order status:", error);
            }
        }
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
            if (selectedItem.stock === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Maaf",
                    text: "Stok habis!",
                });
                return;
            }
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

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory
            ? product.category.name
                  .toLowerCase()
                  .includes(activeCategory.toLowerCase())
            : true;

        const matchesSearch = searchQuery
            ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesCategory && matchesSearch;
    });

    return (
        <OrderLayout
            products={products}
            onCategoryChange={handleActiveCategory}
            onSearch={handleSearch} // Pass the search handler
            activeCategory={activeCategory}
        >
            <Head title="Orders" />
            <div className="relative">
                <div className="shadow-2xl">
                    <div className="md:hidden h-[500px] border-2 border-gold grid grid-cols-2 grid-rows-2 md:grid-rows-4 md:grid-cols-4">
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
                                    className="w-44 h-36 rounded-lg"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:grid grid-cols-4 mt-4 mb-2 px-2">
                        {groups.map((group, index) => (
                            <Link
                                key={index}
                                href={`/menus-by-group/${group.id}?no_meja=${noMeja}&order_id=${orderId}`}
                                className="w-full flex flex-col justify-center items-center border-2 border-gold cursor-pointer p-2"
                            >
                                <h1 className="text-center mb-1 text-lg italic font-extrabold text-white">
                                    {group.name}
                                </h1>
                                <img
                                    src={`/storage/${group.image}`}
                                    alt={group.name}
                                    className="w-44 h-36 rounded-lg"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="h-full bg-cream">
                    <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4 pb-20">
                        {filteredProducts.length === 0 && (
                            <div>Tidak ada menu</div>
                        )}
                        {filteredProducts.map((item, index) => (
                            <div
                                key={index}
                                className={`w-44 lg:w-64 p-3 flex flex-col justify-between items-center border-2 rounded-xl mx-auto ${
                                    item.stock === 0
                                        ? "bg-black/80"
                                        : "bg-primary"
                                }`}
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    className={`w-32 h-32 lg:w-64 lg:h-64 rounded-3xl ${
                                        !item.stock ? "filter grayscale" : ""
                                    }`}
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
                                        disabled={!item.stock}
                                    >
                                        add +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <FeedbackModal
                        isFeedback={isFeedback}
                        setIsFeedback={setIsFeedback}
                    />
                    <OrderComponent
                        isModal={isModal}
                        setIsModal={setIsModal}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        dataOrder={dataOrder}
                        setDataOrder={setDataOrder}
                        products={filteredProducts}
                        addToCart={addToCart}
                        handleQty={handleQty}
                    />
                </div>
            </div>
        </OrderLayout>
    );
};

export default CreateOrderPage;
