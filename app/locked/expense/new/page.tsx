"use client";

import { useEffect, useState } from "react";
import { addExpense } from "@/lib/storage/expense";
import { ExpenseType, EXPENSE_TYPE_OPTIONS } from "@/lib/models/expense";
import AppShell from "@/components/layout/AppShell";
import CustomSelect from "@/components/ui/CustomSelect";
import DatePicker from "@/components/ui/DatePicker";

export default function CostTrackingPage() {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [category, setCategory] = useState<ExpenseType>("MISC");
    const [amount, setTotalAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");


    useEffect(() => {

    }, []);

    async function handleCreate() {
        const expense = {
            id: crypto.randomUUID(),
            category: category || "MISC",
            description: description || "",
            amount: amount,
            date: date || new Date().toISOString(),
            createdAt: new Date().toISOString(),
        }
        if (!expense.category || !expense.amount || !expense.date) {
            throw new Error("All fields except description are required");
        }
        console.table(expense);
        await addExpense(expense);
    }

    const total = expenses.reduce((s, e) => s + e.amount, 0);

    return (
        <AppShell title="Expense" showBack>
            <div className="p-4 space-y-4">

                <label className="flex items-center gap-2 w-full">
                    <div className="w-3/10">Date</div>
                   <DatePicker mode="datepicker" />
                </label>
                {/* Add Expense */}
                <CustomSelect
                    options={EXPENSE_TYPE_OPTIONS}
                    value={category}
                    label="Type"
                    onChange={setCategory}
                />
                <label className="flex items-center gap-2 w-full">
                    <div className="w-3/10">Description</div>
                    <input
                        type="text"
                        className="input"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label className="flex items-center gap-2 w-full">
                    <div className="w-3/10">Amount</div>
                    <input
                        type="number"
                        className="input"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setTotalAmount(Number(e.target.value))}
                    />
                </label>

                <button
                    onClick={handleCreate}
                    className="w-full bg-teal-500 text-black font-semibold p-2 rounded-2xl"
                >
                    Save Expense
                </button>
            </div>
        </AppShell >
    );
}
