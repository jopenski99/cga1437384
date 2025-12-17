"use client";

import { useMemo } from "react";
import AppShell from "@/components/layout/AppShell";
// Mock data – replace with IndexedDB query
const expenses = [
    { id: 1, amount: 250, category: "Table Food", date: new Date() },
    { id: 2, amount: 120, category: "Transportation", date: new Date() },
    { id: 3, amount: 900, category: "Motorcycle Repair", date: new Date(Date.now() - 2 * 86400000) },
    { id: 4, amount: 300, category: "Dog Food", date: new Date(Date.now() - 5 * 86400000) },
];

export default function ExpensePage() {
    const today = new Date();

    const { todayTotal, weekTotal, sorted } = useMemo(() => {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - 6);

        let todaySum = 0;
        let weekSum = 0;

        expenses.forEach(e => {
            const d = new Date(e.date);
            const isToday = d.toDateString() === today.toDateString();
            const isWeek = d >= startOfWeek;

            if (isToday) todaySum += e.amount;
            if (isWeek) weekSum += e.amount;
        });

        return {
            todayTotal: todaySum,
            weekTotal: weekSum,
            sorted: [...expenses].sort((a, b) => +new Date(b.date) - +new Date(a.date))
        };
    }, []);

    return (
        <AppShell title="Expense" showBack>
            <div className="min-h-screen bg-black text-white">
                {/* Summary Cards */}
                <div className="fixed top-11 left-0 right-0 z-10 bg-black p-4 pt-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-teal-400 bg-black p-4">
                            <p className="text-sm opacity-70">Today's Expense</p>
                            <p className="text-2xl font-bold">₱ {todayTotal.toLocaleString()}</p>
                        </div>

                        <div className="rounded-2xl border border-teal-400 bg-black p-4">
                            <p className="text-sm opacity-70">Week's Expense</p>
                            <p className="text-2xl font-bold">₱ {weekTotal.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Expense List */}
                <div className="max-h-96 overflow-y-scroll mt-25">
                    {sorted.map(exp => (
                        <div
                            key={exp.id}
                            className="flex items-center justify-between rounded-xl border border-gray-800 bg-black p-3 my-1"
                        >
                            <div>
                                <p className="font-medium">{exp.category}</p>
                                <p className="text-xs opacity-60">
                                    {new Date(exp.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="font-semibold text-teal-400">₱ {exp.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
