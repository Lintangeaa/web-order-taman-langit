import React, { useState } from "react";

const DropdownProduct = ({ options, value, onChange, label }) => {
    const [searchTerm, setSearchTerm] = useState(
        value ? options.find((option) => option.id === value)?.name : ""
    );
    const [isOpen, setIsOpen] = useState(false);

    // Filter options based on the search term
    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (id) => {
        const selectedOption = options.find((option) => option.id === id);
        if (selectedOption) {
            onChange(id); // Update the selected value
            setSearchTerm(selectedOption.name); // Set the input to the selected item's name
        }
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    placeholder="Search..."
                />
                {isOpen && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.id}
                                    onClick={() => handleOptionClick(option.id)}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                >
                                    {option.name}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">
                                No results found
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DropdownProduct;
