"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Payment } from "@/lib/models/payments";
import { getPaymentsByAsset } from "@/lib/storage/payments";

export default function PaymentsPage() {
  const { id } = useParams<{ id: string }>();
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getPaymentsByAsset(id);
      setPayments(
        data.sort(
          (a, b) =>
            new Date(b.paidAt).getTime() -
            new Date(a.paidAt).getTime()
        )
      );
    }
    load();
  }, [id]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Payment History</h1>

      {payments.length === 0 && (
        <p className="text-gray-500">No payments yet</p>
      )}

      {payments.map((p) => (
        <div
          key={p.id}
          className="border rounded p-3 text-sm"
        >
          <p className="font-medium">
            ₱{p.amount.toLocaleString()}
          </p>
          <p className="text-gray-500">
            {new Date(p.paidAt).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            Ref: {p.reference}
          </p>
        </div>
      ))}
    </div>
  );
}
