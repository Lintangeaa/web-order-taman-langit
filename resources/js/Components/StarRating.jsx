// StarRating.js
import React from "react";

const StarRating = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                        index < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .587l3.668 7.429 8.257 1.19-5.975 5.235 1.409 8.219L12 18.896l-7.359 3.87 1.409-8.219-5.975-5.235 8.257-1.19z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
