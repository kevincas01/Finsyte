export type GoalCategory =
  | "Emergency"
  | "Travel"
  | "Transportation"
  | "Home"
  | "Education"
  | "Investment"
  | "Savings"
  | "Other";

export interface Goal {
  title: string;
  description?: string;
  category?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}
