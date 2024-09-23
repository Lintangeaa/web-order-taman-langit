import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import TableProducts from "./Partials/Table";

export default function GetAllProducts({ auth, products }) {
    console.log('products',products);
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Menu
                </h2>
            }
        >
            <Head title="Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="w-full flex justify-end">
                        <Link
                            className="p-2 rounded-full bg-white text-black text-sm "
                            href="/products/create"
                        >
                            <FiPlus size={20} />
                        </Link>
                    </div>
                    <TableProducts products={products} />
                </div>
            </div>
        </Authenticated>
    );
}
