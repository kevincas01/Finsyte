"use server";

import {
  CountryCode,
  Products,
  Transaction,
  TransactionsSyncRequest,
} from "plaid";
import { client } from "../Clients/plaid";
import { createPlaidItem } from "./items";
import { createPlaidAccounts } from "./accounts";

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
  userId,
}: {
  publicToken: string;
  userId: string;
}) {
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountResponse = await client.accountsBalanceGet({
      access_token: accessToken,
    });

    const institutionName =
      accountResponse.data.item?.institution_id ?? "Unknown Institution";

    await createPlaidItem({
      userId,
      accessToken,
      itemId,
      institutionName,
    });

    await createPlaidAccounts({
      userId,
      itemId,
      accounts: accountResponse.data.accounts,
    });

    return { success: true };
  } catch (error) {
    console.error("Token exchange error:", error);
    return { success: false, error: "Failed to exchange public token" };
  }
}

export const getTransactionsFromItem = async (
  accessToken: string
): Promise<{ transactions: Transaction[]; cursor: string }> => {
  let cursor: string | undefined = undefined;
  let hasMore = true;
  let allTransactions: Transaction[] = [];

  while (hasMore) {
    const request: TransactionsSyncRequest = {
      access_token: accessToken,
      cursor: cursor,
    };

    const response = await client.transactionsSync(request);
    const data = response.data;

    // Add new transactions to the list
    allTransactions = allTransactions.concat(data.added);

    // Update pagination and cursor
    hasMore = data.has_more;
    cursor = data.next_cursor;
  }

  return {
    transactions: allTransactions,
    cursor: cursor!,
  };
};
