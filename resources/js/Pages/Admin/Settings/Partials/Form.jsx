import React, { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

const FormSetting = ({
    data,
    setData,
    submit,
    errors,
    processing,
    isEdit = true,
}) => {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6 p-7">
            <div>
                <InputLabel value="Buka" />
                <div className="flex mt-1">
                    <label className="mr-4">
                        <input
                            type="radio"
                            value="true"
                            checked={data.status_open === 1}
                            onChange={() => setData("status_open", true)}
                            required={!isEdit}
                        />
                        Buka
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="false"
                            checked={data.status_open === 0}
                            onChange={() => setData("status_open", false)}
                            required={!isEdit}
                        />
                        Tutup
                    </label>
                </div>
                <InputError message={errors.status_open} />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <div>
                    <InputLabel htmlFor="tax" value="Pajak / Tax (%)" />
                    <TextInput
                        id="tax"
                        type="number"
                        placeholder="%"
                        className="mt-1 block w-full lg:w-1/2"
                        value={data.tax}
                        onChange={(e) => setData("tax", e.target.value)}
                        required={!isEdit}
                    />
                    <InputError message={errors.tax} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <div>
                    <InputLabel
                        htmlFor="service_charge"
                        value="Biaya Layanan"
                    />
                    <TextInput
                        id="service_charge"
                        type="number"
                        className="mt-1 block w-full lg:w-1/2"
                        value={data.service_charge}
                        onChange={(e) =>
                            setData("service_charge", e.target.value)
                        }
                        required={!isEdit}
                    />
                    <InputError message={errors.service_charge} />
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <PrimaryButton disabled={processing}>SIMPAN</PrimaryButton>
            </div>
        </form>
    );
};

export default FormSetting;
