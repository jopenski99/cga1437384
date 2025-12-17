import { Payment } from "@/lib/models/payment";
import { Obligation } from "@/lib/models/asset";

export interface AllocationResult {
  totalPaid: number;
  totalDue: number;
  remainingBalance: number;
  monthsCovered: number;
}

/**
 * Pure calculation logic
 * NO React
 * NO storage
 */
export function allocatePayments(
  obligation: Obligation,
  payments: Payment[],
  asOfDate: Date = new Date()
): AllocationResult {
  const start = new Date(obligation.startDate);

  const monthsElapsed =
    (asOfDate.getFullYear() - start.getFullYear()) * 12 +
    (asOfDate.getMonth() - start.getMonth()) +
    1;

  const monthsDue = Math.min(
    monthsElapsed,
    obligation.termMonths
  );

  const totalDue = monthsDue * obligation.monthlyDue;

  const totalPaid = payments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  const remainingBalance = obligation.totalAmount - totalPaid;

  const monthsCovered = Math.floor(
    totalPaid / obligation.monthlyDue
  );

  return {
    totalPaid,
    totalDue,
    remainingBalance,
    monthsCovered,
  };
}
