import { ClientBudget, DBBudget } from "@/app/Types/budget";

export const mapToClientBudget = (
  budget: DBBudget
): ClientBudget => {
  return {
    id:budget.id,
    userId:budget.user_id,
    currentAmount:budget.current_amount,
    financeCategory:budget.finance_category,
    budgetAmount:budget.budget_amount,
    period:budget.period,
  };
};
