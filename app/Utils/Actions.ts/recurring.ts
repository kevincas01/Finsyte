"use server";
import { TransactionStream } from "plaid";
import { createSupabaseServerClient } from "../Clients/supabaseClient";
import { DBRecurringTransaction } from "@/app/Types/recurring";
import { mapPlaidCategoryToCustom } from "../categories";

export const upsertRecurringOutflows = async (
  userId: string,
  outflows: TransactionStream[]
) => {
  const supabase = await createSupabaseServerClient();
  const formattedOutflows = outflows.map((outflow) => ({
    user_id: userId,
    stream_id: outflow.stream_id,
    account_id: outflow.account_id,
    name: outflow.description,
    amount: outflow.average_amount.amount,
    frequency: outflow.frequency,
    last_date: outflow.last_date,
    next_date: outflow.predicted_next_date,
  }));

  const { error } = await supabase.from("recurring").upsert(formattedOutflows, {
    onConflict: "stream_id",
  });

  if (error) {
    console.error("Upsert error:", error);
  }
};

export const getUserRecurringTransactions = async (
  userId: string
): Promise<{
  success: boolean;
  data?: DBRecurringTransaction[];
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("recurring")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch user goals:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};
