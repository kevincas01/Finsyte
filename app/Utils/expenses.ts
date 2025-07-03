import { ClientTransaction } from "@/app/Types/transactions";

interface MonthlyExpenseResult {
  total: number;
  topCategory?: {
    category: string;
    amount: number;
  };
}

export const getMonthlyExpensesTotal = (
  transactions: ClientTransaction[],
  includeTopCategory: boolean = false
): MonthlyExpenseResult => {
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();

  // Filter transactions for current month
  const monthlyTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.datetime);
    return (
      txDate.getUTCMonth() === currentMonth && txDate.getUTCFullYear() === currentYear
    );
  });

  // Only include expenses(positive numbers)
  const expenses = monthlyTransactions.filter((tx) => tx.amount > 0);

  const total = expenses.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  if (!includeTopCategory) {
    return { total };
  }

  // Group expenses by category
  const categoryTotals: Record<string, number> = {};

  for (const tx of expenses) {
    const category = tx.financeCategory || "Uncategorized";
    categoryTotals[category] =
      (categoryTotals[category] || 0) + Math.abs(tx.amount);
  }

  // Find top category
  let topCategory = null;
  let maxAmount = 0;

  for (const [category, amount] of Object.entries(categoryTotals)) {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCategory = category;
    }
  }

  return {
    total,
    topCategory: topCategory
      ? {
          category: topCategory,
          amount: categoryTotals[topCategory],
        }
      : undefined,
  };
};
