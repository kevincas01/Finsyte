export interface Account {
  id: number;
  created_at: string;
  account_id: string;
  user_id: string;
  name: string;
  official_name: string;
  mask: string;
  available_balance: number;
  current_balance: number;
  type: string;
  subtype: string;
  iso_currency_code: string;
  item_id: string;
}
