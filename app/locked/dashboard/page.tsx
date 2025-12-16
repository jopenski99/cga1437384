"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/ui/StatCard";

import { getAssets } from "@/lib/storage/assets";
import { getPayments } from "@/lib/storage/payments";
import { Asset } from "@/lib/models/assets";
import { Payment } from "@/lib/models/payments";

export default function DashboardPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    getAssets().then(setAssets);
    getPayments().then(setPayments);
  }, []);

  const totalValue = assets.reduce(
    (sum, a) => sum + a.value,
    0
  );

  const totalPaid = payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  return (
    <AppShell title="Dashboard">
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Total Assets"
          value={`₱${totalValue.toLocaleString()}`}
        />
        <StatCard
          label="Total Paid"
          value={`₱${totalPaid.toLocaleString()}`}
        />
      </div>
    </AppShell>
  );
}
