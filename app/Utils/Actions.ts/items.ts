"use server";
import { createSupabaseServerClient } from "../Clients/supabaseClient";

interface CreatePlaidItemParams {
  userId: string;
  accessToken: string;
  itemId: string;
  institutionName: string;
}

export const createPlaidItem = async ({
  userId,
  accessToken,
  itemId,
  institutionName,
}: CreatePlaidItemParams): Promise<{ success: boolean; error?: string }> => {
  const itemProps = {
    user_id: userId,
    access_token: accessToken,
    item_id: itemId,
    institution_name: institutionName,
  };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("plaid_items").insert(itemProps);

  if (error) {
    console.error("Error inserting plaid item:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
};
