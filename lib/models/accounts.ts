export type AccountType = "CASH" | "BANK" | "E_WALLET";

export interface Account {
  id: string;
  value: string;       // e.g. account number, GCash number
  name: string;
  label: string;       // e.g. "BPI", "GCash"
  type: AccountType;
  createdAt: string;
}
