import { Link } from "@inertiajs/react";

export default function RedirectButton({ className = "", children, href }) {
    return (
        <Link
            href={href}
            className={
                `inline-flex items-center px-4 py-2 bg-gold border border-gray-300 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-gold/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150
                } ` + className
            }
        >
            {children}
        </Link>
    );
}
