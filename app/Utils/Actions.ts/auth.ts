"use server";
import { createSupabaseClient, createSupabaseServerClient } from "../Clients/supabaseClient";

export async function getUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}
export async function getUser() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getUser();
}

export async function signInUser(data: AuthData) {
  const supabase = await createSupabaseServerClient();

  // Sign in the user
  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  if (signInError) {
    console.log("Error signing in: ", signInError.message);
    return { success: false, error: signInError.message };
  } else {
    console.log("Signed in: ", signInData);
    return { success: true, data: signInData };
  }
}

export async function signUpUser(data: AuthData) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (result.error) {
    console.log("signUpUser", result.error);
    return { success: false, error: result.error };
  } else {
    return { success: true, data: result.data };
  }
}

export async function signOutUser() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: true, error };
  } else {
    return { success: true };
  }
}
