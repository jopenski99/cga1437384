"use client";

import { Payment } from "@/lib/models/payments";
import PaymentItem from "./PaymentItem";

export default function PaymentList({
  payments,
}: {
  payments: Payment[];
}) {
  if (payments.length === 0) {
    return (
      <p className="text-sm text-neutral-400">
        No payments recorded yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map(payment => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}
