export type GoalCategory =
  | "Emergency"
  | "Travel"
  | "Transportation"
  | "Home"
  | "Education"
  | "Investment"
  | "Savings"
  | "Other";

export interface DBGoal {
  id: number;
  user_id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  deadline_date: string;
}
export interface ClientGoal {
  id: number;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadlineDate: string;
}
