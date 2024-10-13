import { Link, router } from "@inertiajs/react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { FiDownload, FiEdit, FiTrash } from "react-icons/fi";

const TableMeja = ({ tables }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrValue, setQrValue] = useState("");

    const handleQrClick = (value) => {
        setQrValue(value);
        setIsModalOpen(true);
    };

    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6 text-center">Nomor</th>
                        <th className="py-3 px-6 text-center">QR</th>
                        {/* <th className="py-3 px-6 text-center">Aksi</th> */}
                    </tr>
                </thead>
                <tbody>
                    {tables.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={5}
                                className="py-3 px-6 text-center text-black"
                            >
                                Belum ada meja..
                            </td>
                        </tr>
                    )}
                    {tables.map((item, index) => (
                        <tr
                            key={item.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6 text-center">{item.no}</td>
                            <td className="py-3 px-6">
                                <div className="flex justify-center items-center">
                                    <QRCodeCanvas
                                        className="border-2 border-green-500 p-1 rounded cursor-pointer"
                                        size={50}
                                        value={`https://tamanlangit.my.id?no_meja=${item.no}`}
                                        onClick={() => handleQrClick(item.no)}
                                    />
                                </div>
                            </td>
                            {/* <td className="py-3 px-6 flex justify-center items-center">
                                <ActionsTableMeja item={item} />
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <QrModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                no={qrValue}
            />
        </div>
    );
};

const ActionsTableMeja = ({ item }) => {
    const handleDelete = () => {
        if (confirm("Are you sure to delete this item?")) {
            router.delete("/users/" + item.id);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleDelete}
                className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/30 transition-all duration-300"
            >
                <FiTrash size={20} />
            </button>
        </div>
    );
};

const QrModal = ({ isOpen, onClose, no }) => {
    const qrRef = React.useRef(null);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDownload = () => {
        if (qrRef.current) {
            const canvas = qrRef.current;
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `qr-meja-${no}.png`;
            link.click();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white p-4 rounded-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-2">QR Code</h2>
                <QRCodeCanvas
                    ref={qrRef}
                    size={400}
                    value={`https://tamanlangit.my.id?no_meja=${no}`}
                />
                <div className="flex justify-center">
                    <FiDownload
                        onClick={handleDownload}
                        className="mt-4 text-3xl bg-green-200 p-1 text-green-500 rounded-md cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default TableMeja;
