import { getDB } from "./db";
import { Account } from "@/lib/models/accounts";

export async function getAccounts(): Promise<Account[]> {
  const db = await getDB();
  const accounts = await db.getAll("accounts");
  const accountArray = accounts.map(acc => ({
    label: acc.name,
    value: acc.id,
    ...acc
  }));
  return accountArray;
}

export async function saveAccount(account: Account) {
  const db = await getDB();
  await db.put("accounts", account);
}

export async function getAccountMap(): Promise<Record<string, Account>> {
  const accounts = await getAccounts();

  return accounts.reduce((map, acc) => {
    map[acc.id] = acc;
    return map;
  }, {} as Record<string, Account>);
}
export async function deleteAccount(id: string) {
  const db = await getDB();
  await db.delete("accounts", id);
}
