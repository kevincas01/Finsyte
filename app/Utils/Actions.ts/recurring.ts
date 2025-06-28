"use server";
import { TransactionStream } from "plaid";
import { createSupabaseServerClient } from "../Clients/supabaseClient";

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

  const { error } = await supabase
    .from("recurring")
    .upsert(formattedOutflows, {
      onConflict: "stream_id",
    });

  if (error) {
    console.error("Upsert error:", error);
  }
};
