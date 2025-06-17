"use server";
import { Profile } from "@/app/Types/profiles";
import { createSupabaseServerClient } from "../Clients/supabaseClient";

export async function getUserInformation(id: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updateUserInformation(data: Partial<Profile>) {
  const supabase = await createSupabaseServerClient();

  const { id, ...fieldsToUpdate } = data;

  const { error } = await supabase
    .from("profiles")
    .update(fieldsToUpdate)
    .eq("id", id);

  if (error) {
    console.error("Failed to update user information:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
