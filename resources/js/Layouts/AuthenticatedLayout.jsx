import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import {
    MdDashboard,
    MdOutlineTableRestaurant,
    MdRestaurantMenu,
} from "react-icons/md";

export default function Authenticated({ user, header, children }) {
    const [showingSidebar, setShowingSidebar] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside
                className={`bg-white border-r border-gray-200 shadow-xl ${
                    showingSidebar ? "w-64" : "w-16"
                } transition-all`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-16 font-semibold">
                        <Link href="/">TAMAN LANGIT</Link>
                    </div>
                    <nav className="flex-1 p-4">
                        <ul className="space-y-1">
                            <li className="flex items-center space-x-4">
                                <MdDashboard />
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <MdRestaurantMenu />
                                <NavLink
                                    href={route("products.all")}
                                    active={
                                        route().current("products.all") ||
                                        route().current("products.create") ||
                                        route().current("products.edit")
                                    }
                                >
                                    Menu
                                </NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <MdRestaurantMenu />
                                <NavLink
                                    href={route("categories.all")}
                                    active={
                                        route().current("categories.all") ||
                                        route().current("categories.create") ||
                                        route().current("categories.edit")
                                    }
                                >
                                    Kategori Menu
                                </NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <MdOutlineTableRestaurant />
                                <NavLink
                                    href={route("tables.all")}
                                    active={route().current("tables.all")}
                                >
                                    Meja
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 flex flex-col max-w-2xl lg:max-w-full">
                <div className="bg-primary flex justify-end">
                    <div className="p-4 ">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}
                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
