import React, { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";

const FormCategory = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = false,
}) => {
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isEdit && data.previmage) {
            setImagePreview(`/storage/${data.previmage}`);
        } else {
            setImagePreview(null);
        }
    }, [data.previmage, isEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setData("image", null);
            setImagePreview(null);
        }
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div className="grid grid-cols-1 gap-3">
                <div>
                    <InputLabel htmlFor="name" value="Nama Kategori" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full lg:w-1/2"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required={!isEdit}
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="image" value="Gambar" />
                    {imagePreview && (
                        <div className="mt-2 flex  mb-2">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-32 h-auto"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={handleImageChange}
                        required={!isEdit}
                    />

                    <InputError message={errors.image} />
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <PrimaryButton disabled={processing}>
                    {isEdit ? "SIMPAN" : "BUAT"}
                </PrimaryButton>
            </div>
        </form>
    );
};

export default FormCategory;
