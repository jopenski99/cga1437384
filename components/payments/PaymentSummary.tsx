"use client";

import { PaymentSummary } from "@/lib/services/paymentSummary";

export default function PaymentSummaryCard({
  summary,
}: {
  summary: PaymentSummary;
}) {
  return (
    <div className="bg-neutral-900 rounded-2xl p-4 space-y-3">
      <h3 className="text-sm text-neutral-400">
        Payment Summary
      </h3>

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
