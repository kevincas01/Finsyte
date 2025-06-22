"use server";
import { ClientBudget } from "@/app/Types/budget";
import { createSupabaseServerClient } from "../Clients/supabaseClient";

export const createBudget = async ({
  currentAmount,
  budgetAmount,
  financeCategory,
  period,
}: Partial<ClientBudget>): Promise<{ success: boolean; error?: string }> => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "User not authenticated." };
  }
  const budgetProps = {
    user_id: user.id,
    current_amount: currentAmount,
    budget_amount: budgetAmount,
    finance_category: financeCategory,
    period,
  };
  const { error } = await supabase.from("budgets").insert(budgetProps);

  if (error) {
    console.error("Error inserting budget:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
};
