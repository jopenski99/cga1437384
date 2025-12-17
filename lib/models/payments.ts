export interface Payment {
  id: string;
  assetId: string;
  amount: number;
  paidAt: string;        // date paid
  reference: string;     // bank ref / GCash ref
  accountId: string;     // where money came from\
  createdAt: string;
}
