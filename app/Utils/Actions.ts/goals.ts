"use server";
import { ClientBudget, DBBudget } from "@/app/Types/budget";
import { createSupabaseServerClient } from "../Clients/supabaseClient";
import { ClientGoal } from "@/app/Types/goals";

export const createGoal = async ({
  currentAmount,
  title,
  targetAmount,
  description,
  deadlineDate,
}: Partial<ClientGoal>): Promise<{ success: boolean; error?: string }> => {
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
    title,
    current_amount: currentAmount,
    target_amount: targetAmount,
    description,
    deadline_date: deadlineDate,
  };
  const { error } = await supabase.from("goals").insert(goalProps);

  if (error) {
    console.error("Error inserting goal:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

