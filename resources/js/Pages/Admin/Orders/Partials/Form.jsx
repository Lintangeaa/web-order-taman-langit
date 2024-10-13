import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DropdownProduct from "@/Components/DropdownProduct";

const FormOrder = ({
    data,
    setData,
    submit,
    errors,
    processing,
    products,
    tables,
}) => {
    const [items, setItems] = useState([{ product_id: "", quantity: 1 }]);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleAddItem = () => {
        setItems([...items, { product_id: "", quantity: 1 }]);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleConfirmItems = () => {
        setData("items", items);
        setIsConfirming(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isConfirming) {
            submit();
        }
    };

    // Filter products to exclude those already selected in items
    const availableProducts = products.filter(
        (product) => !items.some((item) => item.product_id === product.id)
    );

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6 p-7">
            <div className="grid-cols-1 md:grid-cols-2 grid gap-3">
                <div>
                    <InputLabel htmlFor="guest_name" value="Nama Tamu" />
                    <TextInput
                        id="guest_name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.guest_name}
                        onChange={(e) => setData("guest_name", e.target.value)}
                        required
                    />
                    <InputError message={errors.guest_name} />
                </div>

                <div>
                    <InputLabel htmlFor="no_meja" value="Nomor Meja" />
                    <select
                        id="no_meja"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={data.no_meja}
                        onChange={(e) => setData("no_meja", e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Pilih Nomor Meja
                        </option>
                        {tables.map((table) => (
                            <option key={table.id} value={table.id}>
                                {table.no}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.no_meja} />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold">Items</h3>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-2">Product</th>
                            <th className="py-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">
                                    <DropdownProduct
                                        options={availableProducts} // Use filtered products
                                        value={item.product_id}
                                        onChange={(value) =>
                                            handleItemChange(
                                                index,
                                                "product_id",
                                                value
                                            )
                                        }
                                        label="Select Product"
                                    />
                                </td>
                                <td className="py-2">
                                    <TextInput
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleItemChange(
                                                index,
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleAddItem} className="mt-2">
                    Add Item
                </button>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton
                    disabled={processing}
                    type="button"
                    onClick={handleConfirmItems}
                >
                    Confirm Items
                </PrimaryButton>

                {isConfirming && (
                    <PrimaryButton disabled={processing} type="submit">
                        BUAT
                    </PrimaryButton>
                )}
            </div>
        </form>
    );
};

export default FormOrder;
