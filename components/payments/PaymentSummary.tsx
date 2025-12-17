"use client";

import { PaymentSummary } from "@/lib/services/paymentSummary";
import { Asset } from "@/lib/models/assets";
import AssetStatusBadge from "@/components/assets/AssetStatusBadge";
export default function PaymentSummaryCard({
  summary,
  asset,
}: {
  summary: PaymentSummary;
  asset: Asset;
}) {


  return (
    <div className="bg-neutral-900 rounded-2xl p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-neutral-400">
          Payment Summary
        </h3>
        <span className={`text-sm font-semibold ${summary.status.color}`}>
          {summary.status.label}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-neutral-400">Paid</p>
          <p className="text-lg font-semibold">
            ₱{summary.totalPaid.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-400">Remaining</p>
          <p className="text-lg font-semibold">
            ₱{summary.remaining.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-400">Months</p>
          <p className="text-lg font-semibold">
            {summary.monthsCovered}
          </p>
        </div>
      </div>
    </div>
  );
}
