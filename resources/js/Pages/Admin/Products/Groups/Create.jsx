import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import RedirectButton from "@/Components/RedirectButton";
import FormGroup from "./Partials/Form";

const CreateGroupPage = ({ auth }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            image: null,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("groups.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Buat Group Menu
                </h2>
            }
        >
            <Head title="Tambah Kategori Menu Baru" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <RedirectButton href={route("categories.all")}>
                        Kembali
                    </RedirectButton>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormGroup
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateGroupPage;
