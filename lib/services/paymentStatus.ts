import { PaymentStatus } from "@/lib/models/assets";

export function getPaymentStatus(
  totalPaid: number,
  expectedPaid: number
): PaymentStatus {
  if (totalPaid >= expectedPaid) return "PAID";
  if (totalPaid >= expectedPaid - 1) return "UPCOMING";
  if (totalPaid < expectedPaid) return "OVERDUE";
  return "DUE";
}
