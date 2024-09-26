import Alert from "@/Components/Alert";
import { Link, router, useForm } from "@inertiajs/react";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { FiDownload, FiEdit, FiTrash } from "react-icons/fi";

const TableProducts = ({ products }) => {
    return (
        <div className="overflow-x-scroll">
            <table className="table-auto py-12 w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6 text-center">Nama</th>
                        <th className="py-3 px-6 text-center">Deskripsi</th>
                        <th className="py-3 px-6 text-center">Harga</th>
                        <th className="py-3 px-6 text-center">Stok</th>
                        <th className="py-3 px-6 text-center">Gambar</th>
                        <th className="py-3 px-6 text-center">Kategori</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={8}
                                className="py-3 px-6 text-center text-black"
                            >
                                Belum ada menu yang tersedia..
                            </td>
                        </tr>
                    )}
                    {products.map((item, index) => (
                        <tr
                            key={item.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6 text-center">
                                {item.name}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.description}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.price}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.stock}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.image && (
                                    <div className="flex justify-center">
                                        <img
                                            src={`storage/${item.image}`}
                                            alt={item.name}
                                            style={{
                                                width: "100px",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                )}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.category
                                    ? item.category.name
                                    : "No Category"}
                            </td>
                            <td className="py-3 px-6">
                                <ActionTableProduct item={item} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ActionTableProduct = ({ item }) => {
    const { delete: del } = useForm({});

    const [alert, setAlert] = useState({ message: "", type: "" });

    const handleDelete = (e) => {
        if (confirm(`Apakah anda yakin akan menghapus produk ${item.name}?`)) {
            e.preventDefault();
            del(route("products.delete", item.id), {
                onSuccess: (response) => {
                    console.log(response);
                    if (response.props.flash.success) {
                        setAlert({
                            message: response.props.flash.success,
                            type: "success",
                        });
                    }
                },
                onError: (response) => {
                    if (response.props.flash.error) {
                        setAlert({
                            message: response.props.flash.error,
                            type: "error",
                        });
                    }
                },
            });
        }
    };

    const closeAlert = () => {
        setAlert({ message: "", type: "" });
    };

    return (
        <div className="flex items-center gap-3">
            <Link
                href={"/products/edit/" + item.id}
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
            <Alert
                message={alert.message}
                type={alert.type}
                onClose={closeAlert}
            />
        </div>
    );
};

export default TableProducts;
