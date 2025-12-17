import { getDB } from "@/lib/storage/db";
import { ExpenseType, Expense } from "@/lib/models/expense";



/**
 * Get all expenses (sorted by date DESC)
 */
export async function getAllExpenses(): Promise<Expense[]> {
  const db = await getDB();
  const expenses = await db.getAll("expenses");

  return expenses.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Add a new expense
 */
export async function addExpense(input: {
  date: string;
  category: ExpenseType;
  description?: string;
  amount: number;
}) {
  if (!input.date || !input.category || !input.amount) {
    throw new Error("Date, category and amount are required");
  }

  if (input.amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  const db = await getDB();

  await db.add("expenses", {
    id: crypto.randomUUID(),
    date: input.date,
    category: input.category,
    description: input.description ?? "",
    amount: Number(input.amount),
    createdAt: new Date().toISOString(),
  });
}

/**
 * Delete an expense
 */
export async function deleteExpense(id: string) {
  const db = await getDB();
  await db.delete("expenses", id);
}

/**
 * Get total expenses (optional helper)
 */
export async function getTotalExpenses(): Promise<number> {
  const expenses = await getAllExpenses();
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}
