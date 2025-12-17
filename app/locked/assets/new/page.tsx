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
  function handlerNumberChange(e, funct) {

    const value = Number(e.target.value);
    funct(value);
  }

  return (
    <AppShell title="New Asset" showBack>
      <div className="p-4 space-y-4">

        {/* Name */}
        <label className="flex items-center gap-2 w-full">
          <div className="w-/10">Name</div>
          <input
            className="input"
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

        {/* Value */}
        <label className="flex items-center gap-2 w-full">
          <div className="w-2/10">Value</div>
          <input
            type="number"
            className="input"
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
            < div className="justify-center flex"> Obligation Details</div>
            <label className="flex items-center gap-2 w-full">
              <div className="w-2/10">Amount</div>
              <input
                type="number"
                className="input"
                placeholder="Total amount"
                value={totalAmount ? totalAmount.toString() : "0"}
                onChange={(e) => handlerNumberChange(e, setTotalAmount)}
              />
            </label>
            <label className="flex items-center gap-2 w-full">
              <div className="w-2/10">Monthly</div>
              <input
                type="number"
                className="input"
                placeholder="Monthly due"
                 value={monthlyDue ? monthlyDue.toString() : "0"}
                onChange={(e) =>  handlerNumberChange(e, setMonthlyDue)}
              />
            </label>
            <label className="flex items-center gap-2 w-full">
              <div className="w-2/10">Months</div>
              <input
                type="number"
                className="input"
                placeholder="Term (months)"
                value={termMonths ? termMonths.toString() : "0"}
                onChange={(e) => handlerNumberChange(e, setTermMonths)}
              />
            </label>
          </div>
        )}

        {/* Save */}
        <button
          onClick={handleCreate}
          className="w-full bg-teal-500 text-black font-semibold p-2 rounded-2xl"
        >
          Save Asset
        </button>
      </div>

    </AppShell>
  );
}
