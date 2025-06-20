import { Account } from "./account";

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

export interface DBTransactionn {
  id: number;
  user_id: string;
  item_id: string;
  account_id: string;
  amount: number;
  datetime: string;
  name: string;
  description: string | null;
  pending: boolean;
  transaction_id: string;
  logo_url: string | null;
  finance_category: string | null;
}

export interface DBTransactionWithAccount extends DBTransactionn {
  account: Account;
}

export interface ClientTransaction {
  id: number;
  amount: number;
  datetime: string;
  name: string;
  description: string | null;
  pending: boolean;
  logoUrl: string | null;
  financeCategory: string | null;
}

export interface ClientTransactionWithAccount extends ClientTransaction {
  account: {
    id: number;
    name: string;
  };
}
