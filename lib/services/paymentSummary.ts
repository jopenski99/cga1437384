import { Payment } from "@/lib/models/payments";
import { Asset } from "@/lib/models/assets";

export interface PaymentSummary {
  totalPaid: number;
  remaining: number;
  monthsCovered: number;
}

export function computePaymentSummary(
  asset: Asset,
  payments: Payment[]
): PaymentSummary {
  if (!asset.obligation) {
    return { totalPaid: 0, remaining: 0, monthsCovered: 0 };
  }

  const totalPaid = payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  const { totalAmount, monthlyDue } = asset.obligation;

  const remaining = Math.max(totalAmount - totalPaid, 0);
  const monthsCovered = Math.floor(totalPaid / monthlyDue);

  return {
    totalPaid,
    remaining,
    monthsCovered,
  };
}
