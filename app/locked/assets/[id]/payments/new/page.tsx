"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { getAccounts } from "@/lib/storage/accounts";
import { Account } from "@/lib/models/accounts";

import { savePayment } from "@/lib/storage/payments";
import CustomSelect from "@/components/ui/CustomSelect";
import AccountSelect from "@/components/accounts/AccountSelect";
import AppShell from "@/components/layout/AppShell";

export default function AddPaymentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState<string>();


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
    <AppShell title="Add Payment" showBack>
      <div className="p-4 space-y-4">
        <label className="flex items-center gap-2 w-full">
          <div className="w-2/10">Amount</div>
          <input
            className="input"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 w-full">
          <div className="w-2/10">Amount</div>
          <input
            className="input"
            placeholder="Reference Number"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </label>
        <CustomSelect
          value={accountId}
          label="Account"
          options={accounts}
          onChange={setAccountId}
        />
        {/* <AccountSelect
        value={accountId}
        onChange={setAccountId}
      />
 */}
        <button
          onClick={handleSave}
          className="text-white px-4 py-2 rounded-2xl bg-teal-500"
        >
          Save Payment
        </button>
      </div>
    </AppShell>
  );
}
