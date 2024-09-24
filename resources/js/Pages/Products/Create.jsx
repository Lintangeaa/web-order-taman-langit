import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormProduct from "./Partials/Form";

const CreateProductPage = ({ auth, categories }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category_id: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Buat Menu
                </h2>
            }
        >
            <Head title="Tambah Menu Baru" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormProduct
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                            categories={categories}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateProductPage;
