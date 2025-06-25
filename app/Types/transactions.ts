import { DBAccount } from "./account";

export type TransactionCategory =
  | "Fees & Adjustments"
  | "Housing"
  | "Entertainment"
  | "Transportation"
  | "Travel"
  | "Food & Drink"
  | "Utilities"
  | "Miscellaneous"
  | "Health & Wellness"
  | "Education"
  | "Shopping"
  | "Personal"
  | "Gifts & Donations"
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
  account: DBAccount;
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
  } | null;
}
