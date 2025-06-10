export interface Budget {
  description?: string;
  currentAmount: number;
  category:string;
  budgetAmount: number;
  period: BudgetPeriodCategory;
}

export type BudgetPeriodCategory =  "Monthly" | "Quarterly" | "Yearly";
