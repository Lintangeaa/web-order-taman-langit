import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import TableProducts from "./Partials/Table";
import TableProductCategory from "./Partials/Table";

export default function GetAllProductCategory({ auth, categories }) {
    console.log("products", categories);
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Kategori Menu
                </h2>
            }
        >
            <Head title="Kategori Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="w-full flex justify-end">
                        <Link
                            className="p-2 rounded-full bg-white text-black text-sm "
                            href="/products/categories/create"
                        >
                            <FiPlus size={20} />
                        </Link>
                    </div>
                    <TableProductCategory categories={categories} />
                </div>
            </div>
        </Authenticated>
    );
}
