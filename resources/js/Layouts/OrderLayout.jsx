import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function OrderLayout({ children, path, showbar = true }) {
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
                }, 300000); // 5 minutes
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
    const handleBill = () => {
        window.location.href = `/order-bills/${session_id}`;
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-primary">
            <header className="w-full shadow-2xl rounded-b-md bg-primary z-50">
                <div
                    className={`bg-primary flex ${
                        showbar ? "justify-between" : "justify-center"
                    } items-center w-full py-6 px-4`}
                >
                    <div className="flex w-1/3">
                        <FaBars className="text-white text-3xl " />
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
                    <div className="h-6 bg-gold w-full mb-6 shadow-2xl">
                        <h1 className="font-black text-white text-center italic">
                            {path}
                        </h1>
                    </div>
                ) : (
                    ""
                )}
            </header>

            <div className="w-full sm:max-w-md bg-primary shadow-md overflow-hidden sm:rounded-lg -mt-2">
                {children}
            </div>
        </div>
    );
}
