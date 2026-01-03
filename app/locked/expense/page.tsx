"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { getAllExpenses } from "@/lib/storage/expense";
import { Expense } from "@/lib/models/expense";
// Mock data – replace with IndexedDB query


export default function ExpensePage() {
    const today = new Date();
    const router = useRouter();
    const [expenses, setExpense] = useState<Expense[]>([]);
    
    useEffect(() => {
         async function load() {
            const storedExpense = await getAllExpenses();
            setExpense(storedExpense);
        }
        load();
    }, []);

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
    }, [expenses]);

    return (
        <AppShell title="Expense" showBack>
            <div className="min-h-screen text-white">
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
                <div className="fixed top-45 right-5 flex items-center justify-end self-right">
                    <button
                        onClick={() =>
                            router.push(`/locked/expense/new`)
                        }
                        className="flex items-center gap-2 px-2 py-1.5 rounded-2xl bg-teal-500 text-black font-semibold">
                        <Plus size={16} />
                        Add expense
                    </button>
                </div>
                {/* Expense List */}
                <div className="max-h-100 overflow-y-scroll mt-38">
                    {sorted.map(exp => (
                        <div
                            key={exp.id}
                            className="flex items-center justify-between rounded-xl border border-gray-800 bg-black p-3 my-1"
                        >
                            <div>
                                <p className="font-medium">{exp.category}</p>
                                <p className="text-sm"> {exp.description} </p>
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
