"use client";

import { useEffect, useRef, useState } from "react";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

type Mode = "calendar" | "dropdown";

export default function DatePicker({
    value,
    onChange,
    mode = "calendar"
}: {
    value?: Date;
    onChange?: (date: Date) => void;
    mode?: Mode;
}) {
    const today = new Date();
    const initial = value ?? today;

    const [open, setOpen] = useState(false);
    const [year, setYear] = useState(initial.getFullYear());
    const [month, setMonth] = useState(initial.getMonth());
    const [day, setDay] = useState(initial.getDate());

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onChange?.(new Date(year, month, day));
    }, [year, month, day]);

    useEffect(() => {
        function close(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const daysInMonth = new Date(year, month + 1, 0).getDate();


    function DropdownMode({
        year, month, day,
        setYear, setMonth, setDay,
        daysInMonth
    }) {
        const years = Array.from(
            { length: 50 },
            (_, i) => new Date().getFullYear() - i
        );

        return (
            <div className="grid grid-cols-3 gap-2 text-sm text-white">
                <select
                    value={month}
                    onChange={e => setMonth(Number(e.target.value))}
                    className="rounded-2xl bg-black border border-gray-700 p-2"
                >
                    {months.map((m, i) => (
                        <option key={m} value={i}>{m}</option>
                    ))}
                </select>

                <select
                    value={day}
                    onChange={e => setDay(Number(e.target.value))}
                    className="rounded-2xl bg-black border border-gray-700 p-2"
                >
                    {Array.from({ length: daysInMonth }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={e => setYear(Number(e.target.value))}
                    className="rounded-2xl bg-black border border-gray-700 p-2"
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        );
    }
    function CalendarMode({
        year, month, day,
        setYear, setMonth, setDay,
        daysInMonth
    }) {
        const firstDay = new Date(year, month, 1).getDay();
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return (
            <div className="text-white">
                {/* Header */}
                <div className="mb-2 flex items-center justify-between">
                    <button onClick={() => setMonth(m => m - 1)}>&lt;</button>
                    <span>{months[month]} {year}</span>
                    <button onClick={() => setMonth(m => m + 1)}>&gt;</button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {["SU", "M", "T", "W", "TH", "F", "S"].map(d => (
                        <div key={d} className="opacity-50">{d}</div>
                    ))}

                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={i} />
                    ))}

                    {days.map(d => (
                        <button
                            key={d}
                            onClick={() => setDay(d)}
                            className={`rounded-2xl p-2 ${d === day
                                    ? "bg-teal-400 text-black"
                                    : "hover:bg-gray-800"
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full" ref={ref}>
            {/* Input */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full rounded-2xl border border-teal-400 bg-black px-3 py-2 text-left text-white"
            >
                {months[month]} {day}, {year}
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-2xl border border-teal-400 bg-black p-3 shadow-lg">
                    {mode === "dropdown" ? (
                        <DropdownMode
                            year={year}
                            month={month}
                            day={day}
                            setYear={setYear}
                            setMonth={setMonth}
                            setDay={setDay}
                            daysInMonth={daysInMonth}
                        />
                    ) : (
                        <CalendarMode
                            year={year}
                            month={month}
                            day={day}
                            setYear={setYear}
                            setMonth={setMonth}
                            setDay={setDay}
                            daysInMonth={daysInMonth}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
