"use client";

import { Payment } from "@/lib/models/payments";

export default function PaymentItem({ payment }: { payment: Payment }) {
  console.log(payment);
  return (
    <div className="bg-neutral-900 rounded-xl p-4 flex justify-between items-center">
      <div className="space-y-1">
        <p className="text-sm text-neutral-400">
          {new Date(payment.paidAt).toLocaleDateString()}
        </p>
        <p className="text-lg font-semibold">
          ₱{payment.amount.toLocaleString()}
        </p>
        <p className="text-xs text-neutral-500">
          {payment.accountName} • {payment.reference}
        </p>
      </div>
    </div>
  );
}
