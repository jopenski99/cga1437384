"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAsset } from "@/lib/storage/assets";
import { Asset, AssetType } from "@/lib/models/assets";
import AppShell from "@/components/layout/AppShell";
import CustomSelect from "@/components/ui/CustomSelect";
export default function NewAssetPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<AssetType>("OTHER");
  const [value, setValue] = useState<number>(0);
  const [hasObligation, setHasObligation] = useState(false);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [monthlyDue, setMonthlyDue] = useState<number>(0);
  const [termMonths, setTermMonths] = useState<number>(0);
  async function handleCreate() {
    const asset: Asset = {
      id: crypto.randomUUID(),
      name,
      type,
      value,
      purchaseDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      obligation: hasObligation ? {
        totalAmount,
        monthlyDue,
        frequency: "MONTHLY",
        startDate: new Date().toISOString(),
        termMonths
      } : undefined,
    };


    await saveAsset(asset);
    router.replace("/locked/assets");
  }

  return (
    <AppShell title="New Asset" showBack>
      <div className="p-4 space-y-4">

        {/* Name */}
        <label className="flex items-center gap-2 w-full">
          <div className="w-2/10">Value</div>
          <input
            className="w-full border p-2 rounded rounded-xl"
            placeholder="Asset name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* Type */}
        <CustomSelect
          value={type}
          label="Type"
          onChange={setType}
        />
        {/*  <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value as AssetType)}
        >
          <option value="PHONE">Phone</option>
          <option value="MOTORCYCLE">Motorcycle</option>
          <option value="VEHICLE">Vehicle</option>
          <option value="LAND">Land</option>
          <option value="OTHER">Other</option>
        </select> */}

        {/* Value */}
        <label className="flex items-center gap-2 w-full">
          <div className="w-2/10">Value</div>
          <input
            type="number"
            className="w-full border p-2 rounded-xl flex-1"
            placeholder="Estimated value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>

        {/* Obligation toggle */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasObligation}
            onChange={(e) => setHasObligation(e.target.checked)}
          />
          Has loan / mortgage
        </label>

        {hasObligation && (
          <div className="space-y-2 border border-neutral-800 p-3 rounded-xl">
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Total amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
            />

            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Monthly due"
              value={monthlyDue}
              onChange={(e) => setMonthlyDue(Number(e.target.value))}
            />

            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Term (months)"
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
            />
          </div>
        )}

        {/* Save */}
        <button
          onClick={handleCreate}
          className="w-full bg-black text-white p-2 rounded"
        >
          Save Asset
        </button>
      </div>

    </AppShell>
  );
}
