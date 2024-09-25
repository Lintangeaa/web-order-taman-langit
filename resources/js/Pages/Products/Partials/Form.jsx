import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

const FormProduct = ({
    data,
    setData,
    submit,
    errors,
    processing,
    categories,
    isEdit = false,
}) => {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Input untuk nama produk */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Produk" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required={!isEdit} // Set required based on isEdit
                    />
                    <InputError message={errors.name} />
                </div>

                {/* Input untuk deskripsi */}
                <div>
                    <InputLabel htmlFor="description" value="Deskripsi" />
                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required={!isEdit} // Set required based on isEdit
                    />
                    <InputError message={errors.description} />
                </div>

                {/* Input untuk harga */}
                <div>
                    <InputLabel htmlFor="price" value="Harga" />
                    <TextInput
                        type="number"
                        id="price"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        required={!isEdit} // Set required based on isEdit
                    />
                    <InputError message={errors.price} />
                </div>

                {/* Input untuk stok */}
                <div>
                    <InputLabel htmlFor="stock" value="Stok" />
                    <TextInput
                        type="number"
                        id="stock"
                        className="mt-1 block w-full"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        required={!isEdit} // Set required based on isEdit
                    />
                    <InputError message={errors.stock} />
                </div>

                <div>
                    <InputLabel htmlFor="category_id" value="Kategori" />
                    <select
                        id="category_id"
                        className="mt-1 block w-full"
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        required={!isEdit} // Set required based on isEdit
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} />
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Gambar" />
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                    <InputError message={errors.image} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {isEdit ? "SIMPAN" : "BUAT"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FormProduct;
