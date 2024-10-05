import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FiPlus } from "react-icons/fi";
import FormSetting from "./Partials/Form";

export default function GetSettingPage({ auth, setting }) {
    const { data, setData, post, errors, processing, replace } = useForm({
        status_open: setting.status_open,
        tax: setting.tax,
        service_charge: setting.service_charge,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("setting.update", setting.id), {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <FormSetting
                            setData={setData}
                            data={data}
                            errors={errors}
                            processing={processing}
                            submit={submit}
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
