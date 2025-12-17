"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash } from "lucide-react";

import { Account } from "@/lib/models/accounts";
import {
    getAccounts,
    deleteAccount,
} from "@/lib/storage/accounts";

import AppShell from "@/components/layout/AppShell";

export default function AccountsSettingsPage() {
    const router = useRouter();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        const data = await getAccounts();
        setAccounts(data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleDelete(id: string) {
        const confirmed = confirm(
            "Are you sure you want to delete this account?"
        );
        if (!confirmed) return;

        await deleteAccount(id);
        await load();
    }

    return (
        <AppShell title="Accounts">
            <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-end ">
                    <button
                        onClick={() =>
                            router.push("/locked/settings/accounts/new")
                        }
                        className="flex items-center gap-2 px-3 py-1.5 border rounded-2xl"
                    >
                        <Plus size={16} />
                        New Account
                    </button>
                </div>

                {/* Content */}
                {loading && <p>Loading...</p>}

                {!loading && accounts.length === 0 && (
                    <p className="text-gray-500">No accounts yet.</p>
                )}

                {!loading &&
                    accounts.map((account) => (
                        <div
                            key={account.id}
                            className="bg-neutral-900 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-neutral-800 transition"
                        >
                            <div className="space-y-1">
                                <p className="text-md  font-semibold ">{account.name}</p>
                                <h3 className="text-sm text-neutral-400">{account.type}</h3>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/locked/settings/accounts/${account.id}`
                                            )
                                        }
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        className="text-red-600"
                                        onClick={() => handleDelete(account.id)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
            </div>
        </AppShell>
    );
}
