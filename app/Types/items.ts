import { DBAccount } from "./account";

export interface DBPlaidItem {
  id: number;
  created_at: string;
  item_id: string ;
  user_id: string ;
  access_token: string ;
  institution_name: string ;
  cursor: string ;
}
export interface DBPlaidItemWithAccounts extends DBPlaidItem{
  accounts: DBAccount[];
}
