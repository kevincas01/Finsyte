"use server";
import { ClientBudget, DBBudget } from "@/app/Types/budget";
import { createSupabaseServerClient } from "../Clients/supabaseClient";
import { ClientGoal, DBGoal } from "@/app/Types/goals";

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

export const getUserGoals = async (
  userId: string
): Promise<{
  success: boolean;
  data?: DBGoal[];
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch user goals:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const getGoalInfoWithGoalId = async (
  userId: string,
  budgetId: string
): Promise<{
  success: boolean;
  data?: DBGoal;
  error?: string;
}> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", budgetId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const updateGoal = async ({
  id,
  currentAmount,
  targetAmount,
  title,
  description,
  deadlineDate,
}: Partial<ClientGoal>): Promise<{ success: boolean; error?: string }> => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("goals")
    .update({
      current_amount: currentAmount,
      target_amount: targetAmount,
      title,
      description,
      deadline_date: deadlineDate,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update goal:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};
