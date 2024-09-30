import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

const Landing = ({ no_meja }) => {
    const guest_name = localStorage.getItem("guest_name");
    const sessionId = localStorage.getItem("session_id");
    const { data, setData, post, errors, processing } = useForm({
        guest_name: "",
        no_meja: parseInt(no_meja),
        session_id: sessionId ? sessionId : "",
    });

    useEffect(() => {
        if (guest_name) {
            setData("guest_name", guest_name);
            post(route("orders.init"));
        }
    }, [data.guest_name]);

    const submit = (e) => {
        e.preventDefault();
        localStorage.setItem("guest_name", data.guest_name);
        post(route("orders.init"));
    };

    return (
        <div className="bg-primary h-screen flex flex-col items-center justify-center">
            <Head title="Selamat Datang Di Taman Langit" />
            <form onSubmit={submit} className="w-80">
                <div className="flex justify-center mb-16">
                    <img
                        src="/tamanlangit.webp"
                        alt="Taman Langit"
                        width={180}
                        height={20}
                    />
                </div>
                <div>
                    <InputLabel
                        htmlFor="guest_name"
                        value="Nama"
                        className="lg:text-lg text-white lg:font-semibold mb-2"
                    />
                    <TextInput
                        id="guest_name"
                        className="mt-1 block w-full bg-cream"
                        value={data.guest_name}
                        onChange={(e) => setData("guest_name", e.target.value)}
                        required
                    />
                    <InputError message={errors.guest_name} />
                </div>

                <div className="flex items-center justify-center mt-16 gap-4">
                    <button
                        disabled={processing}
                        className="bg-gold p-2 rounded-lg px-6 font-bold text-white"
                    >
                        Lanjutkan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Landing;
