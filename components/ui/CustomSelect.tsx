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
}: {
    value: String;
    label: string;
    onChange: (v: String) => void;
}) {
    const [open, setOpen] = useState(false);

    const current = OPTIONS.find((o) => o.value === value);

    return (
        <div className="relative">
            {/* Trigger */}
            <label className="flex items-center gap-2 w-full">
                <div className="w-2/10">{label}</div>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="w-full flex items-center justify-between border rounded-xl p-2 bg-black text-white"
                >
                    <span>{current?.label}</span>
                    <ChevronDown size={16} />
                </button>
            </label>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 bg-black border rounded-xl shadow-lg">
                    {OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-gray-800
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
