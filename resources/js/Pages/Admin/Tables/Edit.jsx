import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormTable from "./Partials/Form";

const EditTablePage = ({ auth, table }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            no: table.no,
            status: table.status,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("tables.update"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Buat Meja
                </h2>
            }
        >
            <Head title="Tambah Meja Baru" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormTable
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

export default EditTablePage;
