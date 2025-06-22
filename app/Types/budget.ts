

export interface DBBudget {
  id: number;
  user_id: string;
  current_amount: number;
  category: string;
  budget_amount: number;
  period: BudgetPeriodCategory;
  deadline_date: string;
}
export interface ClientBudget {
  id: number;
  userId: string;
  currentAmount: number;
  financeCategory: string;
  budgetAmount: number;
  period: BudgetPeriodCategory;
  deadlineDate: string;
}

export type BudgetPeriodCategory = "Monthly" | "Quarterly" | "Yearly";
