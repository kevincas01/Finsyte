import {
  ClientTransaction,
  ClientTransactionWithAccount,
  DBTransaction,
  DBTransactionWithAccount,
} from "@/app/Types/transactions";

export const mapToClientTransaction = (
  transaction: DBTransaction
): ClientTransaction => {
  return {
    id: transaction.id,
    amount: transaction.amount,
    datetime: transaction.datetime,
    name: transaction.name,
    description: transaction.description,
    pending: transaction.pending,
    logoUrl: transaction.logo_url,
    financeCategory: transaction.finance_category,
  };
};

export const mapToClientTransactionWithAccount = (
  transaction: DBTransactionWithAccount
): ClientTransactionWithAccount => {
  return {
    id: transaction.id,
    amount: transaction.amount,
    datetime: transaction.datetime,
    name: transaction.name,
    description: transaction.description,
    pending: transaction.pending,
    logoUrl: transaction.logo_url,
    financeCategory: transaction.finance_category,
    account: transaction.account
      ? { id: transaction.account.id, name: transaction.account.name }
      : null,
  };
};
