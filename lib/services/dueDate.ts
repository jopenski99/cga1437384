export function getCurrentDueDate(dueDay: number): Date {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    dueDay
  );
}
