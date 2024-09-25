// src/Components/Alert.js
import React, { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
                type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
        >
            {message}
        </div>
    );
};

export default Alert;
