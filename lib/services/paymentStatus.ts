export function getPaymentStatus(
  totalPaid: number,
  totalDue: number
) {
  if (totalPaid >= totalDue * 1.5)
    return { label: "ADVANCED", color: "text-blue-600" };

  if (totalPaid >= totalDue)
    return { label: "PAID", color: "text-green-600" };

  return { label: "OVERDUE", color: "text-red-600" };
}
