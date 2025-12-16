"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import AssetHeader from "@/components/assets/AssetHeader";
import ObligationSummary from "@/components/assets/ObligationSummary";
import PaymentList from "@/components/payments/PaymentList";
import PaymentSummaryCard from "@/components/payments/PaymentSummary";

import { Asset } from "@/lib/models/assets";
import { Payment } from "@/lib/models/payments";
import { getAssetById } from "@/lib/storage/assets";
import { getPaymentsByAssetId } from "@/lib/storage/payments";
import { computePaymentSummary } from "@/lib/services/paymentSummary";




export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [asset, setAsset] = useState<Asset | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const summary =
    asset && payments
      ? computePaymentSummary(asset, payments)
      : null;

  useEffect(() => {
    if (!id) return;

    getAssetById(id).then(setAsset);
    getPaymentsByAssetId(id).then(setPayments);
  }, [id]);

  if (!asset) {
    return (
      <AppShell title="Asset" showBack>
        <p className="text-neutral-400">Loading asset…</p>
      </AppShell>
    );
  }

  return (
    <AppShell title="Asset" showBack>
      <div className="space-y-6">
        <AssetHeader asset={asset} />

        <ObligationSummary asset={asset} />
        {summary && <PaymentSummaryCard summary={summary} />}

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Payments</h2>
          <PaymentList payments={payments} />
        </div>

        <button
          onClick={() =>
            router.push(`/locked/assets/${asset.id}/payments/new`)
          }
          className="w-full p-4 rounded-xl bg-teal-500 text-black font-semibold"
        >
          Add Payment
        </button>
      </div>
    </AppShell>
  );
}
