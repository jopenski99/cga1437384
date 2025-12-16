/**
 * Asset categories
 */
export type AssetType =
  | "PHONE"
  | "MOTORCYCLE"
  | "VEHICLE"
  | "LAND"
  | "HOUSE"
  | "OTHER";

/**
 * Payment frequency
 */
export type PaymentFrequency = "MONTHLY" | "WEEKLY" | "ANNUAL";

/**
 * Fixed-term obligation
 */
export interface Obligation {
  totalAmount: number;        // Total payable
  monthlyDue: number;         // Expected monthly payment
  frequency: PaymentFrequency;
  startDate: string;          // ISO date
  termMonths: number;  // 
}

/**
 * Asset
 */
export interface Asset {
  id: string;
  name: string;
  type: AssetType;

  purchaseDate: string;
  value: number;

  obligation?: Obligation;

  createdAt: string;
}
