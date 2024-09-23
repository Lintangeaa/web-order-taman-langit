import React, { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Dropdown from "@/Components/Dropdown";

const FormTable = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = false,
}) => {
    useEffect(() => {
        const fetchNextTableNumber = async () => {
            const response = await fetch("/table/next-number");
            const result = await response.json();
            setData("no", result.nextNumber);
        };

        if (!isEdit) {
            fetchNextTableNumber();
        }
    }, [isEdit, setData]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div className="grid-cols-1 md:grid-cols-2 grid gap-3">
                <div>
                    <InputLabel htmlFor="no" value="Nomor Meja" />
                    <TextInput
                        id="no"
                        className="mt-1 block w-full"
                        value={data.no}
                        onChange={(e) => setData("no", e.target.value)}
                        required
                        readOnly
                    />
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

export default FormTable;
