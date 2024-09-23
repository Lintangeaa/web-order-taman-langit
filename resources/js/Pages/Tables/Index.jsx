import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TableMeja from "./Partials/Table";
import { FiPlus } from "react-icons/fi";

export default function GetAllTables({ auth, tables }) {
    console.log(tables);
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Meja
                </h2>
            }
        >
            <Head title="Meja" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="w-full flex justify-end">
                        <Link
                            className="p-2 rounded-full bg-white text-black text-sm "
                            href="/table/create"
                        >
                            <FiPlus size={20} />
                        </Link>
                    </div>
                    <TableMeja tables={tables} />
                </div>
            </div>
        </Authenticated>
    );
}
