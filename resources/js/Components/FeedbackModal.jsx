import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import Swal from "sweetalert2";
import PrimaryButton from "./PrimaryButton";

const FeedbackModal = ({ isFeedback, setIsFeedback }) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/feedback", {
                content,
                rating,
            });
            Swal.fire({
                icon: "success",
                title: "Feedback berhasil dikirim!",
                text: response.data.message,
            });
            localStorage.setItem("feedbackSubmitted", "true");
            setIsFeedback(false);
            setContent("");
            setRating(0);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Terjadi kesalahan",
                text: "Silakan coba lagi.",
            });
        }
    };

    return (
        <Modal show={isFeedback} onClose={() => setIsFeedback(false)}>
            <div
                className="h-screen w-full bg-black/40 flex justify-center items-center"
                onClick={() => setIsFeedback(false)}
            >
                <div
                    className="w-2/3 bg-white rounded p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-bold mb-2">
                        Berikan Umpan Balik Anda
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="content" className="block mb-1">
                                Umpan Balik:
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-24 border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Rating:</label>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 cursor-pointer ${
                                            rating >= star
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        onClick={() => setRating(star)}
                                    >
                                        <path d="M12 .587l3.668 7.429 8.257 1.19-5.975 5.235 1.409 8.219L12 18.896l-7.359 3.87 1.409-8.219-5.975-5.235 8.257-1.19z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <PrimaryButton onClick={handleSubmit}>
                            Kirim Feedback
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default FeedbackModal;
