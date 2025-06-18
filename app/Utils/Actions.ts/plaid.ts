"use server";

import { CountryCode, Products } from "plaid";
import { client } from "../Clients/plaid";

export async function createLinkToken(userId: string) {
  try {
    const request = {
      user: { client_user_id: userId },
      client_name: "Your App Name",
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    };

    const response = await client.linkTokenCreate(request);

    return { link_token: response.data.link_token };
  } catch (error) {
    console.error("Plaid Link Token Error:", error);
    return { error: "Failed to create link token" };
  }
}

export async function exchangePublicToken({
  publicToken,
}: {
  publicToken: string;
}) {
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Optional: Store in Supabase
    // const supabase = await createSupabaseServerClient();
    // await supabase.from("plaid_items").insert({
    //   user_id: userId,
    //   item_id: itemId,
    //   access_token: accessToken,
    // });

    return { success: true };
  } catch (error) {
    console.error("Token exchange error:", error);
    return { success: false, error: "Failed to exchange public token" };
  }
}
