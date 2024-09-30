import { Link, router } from "@inertiajs/react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { FiDownload, FiEdit, FiTrash } from "react-icons/fi";

const TableProductGroup = ({ groups }) => {
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6 text-center">Nama</th>
                        <th className="py-3 px-6 text-center">Gambar</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={4}
                                className="py-3 px-6 text-center text-black"
                            >
                                Belum ada group menu..
                            </td>
                        </tr>
                    )}
                    {groups.map((item, index) => (
                        <tr
                            key={item.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6 text-center">
                                {item.name}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.image && (
                                    <div className="flex justify-center">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            style={{
                                                width: "100px",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                )}
                            </td>
                            <td className="py-3 px-6">
                                <ActionTableProductGroup item={item} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ActionTableProductGroup = ({ item }) => {
    const handleDelete = () => {
        if (confirm(`Apakah anda yakin akan menghapus group ${item.name}?`)) {
            router.delete(route("groups.destroy", item.id));
        }
    };

    return (
        <div className="flex items-center justify-center gap-3">
            <Link
                href={"/products/groups/edit/" + item.id}
                className="p-2 bg-blue-500/10 hover:bg-blue-500/30 text-blue-500 rounded-md transition-all duration-300"
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

export default TableProductGroup;
