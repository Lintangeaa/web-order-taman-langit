import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaBox } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { GiCampCookingPot } from "react-icons/gi";
import StarRating from "@/Components/StarRating";

export default function Dashboard({
    auth,
    pendingOrders,
    onProgressOrders,
    completeOrders,
    feedbacks,
    averageRating,
}) {
    console.log(feedbacks);

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full flex justify-between space-x-4">
                            <div className="w-full h-40 bg-white p-4 flex items-center space-x-4">
                                <div className="flex justify-center items-center bg-purple-600 w-40 h-full rounded">
                                    <FaBox className="text-4xl text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl text-black/50 font-semibold">
                                        Total Order
                                    </h1>
                                    <h2 className="text-3xl font-bold">
                                        {pendingOrders +
                                            onProgressOrders +
                                            completeOrders}
                                    </h2>
                                </div>
                            </div>
                            <div className="w-full h-40 bg-white p-4 flex items-center space-x-4">
                                <div className="flex justify-center items-center bg-green-500 w-40 h-full rounded">
                                    <HiMail className="text-5xl text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl text-black/50 font-semibold">
                                        Total Order
                                    </h1>
                                    <h2 className="text-3xl font-bold">
                                        {completeOrders}
                                    </h2>
                                </div>
                            </div>
                            <div className="w-full h-40 bg-white p-4 flex items-center space-x-4">
                                <div className="flex justify-center items-center bg-orange-400 w-40 h-full rounded">
                                    <GiCampCookingPot className="text-5xl text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl text-black/50 font-semibold">
                                        Pengerjaan
                                    </h1>
                                    <h2 className="text-3xl font-bold">
                                        {onProgressOrders}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-auto bg-white p-4  mt-10">
                            <div className="w-full bg-safir rounded h-52 flex justify-center items-center">
                                <div className="text-white text-center flex flex-col justify-center items-center">
                                    <div>
                                        <h1 className="text-6xl font-semibold">
                                            {feedbacks.length}
                                        </h1>
                                        <h1 className="text-xl font-semibold">
                                            Customer Feedback
                                        </h1>
                                    </div>
                                    <div className="w-20 h-20 bg-white mt-4 rounded flex justify-center items-center">
                                        <h2 className="text-3xl font-bold text-gold">
                                            {averageRating}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* feedback */}
                            <div className="mt-5 overflow-y-auto max-h-[800px]">
                                {feedbacks.map((feedback, i) => (
                                    <div
                                        key={i}
                                        className="bg-black/10 w-full rounded mt-2 mb-2 p-2 text-lg flex flex-col space-y-2"
                                    >
                                        <p className="text-red-500 font-semibold">
                                            {feedback.content}
                                        </p>
                                        <StarRating rating={feedback.rating} />
                                        <p>{formatDate(feedback.created_at)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
