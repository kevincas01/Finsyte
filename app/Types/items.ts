import { Account } from "./account";

export interface PlaidItem {
  id: number;
  created_at: string;
  item_id: string ;
  user_id: string ;
  access_token: string ;
  institution_name: string ;
  cursor: string ;
}
export interface PlaidItemWithAccounts extends PlaidItem{
  accounts: Account[];
}
