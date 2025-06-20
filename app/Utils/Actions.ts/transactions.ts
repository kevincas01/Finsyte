"use server"
import { Transaction } from "plaid";
import { createSupabaseServerClient } from "../Clients/supabaseClient";
import { DBTransactionWithAccount } from "@/app/Types/transactions";

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
      datetime: transaction.datetime,
      name: transaction.merchant_name || transaction.name,
      description: transaction.original_description,
      pending: transaction.pending,
      transaction_id: transaction.transaction_id,
      logo_url: transaction.logo_url,
      finance_category: transaction.personal_finance_category?.primary,
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
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch items with accounts:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as DBTransactionWithAccount[] };
};
