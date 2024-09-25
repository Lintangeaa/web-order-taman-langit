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
    const category = categories.find((cat) => cat.id === data.category_id);
    const filteredCategories = categories.filter(
        (cat) => cat.id !== data.category_id
    );

    console.log(data.category_id);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <InputLabel htmlFor="name" value="Nama Produk" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required={!isEdit}
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Deskripsi" />
                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required={!isEdit}
                    />
                    <InputError message={errors.description} />
                </div>

                <div>
                    <InputLabel htmlFor="price" value="Harga" />
                    <TextInput
                        type="number"
                        id="price"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        required={!isEdit}
                    />
                    <InputError message={errors.price} />
                </div>

                <div>
                    <InputLabel htmlFor="stock" value="Stok" />
                    <TextInput
                        type="number"
                        id="stock"
                        className="mt-1 block w-full"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        required={!isEdit}
                    />
                    <InputError message={errors.stock} />
                </div>

                <div>
                    <InputLabel htmlFor="category_id" value="Kategori" />
                    <select
                        id="category_id"
                        className="mt-1 block w-full"
                        value={data.category_id || ""}
                        onChange={(e) =>
                            setData("category_id", Number(e.target.value))
                        }
                        required={!isEdit}
                    >
                        <option value="">
                            {isEdit ? category?.name : "Pilih Kategori"}
                        </option>
                        {filteredCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
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
