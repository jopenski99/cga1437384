"use client";

import { useEffect, useState } from "react";
import { Asset } from "@/lib/models/assets";
import { Payment } from "@/lib/models/payments";
import { getPaymentsByAssetId } from "@/lib/storage/payments";
import { computePaymentSummary } from "@/lib/services/paymentSummary";

export default function AssetStatusBadge({ asset }: { asset: Asset }) {

    if (!asset.obligation) return null;

    /*  const status = getPaymentStatus(
         asset.obligation.totalAmountPaid ?? 0,
         asset.obligation.totalAmount
     );
  */

    const [payments, setPayments] = useState<Payment[]>([]);

    const summary =
        asset && payments
            ? computePaymentSummary(asset, payments)
            : null;

    useEffect(() => {
        if (!asset.id) return;

        getPaymentsByAssetId(asset.id).then(setPayments);
    }, [asset.id]);
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${summary.status.color}`}
        >
            {summary.status.label}
        </span>
    );
}
