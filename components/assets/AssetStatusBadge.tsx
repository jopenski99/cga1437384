"use client";

import { Asset } from "@/lib/models/assets";
/* import { getPaymentStatus } from "@/lib/services/paymentStatus"; */

export default function AssetStatusBadge({ asset }: { asset: Asset }) {

    if (!asset.obligation) return null;

   /*  const status = getPaymentStatus(
        asset.obligation.totalAmountPaid ?? 0,
        asset.obligation.totalAmount
    );
 */
    const map = {
        PAID: "bg-emerald-500/20 text-emerald-400",
        ACTIVE: "bg-yellow-500/20 text-yellow-400",
        OVERDUE: "bg-red-500/20 text-red-400",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-yellow-400`}
        >
           Active
        </span>
    );
}
