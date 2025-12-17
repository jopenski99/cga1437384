export type ExpenseType =
  | "SNACKS"
  | "TABLE_FOOD"
  | "TRANSPORTATION"
  | "HOUSE_REPAIRS"
  | "MOTORCYCLE_REPAIR"
  | "BABY_NEEDS"
  | "TOYS"
  | "KNICK_KNACKS"
  | "DOG_FOOD"
  | "SCHOOL_PAYMENTS"
  | "HOUSE_CHORE_NEEDS"
  | "HOSPITAL_BILL"
  | "PC_NEEDS"
  | "MISC";

export const EXPENSE_TYPE_OPTIONS: { label: string; value: ExpenseType }[] = [
  { label: "Snacks", value: "SNACKS" },
  { label: "Table Food", value: "TABLE_FOOD" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "House Repairs", value: "HOUSE_REPAIRS" },
  { label: "Motorcycle Repair", value: "MOTORCYCLE_REPAIR" },
  { label: "Baby Needs", value: "BABY_NEEDS" },
  { label: "Toys", value: "TOYS" },
  { label: "Knick Knacks", value: "KNICK_KNACKS" },
  { label: "Dog Food", value: "DOG_FOOD" },
  { label: "School Payments", value: "SCHOOL_PAYMENTS" },
  { label: "House Chores", value: "HOUSE_CHORE_NEEDS" },
  { label: "Hospital Bill", value: "HOSPITAL_BILL" },
  { label: "PC Needs", value: "PC_NEEDS" },
  { label: "Misc", value: "MISC" },
];
export interface Expense {
  id: string;
  date: string; // YYYY-MM-DD
  category: ExpenseType;
  description: string;
  amount: number;
  createdAt: string;
}
