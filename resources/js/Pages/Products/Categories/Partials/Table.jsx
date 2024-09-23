import { Link, router } from "@inertiajs/react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { FiDownload, FiEdit, FiTrash } from "react-icons/fi";

const TableProductCategory = ({ categories }) => {
    console.log(categories)


    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6 text-center">Nama</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={3}
                                className="py-3 px-6 text-center text-black"
                            >
                                Belum ada kategori menu..
                            </td>
                        </tr>
                    )}
                    {categories.map((item, index) => (
                        <tr
                            key={item.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6 text-center">{item.name}</td>
                            <td className="py-3 px-6">
                                <ActionTableProductCategory item={item} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ActionTableProductCategory = ({ item }) => {
    const handleDelete = () => {
        if (confirm("Are you sure to delete this item?")) {
            router.delete("/categories/" + item.id);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <Link
                href={"/categories/" + item.id}
                className="p-2 bg-blue-500/10 text-blue-500 rounded-md"
            >
                <FiEdit size={20} />
            </Link>
            <button
                onClick={handleDelete}
                className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/30 transition-all duration-300"
            >
                <FiTrash size={20} />
            </button>
        </div>
    );
};


export default TableProductCategory;
