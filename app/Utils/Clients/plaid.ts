import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

export const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
      "PLAID-SECRET": process.env.PLAID_SECRET_KEY!,
    },
  },
});

export const client = new PlaidApi(configuration);
