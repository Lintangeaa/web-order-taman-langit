import Alert from "@/Components/Alert";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const TableProducts = ({ products, categories }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

    // Filter products based on search term and selected category
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            product.group.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "" ||
            product.category.name === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = sortedProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="overflow-x-scroll">
            <input
                type="text"
                placeholder="Search"
                className="p-2 border border-gray-300 rounded mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Category filter dropdown */}
            <select
                className="p-2 border border-gray-300 rounded mb-4 w-44"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Semua Kategori</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <select
                className="p-2 border border-gray-300 rounded mb-4 w-44"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
            >
                <option value="asc">Harga Terendah</option>
                <option value="desc">Harga Tertinggi</option>
            </select>

            <table className="table-auto py-12 w-full text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                <thead className="text-sm text-black uppercase bg-white">
                    <tr>
                        <th className="py-3 px-6">#</th>
                        <th className="py-3 px-6 text-center">Nama</th>
                        <th className="py-3 px-6 text-center">Deskripsi</th>
                        <th className="py-3 px-6 text-center">Harga</th>
                        <th className="py-3 px-6 text-center">Ketersediaan</th>
                        <th className="py-3 px-6 text-center">Gambar</th>
                        <th className="py-3 px-6 text-center">Kategori</th>
                        <th className="py-3 px-6 text-center">Group</th>
                        <th className="py-3 px-6 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.length === 0 && (
                        <tr className="bg-white/80">
                            <td
                                colSpan={9}
                                className="py-3 px-6 text-center text-black"
                            >
                                Belum ada menu yang tersedia..
                            </td>
                        </tr>
                    )}
                    {currentProducts.map((item, index) => (
                        <tr
                            key={item.id}
                            className="bg-white/80 text-black rounded-md"
                        >
                            <td className="py-3 px-6">
                                {startIndex + index + 1}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.name}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {item.description}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(parseFloat(item.price))}
                            </td>
                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                {item.stock === 1 ? (
                                    <span className="text-green-500">
                                        Tersedia
                                    </span>
                                ) : (
                                    <span className="text-red-500">
                                        Tidak Tersedia
                                    </span>
                                )}
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
                            <td className="py-3 px-6 text-center">
                                {item.group ? item.group.name : "No Group"}
                            </td>
                            <td className="py-3 px-6">
                                <ActionTableProduct item={item} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end">
                <select
                    className="p-2 border border-gray-300 rounded mb-4 w-16"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
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
                href={`/products/edit/${item.id}`}
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
