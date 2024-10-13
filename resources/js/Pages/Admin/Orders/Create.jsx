import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FormOrder from "./Partials/Form";

const AdminCreateOrderPage = ({ auth, products, tables }) => {
    const { data, setData, post, errors, processing } = useForm({
        guest_name: "",
        no_meja: "",
        items: [],
    });

    const submit = () => {
        post(route("admin.store.orders"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Buat Order
                </h2>
            }
        >
            <Head title="Buat Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormOrder
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                            products={products}
                            tables={tables}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminCreateOrderPage;
