import OrderLayout from "@/Layouts/OrderLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import OrderComponent from "@/Components/OrderComponent";

const ProductByGroup = ({ products, categories, group, no_meja, order_id }) => {
    const [isModal, setIsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [dataOrder, setDataOrder] = useState(() => {
        const savedOrder = localStorage.getItem("dataOrder");
        return savedOrder ? JSON.parse(savedOrder) : [];
    });
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Declare searchQuery state

    useEffect(() => {
        localStorage.setItem("dataOrder", JSON.stringify(dataOrder));
    }, [dataOrder]);

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

    const handleActiveCategory = (category) => {
        setActiveCategory(category);
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
            path={group.name}
            products={products}
            onCategoryChange={handleActiveCategory}
            activeCategory={activeCategory}
            onSearch={handleSearch}
        >
            <Head title="Orders" />
            <div className="h-full bg-cream min-h-screen">
                {group.name === "FOR YOU" || group.name === "NEW MENU" ? (
                    <div className={`p-4 grid grid-cols-1 gap-4`}>
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
                                    <p>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(parseFloat(item.price))}
                                    </p>
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
                ) : (
                    <div
                        className={`p-4 grid grid-cols-2 md:grid-cols-5 gap-4`}
                    >
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
                )}
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
        </OrderLayout>
    );
};

export default ProductByGroup;
