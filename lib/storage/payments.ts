import { getDB } from "@/lib/storage/db";
import { Payment } from "@/lib/models/payments";
import { getAccountMap } from "./accounts";

const dbPromise = getDB();

export async function savePayment(payment: Payment) {
  const db = await dbPromise;
  return db.put("payments", payment);
}

export async function getPaymentsByAsset(assetId: string): Promise<Payment[]> {
  const db = await dbPromise;
  const all = await db.getAll("payments");
  return all.filter((p: Payment) => p.assetId === assetId);
}

export async function getPaymentsByAssetId(
  assetId: string
): Promise<Payment[]> {
  const db = await getDB();
  const all = await db.getAll("payments");

  const [payments, accountMap] = await Promise.all([
    db.getAll("payments"),
    getAccountMap(),
  ]);

  return all
    .filter((p) => p.assetId === assetId)
    .map((p) => ({
      ...p,
      accountName: accountMap[p.accountId]?.name ?? "Unknown",
    }))
    .sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    );
}

export async function getPayments(): Promise<Payment[]> {
  const db = await getDB();
  return db.getAll("payments");
}
