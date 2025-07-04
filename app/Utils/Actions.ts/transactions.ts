"use server";
import { Transaction } from "plaid";
import { createSupabaseServerClient } from "../Clients/supabaseClient";
import {
  ClientTransaction,
  DBTransaction,
  DBTransactionWithAccount,
} from "@/app/Types/transactions";
import { mapPlaidCategoryToCustom } from "../categories";

export const createTransaction = async ({
  amount,
  datetime,
  name,
  description,
  pending,
  logoUrl,
  financeCategory,
}: Partial<ClientTransaction>): Promise<{
  success: boolean;
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "User not authenticated." };
  }
  const goalProps = {
    user_id: user.id,
    amount,
    datetime,
    name,
    description,
    pending,
    logo_url: logoUrl,
    finance_category: financeCategory,
  };
  const { error } = await supabase.from("transactions").insert(goalProps);

  if (error) {
    console.error("Error inserting goal:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

export const updateTransaction = async ({
  id,
  amount,
  name,
  description,
  financeCategory,
}: Partial<ClientTransaction>): Promise<{
  success: boolean;
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("transactions")
    .update({
      amount,
      name,
      description,
      finance_category: financeCategory,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update transaction:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};

interface CreateTransactionsParams {
  userId: string;
  itemId: string;
  transactions: Transaction[];
}
export const createTransactions = async ({
  userId,
  itemId,
  transactions,
}: CreateTransactionsParams): Promise<{ success: boolean; error?: string }> => {
  const supabase = await createSupabaseServerClient();

  const transactionInserts = transactions.map((transaction) => {
    const transactionData = {
      user_id: userId,
      item_id: itemId,
      account_id: transaction.account_id,
      amount: transaction.amount,
      datetime: transaction.datetime || transaction.date,
      name: transaction.merchant_name || transaction.name,
      description: transaction.original_description,
      pending: transaction.pending,
      transaction_id: transaction.transaction_id,
      logo_url: transaction.logo_url,
      finance_category: mapPlaidCategoryToCustom(
        transaction.personal_finance_category?.primary as string,
        transaction.personal_finance_category?.primary as string
      ),
    };

    return supabase.from("transactions").insert(transactionData);
  });

  try {
    const results = await Promise.all(transactionInserts);

    const hasError = results.some((res) => res.error);

    if (hasError) {
      console.error("Error inserting one or more transactions", results);
      return { success: false, error: "Error inserting one or more accounts" };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error inserting accounts:", err);
    return { success: false, error: "Unexpected server error" };
  }
};

export const getUserTransactionsWithAccount = async (
  userId: string
): Promise<{
  success: boolean;
  data?: DBTransactionWithAccount[];
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
        *,
        account:account_id (*)
      `
    )
    .eq("user_id", userId)
    .order("datetime", { ascending: false });

  if (error) {
    console.error("Failed to fetch items with accounts:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as DBTransactionWithAccount[] };
};

export const getUserTransactionsWithAccountId = async (
  userId: string,
  accountId: string
): Promise<{
  success: boolean;
  data?: DBTransaction[];
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(`*`)
    .eq("account_id", accountId)
    .eq("user_id", userId)
    .order("datetime", { ascending: false });

  if (error) {
    console.error("Failed to fetch items with accounts:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const getUserTransactionsByCategory = async (
  userId: string,
  category: string
): Promise<{
  success: boolean;
  data?: DBTransaction[];
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(`*`)
    .eq("finance_category", category)
    .eq("user_id", userId)
    .order("datetime", { ascending: false });

  if (error) {
    console.error("Failed to fetch items with accounts:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};
