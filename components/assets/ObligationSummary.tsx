"use client";

import { Asset } from "@/lib/models/assets";

export default function ObligationSummary({ asset }: { asset: Asset }) {
  if (!asset.obligation) return null;

  const o = asset.obligation;

  return (
    <div className="bg-neutral-900 rounded-2xl p-4 space-y-2">
      <h3 className="text-sm text-neutral-400">Loan Details </h3>  

      <div className="flex justify-between text-sm">
        <span>Total Amount</span>
        <span>₱{o.totalAmount.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Monthly Due</span>
        <span>₱{o.monthlyDue.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Term</span>
        <span>{o.termMonths} months</span>
      </div>
    </div>
  );
}
