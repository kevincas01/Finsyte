export type TransactionCategory =
  | "Automotive"
  | "Fees & Adjustments"
  | "Education"
  | "Food & Drink"
  | "Utilities"
  | "Entertainment"
  | "Travel"
  | "Shopping"
  | "Professional Services"
  | "Personal"
  | "Miscellaneous"
  | "Health & wellness"
  | "Gifts & donations"
  | "Gas"
  | "Groceries";

export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  description: string;
  category: TransactionCategory;
  account: string;
  amount:number
};
