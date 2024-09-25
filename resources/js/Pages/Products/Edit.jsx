import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FormProduct from "./Partials/Form";

const EditProductPage = ({ auth, product, categories }) => {
    const { data, setData, post, errors, processing } = useForm({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        image: null,
    });

    console.log(product);

    const submit = (e) => {
        e.preventDefault();
        post(route("products.update", product.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Edit Produk
                </h2>
            }
        >
            <Head title="Edit Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormProduct
                            setData={setData}
                            data={data}
                            categories={categories}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditProductPage;
