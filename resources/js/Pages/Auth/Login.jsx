import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        post(route("login"), {
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Username atau password salah!",
                    confirmButtonText: "Coba Lagi",
                });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("username", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type={passwordVisible ? "text" : "password"} // Toggle password visibility
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-cream pr-10" // Added padding-right to make space for the icon
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <span
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer"
                    >
                        {passwordVisible ? (
                            <FaEyeSlash className="text-gray-600" />
                        ) : (
                            <FaEye className="text-gray-600" />
                        )}
                    </span>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        {/* <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span> */}
                    </label>
                </div>

                <div className="flex items-center justify-center mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
