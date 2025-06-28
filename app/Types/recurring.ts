import { TransactionCategory } from "./transactions";

export type RecurringFrequencyCategory =
  | "Weekly"
  | "Monthly"
  | "Quarterly"
  | "Yearly";


export interface DBRecurringTransaction {
  id: number;
  user_id: string;
  stream_id: string;
  account_id: string;
  category: TransactionCategory;
  name: string;
  amount: number;
  frequency: string;
  last_date: string;
  next_date: string;
}

export interface ClientRecurringTransaction {
  id: number;
  category: TransactionCategory;
  name: string;
  amount: number;
  frequency: string;
  last_date: string;
  next_date: string;
}
