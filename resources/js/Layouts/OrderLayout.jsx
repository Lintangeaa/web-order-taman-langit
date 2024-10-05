import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import Modal from "@/Components/Modal";

export default function OrderLayout({
    children,
    path,
    showbar = true,
    products,
    onCategoryChange,
    activeCategory,
}) {
    const [isSidebar, setIsSidebar] = useState(false);

    useEffect(() => {
        let timeoutId;

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                console.log(
                    "Tab is hidden, starting timeout to clear local storage..."
                );
                timeoutId = setTimeout(() => {
                    console.log("Clearing local storage after 5 minutes...");
                    localStorage.removeItem("guest_name");
                    localStorage.removeItem("session_id");
                }, 300000);
            } else {
                clearTimeout(timeoutId);
                console.log("Tab is visible, clearing any existing timeouts.");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    const session_id = localStorage.getItem("session_id");
    const no_meja = localStorage.getItem("no_meja");
    const currentPath = window.location.pathname;
    if (!session_id && currentPath !== "/") {
        localStorage.removeItem("session_id");
        window.location.href = `/?no_meja=${no_meja}`;
    }
    const guest_name = localStorage.getItem("guest_name");
    const handleBill = () => {
        window.location.href = `/order-bills/${session_id}`;
    };

    const uniqueCategories = new Set();

    console.log("products", products);

    const categories = products.reduce((acc, item) => {
        const { id, name, image } = item.category;

        if (!uniqueCategories.has(id)) {
            uniqueCategories.add(id);
            acc.push({ id, name, image });
        }

        return acc;
    }, []);

    console.log(activeCategory);

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-primary">
            <header className="w-full shadow-2xl rounded-b-md bg-primary z-50">
                <div
                    className={`bg-primary flex ${
                        showbar ? "justify-between" : "justify-center"
                    } items-center w-full py-6 px-4`}
                >
                    <div className="flex w-1/3">
                        <FaBars
                            className="text-white text-3xl"
                            onClick={() => setIsSidebar(true)}
                        />
                    </div>
                    <div className="flex w-1/3 justify-center items-center">
                        <img
                            src="/tamanlangithead.webp"
                            alt="Taman Langit"
                            className="w-32"
                        />
                    </div>
                    <div className="flex space-x-1 justify-end items-center w-1/3">
                        <div
                            className="flex flex-col justify-center items-center cursor-pointer"
                            onClick={handleBill}
                        >
                            <HiOutlineClipboardDocumentList className="text-white text-3xl" />
                            <p className="text-xs text-white italic">
                                View Bill
                            </p>
                        </div>
                        <AiOutlineSearch className="text-white text-4xl" />
                    </div>
                </div>
                {path ? (
                    <div className="py-2">
                        <div className="h-6 bg-gold w-full mb-6 shadow-2xl">
                            <h1 className="font-black text-white text-center italic">
                                {path}
                            </h1>
                        </div>
                        {path === "FOOD" || path === "BEVERAGE" ? (
                            <div className="flex space-x-1 overflow-x-auto mt-4 px-4 pb-4 transition-all duration-300">
                                {categories.length > 0 &&
                                    categories.map((item, i) => (
                                        <div
                                            key={i}
                                            className={`w-20  rounded-2xl flex-shrink-0  justify-center items-center`}
                                            onClick={() =>
                                                onCategoryChange(item.name)
                                            }
                                        >
                                            <div className="flex flex-col justify-center items-center">
                                                <p className="text-xs text-white text-center mb-1">
                                                    {item.name}
                                                </p>
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    className="h-16 w-16 rounded-lg"
                                                />
                                                <div
                                                    className={`mt-4 h-2 w-16 rounded-lg ${
                                                        activeCategory ===
                                                        item.name
                                                            ? "bg-gold"
                                                            : "bg-primary"
                                                    }`}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </header>
            <Modal show={isSidebar} onClose={() => setIsSidebar(false)}>
                <div
                    className="w-full h-screen bg-black/20 pe-10 pb-10"
                    onClick={() => setIsSidebar(false)}
                >
                    <div
                        className="w-full bg-white h-full py-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="px-2 text-2xl font-semibold">WELCOME</h1>
                        <div className="flex space-x-1 text-xl items-center px-2">
                            <CiUser /> <h1>{guest_name}</h1>
                        </div>
                        <div className="border-t border-black/20 mt-6 mb-4" />
                        <h1 className="px-2 text-xl font-bold mb-2 text-black/80">
                            WELCOME
                        </h1>
                        <h1 className="px-2 text-xl font-bold mb-2 text-black/80">
                            {path}
                        </h1>
                        <div className="flex flex-col">
                            {categories.map((item, i) => (
                                <div
                                    key={i}
                                    className={`p-2 ${
                                        activeCategory === item.name
                                            ? "bg-moca"
                                            : ""
                                    }`}
                                    onClick={() => onCategoryChange(item.name)}
                                >
                                    <h2>{item.name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="w-full max-w-md md:max-w-full bg-primary shadow-md overflow-hidden sm:rounded-lg -mt-2">
                {children}
            </div>
        </div>
    );
}
