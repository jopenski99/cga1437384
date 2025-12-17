"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";


const OPTIONS: { label: string; value: string }[] = [
    { label: "Phone", value: "PHONE" },
    { label: "Motorcycle", value: "MOTORCYCLE" },
    { label: "Vehicle", value: "VEHICLE" },
    { label: "Land", value: "LAND" },
    { label: "Other", value: "OTHER" },
];

export default function CustomSelect({
    value,
    label,
    onChange,
    options
}: {
    value: String;
    label: string;
    onChange: (v: String) => void;
    options: []
}) {
    const [open, setOpen] = useState(false);
    const selectOptions = options || OPTIONS;
    const current = selectOptions.find((o) => o.value === value);

    return (
        <div className="relative">
            {/* Trigger */}
            <label className="flex items-center justify-between w-full">
                <span className="flex text-center w-3/12">{label}</span>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center justify-end input"
                >
                    <span className="flex-1">{current?.label}</span>
                    <ChevronDown size={16} className="justify-end" />
                </button>
            </label>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 bg-black border rounded-2xl border-teal-400 shadow-lg">
                    {selectOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-gray-800 rounded-2xl 
                ${opt.value === value
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-300"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
