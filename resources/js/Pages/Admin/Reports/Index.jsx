import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2"; // Ensure this package is installed

const ReportPage = ({ auth }) => {
    const { data, setData } = useForm({
        start_date: "",
        end_date: "",
    });

    const handleDownloadReport = async () => {
        try {
            const response = await fetch(`/api/download-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/pdf",
                },
                body: JSON.stringify({
                    start_date: data.start_date,
                    end_date: data.end_date,
                }),
            });

            console.log(response);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `laporan_${data.start_date}-${data.end_date}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url); // Clean up
            } else {
                throw new Error("Failed to download report");
            }
        } catch (error) {
            Swal.fire("Error", "Gagal mengunduh laporan", "error");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDownloadReport(); // Trigger the download when the form is submitted
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black leading-tight">
                    Laporan
                </h2>
            }
        >
            <Head title="Laporan" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2">Tanggal Awal</label>
                            <input
                                type="date"
                                className="p-2 border border-gray-300 rounded w-full"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Tanggal Akhir</label>
                            <input
                                type="date"
                                className="p-2 border border-gray-300 rounded w-full"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Unduh Laporan
                        </button>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default ReportPage;
