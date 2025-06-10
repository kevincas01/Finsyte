import { TransactionCategory } from "./transactions";

export type RecurringFrequencyCategory =
  | "Weekly"
  | "Monthly"
  | "Quarterly"
  | "Yearly";

export interface Recurring {
  name: string;
  amount: number;
  category: TransactionCategory;
  frequency: RecurringFrequencyCategory;
  targetDate?: string;
}
