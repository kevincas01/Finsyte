"use server";
import { PlaidItemWithAccounts } from "@/app/Types/items";
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

export async function getPlaidItemsWithAccounts(userId: string): Promise<{
  success: boolean;
  data?: PlaidItemWithAccounts[];
  error?: string;
}> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("plaid_items")
    .select(
      `
      *,
      accounts (*)
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch items with accounts:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data as PlaidItemWithAccounts[] };
}

export const getLatestCursorOrNull = async (itemId: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("plaid_items")
    .select("cursor")
    .eq("item_id", itemId)
    .single();

  if (error) {
    console.error("Failed to fetch user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const updateItemCursor = async (itemId: string, cursor: string) => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("plaid_items")
    .update(cursor)
    .eq("item_id", itemId);

  if (error) {
    console.error("Failed to update item cursor:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};
