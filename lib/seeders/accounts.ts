import { getAccounts } from "@/lib/storage/accounts";
import { getDB } from "@/lib/storage/db";
import { Account } from "@/lib/models/accounts";

export async function seedAccounts() {
  const existing = await getAccounts();
  if (existing.length > 0) return;

  const db = await getDB();

  const defaults: Account[] = [
    {
      id: crypto.randomUUID(),
      name: "Cash",
      type: "CASH",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "BPI Savings Account",
      type: "BANK",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "SB Savings Account",
      type: "BANK",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "RCBC Savings Account",
      type: "BANK",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Maybank Savings Account",
      type: "BANK",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Mari Bank Savings Account",
      type: "BANK",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "CIMB Savings Account",
      type: "BANK",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "GCash",
      type: "E_WALLET",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "PayMaya",
      type: "E_WALLET",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "ShopeePay",
      type: "E_WALLET",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Coins.ph",
      type: "E_WALLET",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Grabpay",
      type: "E_WALLET",
      createdAt: new Date().toISOString(),
    },
  ];

  for (const account of defaults) {
    await db.put("accounts", account);
  }
}
