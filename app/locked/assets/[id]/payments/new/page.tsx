"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { getAccounts } from "@/lib/storage/accounts";
import { Account } from "@/lib/models/accounts";

import { savePayment } from "@/lib/storage/payments";

import AccountSelect from "@/components/accounts/AccountSelect";

export default function AddPaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState<string>();

  console.log(accounts);
  useEffect(() => {
    getAccounts().then(setAccounts);
  }, []);
  async function handleSave() {
    await savePayment({
      id: crypto.randomUUID(),
      assetId: id,
      amount: Number(amount),
      reference,
      accountId: accountId,
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    router.push(`/locked/assets/${id}`);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Add Payment</h1>

      <input
        className="border p-2 w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Reference Number"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      />
      <AccountSelect
        value={accountId}
        onChange={setAccountId}
      />

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Payment
      </button>
    </div>
  );
}
