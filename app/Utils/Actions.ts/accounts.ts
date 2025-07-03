"use server";

import { AccountBase } from "plaid";
import { createSupabaseServerClient } from "../Clients/supabaseClient";
import { DBAccount } from "@/app/Types/account";

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
      official_name: account.official_name || account.name,
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

export async function getUserAccountsWithItemId(id: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("item_id", id);

  if (error) {
    console.error("Failed to fetch user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function getAccountInfoWithAccountId(
  userId: string,
  accountId: string
) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("account_id", accountId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function getUserAccounts(userId: string): Promise<{
  success: boolean;
  data?: DBAccount[];
  error?: string;
}> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
