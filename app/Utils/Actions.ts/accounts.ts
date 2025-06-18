"use server";

import { AccountBase } from "plaid";
import { createSupabaseServerClient } from "../Clients/supabaseClient";

interface CreatePlaidAccountsParams {
  userId: string;
  itemId: string;
  accounts: AccountBase[];
}

export const createPlaidAccounts = async ({
  userId,
  itemId,
  accounts,
}: CreatePlaidAccountsParams) => {
  const supabase = await createSupabaseServerClient();

  const accountInserts = accounts.map((account) => {
    const accountData = {
      user_id: userId,
      item_id: itemId,
      account_id: account.account_id,
      name: account.name,
      official_name: account.official_name,
      type: account.type,
      subtype: account.subtype,
      mask: account.mask,
      current_balance: account.balances.current,
      available_balance: account.balances.available,
      iso_currency_code: account.balances.iso_currency_code,
    };

    return supabase.from("accounts").insert(accountData);
  });

  try {
    const results = await Promise.all(accountInserts);

    const hasError = results.some((res) => res.error);

    if (hasError) {
      console.error("Error inserting one or more accounts", results);
      return { success: false, error: "Error inserting one or more accounts" };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error inserting accounts:", err);
    return { success: false, error: "Unexpected server error" };
  }
};
