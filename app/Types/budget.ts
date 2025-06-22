

export interface DBBudget {
  id: number;
  user_id: string;
  current_amount: number;
  finance_category: string;
  budget_amount: number;
  period: BudgetPeriodCategory;
}
export interface ClientBudget {
  id: number;
  userId: string;
  currentAmount: number;
  financeCategory: string;
  budgetAmount: number;
  period: BudgetPeriodCategory;
}

export type BudgetPeriodCategory = "Monthly" | "Quarterly" | "Yearly";
