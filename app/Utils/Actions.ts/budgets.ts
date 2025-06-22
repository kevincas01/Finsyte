"use server";
import { ClientBudget, DBBudget } from "@/app/Types/budget";
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

export const getUserBudgets = async (
  userId: string
): Promise<{
  success: boolean;
  data?: DBBudget[];
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch user budgets:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const updateBudget = async ({
  id,
  currentAmount,
  budgetAmount,
  financeCategory,
  period,
}: Partial<ClientBudget>): Promise<{ success: boolean; error?: string }> => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("budgets")
    .update({
      current_amount: currentAmount,
      budget_amount: budgetAmount,
      finance_category: financeCategory,
      period,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update budget:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};
